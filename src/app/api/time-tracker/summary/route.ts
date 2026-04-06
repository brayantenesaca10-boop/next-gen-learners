import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getTimeSummary } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  if (!from || !to) return NextResponse.json({ error: 'from and to dates required' }, { status: 400 });

  const summary = await getTimeSummary(from, to);
  return NextResponse.json(summary);
}
