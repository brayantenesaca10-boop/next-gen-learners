import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getOAuthToken } from '@/lib/db';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const token = await getOAuthToken('gmail');
  return NextResponse.json({
    connected: !!(token && token.access_token),
    email: token?.email || '',
  });
}
