import { NextRequest, NextResponse } from 'next/server';
import { upsertProposal } from '@/lib/db';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { isAuthenticated } = await import('@/lib/auth');
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { name, slug, hook_headline, hook_subtitle, free_tips, teaser_stats, cta_text } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 });

  const html = buildTeaserHTML(name, {
    hook_headline,
    hook_subtitle,
    free_tips,
    teaser_stats,
    cta_text,
  });

  await upsertProposal({
    slug: `t/${slug}`,
    business_name: name,
    business_url: '',
    html,
    proposal_data: JSON.stringify({ hook_headline, hook_subtitle, free_tips, teaser_stats, cta_text }),
  });

  return NextResponse.json({ ok: true, url: `/p/t%2F${slug}` });
}

function buildTeaserHTML(name: string, p: Record<string, unknown>): string {
  const esc = (s: string) => s?.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') || '';

  const tips = (p.free_tips as Array<{ title: string; text: string }> || []).map((t, i) => {
    const colors = ['#4F46E5', '#10B981', '#7C3AED', '#06B6D4'];
    const bgs = ['rgba(79,70,229,0.1)', 'rgba(16,185,129,0.15)', 'rgba(124,58,237,0.1)', 'rgba(6,182,212,0.12)'];
    return `
    <div class="tip fade-up">
      <div class="tip-num" style="background:${bgs[i % 4]};color:${colors[i % 4]}">${i + 1}</div>
      <div>
        <div class="tip-title">${esc(t.title)}</div>
        <div class="tip-text">${esc(t.text)}</div>
      </div>
    </div>`;
  }).join('');

  const stats = (p.teaser_stats as Array<{ label: string; value: string }> || []).map(s => `
    <div class="stat fade-up">
      <div class="stat-val">${esc(s.value)}</div>
      <div class="stat-label">${esc(s.label)}</div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${esc(name)} — Next Generation Learners</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="description" content="We analyzed ${esc(name)}'s business and found some quick wins. Here's what we'd do."/>
  <meta property="og:title" content="${esc(name)} — Quick Wins from NGL"/>
  <meta property="og:description" content="${esc(p.hook_subtitle as string)}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#FAFBFF;--surface:#FFFFFF;--surface-2:#F1F5F9;--border:#E2E8F0;--text:#1E1B4B;--text-2:#64748B;--text-3:#94A3B8;--primary:#4F46E5;--secondary:#7C3AED;--accent:#10B981;--radius:12px;--radius-lg:20px;--radius-xl:24px}
    html{scroll-behavior:smooth}
    body{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
    .container{max-width:680px;margin:0 auto;padding:0 24px}

    .hero{position:relative;padding:80px 0 60px;text-align:center;overflow:hidden}
    .hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#4F46E5,#7C3AED,#06B6D4,#10B981,#4F46E5);background-size:400% 400%;z-index:0;border-radius:0 0 40px 40px;animation:gf 15s ease infinite}
    @keyframes gf{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    .hero-content{position:relative;z-index:2}
    .hero-badge{display:inline-flex;align-items:center;gap:8px;font-size:0.65rem;letter-spacing:0.16em;text-transform:uppercase;color:white;border:1px solid rgba(255,255,255,0.3);padding:7px 18px;border-radius:100px;margin-bottom:24px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);font-weight:600}
    .hero-badge .pulse{width:6px;height:6px;border-radius:50%;background:#10B981;animation:pulse 2s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    .hero h1{font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:800;line-height:1.1;letter-spacing:-0.03em;margin-bottom:16px;color:white}
    .hero-sub{font-size:0.95rem;color:rgba(255,255,255,0.8);max-width:500px;margin:0 auto;line-height:1.75;font-weight:300}

    .section{padding:56px 0}
    .sh-label{font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary);margin-bottom:10px;font-weight:700}
    .sh-title{font-size:clamp(1.4rem,3vw,1.8rem);font-weight:800;line-height:1.15;letter-spacing:-0.02em;margin-bottom:10px}
    .sh-desc{font-size:0.88rem;color:var(--text-2);max-width:500px;line-height:1.75;margin-bottom:32px}

    .tip{display:flex;gap:16px;align-items:flex-start;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:24px;margin-bottom:12px;transition:all 0.3s}
    .tip:hover{transform:translateY(-4px);box-shadow:0 12px 24px -8px rgba(79,70,229,0.12)}
    .tip-num{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:800;flex-shrink:0}
    .tip-title{font-size:0.92rem;font-weight:700;margin-bottom:4px}
    .tip-text{font-size:0.82rem;color:var(--text-2);line-height:1.65}

    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:32px}
    .stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px;text-align:center;transition:all 0.3s}
    .stat:hover{transform:translateY(-4px);box-shadow:0 12px 24px -8px rgba(79,70,229,0.12)}
    .stat-val{font-size:1.3rem;font-weight:800;color:var(--primary);margin-bottom:4px}
    .stat-label{font-size:0.65rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-3);font-weight:600}

    .teaser-box{background:rgba(79,70,229,0.06);border:1px solid rgba(79,70,229,0.12);border-radius:var(--radius-xl);padding:32px;text-align:center;margin-top:8px}
    .teaser-box p{font-size:0.92rem;color:var(--text);line-height:1.7;font-weight:500;max-width:460px;margin:0 auto 20px}
    .teaser-box .small{font-size:0.75rem;color:var(--text-3);font-weight:400;margin-top:12px}

    .cta-section{text-align:center;padding:64px 0 80px;position:relative;overflow:hidden}
    .cta-bg{position:absolute;inset:0;background:linear-gradient(135deg,#4F46E5,#7C3AED,#06B6D4);border-radius:40px 40px 0 0;z-index:0}
    .cta-content{position:relative;z-index:1}
    .cta-section h2{font-size:clamp(1.4rem,3vw,1.8rem);font-weight:800;margin-bottom:12px;letter-spacing:-0.02em;color:white}
    .cta-section p{font-size:0.88rem;color:rgba(255,255,255,0.75);max-width:420px;margin:0 auto 28px;line-height:1.7;font-weight:300}
    .cta-btn{display:inline-flex;align-items:center;gap:10px;background:white;color:var(--primary);font-weight:700;font-size:0.85rem;padding:14px 32px;border-radius:var(--radius);text-decoration:none;border:none;cursor:pointer;transition:all 0.2s}
    .cta-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.2)}

    footer{padding:36px 0;text-align:center}
    .footer-brand{font-size:0.75rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-3);font-weight:700;margin-bottom:4px}
    footer p{font-size:0.68rem;color:var(--text-3)}
    footer a{color:var(--primary);text-decoration:none}

    .fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
    .fade-up.visible{opacity:1;transform:translateY(0)}
    @media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr 1fr}.section{padding:40px 0}}
    @media(max-width:480px){.stats-grid{grid-template-columns:1fr}}
  </style>
</head>
<body>

<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content container">
    <div class="hero-badge"><span class="pulse"></span>Built for ${esc(name)}</div>
    <h1>${esc(p.hook_headline as string)}</h1>
    <p class="hero-sub">${esc(p.hook_subtitle as string)}</p>
  </div>
</div>

<div class="container">

  <div class="section">
    <div class="sh-label">What We Found</div>
    <h2 class="sh-title">We Analyzed Your Business</h2>
    <p class="sh-desc">We took a look at what you're doing and found a few things you can act on right now — for free.</p>
    <div class="stats-grid">${stats}</div>
  </div>

  <div class="section" style="padding-top:0">
    <div class="sh-label">Free Value</div>
    <h2 class="sh-title">Quick Wins You Can Use Today</h2>
    <p class="sh-desc">No strings attached. These are things you can implement yourself, right now.</p>
    ${tips}
    <div class="teaser-box fade-up">
      <p>We found more. A lot more. We've mapped out a full automation strategy specific to your business — the pain points, the solutions, and exactly what we'd build.</p>
      <a href="mailto:contact@nextgenerationlearners.com?subject=Let's Talk — ${encodeURIComponent(name)}" class="cta-btn" style="display:inline-flex">Let's Talk About It →</a>
      <div class="small">20 minutes. No pressure. We'll walk you through everything.</div>
    </div>
  </div>

</div>

<div class="cta-section">
  <div class="cta-bg"></div>
  <div class="cta-content container">
    <h2>Ready to Stop Doing Everything Manually?</h2>
    <p>${esc(p.cta_text as string || "Let's hop on a quick call and we'll show you exactly what we'd build for your business.")}</p>
    <a href="mailto:contact@nextgenerationlearners.com?subject=Let's Talk — ${encodeURIComponent(name)}" class="cta-btn">Book a Call →</a>
  </div>
</div>

<footer>
  <div class="container">
    <div class="footer-brand">Next Generation Learners</div>
    <p>Custom AI software for businesses that want to move faster. <a href="https://www.nextgenerationlearners.com">nextgenerationlearners.com</a></p>
  </div>
</footer>

<script>
const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
</script>
</body>
</html>`;
}
