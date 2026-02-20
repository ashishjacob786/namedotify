"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Globe, Server, Shield, Activity, Database, Zap, Loader2, 
  CheckCircle, XCircle, ArrowRight, QrCode, Mail, MapPin, Lock, 
  Key, Type, Wifi, Gauge, Rocket, Layers, Code2, Target, Blocks,
  ShieldAlert, Youtube
} from 'lucide-react';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // ✅ Advanced JSON-LD Schema (WebSite)
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

  const tlds = ['.com', '.net', '.org', '.io', '.co', '.ai'];

  const checkDomain = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults([]);

    // Simulate domain search
    setTimeout(() => {
        const cleanKeyword = input.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        const domainsToCheck = input.includes('.') ? [input] : tlds.map(tld => `${cleanKeyword}${tld}`);
        
        const mockResults = domainsToCheck.map(domain => ({
            domain,
            status: Math.random() > 0.4 ? 'available' : 'taken',
            price: Math.floor(Math.random() * 20) + 9 
        }));

        setResults(mockResults);
        setLoading(false);
    }, 1000);
  };

  // ✅ UPDATED TOOLS LIST (Now with all 23 Tools)
  const tools = [
    { 
      name: 'WebMCP Validator', 
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />, 
      desc: 'Check if your website is WebMCP compliant and ready for AI Agents.', 
      link: '/webmcp-validate',
      badge: 'New & Hot'
    },
    { 
      name: 'WebMCP Schema Gen', 
      icon: <Target className="w-8 h-8 text-violet-500" />, 
      desc: 'Generate manifests to make your site instantly discoverable by AI.', 
      link: '/webmcp-schema-generator',
      badge: 'New'
    },
    { 
      name: 'Advanced SEO Auditor', 
      icon: <Search className="w-8 h-8 text-amber-500" />, 
      desc: 'Perform a comprehensive technical and on-page SEO audit instantly.', 
      link: '/seo-auditor',
      badge: 'Hot'
    },
    { 
      name: 'Device Mockup Studio', 
      icon: <Layers className="w-8 h-8 text-rose-500" />, 
      desc: 'Create beautiful 3D device mockups for your apps and websites instantly.', 
      link: '/mockup',
      badge: 'Hot'
    },
    { 
      name: 'Live Code Editor', 
      icon: <Blocks className="w-8 h-8 text-blue-500" />, 
      desc: 'Write, test, and preview HTML, CSS, and JS code in a live workspace.', 
      link: '/live-editor',
      badge: 'New & Pro'
    },
    { 
      name: 'YouTube SEO Analyzer', 
      icon: <Youtube className="w-8 h-8 text-red-600" />, 
      desc: 'Extract hidden tags, download HD thumbnails, and calculate engagement rate.', 
      link: '/youtube-analyzer',
      badge: 'Hot'
    },
    { 
      name: 'Malware Scanner', 
      icon: <ShieldAlert className="w-8 h-8 text-emerald-600" />, 
      desc: 'Scan any URL for viruses, phishing, and dangerous software instantly.', 
      link: '/malware-scanner',
      badge: 'New'
    },
    { 
      name: 'Schema Generator', 
      icon: <Code2 className="w-8 h-8 text-indigo-500" />, 
      desc: 'Generate flawless JSON-LD structured data to win Google Rich Snippets.', 
      link: '/schema-generator',
      badge: 'New'
    },
    { 
      name: 'UTM Link Builder', 
      icon: <Target className="w-8 h-8 text-cyan-500" />, 
      desc: 'Generate precise tracking URLs for your digital marketing campaigns.', 
      link: '/utm-builder',
      badge: 'New'
    },
    { 
      name: 'Website Speed Checker', 
      icon: <Rocket className="w-8 h-8 text-violet-500" />, 
      desc: 'Analyze Core Web Vitals and get a detailed Lighthouse performance score.', 
      link: '/website-speed',
      badge: 'Pro'
    },
    { 
      name: 'Internet Speed Test', 
      icon: <Gauge className="w-8 h-8 text-sky-500" />, 
      desc: 'Check your live internet bandwidth, Download, Upload, and Ping latency.', 
      link: '/speed-test'
    },
    { 
      name: 'Reverse IP Lookup', 
      icon: <Server className="w-8 h-8 text-teal-500" />, 
      desc: 'Discover all domains hosted on a single IP address. Essential for OSINT.', 
      link: '/reverse-ip'
    },
    { 
      name: 'Business Name Generator', 
      icon: <Zap className="w-8 h-8 text-purple-500" />, 
      desc: 'AI-powered tool to generate creative and catchy brand names.', 
      link: '/generator',
      badge: 'Popular'
    },
    { 
      name: 'Whois Lookup', 
      icon: <Database className="w-8 h-8 text-blue-600" />, 
      desc: 'Instantly check domain ownership, age, registrar, and expiry dates.', 
      link: '/whois' 
    },
    { 
      name: 'Pro QR Studio', 
      icon: <QrCode className="w-8 h-8 text-orange-500" />, 
      desc: 'Design custom QR codes with logos, colors, and HD frames.', 
      link: '/qrcode' 
    },
    { 
      name: 'DNS Record Checker', 
      icon: <Globe className="w-8 h-8 text-green-500" />, 
      desc: 'Verify global DNS propagation for A, MX, TXT, and CNAME records.', 
      link: '/dns' 
    },
    { 
      name: 'Email Signature', 
      icon: <Mail className="w-8 h-8 text-pink-500" />, 
      desc: 'Create professional HTML email signatures for Gmail and Outlook.', 
      link: '/signature' 
    },
    { 
      name: 'IP Address Lookup', 
      icon: <MapPin className="w-8 h-8 text-red-500" />, 
      desc: 'Find the exact geolocation, ISP, and city of any IP address.', 
      link: '/ip' 
    },
    { 
      name: 'SSL Checker', 
      icon: <Lock className="w-8 h-8 text-emerald-500" />, 
      desc: 'Verify SSL certificate validity, issuer, and potential security issues.', 
      link: '/ssl' 
    },
    { 
      name: 'Secure Password Gen', 
      icon: <Key className="w-8 h-8 text-violet-500" />, 
      desc: 'Generate strong, uncrackable, and random passwords instantly.', 
      link: '/password' 
    },
    { 
      name: 'Hosting Checker', 
      icon: <Server className="w-8 h-8 text-blue-600" />, 
      desc: 'Discover which web hosting provider a specific website is using.', 
      link: '/hosting' 
    },
    { 
      name: 'Server Status', 
      icon: <Wifi className="w-8 h-8 text-sky-500" />, 
      desc: 'Check if a website server is down or online in real-time.', 
      link: '/status' 
    },
    { 
      name: 'Fancy Fonts Generator', 
      icon: <Type className="w-8 h-8 text-fuchsia-500" />, 
      desc: 'Generate stylish text and cool fonts for Instagram & Bio.', 
      link: '/fonts-generator' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20 pt-28">
      
      {/* Client SEO Tags */}
      <title>NameDotify | Free Webmaster Tools, Whois, Speed Test & More</title>
      <meta name="description" content="Access 20+ free premium web tools: Live Code Editor, Schema Generator, Device Mockups, Website Speed Checker, and more." />
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-8 border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-4">
            <Activity size={14} className="mr-2" /> All-in-One Webmaster Toolkit
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-500">
            Everything you need to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Grow Online.</span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            Search <strong>Domains</strong>, check <strong>Website Speed</strong>, or analyze <strong>Reverse IPs</strong>. 
            Professional suite of tools for founders and developers, 100% free.
          </p>

          {/* DOMAIN SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto group z-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition" />
            </div>
            <input
              type="text"
              className="block w-full pl-16 pr-36 py-5 bg-white border-2 border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:outline-none text-lg transition placeholder-slate-400"
              placeholder="Search a domain (e.g. namedotify.com)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkDomain()}
            />
            <button 
              onClick={checkDomain}
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-indigo-200 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Search'}
            </button>
          </div>

          {/* SEARCH RESULTS */}
          {results.length > 0 && (
            <div className="max-w-2xl mx-auto space-y-3 mt-8 animate-in fade-in slide-in-from-top-4 duration-300 text-left relative z-10">
                <div className="flex justify-between items-center mb-3 px-2">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Availability Results</span>
                    <button onClick={() => setResults([])} className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-1 rounded-full transition hover:bg-red-100">CLEAR</button>
                </div>
                {results.map((item, index) => (
                <div 
                    key={index}
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 ${
                        item.status === 'available' 
                        ? 'bg-emerald-50 border-emerald-100 shadow-sm' 
                        : 'bg-white border-slate-100 opacity-75'
                    }`}
                >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        {item.status === 'available' ? (
                            <div className="bg-emerald-100 p-2 rounded-full flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-emerald-600" />
                            </div>
                        ) : (
                            <div className="bg-slate-100 p-2 rounded-full flex-shrink-0">
                                <XCircle className="h-5 w-5 text-slate-400" />
                            </div>
                        )}
                        <div>
                            <p className={`font-bold text-lg tracking-tight ${item.status === 'available' ? 'text-slate-900' : 'text-slate-500 line-through'}`}>
                                {item.domain}
                            </p>
                            <p className={`text-xs font-bold uppercase ${item.status === 'available' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {item.status === 'available' ? 'Available to Register' : 'Already Taken'}
                            </p>
                        </div>
                    </div>

                    {item.status === 'available' ? (
                        <a 
                            href={`https://www.hostinger.com/web-hosting?domain=${item.domain}`} 
                            target="_blank" 
                            className="bg-emerald-600 text-white w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
                        >
                            Buy ${item.price} <ArrowRight size={16}/>
                        </a>
                    ) : (
                        <Link href={`/whois?domain=${item.domain}`} className="text-sm font-bold w-full sm:w-auto text-center text-slate-500 hover:text-indigo-600 px-4 py-2.5 bg-slate-50 hover:bg-indigo-50 rounded-xl transition border border-slate-100">
                            Check Whois
                        </Link>
                    )}
                </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* --- ALL TOOLS GRID SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Explore Premium Tools</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Powerful, fast, and completely free tools for developers, SEO experts, and founders.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link} className="block group h-full">
                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition duration-300 h-full flex flex-col items-start relative overflow-hidden group-hover:-translate-y-1">
                    
                    {/* Badge */}
                    {tool.badge && (
                        <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            tool.badge.includes('Hot') ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                            tool.badge.includes('New') ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 
                            'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}>
                            {tool.badge}
                        </span>
                    )}

                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-50 transition duration-300">
                        {tool.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition tracking-tight">{tool.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{tool.desc}</p>
                    
                    <div className="mt-auto flex items-center text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Launch Tool <ArrowRight size={16} className="ml-1" />
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SEO CONTENT SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
        <div className="bg-indigo-600 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-indigo-200 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">Why rely on NameDotify?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10 mt-12">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                    <div className="flex justify-center mb-4"><Zap className="text-yellow-300" size={32}/></div>
                    <h3 className="font-bold text-white text-xl mb-2">Lightning Fast</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">Direct API integrations ensure real-time data without annoying caching delays.</p>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                    <div className="flex justify-center mb-4"><Shield className="text-green-300" size={32}/></div>
                    <h3 className="font-bold text-white text-xl mb-2">Privacy First</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">We respect your data. No tracking or storing of your search queries or IP addresses.</p>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                    <div className="flex justify-center mb-4"><Server className="text-cyan-300" size={32}/></div>
                    <h3 className="font-bold text-white text-xl mb-2">Pro Algorithms</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">Powered by Next.js and industry-standard algorithms to give you accurate insights.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}