'use client';

import { useState, useEffect, FC, ReactNode } from 'react';
import Link from 'next/link';
import {
  ChevronDownIcon,
  CheckIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  PresentationChartBarIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-indigo-100 py-5">
      <button
        className="w-full flex justify-between items-center text-left text-base font-semibold text-[#1E1B4B] cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDownIcon className={`w-5 h-5 text-[#4F46E5] group-hover:text-[#7C3AED] transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4 text-[#64748B] text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export default function LibrariesLandingPage() {
  useScrollReveal();

  const [form, setForm] = useState({
    contactName: '',
    libraryName: '',
    preferredDates: '',
    studentCount: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setForm({ contactName: '', libraryName: '', preferredDates: '', studentCount: '' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-center py-24 md:py-32 px-4">
        <div className="orb orb-1 w-[350px] h-[350px] bg-[#4F46E5] top-[-80px] left-[-80px]" />
        <div className="orb orb-2 w-[280px] h-[280px] bg-[#7C3AED] bottom-[-60px] right-[-60px]" />
        <div className="orb orb-3 w-[200px] h-[200px] bg-[#06B6D4] top-[40%] right-[10%]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.16em] px-5 py-2 rounded-full mb-8 border border-white/20">
            <BuildingLibraryIcon className="w-4 h-4" />
            Library Programs
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white">
            Students are already using AI.{' '}
            <span className="text-white/90">
              Is your library ready to guide them?
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            We help libraries turn AI from a &quot;shortcut for answers&quot; into a &quot;tool for thinking&quot; through hands-on, interactive workshops.
          </p>
          <Link href="#book-a-program">
            <button className="btn-shimmer bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:bg-[#059669] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:-translate-y-px transition-all duration-200">
              Bring a Program to Your Library
            </button>
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-28 px-4 bg-[#FAFBFF]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3">Our Philosophy</p>
          <h2 className="fade-up text-3xl md:text-4xl font-extrabold mb-6 text-[#1E1B4B]">Different Means, Same End.</h2>
          <p className="fade-up text-base md:text-lg text-[#64748B] max-w-3xl mx-auto mb-14 leading-relaxed">
            Whether your child is interested in coding, digital art, music, or entrepreneurship, they will use their passion as a &quot;means&quot; to achieve the same &quot;end&quot;: AI Literacy and Critical Thinking. We achieve these ends through different means, where student education is tailored to their specific interests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="fade-up fade-up-delay-1 card-hover card-hover-indigo bg-white rounded-2xl p-7 border border-indigo-100 border-l-4 border-l-[#4F46E5]">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 mx-auto">
                <LightBulbIcon className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <h4 className="text-lg font-bold text-[#1E1B4B]">Prompt Engineering</h4>
            </div>
            <div className="fade-up fade-up-delay-2 card-hover card-hover-violet bg-white rounded-2xl p-7 border border-violet-100 border-l-4 border-l-[#7C3AED]">
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 mx-auto">
                <ShieldCheckIcon className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h4 className="text-lg font-bold text-[#1E1B4B]">Output Verification</h4>
            </div>
            <div className="fade-up fade-up-delay-3 card-hover card-hover-emerald bg-white rounded-2xl p-7 border border-emerald-100 border-l-4 border-l-[#10B981]">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 mx-auto">
                <AcademicCapIcon className="w-6 h-6 text-[#10B981]" />
              </div>
              <h4 className="text-lg font-bold text-[#1E1B4B]">Ethical Reasoning</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BookOpenIcon, title: 'Guided Literacy', desc: 'Moving students from blind trust to critical questioning.', color: '#4F46E5', bg: 'bg-indigo-50', hoverClass: 'card-hover-indigo' },
              { icon: BuildingLibraryIcon, title: 'Institutional Relevance', desc: 'Helping libraries stay at the forefront of digital literacy.', color: '#7C3AED', bg: 'bg-violet-50', hoverClass: 'card-hover-violet' },
              { icon: SparklesIcon, title: 'Deep Engagement', desc: 'Interactive, project-based sessions designed to capture and hold teen interest.', color: '#06B6D4', bg: 'bg-cyan-50', hoverClass: 'card-hover-cyan' },
              { icon: BoltIcon, title: 'Thinking First', desc: 'Ensuring AI enhances student creativity rather than replacing it.', color: '#F59E0B', bg: 'bg-amber-50', hoverClass: 'card-hover-amber' },
            ].map((item, i) => (
              <div key={item.title} className={`fade-up fade-up-delay-${Math.min(i + 1, 4)} card-hover ${item.hoverClass} text-center p-7 bg-[#FAFBFF] rounded-2xl border border-slate-100`}>
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 mx-auto`}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-bold mb-2 text-[#1E1B4B]">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 md:py-28 px-4 bg-[#FAFBFF]">
        <div className="max-w-7xl mx-auto">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3 text-center">The Process</p>
          <h2 className="fade-up text-3xl md:text-4xl font-extrabold text-center mb-16 text-[#1E1B4B]">How the AI Thinkers & Builders Club Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-20">
            {[
              { icon: ChatBubbleLeftRightIcon, num: '01', title: 'The Hook (15 mins)', desc: 'Live, interactive demos of current AI capabilities -- both the impressive and the flawed.', color: '#10B981', bg: 'bg-emerald-50' },
              { icon: AcademicCapIcon, num: '02', title: 'Socratic Discussion (20 mins)', desc: 'We ask the hard questions: Who made this? Is it biased? Why did it give that answer?', color: '#4F46E5', bg: 'bg-indigo-50' },
              { icon: WrenchScrewdriverIcon, num: '03', title: 'The Build (45 mins)', desc: 'Students use AI tools to solve a specific creative challenge related to their interests.', color: '#7C3AED', bg: 'bg-violet-50' },
              { icon: PresentationChartBarIcon, num: '04', title: 'The Debrief (10 mins)', desc: 'Students present their work and reflect on where AI helped vs. where it got in the way.', color: '#F59E0B', bg: 'bg-amber-50' },
            ].map((step, i) => (
              <div key={step.num} className={`fade-up fade-up-delay-${Math.min(i + 1, 4)} card-hover bg-white rounded-2xl p-7 border border-slate-100`}>
                <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center mb-4`}>
                  <span className="text-sm font-extrabold" style={{ color: step.color }}>{step.num}</span>
                </div>
                <h4 className="text-sm font-bold mb-2 text-[#1E1B4B]">{step.title}</h4>
                <p className="text-[#64748B] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h3 className="fade-up text-2xl md:text-3xl font-extrabold text-center mb-10 text-[#1E1B4B]">Frequently Asked Questions</h3>
            <div className="fade-up bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <AccordionItem title="What equipment do we need?">
                <p>We bring everything needed, or can utilize your library&apos;s existing computer lab/chromebooks.</p>
              </AccordionItem>
              <AccordionItem title="Is this safe for younger teens?">
                <p>Yes. We use &quot;walled-garden&quot; or age-appropriate AI interfaces and focus heavily on digital safety and data privacy.</p>
              </AccordionItem>
              <AccordionItem title="How many students can join?">
                <p>We typically recommend 10-20 students per session to ensure every student gets direct mentorship.</p>
              </AccordionItem>
              <AccordionItem title="Is this just about ChatGPT?">
                <p>No. We explore image generation, AI-assisted music production, and critical thinking tools to show the full breadth of the technology.</p>
              </AccordionItem>
              <AccordionItem title="How do you handle students with vastly different interests?">
                <p>Through our &apos;Different Means, Same End&apos; approach. We don&apos;t force a one-size-fits-all project. Instead, we provide a framework that allows students to apply AI to their specific hobbies -- like sports, gaming, or art -- while still mastering the same fundamental AI literacy skills.</p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      {/* Turn-Key Solution */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3">For Busy Staff</p>
          <h2 className="fade-up text-3xl md:text-4xl font-extrabold mb-12 text-[#1E1B4B]">A Turn-Key Solution for Busy Staff</h2>
          <ul className="fade-up grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-left text-sm max-w-2xl mx-auto">
            {['No staff prep required', 'Flexible age ranges', 'One-time or multi-session series', 'Designed for mixed experience levels'].map((item) => (
              <li key={item} className="flex items-center text-[#1E1B4B] font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckIcon className="w-4 h-4 text-[#10B981]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-28 px-4 bg-[#FAFBFF]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3">Social Proof</p>
          <h2 className="fade-up text-3xl md:text-4xl font-extrabold mb-12 text-[#1E1B4B]">Trusted by Local Institutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-12">
            {['Danbury Library', 'Ridgefield Library'].map((name, i) => (
              <div key={name} className={`fade-up fade-up-delay-${i + 1} card-hover bg-white rounded-2xl p-7 text-center border border-slate-100`}>
                <span className="text-lg font-bold text-[#1E1B4B]">{name}</span>
                <span className="block mt-2 text-xs font-medium text-[#4F46E5] bg-indigo-50 rounded-full px-3 py-1 mx-auto inline-block">Library Partner</span>
              </div>
            ))}
          </div>
          <div className="fade-up bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto border border-indigo-100">
            <blockquote className="text-lg md:text-xl text-[#1E1B4B] italic leading-relaxed font-medium">
              &quot;Next Generation Learners brought a level of engagement and clarity our patrons were looking for.&quot;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Book a Program Form */}
      <section id="book-a-program" className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]" />
        <div className="orb orb-1 w-[200px] h-[200px] bg-white/10 top-[-50px] left-[-50px]" />
        <div className="orb orb-2 w-[150px] h-[150px] bg-white/10 bottom-[-30px] right-[-30px]" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60 mb-3 text-center">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white">Book a Program</h2>
          {formSubmitted ? (
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckIcon className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1E1B4B]">Thank you!</h3>
              <p className="text-[#64748B] text-base">We have received your request and will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 space-y-6 shadow-xl">
              <div>
                <label htmlFor="contactName" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Contact Name</label>
                <input type="text" name="contactName" id="contactName" required value={form.contactName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="libraryName" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Library Name</label>
                <input type="text" name="libraryName" id="libraryName" required value={form.libraryName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="preferredDates" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Preferred Dates (Optional)</label>
                <input type="text" name="preferredDates" id="preferredDates" value={form.preferredDates} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="studentCount" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Estimated Student Count</label>
                <input type="number" name="studentCount" id="studentCount" required value={form.studentCount} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all duration-200 text-sm" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="w-full btn-shimmer bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:bg-[#059669] hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:-translate-y-px transition-all duration-200">
                  Submit Booking Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
