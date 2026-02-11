"use client";
import React, { useState } from 'react';
import { Wand2, Sparkles, Copy, CheckCircle, ArrowRight, Loader2, Lightbulb, Target, Globe, Tag, Building2 } from 'lucide-react';

export default function GeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [niche, setNiche] = useState('tech'); // Default niche
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ✅ Advanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify AI Business Name Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Free AI tool to generate creative business names, domain ideas, and startup brand names instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const generateNames = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResults([]);
    
    setTimeout(() => {
        const term = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Niche based smart naming
        const niches = {
            tech: { prefixes: ['cyber', 'tech', 'smart', 'byte', 'data', 'cloud', 'ai', 'pro'], suffixes: ['ify', 'ly', 'io', 'flow', 'stack', 'hub', 'node', 'ware'] },
            ecommerce: { prefixes: ['shop', 'cart', 'buy', 'deal', 'trend', 'prime', 'urban', 'swift'], suffixes: ['mart', 'store', 'cart', 'bay', 'market', 'goods', 'drop', 'box'] },
            creative: { prefixes: ['art', 'color', 'pixel', 'vibe', 'aura', 'muse', 'craft', 'studio'], suffixes: ['design', 'craft', 'arts', 'scape', 'forge', 'media', 'works', 'lab'] },
            finance: { prefixes: ['coin', 'wealth', 'pay', 'fin', 'trust', 'capital', 'fund', 'asset'], suffixes: ['vest', 'bank', 'pay', 'fi', 'wallet', 'trade', 'cash', 'wealth'] }
        };

        const selectedNiche = niches[niche] || niches.tech;
        const { prefixes, suffixes } = selectedNiche;

        let generated = [];
        prefixes.forEach(p => generated.push(`${p}${term}.com`));
        suffixes.forEach(s => generated.push(`${term}${s}.com`));
        generated.push(`${prefixes[0]}${term}${suffixes[0]}.com`);
        generated.push(`${term}ify.com`);
        generated.push(`${term}ly.com`);

        // Shuffle and limit
        const uniqueResults = [...new Set(generated)].sort(() => Math.random() - 0.5).slice(0, 18);
        setResults(uniqueResults);
        setLoading(false);
    }, 600);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    // ✅ FIX: 'pt-24' added to prevent black strip
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Sparkles size={12} className="mr-1" /> AI-Powered Naming
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 flex flex-col md:flex-row items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Business Name Generator
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Enter a keyword related to your niche, and our smart algorithm will generate 
                catchy, brandable, and available domain ideas in seconds.
            </p>
        </div>

        {/* Pro Search Box */}
        <div className="max-w-4xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-purple-100 border border-purple-50 flex flex-col md:flex-row gap-3 mb-16 relative z-10">
            
            <div className="flex-1 relative flex items-center bg-gray-50 rounded-xl border border-gray-100 focus-within:border-purple-300">
                <Tag className="absolute left-4 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Enter keyword (e.g. 'Coffee', 'Tech')" 
                    className="w-full h-full py-4 pl-12 pr-4 outline-none text-lg bg-transparent font-medium"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateNames()}
                />
            </div>

            <div className="md:w-64 relative flex items-center bg-gray-50 rounded-xl border border-gray-100 focus-within:border-purple-300">
                <Building2 className="absolute left-4 text-gray-400" size={20} />
                <select 
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full h-full py-4 pl-12 pr-4 outline-none bg-transparent font-medium text-gray-700 cursor-pointer"
                >
                    <option value="tech">Tech & SaaS</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="creative">Creative & Art</option>
                    <option value="finance">Finance & Crypto</option>
                </select>
            </div>

            <button 
                onClick={generateNames} 
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-200 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Wand2 size={20} /> Generate</>}
            </button>
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 mb-20">
                {results.map((name, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition group flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition"></div>
                        <span className="font-bold text-lg text-gray-700 group-hover:text-purple-700 transition tracking-tight ml-2">{name}</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => copyToClipboard(name, index)}
                                className="p-2.5 text-gray-400 hover:text-purple-600 bg-gray-50 rounded-lg hover:bg-purple-50 transition"
                            >
                                {copiedIndex === index ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18} />}
                            </button>
                            <a 
                                href={`https://hostinger.com?REFERRALCODE=YOUR_CODE&domain=${name}`} 
                                target="_blank"
                                rel="nofollow sponsored"
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-1 text-xs font-bold shadow-md"
                            >
                                Buy <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !loading && (
            <div className="text-center text-gray-400 mb-20">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wand2 className="w-10 h-10 text-purple-300" />
                </div>
                <p className="text-lg">Try keywords like <span className="text-purple-500 font-medium">"Digital"</span>, <span className="text-pink-500 font-medium">"Food"</span>, or <span className="text-indigo-500 font-medium">"Crypto"</span>.</p>
            </div>
        )}

        {/* SEO Content */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-purple max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Choose the Perfect Business Name?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600"><Lightbulb size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">Keep it Simple</h3>
                    <p className="text-gray-600">Short names are easier to remember. Think "Uber" or "Zoom".</p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600"><Target size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">Reflect Brand</h3>
                    <p className="text-gray-600">Use keywords that hint at what you do (e.g., "Tech" or "Fresh").</p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600"><Globe size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">Check .Com</h3>
                    <p className="text-gray-600">Always secure the .com domain to build trust instantly.</p>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}