"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <LayoutGrid size={24} />
              </div>
              {/* ✅ CHANGE HERE: namedotify -> NameDotify */}
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                NameDotify
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/generator" className="text-gray-600 hover:text-blue-600 font-medium transition">Name Generator</Link>
            <Link href="/whois" className="text-gray-600 hover:text-blue-600 font-medium transition">Whois</Link>
            <Link href="/ip" className="text-gray-600 hover:text-blue-600 font-medium transition">IP Lookup</Link>
            <Link href="/qrcode" className="text-gray-600 hover:text-blue-600 font-medium transition">QR Generator</Link>
            <Link href="/password" className="text-gray-600 hover:text-blue-600 font-medium transition">Password Tool</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</Link>
            <Link href="/generator" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Name Generator</Link>
            <Link href="/whois" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Whois Lookup</Link>
            <Link href="/ip" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">IP Lookup</Link>
            <Link href="/qrcode" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">QR Generator</Link>
             <Link href="/password" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Password Tool</Link>
          </div>
        </div>
      )}
    </nav>
  );
}