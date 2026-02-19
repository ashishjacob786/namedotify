"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, LayoutGrid, ChevronDown, 
  Search, ShieldCheck, Palette, Briefcase, Lock // ✅ Lock आइकॉन ऐड किया
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Effect for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ PERFECTLY CATEGORIZED ACTUAL TOOLS
  const navMenu = [
    {
      label: 'SEO & Web',
      icon: <Search size={18} className="text-blue-600" />,
      items: [
        { name: 'YouTube SEO Analyzer', href: '/youtube-analyzer' },
        { name: 'Website Speed Test', href: '/website-speed' },
        { name: 'Page Speed Check', href: '/speed-test' },
        { name: 'Hosting Checker', href: '/hosting' },
        { name: 'Server Status', href: '/status' },
        { name: 'Schema Generator', href: '/schema-generator' },
        { name: 'UTM Link Builder', href: '/utm-builder' },
      ]
    },
    {
      label: 'Security & Net',
      icon: <ShieldCheck size={18} className="text-emerald-600" />,
      items: [
        { name: 'Malware Scanner', href: '/malware-scanner' },
        { name: 'SSL Certificate Check', href: '/ssl' },
        { name: 'IP Address Lookup', href: '/ip' },
        { name: 'Reverse IP Lookup', href: '/reverse-ip' },
        { name: 'DNS Record Checker', href: '/dns' },
        { name: 'Whois Lookup', href: '/whois' },
        { name: 'Password Generator', href: '/password' },
      ]
    },
    {
      label: 'Design & Editor',
      icon: <Palette size={18} className="text-fuchsia-600" />,
      items: [
        { name: 'Mockup Studio', href: '/mockup' },
        { name: 'Live Code Editor', href: '/live-editor' },
        { name: 'Fancy Font Generator', href: '/fonts-generator' },
        { name: 'QR Code Generator', href: '/qrcode' },
        { name: 'Email Signature', href: '/signature' },
      ]
    },
    {
      label: 'Business',
      icon: <Briefcase size={18} className="text-orange-600" />,
      items: [
        { name: 'Business Name Generator', href: '/generator' },
      ]
    }
  ];

  const toggleMobileSubmenu = (index) => {
    setMobileSubmenu(mobileSubmenu === index ? null : index);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md border-b-0' : 'border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* --- LOGO --- */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="bg-blue-600 text-white p-2 rounded-xl transition-transform group-hover:scale-110">
                <LayoutGrid size={22} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight">
                NameDotify
              </span>
            </Link>
          </div>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/" className="px-3 py-2 text-gray-600 hover:text-blue-600 font-bold text-sm transition">
              Home
            </Link>

            {navMenu.map((category, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-2 text-gray-600 hover:text-blue-600 font-bold text-sm transition group-hover:bg-blue-50/50 rounded-lg">
                  {category.label}
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180 opacity-50" />
                </button>

                {/* Desktop Dropdown */}
                <div className="absolute left-0 top-full pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                    <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                            {category.icon}
                        </div>
                        <span className="font-bold text-gray-900">{category.label}</span>
                    </div>
                    <div className="p-2 grid gap-1">
                        {category.items.map((item, subIndex) => (
                            <Link 
                                key={subIndex} 
                                href={item.href}
                                className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition flex items-center justify-between group/item"
                            >
                                {item.name}
                                <ChevronDown size={12} className="-rotate-90 opacity-0 group-hover/item:opacity-50 transition-opacity" />
                            </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ✅ DESKTOP ADMIN LOGIN BUTTON */}
            <div className="pl-4 border-l border-gray-200 ml-2">
              <a 
                href="/admin/dashboard" 
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors shadow-sm"
              >
                <Lock size={14} />
                Admin
              </a>
            </div>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="flex items-center lg:hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU (Accordion Style) --- */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} top-16`}>
        <div className="h-full overflow-y-auto pb-20 p-4">
            
            <div className="space-y-1">
                <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl text-base font-bold text-gray-800 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition">
                Home
                </Link>

                {navMenu.map((category, index) => (
                <div key={index} className="border-b border-gray-50 last:border-none">
                    <button 
                        onClick={() => toggleMobileSubmenu(index)}
                        className="w-full flex items-center justify-between px-4 py-4 text-left group"
                    >
                        <span className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-blue-600 transition">
                            <span className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition">{category.icon}</span>
                            {category.label}
                        </span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${mobileSubmenu === index ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>

                    {/* Submenu Items */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === index ? 'max-h-[600px] opacity-100 pb-2' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-gray-50 rounded-xl mx-2 p-2 space-y-1">
                            {category.items.map((item, subIndex) => (
                                <Link 
                                    key={subIndex} 
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-gray-100"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                ))}

                {/* ✅ MOBILE ADMIN LOGIN BUTTON */}
                <div className="mt-6 px-2">
                  <a 
                    href="/admin/dashboard" 
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl transition shadow-sm"
                  >
                    <Lock size={18} /> Admin Login
                  </a>
                </div>

            </div>
        </div>
      </div>
    </nav>
  );
}