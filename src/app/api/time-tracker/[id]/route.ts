import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { deleteTimeEntry } from '@/lib/db';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  await deleteTimeEntry(Number(id));
  return NextResponse.json({ success: true });
}
