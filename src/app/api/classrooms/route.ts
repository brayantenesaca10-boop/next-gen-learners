import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getClassrooms, insertClassroom, logActivity } from '@/lib/db';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  return NextResponse.json(await getClassrooms());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const data = await req.json();
  if (!data.name || !data.grade || !data.subject) {
    return NextResponse.json({ error: 'Name, grade, and subject are required' }, { status: 400 });
  }
  const id = await insertClassroom({
    name: data.name,
    grade: data.grade,
    subject: data.subject,
    class_size: data.class_size || 25,
    special_notes: data.special_notes || '',
  });
  await logActivity({ person: data._actor || 'unknown', action: 'created classroom', resource_type: 'classroom', resource_name: data.name, details: `${data.grade} — ${data.subject}` });
  return NextResponse.json({ id: Number(id) });
}
