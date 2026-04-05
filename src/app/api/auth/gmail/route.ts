import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getOAuth2Client } from '@/lib/gmail';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const oauth2 = getOAuth2Client();
  if (!oauth2) return NextResponse.json({ error: 'Google OAuth not configured' }, { status: 500 });
  const url = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.readonly', 'openid', 'email'],
  });
  return NextResponse.redirect(url);
}
