'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#0F172A]">
              Next Generation Learners
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/libraries" className="text-[#0F172A] hover:text-brand-teal transition-colors">
              Library Programs
            </Link>
            <Link href="/after-school" className="text-[#0F172A] hover:text-brand-teal transition-colors">
              After School
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href="/libraries#book-a-program">
              <button className="bg-[#0F172A] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-slate-800 transition-all">
                Book a Program
              </button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/libraries" className="text-[#0F172A] block px-3 py-2 rounded-md text-base font-medium">
              Library Programs
            </Link>
            <Link href="/after-school" className="text-[#0F172A] block px-3 py-2 rounded-md text-base font-medium">
              After School
            </Link>
            <div className="pt-4 pb-3">
              <Link href="/libraries#book-a-program">
                <button className="w-full text-left bg-[#0F172A] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-slate-800 transition-all">
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
