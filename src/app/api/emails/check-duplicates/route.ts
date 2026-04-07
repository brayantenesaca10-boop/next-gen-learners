import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { isAuthenticated } = await import('@/lib/auth');
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { names } = await req.json();
  if (!names || !Array.isArray(names) || names.length === 0) {
    return NextResponse.json({ error: 'Provide an array of school names' }, { status: 400 });
  }

  try {
    const { getGmailClient, getAllGmailClients } = await import('@/lib/gmail');

    // Try all connected Gmail accounts
    const clients = await getAllGmailClients();
    if (clients.length === 0) {
      // Fallback to legacy single client
      const gmail = await getGmailClient();
      if (gmail) clients.push({ user: 'unknown', gmail });
    }

    if (clients.length === 0) {
      return NextResponse.json({ error: 'Gmail not connected' }, { status: 400 });
    }

    const emailed: Record<string, { date: string; subject: string; to: string }> = {};

    for (const { gmail } of clients) {
      // Search sent emails for each school name (batch up to 10 at a time)
      const batches: string[][] = [];
      for (let i = 0; i < names.length; i += 5) {
        batches.push(names.slice(i, i + 5));
      }

      for (const batch of batches) {
        // Build a single Gmail query: in:sent ("School A" OR "School B" OR ...)
        const orQuery = batch.map(n => `"${n}"`).join(' OR ');
        const query = `in:sent (${orQuery})`;

        try {
          const list = await gmail.users.messages.list({
            userId: 'me',
            q: query,
            maxResults: 50,
          });

          if (!list.data.messages) continue;

          for (const msg of list.data.messages) {
            const full = await gmail.users.messages.get({
              userId: 'me',
              id: msg.id!,
              format: 'metadata',
              metadataHeaders: ['To', 'Subject', 'Date'],
            });
            const headers = full.data.payload?.headers || [];
            const getH = (n: string) => headers.find(h => h.name?.toLowerCase() === n.toLowerCase())?.value || '';
            const to = getH('To');
            const subject = getH('Subject');
            const date = getH('Date');
            const snippet = full.data.snippet || '';

            // Check which school name this email matches
            for (const name of batch) {
              const lower = name.toLowerCase();
              if (
                to.toLowerCase().includes(lower) ||
                subject.toLowerCase().includes(lower) ||
                snippet.toLowerCase().includes(lower)
              ) {
                // Only keep the most recent email per school
                if (!emailed[name] || new Date(date) > new Date(emailed[name].date)) {
                  emailed[name] = {
                    date: date ? new Date(date).toISOString() : '',
                    subject,
                    to,
                  };
                }
              }
            }
          }
        } catch {
          // Skip failed queries
        }
      }
    }

    return NextResponse.json({
      emailed,
      checked: names.length,
      found: Object.keys(emailed).length,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
