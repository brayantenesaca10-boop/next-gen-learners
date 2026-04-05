import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateSessionToken, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 });

  const hash = hashPassword(password);
  const envHash = process.env.NGL_AUTH_HASH || 'NOT_SET';
  if (hash !== envHash) {
    return NextResponse.json({ error: 'Wrong password', debug_computed: hash.slice(0, 8), debug_env: envHash.slice(0, 8), debug_env_len: envHash.length }, { status: 401 });
  }

  const token = generateSessionToken();
  const sig = signToken(token);
  const response = NextResponse.json({ success: true });
  response.cookies.set('ngl_session', `${token}.${sig}`, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
