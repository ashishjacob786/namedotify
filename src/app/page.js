"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Search, Globe, Server, Shield, Activity, Calendar, Database, LayoutGrid, Zap, Loader2, CheckCircle, XCircle, ArrowRight, Key, QrCode, MapPin, Lock } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); // Ab hum array use karenge (Multiple results ke liye)

  // In extensions ko hum auto-check karenge
  const tlds = [
    // Global & Popular
    '.com', '.net', '.org', '.info', '.biz', '.co', '.xyz',
    
    // India Specific
    '.in', '.co.in', '.net.in', '.org.in', '.ind.in', '.gen.in', '.firm.in',
    
    // Tech & Startup
    '.io', '.ai', '.me', '.app', '.dev', '.tech', '.cloud', '.software', '.systems',
    
    // Business & Store
    '.store', '.shop', '.online', '.site', '.website', '.agency', '.consulting',
    
    // Creative & Media
    '.tv', '.cc', '.ws', '.fm', '.studio', '.design', '.photography', '.art',
    
    // Lifestyle & Blog
    '.blog', '.news', '.life', '.world', '.live', '.space', '.today', '.guru',
    
    // Professional
    '.pro', '.global', '.ltd', '.company', '.solutions', '.services'
  ];

  const checkDomain = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults([]); // Purane result saaf karo

    // Logic: Agar user ne extension (.) nahi lagaya, to list banao.
    // Agar lagaya hai (e.g. google.com), to sirf wahi check karo.
    let domainsToCheck = [];
    
    if (input.includes('.')) {
      domainsToCheck.push(input);
    } else {
      // Keyword mode: Add all TLDs
      const cleanKeyword = input.replace(/[^a-zA-Z0-9-]/g, ''); // Remove spaces/symbols
      domainsToCheck = tlds.map(tld => `${cleanKeyword}${tld}`);
    }

    // Har domain ko check karo (Parallel Requests)
    // Hum Promise.all nahi use karenge taaki jo pehle load ho wo dikh jaye
    const checkPromises = domainsToCheck.map(async (domain) => {
      try {
        const response = await axios.get(`/api/check?domain=${domain}`);
        const status = response.data.available ? 'available' : 'taken';
        
        // Result list update karo (Jo pehle aayega wo jud jayega)
        setResults((prev) => [...prev, { domain, status }]);
      } catch (error) {
        console.error(`Error checking ${domain}`, error);
        setResults((prev) => [...prev, { domain, status: 'error' }]);
      }
    });

    // Jab sab khatam ho jaye to loading band karo
    await Promise.allSettled(checkPromises);
    setLoading(false);
  };

  // ✅ Tools List
  const tools = [
    { name: 'AI Name Generator', icon: <Zap className="w-6 h-6 text-yellow-500" />, desc: 'Generate creative business names', link: '/generator' },
    { name: 'Whois Lookup', icon: <Database className="w-6 h-6 text-blue-500" />, desc: 'Check domain ownership info', link: '/whois' },
    { name: 'DNS Checker', icon: <Activity className="w-6 h-6 text-purple-500" />, desc: 'Analyze DNS records (A, MX, NS)', link: '/dns' },
    { name: 'SSL Checker', icon: <Lock className="w-6 h-6 text-emerald-500" />, desc: 'Verify SSL security status', link: '/ssl' },
    { name: 'Hosting Checker', icon: <Server className="w-6 h-6 text-orange-500" />, desc: 'Find who hosts a website', link: '/hosting' },
    { name: 'Server Status', icon: <Activity className="w-6 h-6 text-pink-500" />, desc: 'Check if a website is down', link: '/status' },
    { name: 'IP Lookup', icon: <MapPin className="w-6 h-6 text-red-500" />, desc: 'Find IP location & details', link: '/ip' },
    { name: 'QR Generator', icon: <QrCode className="w-6 h-6 text-indigo-500" />, desc: 'Create custom QR codes', link: '/qrcode' },
    { name: 'Password Tool', icon: <Key className="w-6 h-6 text-teal-500" />, desc: 'Generate strong passwords', link: '/password' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          Find Your Perfect <span className="text-blue-600">Domain Name</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Enter a keyword (e.g. "NameDotify") to check availability across .com, .in, .org, and more instantly.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg transition transform group-hover:scale-[1.01]"
            placeholder="Type a name (e.g. 'dreamcafe')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkDomain()}
          />
          <button 
            onClick={checkDomain}
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Search'}
          </button>
        </div>

        {/* Multi-Result Area (List View) */}
        {results.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {results.sort((a, b) => a.status === 'available' ? -1 : 1).map((item, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border flex items-center justify-between transition ${
                    item.status === 'available' 
                    ? 'bg-green-50 border-green-200 shadow-sm hover:shadow-md' 
                    : 'bg-white border-gray-200 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.status === 'available' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                  <div className="text-left">
                    <p className={`font-bold text-lg ${item.status === 'available' ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                        {item.domain}
                    </p>
                    <p className="text-xs text-gray-500">
                        {item.status === 'available' ? 'Available' : 'Taken'}
                    </p>
                  </div>
                </div>

                {item.status === 'available' ? (
                  <a 
                    href={`https://www.hostinger.com/web-hosting?domain=${item.domain}`} 
                    target="_blank" 
                    className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-700 text-sm flex items-center gap-1 shadow-sm"
                  >
                    Buy <ArrowRight size={14}/>
                  </a>
                ) : (
                  <Link href={`/whois?domain=${item.domain}`} className="text-sm text-gray-400 hover:text-blue-600 underline">
                    Check Whois
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Tools Grid Section */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">All Professional Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link} className="block group">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition duration-200 h-full flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition">
                    {tool.icon}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">{tool.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                </div>
                </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}