'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#060606]/70 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-[#D4A843] text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer">
              Next Generation Learners
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/libraries" className="relative text-white/35 text-xs tracking-wide hover:text-white transition-colors duration-250 cursor-pointer after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[#D4A843] after:scale-x-0 after:transition-transform after:duration-250 after:origin-center hover:after:scale-x-100">
              Library Programs
            </Link>
            <Link href="/after-school" className="relative text-white/35 text-xs tracking-wide hover:text-white transition-colors duration-250 cursor-pointer after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[#D4A843] after:scale-x-0 after:transition-transform after:duration-250 after:origin-center hover:after:scale-x-100">
              After School
            </Link>
            <Link href="/woodstock" className="relative text-white/35 text-xs tracking-wide hover:text-white transition-colors duration-250 cursor-pointer after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[#D4A843] after:scale-x-0 after:transition-transform after:duration-250 after:origin-center hover:after:scale-x-100">
              Woodstock
            </Link>
            <Link href="/superintendents" className="relative text-white/35 text-xs tracking-wide hover:text-white transition-colors duration-250 cursor-pointer after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[#D4A843] after:scale-x-0 after:transition-transform after:duration-250 after:origin-center hover:after:scale-x-100">
              For Superintendents
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href="/libraries#book-a-program">
              <button className="bg-[#D4A843] text-[#060606] px-6 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] hover:-translate-y-px transition-all duration-250">
                Book a Program
              </button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-white/35 hover:text-white cursor-pointer focus:outline-none transition-colors duration-200">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#060606]/90 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <Link href="/libraries" onClick={() => setIsOpen(false)} className="text-white/65 hover:text-white block px-3 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200">
              Library Programs
            </Link>
            <Link href="/after-school" onClick={() => setIsOpen(false)} className="text-white/65 hover:text-white block px-3 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200">
              After School
            </Link>
            <Link href="/woodstock" onClick={() => setIsOpen(false)} className="text-white/65 hover:text-white block px-3 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200">
              Woodstock
            </Link>
            <Link href="/superintendents" onClick={() => setIsOpen(false)} className="text-white/65 hover:text-white block px-3 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200">
              For Superintendents
            </Link>
            <div className="pt-4">
              <Link href="/libraries#book-a-program" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-[#D4A843] text-[#060606] px-4 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:shadow-[0_8px_24px_rgba(212,168,67,0.15)] transition-all duration-250">
                  Book a Program
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
