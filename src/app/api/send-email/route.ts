import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { sendEmail } from '@/lib/gmail';
import { insertInteraction, updateContactStatus, getContacts, logActivity } from '@/lib/db';

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { to, subject, body, contact_id, _actor } = await req.json();
  if (!to || !subject || !body) return NextResponse.json({ error: 'to, subject, and body required' }, { status: 400 });

  try {
    await sendEmail(to, subject, body);

    // Log interaction if contact_id provided
    if (contact_id) {
      await insertInteraction({ contact_id, type: 'email', subject, body, notes: 'Sent via NGL dashboard' });
      const today = new Date().toISOString().split('T')[0];
      await updateContactStatus(contact_id, 'emailed', today);
    }

    await logActivity({ person: _actor || 'unknown', action: 'sent email', resource_type: 'email', resource_name: to, details: subject });
    return NextResponse.json({ success: true, sent_to: to });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Send failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
