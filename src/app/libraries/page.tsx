'use client';

import { useState, FC, ReactNode } from 'react';
import Link from 'next/link';

// A simple placeholder for a logo
const LibraryLogo = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center p-6 bg-slate-100 rounded-lg h-24">
    <span className="text-xl font-bold text-slate-600">{name}</span>
  </div>
);

// Accordion Item Component for FAQ
interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-[#0F172A]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          &#x25BC; {/* Downward arrow */}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-slate-600">
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
    <div className="bg-white text-[#0F172A]">
      {/* 1. Problem-Focused Hero Section */}
      <section className="text-center py-20 md:py-32 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Students are already using AI. Is your library ready to guide them?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            We help libraries turn AI from a &quot;shortcut for answers&quot; into a &quot;tool for thinking&quot; through hands-on, interactive workshops.
          </p>
          <Link href="#book-a-program">
            <button className="bg-[#0F172A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Bring a Program to Your Library
            </button>
          </Link>
        </div>
      </section>

      {/* NEW: Philosophy Section */}
      <section className="py-20 md:py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Different Means, Same End.</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12">
           Whether your child is interested in coding, digital art, music, or entrepreneurship, they will use their passion as a &quot;means&quot; to achieve the same &quot;end&quot;: AI Literacy and Critical Thinking. We achieve these ends through different means, where student education is tailored to their specific interests—whether that is coding, music production, or digital storytelling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Prompt Engineering</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Output Verification</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Ethical Reasoning</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The "Four Pillars" of Impact */}
      <section className="py-20 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center p-6"><h3 className="text-xl font-bold mb-3">Guided Literacy</h3><p className="text-slate-600">Moving students from blind trust to critical questioning.</p></div>
            <div className="text-center p-6"><h3 className="text-xl font-bold mb-3">Institutional Relevance</h3><p className="text-slate-600">Helping libraries stay at the forefront of digital literacy.</p></div>
            <div className="text-center p-6"><h3 className="text-xl font-bold mb-3">Deep Engagement</h3><p className="text-slate-600">Interactive, project-based sessions designed to capture and hold teen interest.</p></div>
            <div className="text-center p-6"><h3 className="text-xl font-bold mb-3">Thinking First</h3><p className="text-slate-600">Ensuring AI enhances student creativity rather than replacing it.</p></div>
          </div>
        </div>
      </section>

      {/* How the AI Thinkers & Builders Club Works */}
      <section className="py-20 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#0F172A]">How the AI Thinkers & Builders Club Works</h2>
          
          {/* 4-Step Session Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-20">
            {/* Step 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-lg font-bold text-[#0F172A] mb-2">Step 1: The Hook (15 mins)</h4>
              <p className="text-slate-600">Live, interactive demos of current AI capabilities—both the impressive and the flawed.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-lg font-bold text-[#0F172A] mb-2">Step 2: Guided Socratic Discussion (20 mins)</h4>
              <p className="text-slate-600">We ask the hard questions: Who made this? Is it biased? Why did it give that answer?</p>
            </div>
            {/* Step 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-lg font-bold text-[#0F172A] mb-2">Step 3: The Build (45 mins)</h4>
              <p className="text-slate-600">Students use AI tools to solve a specific creative challenge related to their interests (music, art, coding, or writing).</p>
            </div>
            {/* Step 4 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200">
              <h4 className="text-lg font-bold text-[#0F172A] mb-2">Step 4: The Debrief (10 mins)</h4>
              <p className="text-slate-600">Students present their &quot;AI-collaborated&quot; work and reflect on where the AI helped vs. where it got in the way.</p>
            </div>
          </div>

          {/* Librarian FAQ */}
          <div className="max-w-3xl mx-auto">
             <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#0F172A]">Frequently Asked Questions</h3>
            <AccordionItem title="What equipment do we need?">
              <p>We bring everything needed, or can utilize your library&apos;s existing computer lab/chromebooks.</p>
            </AccordionItem>
            <AccordionItem title="Is this safe for younger teens?">
              <p>Yes. We use &quot;walled-garden&quot; or age-appropriate AI interfaces and focus heavily on digital safety and data privacy.</p>
            </AccordionItem>
            <AccordionItem title="How many students can join?">
              <p>We typically recommend 10–20 students per session to ensure every student gets direct mentorship.</p>
            </AccordionItem>
            <AccordionItem title="Is this just about ChatGPT?">
              <p>No. We explore image generation, AI-assisted music production, and critical thinking tools to show the full breadth of the technology.</p>
            </AccordionItem>
            <AccordionItem title="How do you handle students with vastly different interests?">
                <p>Through our &apos;Different Means, Same End&apos; approach. We don&apos;t force a one-size-fits-all project. Instead, we provide a framework that allows students to apply AI to their specific hobbies—like sports, gaming, or art—while still mastering the same fundamental AI literacy skills.</p>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* 3. Program Overview */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">A Turn-Key Solution for Busy Staff</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left text-lg text-slate-600 max-w-2xl mx-auto">
            <li className="flex items-center"><span className="text-[#4FD1C5] mr-3 font-bold">&#10003;</span> No staff prep required</li>
            <li className="flex items-center"><span className="text-[#4FD1C5] mr-3 font-bold">&#10003;</span> Flexible age ranges</li>
            <li className="flex items-center"><span className="text-[#4FD1C5] mr-3 font-bold">&#10003;</span> One-time or multi-session series</li>
            <li className="flex items-center"><span className="text-[#4FD1C5] mr-3 font-bold">&#10003;</span> Designed for mixed experience levels</li>
          </ul>
        </div>
      </section>

      {/* 4. Social Proof Section */}
      <section className="py-20 md:py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Trusted by Local Institutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <LibraryLogo name="Danbury Library" />
            <LibraryLogo name="Ridgefield Library" />
          </div>
          <blockquote className="text-xl md:text-2xl text-slate-600 italic max-w-3xl mx-auto">
            &quot;Next Generation Learners brought a level of engagement and clarity our patrons were looking for.&quot;
          </blockquote>
        </div>
      </section>

      {/* 6. The "Book a Program" Lead Form */}
      <section id="book-a-program" className="py-20 md:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Book a Program</h2>
          {formSubmitted ? (
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200 text-center">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Thank you!</h3>
              <p className="text-slate-600 text-lg">We have received your request and will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200 space-y-6">
              <div>
                <label htmlFor="contactName" className="block text-lg font-medium text-slate-700 mb-2">Contact Name</label>
                <input type="text" name="contactName" id="contactName" required value={form.contactName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="libraryName" className="block text-lg font-medium text-slate-700 mb-2">Library Name</label>
                <input type="text" name="libraryName" id="libraryName" required value={form.libraryName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="preferredDates" className="block text-lg font-medium text-slate-700 mb-2">Preferred Dates (Optional)</label>
                <input type="text" name="preferredDates" id="preferredDates" value={form.preferredDates} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="studentCount" className="block text-lg font-medium text-slate-700 mb-2">Estimated Student Count</label>
                <input type="number" name="studentCount" id="studentCount" required value={form.studentCount} onChange={handleChange} className="mt-1 block w-full px-4 py-3 rounded-md border-slate-300 shadow-sm focus:border-[#4FD1C5] focus:ring focus:ring-[#4FD1C5] focus:ring-opacity-50" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="w-full bg-[#0F172A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
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
