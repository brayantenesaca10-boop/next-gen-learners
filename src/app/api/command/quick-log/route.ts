import { NextRequest, NextResponse } from 'next/server';
import { insertQuickLog } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { contact_id, channel, note } = await req.json();
    if (!note) return NextResponse.json({ error: 'note required' }, { status: 400 });
    const id = await insertQuickLog({ contact_id: contact_id || null, channel: channel || 'other', note });
    return NextResponse.json({ id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
