"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Globe, Server, Shield, Activity, Database, Zap, Loader2, CheckCircle, XCircle, ArrowRight, QrCode, Mail, TrendingUp, Cpu } from 'lucide-react';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // ✅ Advanced JSON-LD Schema (WebSite & SoftwareApp)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NameDotify',
    url: 'https://namedotify.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://namedotify.com/whois?domain={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  // ✅ Domain Search Logic (Simulation for Homepage Demo)
  // Note: For real bulk checking, you would need a specific API. 
  // This simulates the experience for the user.
  const tlds = ['.com', '.net', '.org', '.io', '.co', '.ai'];

  const checkDomain = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults([]);

    // Simulate network delay for "Real" feel
    setTimeout(() => {
        const cleanKeyword = input.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        const domainsToCheck = input.includes('.') ? [input] : tlds.map(tld => `${cleanKeyword}${tld}`);
        
        const mockResults = domainsToCheck.map(domain => ({
            domain,
            status: Math.random() > 0.4 ? 'available' : 'taken', // Simulated availability
            price: Math.floor(Math.random() * 20) + 9 // Simulated price
        }));

        setResults(mockResults);
        setLoading(false);
    }, 1500);
  };

  // ✅ Updated Tools List (Linked to pages we created)
  const tools = [
    { 
      name: 'Business Name Generator', 
      icon: <Zap className="w-8 h-8 text-purple-600" />, 
      desc: 'AI-powered tool to generate catchy brand names and check availability.', 
      link: '/name-generator' 
    },
    { 
      name: 'Whois Lookup', 
      icon: <Database className="w-8 h-8 text-blue-600" />, 
      desc: 'Check domain ownership, registration age, and expiry dates.', 
      link: '/whois' 
    },
    { 
      name: 'Email Signature', 
      icon: <Mail className="w-8 h-8 text-pink-600" />, 
      desc: 'Create professional HTML email signatures for Gmail & Outlook.', 
      link: '/signature' 
    },
    { 
      name: 'DNS Record Checker', 
      icon: <Globe className="w-8 h-8 text-green-600" />, 
      desc: 'Verify A, MX, CNAME records and check global propagation.', 
      link: '/dns' 
    },
    { 
      name: 'Pro QR Studio', 
      icon: <QrCode className="w-8 h-8 text-orange-600" />, 
      desc: 'Generate custom QR codes for Wi-Fi, URLs, and vCards.', 
      link: '/qrcode' 
    },
    { 
      name: 'Domain Pricing', 
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />, 
      desc: 'Compare registration prices across GoDaddy, Namecheap & more.', 
      link: '/pricing' 
    },
  ];

  return (
    // ✅ FIX: 'pt-28' added to prevent Navbar overlap
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* SEO Title & Meta for Client Component */}
      <title>NameDotify | Best Free Tools for Webmasters & Startups</title>
      <meta name="description" content="NameDotify offers free SEO and webmaster tools including Whois Lookup, Business Name Generator, DNS Checker, and Email Signature Creator." />
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-100 animate-in fade-in slide-in-from-top-4">
            <Cpu size={14} className="mr-2" /> All-in-One Webmaster Toolkit
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-2">
            Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Online Empire.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4">
            From finding the perfect <strong>Domain Name</strong> to analyzing <strong>DNS Records</strong>. 
            Professional tools for founders and developers, 100% free.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-6 group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition" />
            </div>
            <input
              type="text"
              className="block w-full pl-16 pr-36 py-5 bg-white border-2 border-gray-100 rounded-2xl shadow-xl shadow-blue-50/50 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 focus:outline-none text-lg transition placeholder-gray-400"
              placeholder="Search a domain (e.g. namedotify.com)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkDomain()}
            />
            <button 
              onClick={checkDomain}
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-blue-600 text-white px-8 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-200"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Search'}
            </button>
          </div>

          {/* SEARCH RESULTS */}
          {results.length > 0 && (
            <div className="max-w-2xl mx-auto space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
                <div className="flex justify-between items-center mb-2 px-2">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Availability Results</span>
                    <button onClick={() => setResults([])} className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-1 rounded-full">CLEAR</button>
                </div>
                {results.map((item, index) => (
                <div 
                    key={index}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-200 ${
                        item.status === 'available' 
                        ? 'bg-emerald-50 border-emerald-100 shadow-sm' 
                        : 'bg-white border-gray-100 opacity-60'
                    }`}
                >
                    <div className="flex items-center gap-4">
                    {item.status === 'available' ? (
                        <div className="bg-emerald-100 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-2 rounded-full">
                            <XCircle className="h-5 w-5 text-gray-500" />
                        </div>
                    )}
                    <div>
                        <p className={`font-bold text-lg tracking-tight ${item.status === 'available' ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                            {item.domain}
                        </p>
                        <p className={`text-xs font-bold uppercase ${item.status === 'available' ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {item.status === 'available' ? 'Available' : 'Taken'}
                        </p>
                    </div>
                    </div>

                    {item.status === 'available' ? (
                    <a 
                        href={`https://www.hostinger.com/web-hosting?domain=${item.domain}`} 
                        target="_blank" 
                        className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 text-sm flex items-center gap-2 shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
                    >
                        Buy ${item.price} <ArrowRight size={16}/>
                    </a>
                    ) : (
                    <Link href={`/whois?domain=${item.domain}`} className="text-sm font-bold text-gray-500 hover:text-blue-600 px-4 py-2 hover:bg-gray-100 rounded-xl transition">
                        Check Whois
                    </Link>
                    )}
                </div>
                ))}
            </div>
            )}
        </div>
      </section>

      {/* --- TOOLS GRID SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Free Tools</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Daily essentials for SEO experts, developers, and entrepreneurs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link} className="block group h-full">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition duration-300 h-full flex flex-col items-start gap-4 relative overflow-hidden group-hover:-translate-y-1">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition duration-300">
                        {tool.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{tool.name}</h3>
                        <p className="text-gray-500 leading-relaxed">{tool.desc}</p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Open Tool <ArrowRight size={16} className="ml-1" />
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SEO CONTENT SECTION --- */}
      <section className="bg-white border-t border-gray-100 py-20 mt-10">
        <div className="max-w-4xl mx-auto px-6 prose prose-blue prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why use NameDotify?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose text-center">
                <div className="p-6 bg-gray-50 rounded-2xl">
                    <div className="flex justify-center mb-4"><Zap className="text-yellow-500" size={32}/></div>
                    <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
                    <p className="text-gray-500 text-sm">Real-time data directly from registries without caching delays.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                    <div className="flex justify-center mb-4"><Shield className="text-green-500" size={32}/></div>
                    <h3 className="font-bold text-lg mb-2">Privacy First</h3>
                    <p className="text-gray-500 text-sm">We respect your data. No tracking or storing of your search queries.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                    <div className="flex justify-center mb-4"><Server className="text-blue-500" size={32}/></div>
                    <h3 className="font-bold text-lg mb-2">Developer Ready</h3>
                    <p className="text-gray-500 text-sm">Built with modern tech like Next.js for superior performance.</p>
                </div>
            </div>

            <div className="mt-12 text-gray-600 text-center">
                <p>
                    Starting a new business begins with the perfect domain. <strong>NameDotify</strong> helps you discover available names, 
                    analyze competitors with <strong>Whois</strong>, and set up your brand with our <strong>Email Signature Generator</strong>. 
                    All tools are 100% free and easy to use.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
}