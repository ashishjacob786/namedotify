"use client";
import React from 'react';
import Link from 'next/link';
import { Users, Target, Shield, Zap, Code, Globe, CheckCircle, ArrowRight, Heart, Building2 } from 'lucide-react';

export default function AboutPage() {
  
  // ✅ 1. Advanced JSON-LD Schema (Organization + Parent Company)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NameDotify',
    url: 'https://namedotify.com',
    logo: 'https://namedotify.com/logo.png',
    description: 'NameDotify provides free domain research, DNS analysis, and webmaster tools. A unit of SNERIC PACIFIC LLP.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'SNERIC PACIFIC LLP',
      url: 'https://namedotify.com' 
    },
    foundingDate: '2025',
    sameAs: [
      'https://twitter.com/namedotify',
      'https://linkedin.com/company/namedotify'
    ]
  };

  return (
    // ✅ UI: Consistent Padding (pt-28)
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>About NameDotify - Free Webmaster Tools | SNERIC PACIFIC LLP</title>
      <meta name="description" content="NameDotify is a leading provider of free SEO and webmaster tools. Owned and operated by SNERIC PACIFIC LLP, we empower developers with data." />
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200">
                <Heart size={12} className="mr-1 fill-blue-700" /> Made for Developers & Founders
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

        {/* --- STATS GRID (Social Proof) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-blue-200 transition duration-300">
                <h3 className="text-3xl font-extrabold text-blue-600 mb-1">50k+</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Domains Checked</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-purple-200 transition duration-300">
                <h3 className="text-3xl font-extrabold text-purple-600 mb-1">99.9%</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Uptime Accuracy</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-orange-200 transition duration-300">
                <h3 className="text-3xl font-extrabold text-orange-600 mb-1">12+</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Free Tools</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-green-200 transition duration-300">
                <h3 className="text-3xl font-extrabold text-green-600 mb-1">100%</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Free Forever</p>
            </div>
        </div>

        {/* --- OUR MISSION STORY --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-blue-50 border border-blue-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg text-sm">
                        <Building2 size={16}/> Parent Company
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                    <div className="prose prose-blue text-gray-600 leading-relaxed text-lg">
                        <p>
                            NameDotify is a digital initiative owned and operated by <strong>SNERIC PACIFIC LLP</strong>.
                        </p>
                        <p>
                            Searching for the perfect domain name used to be a headache. You'd have to jump between a registrar, 
                            a DNS checker, and a Whois tool—all while dodging annoying ads.
                        </p>
                        <p>
                            We built <strong>NameDotify</strong> to change that. Whether you are a startup founder looking for a brand name 
                            or a developer debugging DNS records, our goal is to give you the data you need in milliseconds.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                        <Zap size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">Built on Next.js Edge Network. We cache results globally so you get answers instantly, no matter where you are.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0 shadow-sm">
                        <Shield size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Privacy First</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">We don't sell your search data. Unlike some registrars, we don't front-run your domain ideas. Your searches are safe.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
                        <Target size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Developer Accuracy</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">We fetch data directly from authoritative DNS servers (Google/Cloudflare) and ICANN-accredited registries.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- TECH STACK (Developer Appeal) --- */}
        <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white mb-20 relative overflow-hidden shadow-2xl">
            {/* Abstract Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-900 to-black"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">Powered by Modern Tech</h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
                <span className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700 font-medium">
                    <div className="w-2 h-2 bg-white rounded-full"></div> Next.js 14
                </span>
                <span className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700 font-medium">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div> Tailwind CSS
                </span>
                <span className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700 font-medium">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div> Node.js
                </span>
                <span className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700 font-medium">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div> Vercel Edge
                </span>
            </div>
        </div>

        {/* --- CTA --- */}
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to launch your next project?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transform hover:-translate-y-1">
                    Find a Domain <ArrowRight size={20} />
                </Link>
                <Link href="/dns" className="bg-white text-gray-700 border border-gray-200 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 transform hover:-translate-y-1">
                    Check DNS
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}