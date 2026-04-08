import { NextRequest, NextResponse } from 'next/server';
import { getProposal } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const proposal = await getProposal(slug);

  if (!proposal) {
    return new NextResponse('<h1>Proposal not found</h1>', {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Strip any pricing from older proposals (e.g. "Starter — $2,000 - $5,000" → "Starter")
  let html = proposal.html as string;
  html = html.replace(/ — \$[\d,.]+ ?[-–] ?\$[\d,.]+/g, '');

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
