"use client";
import React, { useState, useEffect } from 'react';
import { 
  Link as LinkIcon, Copy, CheckCircle, HelpCircle, 
  Share2, Mail, MousePointerClick, RefreshCw, 
  Target, Globe, ExternalLink, Activity
} from 'lucide-react';

export default function UtmClient() {
  // Input States
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  // Output State
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Live URL Generation Logic
  useEffect(() => {
    if (!url.trim()) {
        setGeneratedUrl('');
        return;
    }

    try {
        // Ensure valid base URL formatting
        let baseUrl = url.trim();
        if (!/^https?:\/\//i.test(baseUrl)) {
            baseUrl = 'https://' + baseUrl;
        }

        const parsedUrl = new URL(baseUrl);
        
        // Add UTMs securely
        if (source) parsedUrl.searchParams.set('utm_source', source.trim());
        else parsedUrl.searchParams.delete('utm_source');
        
        if (medium) parsedUrl.searchParams.set('utm_medium', medium.trim());
        else parsedUrl.searchParams.delete('utm_medium');
        
        if (campaign) parsedUrl.searchParams.set('utm_campaign', campaign.trim());
        else parsedUrl.searchParams.delete('utm_campaign');
        
        if (term) parsedUrl.searchParams.set('utm_term', term.trim());
        else parsedUrl.searchParams.delete('utm_term');
        
        if (content) parsedUrl.searchParams.set('utm_content', content.trim());
        else parsedUrl.searchParams.delete('utm_content');

        setGeneratedUrl(parsedUrl.toString());
    } catch (e) {
        setGeneratedUrl('Invalid Base URL format');
    }
  }, [url, source, medium, campaign, term, content]);

  // Copy to Clipboard
  const handleCopy = () => {
    if (!generatedUrl || generatedUrl === 'Invalid Base URL format') return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
      setUrl(''); setSource(''); setMedium(''); 
      setCampaign(''); setTerm(''); setContent('');
  };

  // Quick Presets
  const applyPreset = (presetSource, presetMedium) => {
      setSource(presetSource);
      setMedium(presetMedium);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm border border-blue-200">
                <Target size={14} className="mr-2" /> Marketing Campaign Tracker
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
                UTM Link <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Builder</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Generate trackable URLs for Google Analytics instantly. Accurately monitor your ad campaigns, emails, and social media traffic.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 relative">
            
            {/* LEFT: INPUT FORM (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Quick Presets */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Auto-Fill Presets</h3>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => applyPreset('google', 'cpc')} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition text-sm font-semibold text-slate-600">
                            <MousePointerClick size={16}/> Google Ads
                        </button>
                        <button onClick={() => applyPreset('facebook', 'paid_social')} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition text-sm font-semibold text-slate-600">
                            <Share2 size={16}/> FB / Insta Ads
                        </button>
                        <button onClick={() => applyPreset('newsletter', 'email')} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition text-sm font-semibold text-slate-600">
                            <Mail size={16}/> Email Newsletter
                        </button>
                    </div>
                </div>

                {/* 2. Main Inputs */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    
                    {/* Website URL */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Website URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="url" required
                                placeholder="https://namedotify.com/my-product" 
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition font-medium text-slate-800"
                                value={url} onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Source */}
                        <div>
                            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                                Campaign Source <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" placeholder="e.g. google, newsletter" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition text-slate-800"
                                value={source} onChange={(e) => setSource(e.target.value.toLowerCase())}
                            />
                            <p className="text-xs text-slate-400 mt-2 flex items-start gap-1"><HelpCircle size={12} className="mt-0.5 flex-shrink-0"/> Referrer (e.g. google, facebook)</p>
                        </div>
                        
                        {/* Medium */}
                        <div>
                            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                                Campaign Medium <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" placeholder="e.g. cpc, banner, email" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition text-slate-800"
                                value={medium} onChange={(e) => setMedium(e.target.value.toLowerCase())}
                            />
                            <p className="text-xs text-slate-400 mt-2 flex items-start gap-1"><HelpCircle size={12} className="mt-0.5 flex-shrink-0"/> Marketing medium (e.g. cpc, email)</p>
                        </div>
                    </div>

                    {/* Campaign Name */}
                    <div>
                        <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                            Campaign Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" placeholder="e.g. spring_sale_2026" 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition text-slate-800"
                            value={campaign} onChange={(e) => setCampaign(e.target.value.replace(/\s+/g, '_'))}
                        />
                        <p className="text-xs text-slate-400 mt-2">Product, promo code, or slogan (e.g. summer_sale)</p>
                    </div>

                    <div className="h-px bg-slate-100 my-4"></div>

                    {/* Optional Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80 focus-within:opacity-100 transition-opacity">
                        {/* Term */}
                        <div>
                            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                                Campaign Term <span className="text-slate-400 font-normal text-xs">(Optional)</span>
                            </label>
                            <input 
                                type="text" placeholder="e.g. running+shoes" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition text-slate-800"
                                value={term} onChange={(e) => setTerm(e.target.value)}
                            />
                            <p className="text-xs text-slate-400 mt-2">Identify the paid keywords</p>
                        </div>
                        
                        {/* Content */}
                        <div>
                            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                                Campaign Content <span className="text-slate-400 font-normal text-xs">(Optional)</span>
                            </label>
                            <input 
                                type="text" placeholder="e.g. logolink, textlink" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition text-slate-800"
                                value={content} onChange={(e) => setContent(e.target.value)}
                            />
                            <p className="text-xs text-slate-400 mt-2">Use to differentiate ads (A/B testing)</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* RIGHT: LIVE OUTPUT (Col 5) */}
            <div className="lg:col-span-5">
                <div className="sticky top-28 bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden border border-slate-800">
                    
                    {/* Decorative Background Blur */}
                    <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                        <LinkIcon className="text-blue-400"/> Generated URL
                    </h2>

                    <div className="bg-[#0f1115] rounded-2xl p-6 border border-slate-700/50 min-h-[150px] mb-8 font-mono text-sm break-all leading-relaxed relative">
                        {generatedUrl && generatedUrl !== 'Invalid Base URL format' ? (
                            <>
                                <span className="text-slate-300">{generatedUrl.split('?')[0]}</span>
                                {generatedUrl.includes('?') && <span className="text-blue-400">?</span>}
                                <span className="text-emerald-400">{generatedUrl.split('?')[1]?.replace(/&/g, '\n&')}</span>
                            </>
                        ) : (
                            <span className="text-slate-600 flex items-center h-full justify-center text-center opacity-50">
                                Enter a valid URL and parameters to see the result here...
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleCopy}
                            disabled={!generatedUrl || generatedUrl === 'Invalid Base URL format'}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-lg shadow-lg active:scale-95 ${
                                copied 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/20' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed'
                            }`}
                        >
                            {copied ? <CheckCircle size={22} /> : <Copy size={22} />}
                            {copied ? 'Copied to Clipboard!' : 'Copy UTM Link'}
                        </button>

                        <div className="flex gap-4">
                            <button 
                                onClick={clearAll}
                                className="flex-1 py-3 bg-transparent border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm"
                            >
                                <RefreshCw size={16}/> Clear All
                            </button>
                            <a 
                                href={generatedUrl && generatedUrl !== 'Invalid Base URL format' ? generatedUrl : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm ${
                                    generatedUrl && generatedUrl !== 'Invalid Base URL format' 
                                    ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                                    : 'bg-slate-800/50 text-slate-600 border border-slate-800 cursor-not-allowed pointer-events-none'
                                }`}
                            >
                                Test Link <ExternalLink size={16}/>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 prose prose-blue max-w-none mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Mastering UTM Parameters for Campaign Tracking</h2>
            <p className="text-slate-600 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-12">
                UTM (Urchin Tracking Module) parameters are five variants of URL parameters used by marketers to track the effectiveness of online marketing campaigns across traffic sources and publishing media.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mb-12">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2"><Globe size={18} className="text-blue-600"/> utm_source</h3>
                    <p className="text-blue-800/80 text-sm">Identifies which site sent the traffic. Examples: <strong>google</strong>, <strong>facebook</strong>, <strong>newsletter</strong>.</p>
                </div>
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-900 text-lg mb-2 flex items-center gap-2"><Activity size={18} className="text-indigo-600"/> utm_medium</h3>
                    <p className="text-indigo-800/80 text-sm">Identifies what type of link was used. Examples: <strong>cpc</strong> (cost per click), <strong>email</strong>, <strong>social</strong>.</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <h3 className="font-bold text-purple-900 text-lg mb-2 flex items-center gap-2"><Target size={18} className="text-purple-600"/> utm_campaign</h3>
                    <p className="text-purple-800/80 text-sm">Identifies a specific product promotion or strategic campaign. Example: <strong>spring_sale_2026</strong>.</p>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 not-prose">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Best Practices for UTM Tagging</h3>
                <ul className="space-y-4 text-slate-600">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Use lowercase letters only:</strong> Google Analytics is case-sensitive. `utm_source=Facebook` and `utm_source=facebook` will show up as two different sources.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Use underscores instead of spaces:</strong> Spaces in URLs are converted to `%20` which makes them ugly and hard to read. Use `spring_sale` instead of `spring sale`.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Don't use UTMs for internal links:</strong> Never put UTM parameters on links pointing from one page of your website to another page of your website. It will overwrite the original referrer data in Analytics.</div>
                    </li>
                </ul>
            </div>
        </article>

      </div>
    </div>
  );
}