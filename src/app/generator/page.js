"use client";
import React, { useState } from 'react';
import { Sparkles, Wand2, Copy, CheckCircle, ArrowRight } from 'lucide-react';

export default function GeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateNames = () => {
    if (!keyword.trim()) return;
    
    const term = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const prefixes = ['get', 'the', 'my', 'try', 'go', 'super', 'pro', 'top', 'best', 'ultra', 'hyper', 'meta', 'smart'];
    const suffixes = ['ify', 'ly', 'hub', 'box', 'lab', 'hq', 'spot', 'press', 'net', 'sys', 'io', 'zone', 'base', 'now'];
    const mix = ['app', 'tech', 'soft', 'web', 'dev', 'cloud'];

    let generated = [];

    // Strategy 1: Prefixes
    prefixes.forEach(p => generated.push(`${p}${term}.com`));

    // Strategy 2: Suffixes
    suffixes.forEach(s => generated.push(`${term}${s}.com`));

    // Strategy 3: Mix (Creative)
    mix.forEach(m => generated.push(`${term}${m}.com`));
    mix.forEach(m => generated.push(`${m}${term}.com`));

    setResults(generated);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 mt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                <Sparkles className="text-pink-500 w-10 h-10" /> Domain Generator
            </h1>
            <p className="text-gray-600 text-lg">Enter a keyword, and we'll generate creative business name ideas for you.</p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex gap-2 mb-12 transform hover:scale-[1.01] transition duration-300">
            <input 
                type="text" 
                placeholder="Enter a keyword (e.g. 'Coffee', 'Tech')" 
                className="flex-1 p-4 outline-none text-lg rounded-xl"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateNames()}
            />
            <button 
                onClick={generateNames} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center gap-2"
            >
                <Wand2 size={20} />
                Generate
            </button>
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {results.map((name, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition group flex justify-between items-center">
                        <span className="font-medium text-lg text-gray-700 group-hover:text-purple-600 transition">{name}</span>
                        
                        <div className="flex gap-2">
                            {/* Copy Button */}
                            <button 
                                onClick={() => copyToClipboard(name, index)}
                                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                title="Copy Name"
                            >
                                {copiedIndex === index ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18} />}
                            </button>
                            
                            {/* Check Availability Link (Goes to Home) */}
                            <a 
                                href={`https://www.hostinger.com/web-hosting?domain=${name}`} 
                                target="_blank"
                                className="p-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition flex items-center gap-1 text-xs font-bold"
                            >
                                Buy <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Empty State / Hint */}
        {results.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
                <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Try keywords like "Food", "Code", "Travel" to start magic.</p>
            </div>
        )}

      </div>
    </div>
  );
}