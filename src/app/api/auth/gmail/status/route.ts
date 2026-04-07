import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getOAuthToken } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const user = req.nextUrl.searchParams.get('user');

  if (user) {
    const token = await getOAuthToken(`gmail:${user}`);
    return NextResponse.json({
      connected: !!(token && token.access_token),
      email: token?.email || '',
    });
  }

  // Return status for all users
  const ryan = await getOAuthToken('gmail:ryan');
  const brayan = await getOAuthToken('gmail:brayan');
  // Also check legacy 'gmail' token
  const legacy = await getOAuthToken('gmail');

  return NextResponse.json({
    connected: !!(ryan?.access_token || brayan?.access_token || legacy?.access_token),
    ryan: { connected: !!(ryan?.access_token), email: ryan?.email || '' },
    brayan: { connected: !!(brayan?.access_token), email: brayan?.email || '' },
    legacy: !!(legacy?.access_token),
    email: ryan?.email || brayan?.email || legacy?.email || '',
  });
}
