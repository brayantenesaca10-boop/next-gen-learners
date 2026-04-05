import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getLessonPlan, deleteLessonPlan } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await params;
  const plan = await getLessonPlan(Number(id));
  if (!plan) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(plan);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await params;
  await deleteLessonPlan(Number(id));
  return NextResponse.json({ success: true });
}
