'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  CheckIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function AfterSchoolLandingPage() {
  const [form, setForm] = useState({
    parentName: '',
    studentGrade: '',
    primaryInterest: '',
    schoolName: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setForm({ parentName: '', studentGrade: '', primaryInterest: '', schoolName: '' });
  };

  return (
    <div>
      {/* 1. Outcome-Driven Hero Section */}
      <section className="text-center py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Give Your Child a{' '}
            <span className="bg-gradient-to-r from-[#D4A843] to-[#E8C97A] bg-clip-text text-transparent">
              Competitive Edge
            </span>{' '}
            in the AI Era.
          </h1>
          <p className="text-base md:text-lg text-white/65 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Our 6-12 week accelerators turn passive screen time into active creation. We teach students to master AI as a tool for thinking, building, and leading.
          </p>
          <Link href="#interest-form">
            <button className="bg-[#D4A843] text-[#060606] px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
              Join the Interest List
            </button>
          </Link>
        </div>
      </section>

      {/* 2. The "Accelerator" Format */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: ClockIcon, title: 'Frequency', desc: 'Once per week sessions designed to fit into busy student schedules.', color: '#34D399', glow: 'rgba(52,211,153,0.12)' },
              { icon: CalendarDaysIcon, title: 'Duration', desc: '6-12 week customized programs tailored to specific age groups and skill levels.', color: '#60A5FA', glow: 'rgba(96,165,250,0.1)' },
              { icon: CurrencyDollarIcon, title: 'Investment', desc: 'Starting at just $25 per student/session -- an investment in future-proof skills.', color: '#D4A843', glow: 'rgba(212,168,67,0.15)' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl text-center hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: item.glow }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The "Different Means, Same End" Curriculum */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Different Means, Same End.</h2>
            <p className="text-base md:text-lg text-white/65 max-w-3xl mx-auto leading-relaxed font-light">
              Whether your child is interested in coding, digital art, music, or entrepreneurship, they will use their passion as a &quot;means&quot; to achieve the same &quot;end&quot;: AI Literacy and Critical Thinking. We achieve these ends through different means, where student education is tailored to their specific interests.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted Organizations */}
      <section className="py-16 md:py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center px-4">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">Credibility</p>
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Schools & Libraries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Babson College', 'Danbury Library', 'Ridgefield Library', 'Wooster School', 'Woodstock Public Schools', 'Danbury High School'].map((name) => (
              <div key={name} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 text-center hover:border-white/10 hover:-translate-y-px transition-all duration-300 cursor-default">
                <span className="text-xs font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Parents Trust Us */}
      <section className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">Trust</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Parents Trust Us</h2>
          <div className="max-w-3xl mx-auto bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 hover:border-white/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[rgba(212,168,67,0.15)] flex items-center justify-center mb-5 mx-auto">
              <ShieldCheckIcon className="w-5 h-5 text-[#D4A843]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our &quot;Anti-Shortcut&quot; Philosophy</h3>
            <p className="text-white/65 text-base leading-relaxed">
              We teach students how AI works, not just how to get it to do their homework. Our focus is on building lasting critical thinking skills that prepare them for a world we can&apos;t yet predict.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Parent Interest Form */}
      <section id="interest-form" className="py-20 md:py-24 px-4 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3 text-center">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Join the Interest List</h2>
          {formSubmitted ? (
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Thank you!</h3>
              <p className="text-white/65 text-base">We have received your request and will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12 space-y-6">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-white/65 mb-2">Parent Name</label>
                <input type="text" name="parentName" id="parentName" required value={form.parentName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="studentGrade" className="block text-sm font-medium text-white/65 mb-2">Student Grade Level</label>
                <input type="text" name="studentGrade" id="studentGrade" required value={form.studentGrade} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="primaryInterest" className="block text-sm font-medium text-white/65 mb-2">Primary Interest</label>
                <select name="primaryInterest" id="primaryInterest" required value={form.primaryInterest} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm cursor-pointer [&>option]:bg-[#060606] [&>option]:text-white">
                  <option value="">Select an interest</option>
                  <option value="Art">Art</option>
                  <option value="Tech">Tech / Coding</option>
                  <option value="Writing">Writing</option>
                  <option value="Music">Music</option>
                  <option value="Entrepreneurship">Entrepreneurship</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="schoolName" className="block text-sm font-medium text-white/65 mb-2">School Name</label>
                <input type="text" name="schoolName" id="schoolName" required value={form.schoolName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="w-full bg-[#D4A843] text-[#060606] px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
                  Stay Updated on Upcoming Sessions
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
