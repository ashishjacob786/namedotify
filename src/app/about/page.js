"use client";
import React from 'react';
import Link from 'next/link';
import { Users, Target, Shield, Zap, Code, Globe, CheckCircle, ArrowRight, Heart } from 'lucide-react';

export default function AboutPage() {
  
  // ✅ Advanced JSON-LD Schema (Organization)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NameDotify',
    url: 'https://namedotify.com',
    logo: 'https://namedotify.com/logo.png',
    description: 'NameDotify is a leading free provider of domain research, DNS analysis, and webmaster tools.',
    foundingDate: '2025',
    founders: [
      {
        '@type': 'Person',
        name: 'NameDotify Team'
      }
    ],
    sameAs: [
      'https://twitter.com/namedotify',
      'https://facebook.com/namedotify'
    ]
  };

  return (
    // ✅ FIX: 'pt-24' added to prevent black strip
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section */}
        <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6">
                <Heart size={12} className="mr-1 fill-blue-700" /> Made for Developers & Creators
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight">
                Empowering Your <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Journey</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                NameDotify is the all-in-one toolkit for finding domains, analyzing DNS, and securing websites. 
                Fast, free, and privacy-focused.
            </p>
        </div>

        {/* 2. Stats Grid (Social Proof) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-blue-600 mb-1">50k+</h3>
                <p className="text-sm text-gray-500 font-medium">Domains Checked</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-purple-600 mb-1">99.9%</h3>
                <p className="text-sm text-gray-500 font-medium">Uptime Accuracy</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-orange-600 mb-1">10+</h3>
                <p className="text-sm text-gray-500 font-medium">Free Tools</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-1">0$</h3>
                <p className="text-sm text-gray-500 font-medium">Always Free</p>
            </div>
        </div>

        {/* 3. Our Mission Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8"></div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">Our Mission</h2>
                <div className="prose prose-blue text-gray-600 leading-relaxed relative z-10">
                    <p>
                        Searching for the perfect domain name used to be a headache. You'd have to jump between a registrar, 
                        a DNS checker, and a Whois tool—all while dodging annoying ads and upsells.
                    </p>
                    <p>
                        We built <strong>NameDotify</strong> to change that. We believe that essential web tools should be 
                        <strong> fast, accessible, and beautifully designed</strong>.
                    </p>
                    <p>
                        Whether you are a startup founder looking for a brand name or a developer debugging DNS records, 
                        our goal is to give you the data you need in milliseconds, not minutes.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
                        <p className="text-gray-600 text-sm mt-1">Built on Next.js Edge Network. We cache results globally so you get answers instantly, no matter where you are.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Privacy First</h3>
                        <p className="text-gray-600 text-sm mt-1">We don't sell your search data. Unlike other registrars, we don't front-run your domain ideas.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                        <Target size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Accuracy Matters</h3>
                        <p className="text-gray-600 text-sm mt-1">We fetch data directly from authoritative DNS servers and ICANN-accredited registries.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. Tech Stack (Appeals to Developers) */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white mb-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <h2 className="text-3xl font-bold mb-8 relative z-10">Built with Modern Tech</h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative z-10">
                <div className="flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
                    <div className="w-3 h-3 bg-white rounded-full"></div> Next.js 14
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div> Tailwind CSS
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div> Node.js
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div> Vercel Edge
                </div>
            </div>
        </div>

        {/* 5. CTA */}
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to launch your next project?</h2>
            <div className="flex justify-center gap-4">
                <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200">
                    Find a Domain <ArrowRight size={18} />
                </Link>
                <Link href="/dns" className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                    Check DNS
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}