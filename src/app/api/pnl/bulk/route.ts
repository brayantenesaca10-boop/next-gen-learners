import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { bulkInsertPnlEntries, logActivity } from '@/lib/db';

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const data = await req.json();
  const { entries } = data;
  if (!entries || !entries.length) return NextResponse.json({ error: 'entries array required' }, { status: 400 });
  const count = await bulkInsertPnlEntries(entries);
  await logActivity({ person: data._actor || 'unknown', action: 'bulk imported P&L', resource_type: 'pnl_entry', resource_name: `${count} entries` });
  return NextResponse.json({ imported: count });
}
