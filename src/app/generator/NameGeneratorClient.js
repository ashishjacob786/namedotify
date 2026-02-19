"use client";
import React, { useState } from 'react';
import { Wand2, Sparkles, Copy, CheckCircle, ArrowRight, Loader2, Lightbulb, Target, Globe, Tag, Building2 } from 'lucide-react';

export default function NameGeneratorClient() {
  const [keyword, setKeyword] = useState('');
  const [niche, setNiche] = useState('tech'); // Default niche
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateNames = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResults([]);
    
    setTimeout(() => {
        const term = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Smart Naming Logic
        const niches = {
            tech: { 
                prefixes: ['cyber', 'tech', 'smart', 'byte', 'data', 'cloud', 'ai', 'pro', 'hyper', 'nexus', 'meta', 'sys'], 
                suffixes: ['ify', 'ly', 'io', 'flow', 'stack', 'hub', 'node', 'ware', 'sync', 'labs', 'box', 'ai'] 
            },
            ecommerce: { 
                prefixes: ['shop', 'cart', 'buy', 'deal', 'trend', 'prime', 'urban', 'swift', 'pure', 'luxe', 'nova', 'go'], 
                suffixes: ['mart', 'store', 'cart', 'bay', 'market', 'goods', 'drop', 'box', 'spot', 'commerce', 'zone', 'shop'] 
            },
            creative: { 
                prefixes: ['art', 'color', 'pixel', 'vibe', 'aura', 'muse', 'craft', 'studio', 'ink', 'glow', 'bold', 'zen'], 
                suffixes: ['design', 'craft', 'arts', 'scape', 'forge', 'media', 'works', 'lab', 'vision', 'canvas', 'create', 'studio'] 
            },
            finance: { 
                prefixes: ['coin', 'wealth', 'pay', 'fin', 'trust', 'capital', 'fund', 'asset', 'vault', 'ledger', 'cash', 'bit'], 
                suffixes: ['vest', 'bank', 'pay', 'fi', 'wallet', 'trade', 'cash', 'wealth', 'mint', 'sure', 'cap', 'funds'] 
            }
        };

        const selectedNiche = niches[niche] || niches.tech;
        const { prefixes, suffixes } = selectedNiche;

        let generated = [];
        
        prefixes.forEach(p => generated.push(`${p}${term}.com`));
        suffixes.forEach(s => generated.push(`${term}${s}.com`));
        generated.push(`${prefixes[0]}${suffixes[0]}.com`);
        generated.push(`${prefixes[1]}${suffixes[1]}.com`);
        generated.push(`${term}ify.com`);
        generated.push(`get${term}.com`);
        generated.push(`use${term}.com`);
        generated.push(`${term}hq.com`);

        const uniqueResults = [...new Set(generated)].sort(() => Math.random() - 0.5).slice(0, 24);
        setResults(uniqueResults);
        setLoading(false);
    }, 800);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-6 border border-purple-200">
                <Sparkles size={14} className="mr-2" /> AI-Powered Branding Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 flex flex-col md:flex-row items-center justify-center gap-3 text-gray-900 leading-tight">
                Business Name <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Generator</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Enter a keyword, select your industry, and let our AI forge the perfect 
                <span className="font-bold text-gray-800"> brandable domain name</span> for your startup.
            </p>
        </header>

        {/* --- TOOL INPUT --- */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-purple-100/50 border border-purple-100 flex flex-col md:flex-row gap-4 mb-16 relative z-10">
            
            <div className="flex-1 relative flex items-center bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50 transition">
                <Tag className="absolute left-4 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Enter keyword (e.g. 'Coffee', 'Software')" 
                    className="w-full h-full py-4 pl-12 pr-4 outline-none text-lg bg-transparent font-medium text-gray-800 rounded-2xl"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateNames()}
                />
            </div>

            <div className="md:w-64 relative flex items-center bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50 transition">
                <Building2 className="absolute left-4 text-gray-400" size={20} />
                <select 
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full h-full py-4 pl-12 pr-8 outline-none text-md bg-transparent font-medium text-gray-700 appearance-none cursor-pointer rounded-2xl"
                >
                    <option value="tech">Tech & SaaS</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="creative">Creative Agency</option>
                    <option value="finance">Finance & Crypto</option>
                </select>
                <div className="absolute right-4 pointer-events-none text-gray-400">▼</div>
            </div>

            <button 
                onClick={generateNames} 
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-200 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 transform active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <><Wand2 size={24} /> Generate</>}
            </button>
        </div>

        {/* --- RESULTS --- */}
        {results.length > 0 && (
            <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={24}/> AI Suggestions
                    </h2>
                    <span className="text-sm font-bold text-purple-700 bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
                        {results.length} Names Found
                    </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((name, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 group flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <span className="font-extrabold text-xl text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition tracking-tight ml-2">
                                {name}
                            </span>
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => copyToClipboard(name, index)}
                                    className="p-2.5 text-gray-400 hover:text-purple-600 bg-gray-50 rounded-xl hover:bg-purple-50 transition"
                                    title="Copy Name"
                                >
                                    {copiedIndex === index ? <CheckCircle size={20} className="text-green-500"/> : <Copy size={20} />}
                                </button>
                                
                                <a 
                                    href={`https://www.hostinger.com/web-hosting?domain=${name}`} 
                                    target="_blank"
                                    rel="nofollow sponsored"
                                    className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-purple-600 transition flex items-center gap-1 text-sm font-bold shadow-md transform group-hover:scale-105"
                                >
                                    Buy <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- EMPTY STATE --- */}
        {results.length === 0 && !loading && (
            <div className="text-center text-gray-400 mb-24 bg-white p-16 rounded-3xl border border-gray-100 border-dashed max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wand2 className="w-10 h-10 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Need Ideas?</h3>
                <p className="text-lg">Try keywords like <span className="text-purple-500 font-bold cursor-pointer hover:underline" onClick={() => setKeyword('Digital')}>"Digital"</span>, <span className="text-pink-500 font-bold cursor-pointer hover:underline" onClick={() => setKeyword('Food')}>"Food"</span>.</p>
            </div>
        )}

        {/* --- SEO ARTICLE SECTION --- */}
        <article className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100 prose prose-purple prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Create a Memorable Brand Name?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="flex flex-col gap-3 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-yellow-600 shadow-sm"><Lightbulb size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">1. Simplicity Wins</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Short names are easier to remember. Think <strong>Uber</strong>, <strong>Nike</strong>, or <strong>Zoom</strong>.</p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><Target size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">2. Define Niche</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Your name should hint at what you do. Our AI adds smart prefixes like 'Tech' or 'Shop'.</p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm"><Globe size={24} /></div>
                    <h3 className="text-xl font-bold text-gray-900">3. .COM is King</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Always aim for the .com extension. It builds instant trust and authority.</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Why use our AI Name Generator?</h3>
            <p className="text-gray-600">
                Brainstorming business names manually can be exhausting. Most dictionary words are already taken. 
                NameDotify uses advanced algorithms to combine your keywords with industry-specific prefixes 
                and suffixes, generating unique, brandable, and SEO-friendly domain ideas in milliseconds.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8">FAQ</h3>
            <div className="space-y-4 not-prose mt-4">
                <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
                    <summary className="font-bold text-gray-800 flex justify-between items-center list-none">
                        Are these domain names really free?
                        <span className="transition group-open:rotate-180">▼</span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">The name ideas are free to generate. To own the domain, you must register it with a provider.</p>
                </details>
            </div>
        </article>

      </div>
    </div>
  );
}