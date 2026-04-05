import { NextRequest, NextResponse } from 'next/server';
import { getOAuth2Client } from '@/lib/gmail';
import { upsertOAuthToken } from '@/lib/db';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  const oauth2 = getOAuth2Client();
  if (!oauth2) return NextResponse.json({ error: 'OAuth not configured' }, { status: 500 });

  try {
    const { tokens } = await oauth2.getToken(code);
    let email = '';
    if (tokens.access_token) {
      try {
        oauth2.setCredentials(tokens);
        const info = await oauth2.getTokenInfo(tokens.access_token);
        email = info.email || '';
      } catch {}
    }
    await upsertOAuthToken({
      provider: 'gmail',
      access_token: tokens.access_token || '',
      refresh_token: tokens.refresh_token || '',
      expiry: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : '',
      email,
    });

    return new NextResponse(
      `<html><body style="background:#FAFBFF;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif">
        <div style="text-align:center"><h2 style="color:#4F46E5">Gmail Connected!</h2><p>Connected as ${email}</p><p><a href="/dashboard">Back to Dashboard</a></p></div>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'OAuth failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
