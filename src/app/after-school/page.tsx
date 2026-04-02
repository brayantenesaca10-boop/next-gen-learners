'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  CheckIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
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

export default function AfterSchoolLandingPage() {
  useScrollReveal();

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
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-center py-24 md:py-32 px-4">
        <div className="orb orb-1 w-[350px] h-[350px] bg-[#7C3AED] top-[-80px] right-[-80px]" />
        <div className="orb orb-2 w-[280px] h-[280px] bg-[#06B6D4] bottom-[-60px] left-[-60px]" />
        <div className="orb orb-3 w-[200px] h-[200px] bg-[#10B981] top-[30%] left-[10%]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.16em] px-5 py-2 rounded-full mb-8 border border-white/20">
            <RocketLaunchIcon className="w-4 h-4" />
            After School Programs
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white">
            Give Your Child a{' '}
            <span className="text-white/90">
              Competitive Edge
            </span>{' '}
            in the AI Era.
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Our 6-12 week accelerators turn passive screen time into active creation. We teach students to master AI as a tool for thinking, building, and leading.
          </p>
          <Link href="#interest-form">
            <button className="btn-shimmer bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:bg-[#059669] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:-translate-y-px transition-all duration-200">
              Join the Interest List
            </button>
          </Link>
        </div>
      </section>

      {/* Accelerator Format */}
      <section className="py-20 md:py-28 px-4 bg-[#FAFBFF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: ClockIcon, title: 'Frequency', desc: 'Once per week sessions designed to fit into busy student schedules.', color: '#10B981', bg: 'bg-emerald-50', hoverClass: 'card-hover-emerald', borderColor: 'border-t-[#10B981]' },
              { icon: CalendarDaysIcon, title: 'Duration', desc: '6-12 week customized programs tailored to specific age groups and skill levels.', color: '#4F46E5', bg: 'bg-indigo-50', hoverClass: 'card-hover-indigo', borderColor: 'border-t-[#4F46E5]' },
              { icon: CurrencyDollarIcon, title: 'Investment', desc: 'Starting at just $25 per student/session -- an investment in future-proof skills.', color: '#F59E0B', bg: 'bg-amber-50', hoverClass: 'card-hover-amber', borderColor: 'border-t-[#F59E0B]' },
            ].map((item, i) => (
              <div key={item.title} className={`fade-up fade-up-delay-${Math.min(i + 1, 3)} card-hover ${item.hoverClass} p-7 bg-white rounded-2xl border border-slate-100 border-t-4 ${item.borderColor} text-center`}>
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5 mx-auto`}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-[#1E1B4B]">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-up bg-gradient-to-br from-indigo-50 via-violet-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3">Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#1E1B4B]">Different Means, Same End.</h2>
            <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto leading-relaxed">
              Whether your child is interested in coding, digital art, music, or entrepreneurship, they will use their passion as a &quot;means&quot; to achieve the same &quot;end&quot;: AI Literacy and Critical Thinking. We achieve these ends through different means, where student education is tailored to their specific interests.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted Organizations */}
      <section className="py-16 md:py-24 bg-[#FAFBFF]">
        <div className="max-w-5xl mx-auto text-center px-4">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3">Credibility</p>
          <h2 className="fade-up text-3xl font-extrabold text-center mb-12 text-[#1E1B4B]">Trusted by Leading Schools & Libraries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Babson College', 'Danbury Library', 'Ridgefield Library', 'Wooster School', 'Woodstock Public Schools', 'Danbury High School'].map((name, i) => (
              <div key={name} className={`fade-up fade-up-delay-${Math.min(i + 1, 5)} card-hover bg-white rounded-2xl p-4 text-center border border-slate-100 cursor-default`}>
                <span className="text-xs font-bold text-[#1E1B4B]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Trust Us */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5] mb-3">Trust</p>
          <h2 className="fade-up text-3xl md:text-4xl font-extrabold mb-12 text-[#1E1B4B]">Why Parents Trust Us</h2>
          <div className="fade-up max-w-3xl mx-auto card-hover card-hover-indigo bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 md:p-10 border border-indigo-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center mb-5 mx-auto">
              <ShieldCheckIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#1E1B4B]">Our &quot;Anti-Shortcut&quot; Philosophy</h3>
            <p className="text-[#64748B] text-base leading-relaxed">
              We teach students how AI works, not just how to get it to do their homework. Our focus is on building lasting critical thinking skills that prepare them for a world we can&apos;t yet predict.
            </p>
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section id="interest-form" className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#06B6D4]" />
        <div className="orb orb-1 w-[200px] h-[200px] bg-white/10 top-[-50px] right-[-50px]" />
        <div className="orb orb-2 w-[150px] h-[150px] bg-white/10 bottom-[-30px] left-[-30px]" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60 mb-3 text-center">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white">Join the Interest List</h2>
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
                <label htmlFor="parentName" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Parent Name</label>
                <input type="text" name="parentName" id="parentName" required value={form.parentName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="studentGrade" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Student Grade Level</label>
                <input type="text" name="studentGrade" id="studentGrade" required value={form.studentGrade} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200 text-sm" />
              </div>
              <div>
                <label htmlFor="primaryInterest" className="block text-sm font-semibold text-[#1E1B4B] mb-2">Primary Interest</label>
                <select name="primaryInterest" id="primaryInterest" required value={form.primaryInterest} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200 text-sm cursor-pointer [&>option]:bg-white [&>option]:text-[#1E1B4B]">
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
                <label htmlFor="schoolName" className="block text-sm font-semibold text-[#1E1B4B] mb-2">School Name</label>
                <input type="text" name="schoolName" id="schoolName" required value={form.schoolName} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl bg-[#FAFBFF] border border-slate-200 text-[#1E1B4B] placeholder-[#64748B] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200 text-sm" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="w-full btn-shimmer bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:bg-[#059669] hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:-translate-y-px transition-all duration-200">
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
