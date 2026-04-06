import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getContacts, insertContact, logActivity } from '@/lib/db';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  return NextResponse.json(await getContacts());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const data = await req.json();
  if (!data.name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const id = await insertContact({ name: data.name, title: data.title || '', organization: data.organization || '', email: data.email || '', status: data.status || 'cold', notes: data.notes || '' });
  await logActivity({ person: data.source || 'unknown', action: 'added', resource_type: 'contact', resource_name: data.name, details: data.organization ? `at ${data.organization}` : '' });
  return NextResponse.json({ id });
}
