"use client";

import { useEffect, useState, useRef } from "react";

/* ── pipeline data ── */
const libraryPipeline = {
  name: "Library Outreach",
  color: "#06B6D4",
  steps: [
    {
      id: "find",
      label: "Find Library",
      detail: "Identify target public library in region",
      icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    },
    {
      id: "research",
      label: "Research Contacts",
      detail: "Website scan: Children's Coordinator, Head of Programs, or similar role",
      icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    },
    {
      id: "email",
      label: "Send Tailored Emails",
      detail: "Personalized outreach to 2-3 contacts per library",
      icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    },
    {
      id: "follow1",
      label: "Follow Up #1",
      detail: "5 days after initial email — gentle check-in",
      icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "follow2",
      label: "Follow Up #2",
      detail: "7 days after first follow-up — final nudge with value add",
      icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
    },
    {
      id: "convert",
      label: "Partnership Secured",
      detail: "Library signs on for NGL AI literacy program",
      icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ],
};

/* ── future pipelines (placeholders) ── */
const futurePipelines = [
  { name: "School Districts", color: "#7C3AED", status: "coming soon" },
  { name: "After-School Programs", color: "#10B981", status: "coming soon" },
  { name: "Corporate Sponsors", color: "#F59E0B", status: "coming soon" },
];

/* ── animated dot on path ── */
function PulseDot({ color, delay }: { color: string; delay: number }) {
  return (
    <span
      className="absolute w-2.5 h-2.5 rounded-full animate-travel"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}40`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function SystemsPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<string>>(new Set());
  const [showBranches, setShowBranches] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // stagger the entrance
    setTimeout(() => setShowTitle(true), 300);
    setTimeout(() => setShowBranches(true), 900);

    // reveal each step sequentially
    libraryPipeline.steps.forEach((step, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => new Set(prev).add(step.id));
      }, 1400 + i * 350);
    });
  }, []);

  // intersection observer for scroll reveal (nice-to-have for long lists)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.stepId;
            if (id) setVisibleSteps((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.3 }
    );
    stepsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* inline keyframes */}
      <style>{`
        @keyframes travel {
          0%   { left: 0; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-travel {
          animation: travel 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1); }
          50%      { box-shadow: 0 0 30px rgba(6,182,212,0.5), 0 0 80px rgba(6,182,212,0.2); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes branchGrow {
          from { opacity: 0; width: 0; }
          to   { opacity: 1; width: 100%; }
        }
        .step-visible {
          animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .node-ring {
          transition: all 0.3s ease;
        }
        .node-ring:hover {
          transform: scale(1.15);
        }
      `}</style>

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* subtle grid bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* floating ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

        {/* ═══ HERO: NGL CORE ═══ */}
        <section className="relative flex flex-col items-center justify-center pt-40 pb-20 px-4">
          {/* glowing center node */}
          <div
            className="relative"
            style={{
              opacity: showTitle ? 1 : 0,
              transform: showTitle ? "scale(1)" : "scale(0.7)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center relative"
              style={{
                background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            >
              {/* ring */}
              <div className="absolute inset-2 rounded-full border border-cyan-500/30" />
              <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
              <span className="text-white text-5xl font-extrabold tracking-wider select-none">
                NGL
              </span>
            </div>
          </div>

          <p
            className="mt-6 text-white/40 text-sm tracking-[0.25em] uppercase"
            style={{
              opacity: showTitle ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            Systems &amp; Pipelines
          </p>
        </section>

        {/* ═══ BRANCH LINES FROM CENTER ═══ */}
        <section className="relative max-w-6xl mx-auto px-4">
          {/* branch connector line */}
          <div className="flex justify-center mb-8">
            <div
              className="h-20 w-px relative overflow-hidden"
              style={{
                opacity: showBranches ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/60 to-cyan-500/10" />
              {/* traveling dot */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 left-1/2 -translate-x-1/2"
                style={{
                  animation: "travel 2s ease-in-out infinite",
                  animationDirection: "normal",
                }}
              />
            </div>
          </div>

          {/* ═══ LIBRARY OUTREACH PIPELINE ═══ */}
          <div
            className="relative"
            style={{
              opacity: showBranches ? 1 : 0,
              transform: showBranches ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            {/* pipeline header */}
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: libraryPipeline.color,
                  boxShadow: `0 0 12px ${libraryPipeline.color}`,
                }}
              />
              <h2 className="text-white text-2xl font-bold tracking-tight">
                {libraryPipeline.name}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent ml-2" />
              <span className="text-cyan-400/60 text-xs tracking-widest uppercase">Active</span>
            </div>

            {/* pipeline steps */}
            <div className="relative ml-6">
              {/* vertical flow line */}
              <div className="absolute left-6 top-0 bottom-0 w-px">
                <div className="h-full bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent" />
                {/* animated dashes */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                  <line
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="100%"
                    stroke="rgba(6,182,212,0.4)"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                    style={{ animation: "dash-flow 1.5s linear infinite" }}
                  />
                </svg>
              </div>

              {libraryPipeline.steps.map((step, i) => {
                const isVisible = visibleSteps.has(step.id);
                const isActive = activeStep === step.id;
                const isLast = i === libraryPipeline.steps.length - 1;

                return (
                  <div
                    key={step.id}
                    ref={(el) => { stepsRef.current[i] = el; }}
                    data-step-id={step.id}
                    className="relative flex items-start gap-5 mb-2 group cursor-pointer"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(24px)",
                      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1)`,
                    }}
                    onMouseEnter={() => setActiveStep(step.id)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* node circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="node-ring w-12 h-12 rounded-full flex items-center justify-center border"
                        style={{
                          borderColor: isActive
                            ? libraryPipeline.color
                            : "rgba(6,182,212,0.3)",
                          background: isActive
                            ? "rgba(6,182,212,0.15)"
                            : "rgba(6,182,212,0.05)",
                          boxShadow: isActive
                            ? `0 0 20px ${libraryPipeline.color}40`
                            : "none",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke={isActive ? "#06B6D4" : "rgba(6,182,212,0.6)"}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                        </svg>
                      </div>
                      {/* step number */}
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black border border-cyan-500/40 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                        {i + 1}
                      </span>
                    </div>

                    {/* card */}
                    <div
                      className="flex-1 rounded-xl px-6 py-5 border transition-all duration-300 mb-4"
                      style={{
                        background: isActive
                          ? "rgba(6,182,212,0.08)"
                          : "rgba(255,255,255,0.02)",
                        borderColor: isActive
                          ? "rgba(6,182,212,0.3)"
                          : "rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-lg">{step.label}</h3>
                        {i > 0 && i < libraryPipeline.steps.length - 1 && (
                          <span className="text-white/20 text-xs tracking-wider">
                            {i === 3 ? "+5 days" : i === 4 ? "+7 days" : ""}
                          </span>
                        )}
                        {isLast && (
                          <span className="text-emerald-400/80 text-xs font-semibold tracking-wider uppercase">
                            Goal
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-sm mt-1.5 leading-relaxed">
                        {step.detail}
                      </p>

                      {/* expanded content on hover */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isActive ? "80px" : "0",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="mt-3 pt-3 border-t border-cyan-500/10">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-cyan-400/60 text-xs">
                              {isLast
                                ? "Program launch & onboarding"
                                : `Stage ${i + 1} of ${libraryPipeline.steps.length}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* connector arrow between steps */}
                    {!isLast && (
                      <div className="absolute left-6 top-14 w-px h-6 flex justify-center">
                        <svg
                          className="w-2 h-3 text-cyan-500/30 mt-auto"
                          viewBox="0 0 8 12"
                          fill="currentColor"
                        >
                          <path d="M4 12L0 6h8L4 12z" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ═══ FUTURE PIPELINES (dimmed branches) ═══ */}
          <div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
            style={{
              opacity: showBranches ? 1 : 0,
              transition: "opacity 0.6s ease 1.5s",
            }}
          >
            {futurePipelines.map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 flex items-center gap-4 group hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="w-3 h-3 rounded-full opacity-40 group-hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: p.color }}
                />
                <div>
                  <h3 className="text-white/50 font-semibold text-sm group-hover:text-white/70 transition-colors">
                    {p.name}
                  </h3>
                  <span className="text-white/20 text-xs tracking-widest uppercase">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom spacer */}
        <div className="h-32" />

        {/* footer email */}
        <div className="text-center pb-10">
          <a
            href="mailto:brayan@nextgenerationlearners.com"
            className="text-white/20 text-xs hover:text-cyan-400/60 transition-colors"
          >
            brayan@nextgenerationlearners.com
          </a>
        </div>
      </div>
    </>
  );
}
