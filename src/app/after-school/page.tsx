'use client';

import { useState } from 'react';
import Link from 'next/link';

// Placeholder for school/organization logos
const AcceleratorLogo = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md border border-slate-200 h-24">
    <span className="text-lg font-bold text-slate-700">{name}</span>
  </div>
);

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
    <div className="bg-slate-50 text-[#0F172A]">
      {/* 1. Outcome-Driven Hero Section */}
      <section className="text-center py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6">
            Give Your Child a Competitive Edge in the AI Era.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Our 6–12 week accelerators turn passive screen time into active creation. We teach students to master AI as a tool for thinking, building, and leading.
          </p>
          <Link href="#interest-form">
            <button className="bg-[#0F172A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join the Interest List
            </button>
          </Link>
        </div>
      </section>

      {/* 2. The "Accelerator" Format */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Frequency</h3>
              <p className="text-slate-600">Once per week sessions designed to fit into busy student schedules.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Duration</h3>
              <p className="text-slate-600">6–12 week customized programs tailored to specific age groups and skill levels.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Investment</h3>
              <p className="text-slate-600">Starting at just $25 per student/session—an investment in future-proof skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The "Different Means, Same End" Curriculum */}
      <section className="py-20 md:py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center p-8 md:p-12 border-2 border-slate-200 rounded-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Different Means, Same End.</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
           Whether your child is interested in coding, digital art, music, or entrepreneurship, they will use their passion as a &quot;means&quot; to achieve the same &quot;end&quot;: AI Literacy and Critical Thinking. We achieve these ends through different means, where student education is tailored to their specific interests—whether that is coding, music production, or digital storytelling.
          </p>
        </div>
      </section>

       {/* Trusted Organizations */}
       <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-12">Trusted by Leading Schools & Libraries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            <AcceleratorLogo name="Babson College" />
            <AcceleratorLogo name="Danbury Library" />
            <AcceleratorLogo name="Ridgefield Library" />
            <AcceleratorLogo name="Wooster School" />
            <AcceleratorLogo name="Woodstock Public Schools" />
            <AcceleratorLogo name="Danbury High School" />
          </div>
        </div>
      </section>

      {/* 4. Why Parents Trust Us */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">Why Parents Trust Us</h2>
          <div className="max-w-3xl mx-auto bg-slate-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Our &quot;Anti-Shortcut&quot; Philosophy</h3>
            <p className="text-slate-700 text-lg">
              We teach students how AI works, not just how to get it to do their homework. Our focus is on building lasting critical thinking skills that prepare them for a world we can&apos;t yet predict.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Parent Interest Form */}
      <section id="interest-form" className="py-20 md:py-24 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0F172A]">Join the Interest List</h2>
          {formSubmitted ? (
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200 text-center">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Thank you!</h3>
              <p className="text-slate-600 text-lg">We have received your request and will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200 space-y-6">
              <div>
                <label htmlFor="parentName" className="block text-lg font-medium text-slate-700 mb-2">Parent Name</label>
                <input type="text" name="parentName" id="parentName" required value={form.parentName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="studentGrade" className="block text-lg font-medium text-slate-700 mb-2">Student Grade Level</label>
                <input type="text" name="studentGrade" id="studentGrade" required value={form.studentGrade} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="primaryInterest" className="block text-lg font-medium text-slate-700 mb-2">Primary Interest</label>
                 <select name="primaryInterest" id="primaryInterest" required value={form.primaryInterest} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50 bg-white">
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
                <label htmlFor="schoolName" className="block text-lg font-medium text-slate-700 mb-2">School Name</label>
                <input type="text" name="schoolName" id="schoolName" required value={form.schoolName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="w-full bg-[#0F172A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
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
