"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   PIPELINE DATA
   ═══════════════════════════════════════════ */
const libraryPipeline = {
  name: "Library Outreach",
  color: "#06B6D4",
  reasoning: [
    "Libraries are community hubs — parents already trust them with their kids.",
    "Children's coordinators actively look for new educational programs to fill their calendar.",
    "Unlike schools, libraries have fewer bureaucratic layers — one conversation can lead to a pilot.",
    "A successful library program creates visible social proof that makes the nearby school district pay attention.",
    "Emailing 2-3 contacts per library ensures we reach the right person even if titles vary.",
    "The 5-day + 7-day follow-up cadence is aggressive enough to stay top-of-mind but respectful enough not to burn the bridge.",
  ],
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

const futurePipelines = [
  { name: "School Districts", color: "#7C3AED", angle: 150 },
  { name: "After-School Programs", color: "#10B981", angle: 210 },
  { name: "Corporate Sponsors", color: "#F59E0B", angle: 330 },
];

/* ═══════════════════════════════════════════
   CANVAS HOOK — pan & zoom
   ═══════════════════════════════════════════ */
function useCanvas() {
  const [cam, setCam] = useState({ x: 0, y: 0, zoom: 1 });
  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      // pinch-zoom or ctrl+scroll
      const delta = -e.deltaY * 0.002;
      setCam((c) => ({
        ...c,
        zoom: Math.min(3, Math.max(0.15, c.zoom + delta * c.zoom)),
      }));
    } else {
      // pan
      setCam((c) => ({
        ...c,
        x: c.x - e.deltaX,
        y: c.y - e.deltaY,
      }));
    }
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // only pan on middle-click, or when holding space (we track space separately), or direct canvas click
    if (e.button === 1 || e.button === 0) {
      isPanning.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setCam((c) => ({ ...c, x: c.x + dx, y: c.y + dy }));
  }, []);

  const onPointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const zoomIn = useCallback(() => {
    setCam((c) => ({ ...c, zoom: Math.min(3, c.zoom * 1.3) }));
  }, []);

  const zoomOut = useCallback(() => {
    setCam((c) => ({ ...c, zoom: Math.max(0.15, c.zoom / 1.3) }));
  }, []);

  const resetView = useCallback(() => {
    setCam({ x: 0, y: 0, zoom: 1 });
  }, []);

  const fitView = useCallback(() => {
    setCam({ x: 0, y: 0, zoom: 0.6 });
  }, []);

  // prevent default wheel on the container to avoid page scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  return {
    cam,
    containerRef,
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    zoomIn,
    zoomOut,
    resetView,
    fitView,
  };
}

/* ═══════════════════════════════════════════
   STEP NODE COMPONENT
   ═══════════════════════════════════════════ */
function StepNode({
  step,
  index,
  total,
  color,
  visible,
}: {
  step: (typeof libraryPipeline.steps)[0];
  index: number;
  total: number;
  color: string;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isLast = index === total - 1;

  return (
    <div
      className="absolute flex items-center gap-4"
      style={{
        left: index * 280,
        top: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* node */}
      <div className="relative flex flex-col items-center" style={{ width: 220 }}>
        {/* circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-default"
          style={{
            borderColor: hovered ? color : `${color}50`,
            background: hovered ? `${color}20` : `${color}0A`,
            boxShadow: hovered ? `0 0 30px ${color}30` : "none",
          }}
        >
          <svg
            className="w-6 h-6 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={hovered ? color : `${color}90`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
          </svg>
          {/* step number badge */}
          <span
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border"
            style={{
              background: "#000",
              borderColor: `${color}60`,
              color: color,
            }}
          >
            {index + 1}
          </span>
        </div>

        {/* label + detail */}
        <h3 className="text-white font-semibold text-sm mt-3 text-center leading-tight">
          {step.label}
        </h3>
        <p className="text-white/35 text-xs mt-1.5 text-center leading-relaxed max-w-[200px]">
          {step.detail}
        </p>

        {/* timing badge */}
        {(index === 3 || index === 4) && (
          <span
            className="mt-2 text-[10px] tracking-wider px-2.5 py-0.5 rounded-full border"
            style={{
              color: `${color}90`,
              borderColor: `${color}30`,
              background: `${color}10`,
            }}
          >
            {index === 3 ? "+5 DAYS" : "+7 DAYS"}
          </span>
        )}

        {isLast && (
          <span className="mt-2 text-[10px] tracking-wider text-emerald-400/80 font-semibold uppercase">
            Goal
          </span>
        )}
      </div>

      {/* connector arrow to next */}
      {!isLast && (
        <svg
          className="absolute"
          style={{ left: 220, top: 32, width: 60, height: 2 }}
          viewBox="0 0 60 2"
        >
          <line
            x1="0"
            y1="1"
            x2="50"
            y2="1"
            stroke={`${color}40`}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
          </line>
          <polygon points="50,0 58,1 50,2" fill={`${color}60`} />
        </svg>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   REASONING PANEL
   ═══════════════════════════════════════════ */
function ReasoningPanel({
  open,
  onClose,
  pipeline,
}: {
  open: boolean;
  onClose: () => void;
  pipeline: typeof libraryPipeline;
}) {
  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />
      {/* panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="p-8">
          {/* header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: pipeline.color, boxShadow: `0 0 12px ${pipeline.color}` }}
              />
              <h2 className="text-white text-xl font-bold">Why This Pipeline?</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* pipeline name */}
          <div className="mb-8">
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Pipeline</span>
            <h3
              className="text-2xl font-bold mt-1"
              style={{ color: pipeline.color }}
            >
              {pipeline.name}
            </h3>
          </div>

          {/* reasoning bullets */}
          <div className="space-y-5">
            {pipeline.reasoning.map((r, i) => (
              <div
                key={i}
                className="flex gap-4 items-start"
                style={{
                  animation: open ? `fadeSlideIn 0.4s ease ${0.15 + i * 0.08}s both` : "none",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border"
                  style={{
                    borderColor: `${pipeline.color}40`,
                    background: `${pipeline.color}10`,
                  }}
                >
                  <span className="text-[11px] font-bold" style={{ color: pipeline.color }}>
                    {i + 1}
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>

          {/* steps recap */}
          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Flow</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {pipeline.steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-full border"
                    style={{
                      color: `${pipeline.color}CC`,
                      borderColor: `${pipeline.color}30`,
                      background: `${pipeline.color}08`,
                    }}
                  >
                    {s.label}
                  </span>
                  {i < pipeline.steps.length - 1 && (
                    <svg className="w-4 h-4 text-white/15" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function SystemsPage() {
  const {
    cam,
    containerRef,
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    zoomIn,
    zoomOut,
    resetView,
    fitView,
  } = useCanvas();

  const [mounted, setMounted] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [reasoningOpen, setReasoningOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 200);
    setTimeout(() => setStepsVisible(true), 800);
  }, []);

  const zoomPercent = Math.round(cam.zoom * 100);

  return (
    <>
      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.2), 0 0 60px rgba(6,182,212,0.05); }
          50%       { box-shadow: 0 0 40px rgba(6,182,212,0.35), 0 0 80px rgba(6,182,212,0.1); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dotTravel {
          0%   { offset-distance: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 bg-black overflow-hidden" style={{ top: 0 }}>
        {/* ── dot grid background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: `${24 * cam.zoom}px ${24 * cam.zoom}px`,
            backgroundPosition: `${cam.x}px ${cam.y}px`,
          }}
        />

        {/* ── CANVAS (pan & zoom area) ── */}
        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onWheel={onWheel}
          onPointerDown={(e) => {
            // don't pan if clicking a button or interactive element
            if ((e.target as HTMLElement).closest("button, [data-no-pan]")) return;
            onPointerDown(e);
          }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.zoom})`,
              transformOrigin: "0 0",
            }}
          >
            {/* ═══ NGL CORE NODE ═══ */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: -72,
                top: -72,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.5)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center relative"
                style={{ animation: "pulse-ring 4s ease-in-out infinite" }}
              >
                <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-3 rounded-full border border-cyan-400/10" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-violet-500/5" />
                <span className="text-white text-5xl font-extrabold tracking-wider select-none relative z-10">
                  NGL
                </span>
              </div>
              <span className="text-white/30 text-[11px] tracking-[0.3em] uppercase mt-3 select-none">
                Systems & Pipelines
              </span>
            </div>

            {/* ═══ LIBRARY PIPELINE BRANCH ═══ */}
            <div
              className="absolute"
              style={{
                left: 140,
                top: -10,
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.6s ease 0.4s",
              }}
            >
              {/* connector from NGL to pipeline */}
              <svg className="absolute" style={{ left: -140, top: 10, width: 160, height: 2 }}>
                <line
                  x1="0" y1="1" x2="150" y2="1"
                  stroke="rgba(6,182,212,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
                </line>
                <polygon points="150,0 158,1 150,2" fill="rgba(6,182,212,0.5)" />
              </svg>

              {/* pipeline header row */}
              <div className="flex items-center gap-3 mb-8 select-none">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: libraryPipeline.color,
                    boxShadow: `0 0 12px ${libraryPipeline.color}`,
                  }}
                />
                <h2 className="text-white text-xl font-bold tracking-tight whitespace-nowrap">
                  {libraryPipeline.name}
                </h2>
                <span className="text-cyan-400/40 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  Active
                </span>
                {/* reasoning button */}
                <button
                  data-no-pan
                  onClick={() => setReasoningOpen(true)}
                  className="ml-2 flex items-center gap-1.5 text-[11px] tracking-wider text-cyan-400/50 hover:text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40 px-3 py-1 rounded-full transition-all duration-300 hover:bg-cyan-500/10 cursor-pointer whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  Why this pipeline?
                </button>
              </div>

              {/* steps — horizontal flow */}
              <div className="relative" style={{ height: 180 }}>
                {libraryPipeline.steps.map((step, i) => (
                  <StepNode
                    key={step.id}
                    step={step}
                    index={i}
                    total={libraryPipeline.steps.length}
                    color={libraryPipeline.color}
                    visible={stepsVisible}
                  />
                ))}
              </div>
            </div>

            {/* ═══ FUTURE PIPELINE BRANCHES (dimmed) ═══ */}
            {futurePipelines.map((p, i) => {
              const angles = [-40, 40, -80];
              const distances = [220, 240, 200];
              const angle = (angles[i] * Math.PI) / 180;
              const dist = distances[i];
              const dx = Math.cos(angle) * dist;
              const dy = Math.sin(angle) * dist;

              // line end, slightly shorter
              const lineDist = dist - 50;
              const ldx = Math.cos(angle) * lineDist;
              const ldy = Math.sin(angle) * lineDist;

              return (
                <div
                  key={p.name}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transition: `opacity 0.6s ease ${1.5 + i * 0.2}s`,
                  }}
                >
                  {/* connector line */}
                  <svg
                    className="absolute overflow-visible"
                    style={{ left: 0, top: 0, width: 1, height: 1 }}
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2={ldx}
                      y2={ldy}
                      stroke={`${p.color}20`}
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                  </svg>

                  {/* branch label */}
                  <div
                    className="absolute flex items-center gap-3 group"
                    style={{ left: dx - 80, top: dy - 16 }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: p.color }}
                    />
                    <div>
                      <span className="text-white/30 text-sm font-medium group-hover:text-white/50 transition-colors whitespace-nowrap">
                        {p.name}
                      </span>
                      <span className="block text-white/15 text-[10px] tracking-[0.15em] uppercase">
                        coming soon
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ZOOM CONTROLS (fixed overlay) ── */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5">
          {/* zoom percentage */}
          <span className="text-white/25 text-[10px] tracking-wider font-mono mb-1 select-none">
            {zoomPercent}%
          </span>

          <button
            onClick={zoomIn}
            className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white/80 transition-all"
            title="Zoom in"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          <button
            onClick={zoomOut}
            className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white/80 transition-all"
            title="Zoom out"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>

          <div className="w-6 h-px bg-white/10 my-0.5" />

          <button
            onClick={resetView}
            className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white/80 transition-all"
            title="Reset view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          </button>

          <button
            onClick={fitView}
            className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white/80 transition-all"
            title="Fit view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            </svg>
          </button>
        </div>

        {/* ── MINIMAP (fixed overlay) ── */}
        <div className="fixed bottom-6 left-6 z-40 w-32 h-20 rounded-lg bg-white/[0.04] border border-white/[0.08] overflow-hidden select-none pointer-events-none">
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${cam.x * 0.04}px, ${cam.y * 0.04}px)`,
            }}
          >
            {/* NGL dot */}
            <div className="w-2 h-2 rounded-full bg-cyan-500/60 absolute -translate-x-1/2 -translate-y-1/2" />
            {/* pipeline line */}
            <div className="w-16 h-px bg-cyan-500/30 absolute top-0 left-1" />
          </div>
          {/* viewport indicator */}
          <div
            className="absolute border border-white/20 rounded-sm"
            style={{
              width: `${Math.min(100, 100 / cam.zoom)}%`,
              height: `${Math.min(100, 100 / cam.zoom)}%`,
              left: `${50 - cam.x * 0.04 - 50 / cam.zoom}%`,
              top: `${50 - cam.y * 0.04 - 50 / cam.zoom}%`,
            }}
          />
        </div>

        {/* ── HELP HINT ── */}
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 text-white/20 text-[11px] tracking-wider select-none transition-opacity duration-1000"
          style={{ opacity: mounted ? 1 : 0, transitionDelay: "2s" }}
        >
          Scroll to pan &middot; Pinch or Ctrl+Scroll to zoom
        </div>

        {/* ── REASONING PANEL ── */}
        <ReasoningPanel
          open={reasoningOpen}
          onClose={() => setReasoningOpen(false)}
          pipeline={libraryPipeline}
        />
      </div>
    </>
  );
}
