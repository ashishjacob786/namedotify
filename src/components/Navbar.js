"use client";
import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-1">
              <span className="text-2xl font-bold text-blue-600 tracking-tight">namedotify</span>
              <span className="text-2xl font-bold text-gray-400">.com</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/whois" className="text-gray-600 hover:text-blue-600 font-medium transition">Whois Lookup</Link>
            <Link href="/ip" className="text-gray-600 hover:text-blue-600 font-medium transition">IP Lookup</Link>
            <Link href="/dns" className="text-gray-600 hover:text-blue-600 font-medium transition">DNS Checker</Link>
            <Link href="/ssl" className="text-gray-600 hover:text-blue-600 font-medium transition">SSL Checker</Link>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</Link>
            <Link href="/whois" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Whois Lookup</Link>
          </div>
        </div>
      )}
    </nav>
  );
}