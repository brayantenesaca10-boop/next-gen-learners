import { NextResponse } from 'next/server';
import { getCommandContacts, initDb } from '@/lib/db';
import { getAllGmailClients } from '@/lib/gmail';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function POST() {
  try {
    await initDb();
    const contacts = await getCommandContacts();
    const clients = await getAllGmailClients();

    if (clients.length === 0) {
      return NextResponse.json({ error: 'No Gmail accounts connected' }, { status: 400 });
    }

    const results: { name: string; email: string; sent: number; received: number; lastDate: string | null }[] = [];

    for (const contact of contacts) {
      const email = contact.email as string;
      const name = contact.name as string;
      if (!email) continue;

      let totalSent = 0;
      let totalReceived = 0;
      let latestDate: Date | null = null;

      for (const { gmail } of clients) {
        // Count sent emails TO this contact
        try {
          const sentRes = await gmail.users.messages.list({
            userId: 'me',
            q: `to:${email} in:sent`,
            maxResults: 100,
          });
          const sentMessages = sentRes.data.messages || [];
          totalSent += sentMessages.length;

          // Get the most recent sent date
          if (sentMessages.length > 0) {
            const msg = await gmail.users.messages.get({
              userId: 'me',
              id: sentMessages[0].id!,
              format: 'metadata',
              metadataHeaders: ['Date'],
            });
            const dateHeader = msg.data.payload?.headers?.find(h => h.name === 'Date');
            if (dateHeader?.value) {
              const d = new Date(dateHeader.value);
              if (!latestDate || d > latestDate) latestDate = d;
            }
          }
        } catch {}

        // Count received emails FROM this contact
        try {
          const recvRes = await gmail.users.messages.list({
            userId: 'me',
            q: `from:${email}`,
            maxResults: 100,
          });
          const recvMessages = recvRes.data.messages || [];
          totalReceived += recvMessages.length;

          // Check if received is more recent
          if (recvMessages.length > 0) {
            const msg = await gmail.users.messages.get({
              userId: 'me',
              id: recvMessages[0].id!,
              format: 'metadata',
              metadataHeaders: ['Date'],
            });
            const dateHeader = msg.data.payload?.headers?.find(h => h.name === 'Date');
            if (dateHeader?.value) {
              const d = new Date(dateHeader.value);
              if (!latestDate || d > latestDate) latestDate = d;
            }
          }
        } catch {}
      }

      // Also try searching by name if no email matches found
      if (totalSent === 0 && totalReceived === 0 && name) {
        for (const { gmail } of clients) {
          try {
            const nameRes = await gmail.users.messages.list({
              userId: 'me',
              q: `"${name}" in:sent`,
              maxResults: 50,
            });
            const nameMessages = nameRes.data.messages || [];
            totalSent += nameMessages.length;

            if (nameMessages.length > 0) {
              const msg = await gmail.users.messages.get({
                userId: 'me',
                id: nameMessages[0].id!,
                format: 'metadata',
                metadataHeaders: ['Date'],
              });
              const dateHeader = msg.data.payload?.headers?.find(h => h.name === 'Date');
              if (dateHeader?.value) {
                const d = new Date(dateHeader.value);
                if (!latestDate || d > latestDate) latestDate = d;
              }
            }
          } catch {}
        }
      }

      const totalInteractions = totalSent + totalReceived;
      const lastDateStr = latestDate ? latestDate.toISOString().split('T')[0] : null;

      // Update the contact
      if (totalInteractions > 0) {
        const updateParts: string[] = [`times_contacted = ${totalInteractions}`];
        if (lastDateStr) {
          updateParts.push(`last_contact_date = '${lastDateStr}'`);
        }
        // Upgrade status if still 'cold' and we've had interaction
        const currentStatus = contact.status as string;
        if (currentStatus === 'cold' && totalReceived > 0) {
          updateParts.push(`status = 'replied'`);
        } else if (currentStatus === 'cold' && totalSent > 0) {
          updateParts.push(`status = 'emailed'`);
        }

        await db.execute({
          sql: `UPDATE contacts SET ${updateParts.join(', ')} WHERE id = ?`,
          args: [contact.id as number],
        });
      }

      results.push({
        name,
        email,
        sent: totalSent,
        received: totalReceived,
        lastDate: lastDateStr,
      });
    }

    return NextResponse.json({
      success: true,
      synced: results.length,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
