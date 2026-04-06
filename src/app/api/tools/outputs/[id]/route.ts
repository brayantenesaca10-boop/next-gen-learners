import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getToolOutput, deleteToolOutput, logActivity } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await params;
  const output = await getToolOutput(Number(id));
  if (!output) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(output);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await params;
  const output = await getToolOutput(Number(id));
  await deleteToolOutput(Number(id));
  await logActivity({ person: 'unknown', action: 'deleted tool output', resource_type: 'tool', resource_name: (output?.tool as string) || `#${id}` });
  return NextResponse.json({ success: true });
}
