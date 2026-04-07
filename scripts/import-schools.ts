import { createClient } from '@libsql/client';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function createTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nces_id TEXT,
      name TEXT NOT NULL,
      district TEXT DEFAULT '',
      address TEXT DEFAULT '',
      city TEXT DEFAULT '',
      state TEXT DEFAULT '',
      zip TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      grade_low TEXT DEFAULT '',
      grade_high TEXT DEFAULT '',
      enrollment INTEGER DEFAULT 0,
      school_level TEXT DEFAULT '',
      school_type TEXT DEFAULT 'public',
      charter INTEGER DEFAULT 0,
      magnet INTEGER DEFAULT 0,
      title_i INTEGER DEFAULT 0,
      latitude REAL,
      longitude REAL,
      county TEXT DEFAULT '',
      locale TEXT DEFAULT '',
      student_teacher_ratio REAL,
      free_lunch INTEGER DEFAULT 0
    )
  `);
  // Indexes for fast searching
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_schools_state ON schools(state)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(state, city)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_schools_type ON schools(school_type)`);
  console.log('Table and indexes created.');
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

async function importPublicSchools() {
  console.log('Importing public schools...');
  const rl = createInterface({ input: createReadStream('data/public_schools.csv'), crlfDelay: Infinity });
  let headers: string[] = [];
  let batch: string[][] = [];
  let total = 0;

  for await (const line of rl) {
    if (!headers.length) {
      headers = parseCSVLine(line.replace(/^\uFEFF/, ''));
      continue;
    }
    batch.push(parseCSVLine(line));
    if (batch.length >= 500) {
      await insertPublicBatch(headers, batch);
      total += batch.length;
      console.log(`  Public: ${total} imported`);
      batch = [];
    }
  }
  if (batch.length) {
    await insertPublicBatch(headers, batch);
    total += batch.length;
  }
  console.log(`Public schools done: ${total} total`);
}

async function insertPublicBatch(headers: string[], rows: string[][]) {
  const idx = (name: string) => headers.indexOf(name);
  const stmts = rows.map(r => ({
    sql: `INSERT INTO schools (nces_id,name,district,address,city,state,zip,phone,grade_low,grade_high,enrollment,school_level,school_type,charter,magnet,title_i,latitude,longitude,county,locale,free_lunch)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      r[idx('NCESSCH')] || '',
      r[idx('SCH_NAME')] || '',
      r[idx('LEA_NAME')] || '',
      r[idx('LSTREET1')] || '',
      r[idx('LCITY')] || '',
      r[idx('STABR')] || '',
      r[idx('LZIP')] || '',
      r[idx('PHONE')] || '',
      r[idx('GSLO')] || '',
      r[idx('GSHI')] || '',
      parseInt(r[idx('TOTAL')] || r[idx('MEMBER')] || '0') || 0,
      r[idx('SCHOOL_LEVEL')] || '',
      'public',
      r[idx('CHARTER_TEXT')]?.toLowerCase().includes('yes') ? 1 : 0,
      0, // magnet not in this dataset
      parseInt(r[idx('TOTFRL')] || '0') > 0 ? 1 : 0,
      parseFloat(r[idx('X')] || '0') || null, // longitude is X
      parseFloat(r[idx('Y')] || '0') || null, // latitude is Y
      r[idx('NMCNTY')] || '',
      r[idx('ULOCALE')] || '',
      parseInt(r[idx('TOTFRL')] || '0') || 0,
    ],
  }));
  await db.batch(stmts);
}

async function importPrivateSchools() {
  console.log('Importing private schools...');
  const rl = createInterface({ input: createReadStream('data/pss2122_pu.csv'), crlfDelay: Infinity });
  let headers: string[] = [];
  let batch: string[][] = [];
  let total = 0;

  for await (const line of rl) {
    if (!headers.length) {
      headers = parseCSVLine(line.replace(/^\uFEFF/, ''));
      continue;
    }
    batch.push(parseCSVLine(line));
    if (batch.length >= 500) {
      await insertPrivateBatch(headers, batch);
      total += batch.length;
      console.log(`  Private: ${total} imported`);
      batch = [];
    }
  }
  if (batch.length) {
    await insertPrivateBatch(headers, batch);
    total += batch.length;
  }
  console.log(`Private schools done: ${total} total`);
}

async function insertPrivateBatch(headers: string[], rows: string[][]) {
  const idx = (name: string) => headers.indexOf(name);
  const stmts = rows.map(r => ({
    sql: `INSERT INTO schools (nces_id,name,address,city,state,zip,phone,grade_low,grade_high,enrollment,school_level,school_type,county)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      r[idx('PPIN')] || '',
      r[idx('PINST')] || '',
      r[idx('PADDRS')] || '',
      r[idx('PCITY')] || '',
      r[idx('PSTABB')] || '',
      r[idx('PZIP')] || '',
      r[idx('PPHONE')] || '',
      r[idx('LOGR2022')] || '',
      r[idx('HIGR2022')] || '',
      parseInt(r[idx('NUMSTUDS')] || '0') || 0,
      r[idx('LEVEL')] || '',
      'private',
      r[idx('PCNTNM')] || '',
    ],
  }));
  await db.batch(stmts);
}

async function main() {
  await createTable();
  // Clear existing data
  await db.execute('DELETE FROM schools');
  console.log('Cleared existing school data.');
  await importPublicSchools();
  await importPrivateSchools();
  // Final count
  const count = await db.execute('SELECT COUNT(*) as cnt, school_type FROM schools GROUP BY school_type');
  console.log('Final counts:', count.rows);
}

main().catch(console.error);
