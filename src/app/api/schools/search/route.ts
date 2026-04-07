import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function GET(req: NextRequest) {
  const { isAuthenticated } = await import('@/lib/auth');
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const state = req.nextUrl.searchParams.get('state')?.toUpperCase() || '';
  const city = req.nextUrl.searchParams.get('city')?.toLowerCase() || '';
  const level = req.nextUrl.searchParams.get('level') || '';
  const query = req.nextUrl.searchParams.get('q')?.toLowerCase() || '';
  const type = req.nextUrl.searchParams.get('type') || ''; // public, private, or empty for all
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const perPage = 50;
  const offset = (page - 1) * perPage;

  if (!state) {
    return NextResponse.json({ error: 'State is required (e.g., CT, FL, NY)' }, { status: 400 });
  }

  try {
    const conditions: string[] = ['state = ?'];
    const args: (string | number)[] = [state];

    if (city) {
      conditions.push('LOWER(city) LIKE ?');
      args.push(`%${city}%`);
    }
    if (query) {
      conditions.push('LOWER(name) LIKE ?');
      args.push(`%${query}%`);
    }
    if (type === 'public' || type === 'private') {
      conditions.push('school_type = ?');
      args.push(type);
    }
    if (level === 'elementary') {
      conditions.push("school_level IN ('1', 'Elementary', 'elementary')");
    } else if (level === 'middle') {
      conditions.push("school_level IN ('2', 'Middle', 'middle')");
    } else if (level === 'high') {
      conditions.push("school_level IN ('3', 'High', 'high')");
    }

    const where = conditions.join(' AND ');

    // Get total count
    const countResult = await db.execute({ sql: `SELECT COUNT(*) as cnt FROM schools WHERE ${where}`, args });
    const total = Number(countResult.rows[0]?.cnt || 0);

    // Get page of results
    const results = await db.execute({
      sql: `SELECT * FROM schools WHERE ${where} ORDER BY enrollment DESC, name ASC LIMIT ? OFFSET ?`,
      args: [...args, perPage, offset],
    });

    const schools = results.rows.map(s => ({
      name: s.name || '',
      nces_id: s.nces_id || '',
      district: s.district || '',
      address: s.address || '',
      city: s.city || '',
      state: s.state || state,
      zip: s.zip || '',
      phone: s.phone || '',
      grade_low: s.grade_low || '',
      grade_high: s.grade_high || '',
      enrollment: Number(s.enrollment) || 0,
      school_level: s.school_level || '',
      school_type: s.school_type || 'public',
      charter: s.charter === 1,
      title_i: s.title_i === 1,
      county: s.county || '',
    }));

    return NextResponse.json({
      schools,
      total,
      page,
      has_more: offset + perPage < total,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
