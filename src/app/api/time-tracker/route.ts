import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getTimeEntries, insertTimeEntry, logActivity } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from') || undefined;
  const to = searchParams.get('to') || undefined;
  const entries = await getTimeEntries(from, to);
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const data = await req.json();
  const { category, description, minutes, date } = data;

  if (!category) return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  if (!minutes || minutes <= 0) return NextResponse.json({ error: 'Minutes must be greater than 0' }, { status: 400 });
  if (!date) return NextResponse.json({ error: 'Date is required' }, { status: 400 });

  const id = await insertTimeEntry({ category, description: description || '', minutes: Number(minutes), date });
  await logActivity({ person: data._actor || 'unknown', action: 'logged time', resource_type: 'time_entry', resource_name: category, details: `${minutes} min — ${description || ''}`.trim() });
  return NextResponse.json({ id: Number(id) });
}
