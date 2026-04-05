import { google } from 'googleapis';
import { getOAuthToken, upsertOAuthToken } from './db';

export function getOAuth2Client() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return null;
  const baseUrl = process.env.APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${baseUrl}/api/auth/gmail/callback`
  );
}

export async function getGmailClient() {
  const token = await getOAuthToken('gmail');
  if (!token || !token.access_token) return null;
  const oauth2 = getOAuth2Client();
  if (!oauth2) return null;
  oauth2.setCredentials({
    access_token: token.access_token as string,
    refresh_token: token.refresh_token as string,
    expiry_date: token.expiry ? new Date(token.expiry as string).getTime() : 0,
  });
  oauth2.on('tokens', async (newTokens) => {
    await upsertOAuthToken({
      provider: 'gmail',
      access_token: newTokens.access_token || token.access_token as string,
      refresh_token: newTokens.refresh_token || token.refresh_token as string,
      expiry: newTokens.expiry_date ? new Date(newTokens.expiry_date).toISOString() : token.expiry as string,
      email: token.email as string || '',
    });
  });
  return google.gmail({ version: 'v1', auth: oauth2 });
}

export async function sendEmail(to: string, subject: string, body: string) {
  const gmail = await getGmailClient();
  if (!gmail) throw new Error('Gmail not connected');
  const raw = Buffer.from(
    `To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${body}`
  ).toString('base64url');
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
}
