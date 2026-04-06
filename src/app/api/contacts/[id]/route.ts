import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { updateContact, deleteContact, getContact, logActivity } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  await updateContact(parseInt(id), { name: data.name, title: data.title || '', organization: data.organization || '', email: data.email || '', status: data.status || 'cold', notes: data.notes || '', contact_type: data.contact_type || 'outreach', relationship_status: data.relationship_status || '' });
  await logActivity({ person: data._actor || 'unknown', action: 'updated', resource_type: 'contact', resource_name: data.name, details: data.status ? `status → ${data.status}` : '' });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id } = await params;
  const actor = req.nextUrl.searchParams.get('_actor') || 'unknown';
  const contact = await getContact(parseInt(id));
  await deleteContact(parseInt(id));
  await logActivity({ person: actor, action: 'deleted', resource_type: 'contact', resource_name: contact?.name as string || `#${id}` });
  return NextResponse.json({ success: true });
}
