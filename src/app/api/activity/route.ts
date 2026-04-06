import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getActivityLog, getActivityByPerson, logActivity } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const person = req.nextUrl.searchParams.get('person');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50');
  if (person) {
    return NextResponse.json(await getActivityByPerson(person, limit));
  }
  return NextResponse.json(await getActivityLog(limit));
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const data = await req.json();
  if (!data.person || !data.action || !data.resource_type) {
    return NextResponse.json({ error: 'person, action, resource_type required' }, { status: 400 });
  }
  await logActivity({
    person: data.person,
    action: data.action,
    resource_type: data.resource_type,
    resource_name: data.resource_name || '',
    details: data.details || '',
  });
  return NextResponse.json({ ok: true });
}
