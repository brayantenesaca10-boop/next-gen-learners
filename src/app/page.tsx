'use client'; // Required for the onClick alert

import Link from 'next/link';

export default function Home() {

  const handleSubscribeClick = () => {
    alert('Thank you for subscribing!');
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="text-slate-900 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-[#0F172A] mb-6">
            Teaching Students to Think With AI, Not Just Use It.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Hands-on AI literacy programs that connect technology to students&rsquo; real interests. We build tools for thinking, not shortcuts for answers.
          </p>
          <Link href="#programs">
            <button className="bg-[#0F172A] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all">
              View Our Programs
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


      {/* Program Selection Section */}
      <section id="programs" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0F172A]">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Card A: Library Programs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-slate-200 flex flex-col justify-between">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-[#0F172A]">Library Programs</h3>
                <p className="text-slate-600 mb-6">Hands-on workshops like the &apos;AI Thinkers &amp; Builders Club&apos; for public libraries.</p>
              </div>
              <div className="p-8 pt-0">
                <Link href="/libraries">
                  <button className="w-full bg-[#0F172A] text-white py-3 rounded-md font-bold hover:bg-slate-800 transition-all">For Librarians</button>
                </Link>
              </div>
            </div>

            {/* Card B: After School */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-slate-200 flex flex-col justify-between">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-[#0F172A]">After School Accelerators</h3>
                <p className="text-slate-600 mb-6">Structured multi-week programs for schools and parent-enrolled students.</p>
              </div>
              <div className="p-8 pt-0">
                <Link href="/after-school">
                 <button className="w-full bg-[#0F172A] text-white py-3 rounded-md font-bold hover:bg-slate-800 transition-all">For Parents</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Organizations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-4">Trusted Organizations</h2>
          <p className="text-center text-slate-600 mb-16">Empowering students through partnerships with leading schools and libraries.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 items-center justify-items-center">
            <div className="text-center font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Babson College</div>
            <div className="text-center font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Danbury Library</div>
            <div className="text-center font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Ridgefield Library</div>
            <div className="text-center font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Wooster School</div>
            <div className="text-center font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Woodstock Public Schools</div>
            <div className="text-center font-semibold text-slate-500 hover:text-[#0F172A] transition-colors">Danbury High School</div>
          </div>
        </div>
      </section>

      {/* Blog / Newsletter Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Join the AI Literacy Journey</h2>
          <p className="text-slate-600 mb-8">Get weekly AI thinking prompts and program updates delivered to your inbox.</p>
          <div className="flex flex-col md:flex-.row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-[#4FD1C5] focus:outline-none" />
            <button onClick={handleSubscribeClick} className="bg-[#0F172A] text-white px-6 py-3 rounded-md font-bold hover:bg-slate-800 transition-all">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}
