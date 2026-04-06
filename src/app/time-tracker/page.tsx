'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimeEntry { id: number; category: string; description: string; minutes: number; date: string; created_at: string; }
interface CategorySummary { category: string; total_minutes: number; entry_count: number; }

type View = 'login' | 'main' | 'log';

const CATEGORIES = [
  'Teaching',
  'Lesson Planning',
  'Grading',
  'Parent Communication',
  'Admin / Paperwork',
  'Professional Development',
  'Meetings',
  'Student Support',
  'Outreach / Sales',
  'Building Product',
  'Other',
];

const CATEGORY_COLORS: Record<string, string> = {
  'Teaching': '#4F46E5',
  'Lesson Planning': '#7C3AED',
  'Grading': '#EC4899',
  'Parent Communication': '#F59E0B',
  'Admin / Paperwork': '#6B7280',
  'Professional Development': '#10B981',
  'Meetings': '#3B82F6',
  'Student Support': '#14B8A6',
  'Outreach / Sales': '#F97316',
  'Building Product': '#8B5CF6',
  'Other': '#9CA3AF',
};

function getWeekRange(offset: number = 0) {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    from: monday.toISOString().slice(0, 10),
    to: sunday.toISOString().slice(0, 10),
    label: `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
  };
}

function formatMinutes(m: number) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (h === 0) return `${min}m`;
  if (min === 0) return `${h}h`;
  return `${h}h ${min}m`;
}

export default function TimeTracker() {
  const [view, setView] = useState<View>('login');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ category: 'Teaching', description: '', hours: 0, minutes: 30, date: today });

  const week = getWeekRange(weekOffset);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const authCheck = await fetch('/api/auth/check');
      if (!authCheck.ok) { setView('login'); setLoading(false); return; }

      const [entriesRes, summaryRes] = await Promise.all([
        fetch(`/api/time-tracker?from=${week.from}&to=${week.to}`),
        fetch(`/api/time-tracker/summary?from=${week.from}&to=${week.to}`),
      ]);
      if (entriesRes.ok) setEntries(await entriesRes.json());
      if (summaryRes.ok) setSummary(await summaryRes.json());
      if (view === 'login') setView('main');
    } catch { setError('Failed to load data'); }
    setLoading(false);
  }, [view, week.from, week.to]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) { setPassword(''); setView('main'); await loadData(); } else { setError('Invalid password.'); }
  };

  const logTime = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const totalMinutes = form.hours * 60 + form.minutes;
    if (totalMinutes <= 0) { setError('Enter a time greater than 0'); return; }
    try {
      const res = await fetch('/api/time-tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: form.category, description: form.description, minutes: totalMinutes, date: form.date }),
      });
      if (res.ok) {
        setForm({ category: 'Teaching', description: '', hours: 0, minutes: 30, date: today });
        setView('main');
        await loadData();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to log time');
      }
    } catch { setError('Failed to log time'); }
  };

  const deleteEntry = async (id: number) => {
    if (!confirm('Delete this entry?')) return;
    await fetch(`/api/time-tracker/${id}`, { method: 'DELETE' });
    await loadData();
  };

  const totalMinutes = summary.reduce((acc, s) => acc + Number(s.total_minutes), 0);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white border border-[#E5E7EB] rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#1E1B4B] text-center mb-1">Time Tracker</h1>
          <p className="text-sm text-[#6B7280] text-center mb-6">Sign in to track your time</p>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#374151] mb-1">Password</label>
            <input type="password" required placeholder="Enter password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition font-medium text-sm">Sign In</button>
        </form>
      </div>
    );
  }

  if (loading && entries.length === 0 && summary.length === 0) {
    return <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center"><p className="text-[#6B7280]">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">Time Tracker</h1>
            <p className="text-sm text-[#6B7280] mt-1">See where your time goes</p>
          </div>
          <div className="flex gap-3">
            {view !== 'main' && <button onClick={() => setView('main')} className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg text-[#374151] hover:bg-[#F3F4F6] transition">Back</button>}
            {view === 'main' && (
              <button onClick={() => setView('log')} className="px-4 py-2 text-sm bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition font-medium">+ Log Time</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}<button onClick={() => setError('')} className="float-right font-bold">&times;</button></div>}

        {view === 'main' && (
          <>
            {/* Week Navigator */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setWeekOffset(weekOffset - 1)} className="px-3 py-1.5 text-sm border border-[#E5E7EB] rounded-lg text-[#374151] hover:bg-[#F3F4F6] transition">&larr; Prev</button>
              <div className="text-center">
                <div className="text-sm font-semibold text-[#1E1B4B]">{week.label}</div>
                <div className="text-xs text-[#9CA3AF]">{formatMinutes(totalMinutes)} total</div>
              </div>
              <button onClick={() => setWeekOffset(weekOffset + 1)} disabled={weekOffset >= 0} className={`px-3 py-1.5 text-sm border border-[#E5E7EB] rounded-lg text-[#374151] hover:bg-[#F3F4F6] transition ${weekOffset >= 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>Next &rarr;</button>
            </div>

            {/* Category Breakdown */}
            <h2 className="text-lg font-semibold text-[#1E1B4B] mb-3">Where Your Time Goes</h2>
            {summary.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center mb-8">
                <p className="text-[#6B7280]">No time logged this week. Hit &quot;+ Log Time&quot; to start tracking.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8">
                <div className="flex flex-col gap-3">
                  {summary.map((s) => {
                    const mins = Number(s.total_minutes);
                    const pct = totalMinutes > 0 ? (mins / totalMinutes) * 100 : 0;
                    const color = CATEGORY_COLORS[s.category] || '#9CA3AF';
                    return (
                      <div key={s.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-[#1E1B4B]">{s.category}</span>
                          <span className="text-[#6B7280]">{formatMinutes(mins)} ({Math.round(pct)}%)</span>
                        </div>
                        <div className="w-full h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Entries List */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-[#1E1B4B]">Entries This Week</h2>
              <span className="text-sm text-[#6B7280]">{entries.length} entries</span>
            </div>
            {entries.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">
                <p className="text-[#6B7280]">No entries yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {entries.map((entry) => (
                  <div key={entry.id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[entry.category] || '#9CA3AF' }} />
                      <div>
                        <div className="font-medium text-[#1E1B4B] text-sm">{entry.category}</div>
                        {entry.description && <div className="text-xs text-[#6B7280] mt-0.5">{entry.description}</div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#1E1B4B]">{formatMinutes(entry.minutes)}</div>
                        <div className="text-xs text-[#9CA3AF]">{entry.date}</div>
                      </div>
                      <button onClick={() => deleteEntry(entry.id)} className="text-xs text-red-400 hover:text-red-600 transition">&times;</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'log' && (
          <form onSubmit={logTime} className="bg-white border border-[#E5E7EB] rounded-xl p-6 max-w-lg">
            <h2 className="text-lg font-semibold text-[#1E1B4B] mb-1">Log Time</h2>
            <p className="text-sm text-[#6B7280] mb-6">What did you spend time on?</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#374151] mb-1">Category</label>
              <select required className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#374151] mb-1">Description (optional)</label>
              <input type="text" placeholder="e.g., Graded 6th grade science quizzes" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Hours</label>
                <input type="number" min={0} max={24} className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]" value={form.hours} onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Minutes</label>
                <input type="number" min={0} max={59} className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: Number(e.target.value) })} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#374151] mb-1">Date</label>
              <input type="date" required className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>

            <button type="submit" className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition font-medium text-sm">
              Log Time
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
