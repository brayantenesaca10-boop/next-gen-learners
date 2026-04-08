import { NextRequest, NextResponse } from 'next/server';
import { insertBrainDump, getBrainDumps, deleteBrainDump } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { raw_text, action_items } = await req.json();
    if (!raw_text) return NextResponse.json({ error: 'raw_text required' }, { status: 400 });
    const id = await insertBrainDump({ raw_text, action_items: JSON.stringify(action_items || []) });
    return NextResponse.json({ id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dumps = await getBrainDumps(20);
    return NextResponse.json({ dumps });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteBrainDump(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
