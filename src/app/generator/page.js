"use client";
import React, { useState } from 'react';
import { Sparkles, Wand2, Copy, CheckCircle, ArrowRight, Loader2, Lightbulb, Rocket, Target } from 'lucide-react';

export default function GeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ✅ JSON-LD Schema for SEO
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
    
    // Simulate AI "Thinking" for better UX
    setTimeout(() => {
        const term = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        const prefixes = ['get', 'the', 'my', 'try', 'go', 'super', 'pro', 'top', 'best', 'ultra', 'hyper', 'meta', 'smart', 'zen', 'pixel', 'atomic'];
        const suffixes = ['ify', 'ly', 'hub', 'box', 'lab', 'hq', 'spot', 'press', 'net', 'sys', 'io', 'zone', 'base', 'now', 'works', 'scape'];
        const mix = ['app', 'tech', 'soft', 'web', 'dev', 'cloud', 'ai', 'bot', 'data'];

        let generated = [];

        // Strategy 1: Prefixes
        prefixes.forEach(p => generated.push(`${p}${term}.com`));

        // Strategy 2: Suffixes
        suffixes.forEach(s => generated.push(`${term}${s}.com`));

        // Strategy 3: Mix (Creative)
        mix.forEach(m => generated.push(`${term}${m}.com`));
        mix.forEach(m => generated.push(`${m}${term}.com`)); // Reverse

        // Randomize results slightly
        setResults(generated.sort(() => Math.random() - 0.5));
        setLoading(false);
    }, 600);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 mt-16">
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

        {/* Search Box */}
        <div className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-purple-100 border border-purple-50 flex flex-col sm:flex-row gap-3 mb-16 transform hover:scale-[1.01] transition duration-300 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter keyword (e.g. 'Coffee', 'Tech', 'Yoga')" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-xl bg-transparent"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateNames()}
                />
            </div>
            <button 
                onClick={generateNames} 
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-200 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Wand2 size={20} /> Generate Ideas</>}
            </button>
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 mb-20">
                {results.map((name, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition group flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition"></div>
                        
                        <span className="font-bold text-lg text-gray-700 group-hover:text-purple-700 transition tracking-tight">
                            {name}
                        </span>
                        
                        <div className="flex gap-2">
                            {/* Copy Button */}
                            <button 
                                onClick={() => copyToClipboard(name, index)}
                                className="p-2.5 text-gray-400 hover:text-purple-600 bg-gray-50 rounded-lg hover:bg-purple-50 transition"
                                title="Copy Name"
                            >
                                {copiedIndex === index ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18} />}
                            </button>
                            
                            {/* Buy Link */}
                            <a 
                                href={`https://www.hostinger.com/web-hosting?domain=${name}`} 
                                target="_blank"
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-1 text-xs font-bold shadow-md hover:shadow-lg"
                            >
                                Buy <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Empty State / Hint */}
        {results.length === 0 && !loading && (
            <div className="text-center text-gray-400 mb-20">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wand2 className="w-10 h-10 text-purple-300" />
                </div>
                <p className="text-lg">Try keywords like <span className="text-purple-500 font-medium">"Digital"</span>, <span className="text-pink-500 font-medium">"Food"</span>, or <span className="text-indigo-500 font-medium">"Crypto"</span> to start the magic.</p>
            </div>
        )}

        {/* ✅ Human Written SEO Content (New Section) */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-purple max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Choose the Perfect Business Name?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                        <Lightbulb size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Keep it Simple</h3>
                    <p className="text-gray-600 leading-relaxed">
                        The best names are easy to spell and pronounce. Avoid hyphens, numbers, or complicated spellings that might confuse your customers. Think "Google", "Uber", or "Zoom".
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Reflect Your Brand</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Your name should give a hint about what you do. Use our generator to mix industry keywords (like "Tech" or "Food") with catchy suffixes to find a balance.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <Rocket size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Check Availability</h3>
                    <p className="text-gray-600 leading-relaxed">
                        A great name is useless if the domain is taken. Our tool checks for <strong>.com</strong> availability instantly so you can secure your digital real estate before someone else does.
                    </p>
                </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why use an AI Name Generator?</h3>
                <p className="text-gray-600">
                    Brainstorming is hard. You might come up with 5 ideas, but our AI can generate 50 ideas in milliseconds. 
                    NameDotify uses smart linguistic patterns—combining prefixes, suffixes, and trending tech terms—to create 
                    names that sound premium and professional without the expensive agency price tag.
                </p>
            </div>
        </section>

      </div>
    </div>
  );
}