'use client';

import { useState, FC, ReactNode } from 'react';
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

// Accordion Item Component for FAQ
interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] py-5">
      <button
        className="w-full flex justify-between items-center text-left text-base font-semibold text-[#FAFAFA] cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDownIcon className={`w-5 h-5 text-white/35 group-hover:text-white transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4 text-white/65 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export default function LibrariesLandingPage() {
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
      {/* 1. Problem-Focused Hero Section */}
      <section className="text-center py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Students are already using AI.{' '}
            <span className="bg-gradient-to-r from-[#D4A843] to-[#E8C97A] bg-clip-text text-transparent">
              Is your library ready to guide them?
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/65 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            We help libraries turn AI from a &quot;shortcut for answers&quot; into a &quot;tool for thinking&quot; through hands-on, interactive workshops.
          </p>
          <Link href="#book-a-program">
            <button className="bg-[#D4A843] text-[#060606] px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
              Bring a Program to Your Library
            </button>
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">Our Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Different Means, Same End.</h2>
          <p className="text-base md:text-lg text-white/65 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Whether your child is interested in coding, digital art, music, or entrepreneurship, they will use their passion as a &quot;means&quot; to achieve the same &quot;end&quot;: AI Literacy and Critical Thinking. We achieve these ends through different means, where student education is tailored to their specific interests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-[rgba(212,168,67,0.15)] flex items-center justify-center mb-4 mx-auto">
                <LightBulbIcon className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h4 className="text-lg font-semibold">Prompt Engineering</h4>
            </div>
            <div className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-[rgba(212,168,67,0.15)] flex items-center justify-center mb-4 mx-auto">
                <ShieldCheckIcon className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h4 className="text-lg font-semibold">Output Verification</h4>
            </div>
            <div className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-[rgba(212,168,67,0.15)] flex items-center justify-center mb-4 mx-auto">
                <AcademicCapIcon className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h4 className="text-lg font-semibold">Ethical Reasoning</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The "Four Pillars" of Impact */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpenIcon, title: 'Guided Literacy', desc: 'Moving students from blind trust to critical questioning.', color: '#34D399', glow: 'rgba(52,211,153,0.12)' },
              { icon: BuildingLibraryIcon, title: 'Institutional Relevance', desc: 'Helping libraries stay at the forefront of digital literacy.', color: '#60A5FA', glow: 'rgba(96,165,250,0.1)' },
              { icon: SparklesIcon, title: 'Deep Engagement', desc: 'Interactive, project-based sessions designed to capture and hold teen interest.', color: '#A78BFA', glow: 'rgba(167,139,250,0.1)' },
              { icon: BoltIcon, title: 'Thinking First', desc: 'Ensuring AI enhances student creativity rather than replacing it.', color: '#FBBF24', glow: 'rgba(251,191,36,0.1)' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: item.glow }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the AI Thinkers & Builders Club Works */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3 text-center">The Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How the AI Thinkers & Builders Club Works</h2>

          {/* 4-Step Session Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
            {[
              { icon: ChatBubbleLeftRightIcon, num: '01', title: 'The Hook (15 mins)', desc: 'Live, interactive demos of current AI capabilities -- both the impressive and the flawed.', color: '#34D399', glow: 'rgba(52,211,153,0.12)' },
              { icon: AcademicCapIcon, num: '02', title: 'Socratic Discussion (20 mins)', desc: 'We ask the hard questions: Who made this? Is it biased? Why did it give that answer?', color: '#60A5FA', glow: 'rgba(96,165,250,0.1)' },
              { icon: WrenchScrewdriverIcon, num: '03', title: 'The Build (45 mins)', desc: 'Students use AI tools to solve a specific creative challenge related to their interests.', color: '#A78BFA', glow: 'rgba(167,139,250,0.1)' },
              { icon: PresentationChartBarIcon, num: '04', title: 'The Debrief (10 mins)', desc: 'Students present their work and reflect on where AI helped vs. where it got in the way.', color: '#FBBF24', glow: 'rgba(251,191,36,0.1)' },
            ].map((step) => (
              <div key={step.num} className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: step.glow }}>
                  <span className="text-sm font-bold" style={{ color: step.color }}>{step.num}</span>
                </div>
                <h4 className="text-sm font-bold mb-2">{step.title}</h4>
                <p className="text-white/65 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Librarian FAQ */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-8">
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

      {/* 3. Program Overview */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">For Busy Staff</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">A Turn-Key Solution for Busy Staff</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-left text-sm max-w-2xl mx-auto">
            {['No staff prep required', 'Flexible age ranges', 'One-time or multi-session series', 'Designed for mixed experience levels'].map((item) => (
              <li key={item} className="flex items-center text-white/65">
                <CheckIcon className="w-5 h-5 text-[#34D399] mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Social Proof Section */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">Social Proof</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Trusted by Local Institutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center mb-12">
            {['Danbury Library', 'Ridgefield Library'].map((name) => (
              <div key={name} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 text-center hover:border-white/10 hover:-translate-y-px transition-all duration-300">
                <span className="text-lg font-bold">{name}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 max-w-3xl mx-auto">
            <blockquote className="text-lg md:text-xl text-white/65 italic leading-relaxed">
              &quot;Next Generation Learners brought a level of engagement and clarity our patrons were looking for.&quot;
            </blockquote>
          </div>
        </div>
      </section>

      {/* 6. The "Book a Program" Lead Form */}
      <section id="book-a-program" className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3 text-center">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Book a Program</h2>
          {formSubmitted ? (
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Thank you!</h3>
              <p className="text-white/65 text-base">We have received your request and will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12 space-y-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-white/65 mb-2">Contact Name</label>
                <input type="text" name="contactName" id="contactName" required value={form.contactName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="libraryName" className="block text-sm font-medium text-white/65 mb-2">Library Name</label>
                <input type="text" name="libraryName" id="libraryName" required value={form.libraryName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="preferredDates" className="block text-sm font-medium text-white/65 mb-2">Preferred Dates (Optional)</label>
                <input type="text" name="preferredDates" id="preferredDates" value={form.preferredDates} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="studentCount" className="block text-sm font-medium text-white/65 mb-2">Estimated Student Count</label>
                <input type="number" name="studentCount" id="studentCount" required value={form.studentCount} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="w-full bg-[#D4A843] text-[#060606] px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
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
