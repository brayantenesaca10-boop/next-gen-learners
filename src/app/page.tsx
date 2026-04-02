import Link from 'next/link';
import {
  AcademicCapIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  BookOpenIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Teaching Students to{' '}
            <span className="bg-gradient-to-r from-[#D4A843] to-[#E8C97A] bg-clip-text text-transparent">
              Think With AI
            </span>
            , Not Just Use It.
          </h1>
          <p className="text-base md:text-lg text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Hands-on AI literacy programs that connect technology to students&rsquo; real interests. We build tools for thinking, not shortcuts for answers.
          </p>
          <Link href="#programs">
            <button className="bg-[#D4A843] text-[#060606] px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
              View Our Programs
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
              <h4 className="text-lg font-semibold mb-1">Prompt Engineering</h4>
            </div>
            <div className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-[rgba(212,168,67,0.15)] flex items-center justify-center mb-4 mx-auto">
                <ShieldCheckIcon className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h4 className="text-lg font-semibold mb-1">Output Verification</h4>
            </div>
            <div className="p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-[rgba(212,168,67,0.15)] flex items-center justify-center mb-4 mx-auto">
                <AcademicCapIcon className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h4 className="text-lg font-semibold mb-1">Ethical Reasoning</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Program Selection Section */}
      <section id="programs" className="py-20 px-4 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3 text-center">Programs</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card A: Library Programs */}
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
              <div className="p-8">
                <div className="w-10 h-10 rounded-xl bg-[rgba(52,211,153,0.12)] flex items-center justify-center mb-5">
                  <BookOpenIcon className="w-5 h-5 text-[#34D399]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Library Programs</h3>
                <p className="text-white/65 text-sm leading-relaxed">Hands-on workshops like the &apos;AI Thinkers &amp; Builders Club&apos; for public libraries.</p>
              </div>
              <div className="p-8 pt-0">
                <Link href="/libraries">
                  <button className="w-full bg-[#D4A843] text-[#060606] py-3 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
                    For Librarians
                  </button>
                </Link>
              </div>
            </div>

            {/* Card B: After School */}
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
              <div className="p-8">
                <div className="w-10 h-10 rounded-xl bg-[rgba(96,165,250,0.1)] flex items-center justify-center mb-5">
                  <RocketLaunchIcon className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <h3 className="text-xl font-bold mb-3">After School Accelerators</h3>
                <p className="text-white/65 text-sm leading-relaxed">Structured multi-week programs for schools and parent-enrolled students.</p>
              </div>
              <div className="p-8 pt-0">
                <Link href="/after-school">
                  <button className="w-full bg-[#D4A843] text-[#060606] py-3 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
                    For Parents
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Organizations Section */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3 text-center">Credibility</p>
          <h2 className="text-3xl font-bold text-center mb-4">Trusted Organizations</h2>
          <p className="text-center text-white/65 text-sm mb-12">Empowering students through partnerships with leading schools and libraries.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Babson College', 'Danbury Library', 'Ridgefield Library', 'Wooster School', 'Woodstock Public Schools', 'Danbury High School'].map((name) => (
              <div key={name} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl p-5 text-center hover:border-white/10 hover:-translate-y-px transition-all duration-300 cursor-default">
                <span className="text-sm font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D4A843] mb-3">Stay Connected</p>
          <h2 className="text-3xl font-bold mb-4">Join the AI Literacy Journey</h2>
          <p className="text-white/65 text-sm mb-8">Get weekly AI thinking prompts and program updates delivered to your inbox.</p>
          <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-white/35 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/30 transition-colors duration-200 text-sm"
            />
            <button className="bg-[#D4A843] text-[#060606] px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
