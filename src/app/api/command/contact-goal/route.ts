import { NextRequest, NextResponse } from 'next/server';
import { updateContactGoal } from '@/lib/db';

export async function PUT(req: NextRequest) {
  try {
    const { id, end_goal, priority, pipeline, auto_followup } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    await updateContactGoal(id, {
      end_goal: end_goal || '',
      priority: priority || 'pipeline',
      pipeline: pipeline || '',
      auto_followup: auto_followup !== undefined ? auto_followup : 1,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
