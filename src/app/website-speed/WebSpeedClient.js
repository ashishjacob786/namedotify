"use client";
import React, { useState, useEffect } from 'react';
import { 
  Globe, Smartphone, Monitor, Search, Zap, 
  Activity, AlertTriangle, CheckCircle, Clock, 
  ChevronDown, ArrowRight, Loader2, Gauge, AlertCircle
} from 'lucide-react';

export default function WebSpeedClient() {
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState('mobile'); // 'mobile' | 'desktop'
  
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  // Cycling loading text for advanced feel
  useEffect(() => {
    if (!loading) return;
    const texts = [
      "Establishing connection...",
      "Analyzing DOM structure...",
      "Measuring Server Response (TTFB)...",
      "Calculating First Contentful Paint...",
      "Evaluating Core Web Vitals...",
      "Compiling Lighthouse Diagnostic Report...",
      "Almost done..."
    ];
    let i = 0;
    setLoadingText(texts[0]);
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  const runAnalysis = async (e) => {
    e.preventDefault();
    let targetUrl = url.trim();
    if (!targetUrl) return;
    
    // Auto-add https if missing
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
        setUrl(targetUrl);
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      // Google PageSpeed Insights API (Free Endpoint)
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=${device.toUpperCase()}&category=performance`;
      
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.error) {
          throw new Error(result.error.message || "Could not analyze the website. Check the URL.");
      }

      const lighthouse = result.lighthouseResult;
      const audits = lighthouse.audits;

      // Extract Performance Data
      const parsedData = {
          score: Math.round(lighthouse.categories.performance.score * 100),
          fcp: audits['first-contentful-paint'].displayValue,
          lcp: audits['largest-contentful-paint'].displayValue,
          tbt: audits['total-blocking-time'].displayValue,
          cls: audits['cumulative-layout-shift'].displayValue,
          speedIndex: audits['speed-index'].displayValue,
          
          // Filter out opportunities (ways to make it faster)
          opportunities: Object.values(audits)
              .filter(audit => audit.details && audit.details.type === 'opportunity' && audit.score < 1)
              .sort((a, b) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0)),
          
          // Filter out diagnostics (errors/warnings)
          diagnostics: Object.values(audits)
              .filter(audit => audit.score < 1 && audit.score !== null && !audit.details?.type === 'opportunity' && audit.id !== 'diagnostics')
              .slice(0, 6) // Top 6 errors
      };

      setData(parsedData);
    } catch (err) {
      setError(err.message || 'Network Error. Could not connect to Google Lighthouse API.');
    } finally {
      setLoading(false);
    }
  };

  // Helper for color coding scores
  const getScoreColor = (score) => {
      if (score >= 90) return 'text-green-500 stroke-green-500';
      if (score >= 50) return 'text-orange-500 stroke-orange-500';
      return 'text-red-500 stroke-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm border border-indigo-200">
                <Gauge size={14} className="mr-2" /> Powered by Google Lighthouse
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Speed Checker</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Find out why your website is slow. Get detailed Core Web Vitals and actionable insights to achieve a 100/100 score.
            </p>
        </header>

        {/* --- SEARCH BAR --- */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 mb-12 relative z-10">
            <form onSubmit={runAnalysis} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="url" 
                        required
                        placeholder="Enter webpage URL (e.g. https://namedotify.com)" 
                        className="w-full h-full p-4 pl-12 outline-none text-lg rounded-2xl bg-slate-50 focus:bg-white transition border border-transparent focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                
                {/* Device Toggle */}
                <div className="flex bg-slate-100 rounded-2xl p-1 border border-slate-200 w-full sm:w-auto">
                    <button type="button" onClick={() => setDevice('mobile')} className={`flex-1 sm:w-24 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition ${device === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Smartphone size={16}/> Mobile
                    </button>
                    <button type="button" onClick={() => setDevice('desktop')} className={`flex-1 sm:w-24 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition ${device === 'desktop' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Monitor size={16}/> Desktop
                    </button>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 active:scale-95 shadow-lg shadow-indigo-200"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                    Analyze
                </button>
            </form>
        </div>

        {/* --- ERROR MESSAGE --- */}
        {error && (
            <div className="max-w-4xl mx-auto bg-red-50 text-red-700 p-5 rounded-2xl border border-red-200 flex items-start gap-3 mb-8">
                <AlertCircle size={24} className="flex-shrink-0 mt-0.5" /> 
                <div>
                    <h4 className="font-bold">Analysis Failed</h4>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        )}

        {/* --- LOADING STATE (Advanced Overlay) --- */}
        {loading && (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center animate-in fade-in zoom-in duration-300">
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <svg className="animate-spin w-full h-full text-indigo-100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="currentColor"/>
                    </svg>
                    <svg className="animate-spin w-full h-full text-indigo-600 absolute top-0 left-0" viewBox="0 0 100 100" style={{animationDuration: '2s'}}>
                        <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="currentColor" strokeDasharray="283" strokeDashoffset="200" strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                        <Activity size={32} className="animate-pulse"/>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Running Diagnostics</h3>
                <p className="text-slate-500 font-medium animate-pulse">{loadingText}</p>
                <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto mt-6 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full animate-[progress_15s_ease-in-out_forwards] w-0"></div>
                </div>
                <p className="text-xs text-slate-400 mt-4">This usually takes 10-15 seconds via Google API.</p>
            </div>
        )}

        {/* --- RESULTS DASHBOARD --- */}
        {data && !loading && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                
                {/* 1. TOP METRICS (Score & Vitals) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Overall Score Circle */}
                    <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                        <h3 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-6">Performance Score</h3>
                        
                        <div className="relative w-48 h-48 mb-4 flex items-center justify-center">
                            {/* SVG Circle Gauge */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" className="stroke-slate-100" />
                                <circle 
                                    cx="50" cy="50" r="45" fill="none" strokeWidth="8" 
                                    className={`transition-all duration-1000 ease-out ${getScoreColor(data.score)}`}
                                    strokeDasharray="282.7" 
                                    strokeDashoffset={282.7 - (282.7 * data.score) / 100} 
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-6xl font-black ${getScoreColor(data.score).split(' ')[0]}`}>{data.score}</span>
                            </div>
                        </div>

                        {/* Score Scale Legend */}
                        <div className="flex gap-4 text-xs font-bold text-slate-400 mt-4">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> 0-49</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> 50-89</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> 90-100</span>
                        </div>
                    </div>

                    {/* Core Web Vitals Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <MetricCard title="First Contentful Paint" value={data.fcp} desc="Marks the time at which the first text or image is painted." icon={<Clock/>}/>
                        <MetricCard title="Largest Contentful Paint" value={data.lcp} desc="Measures loading performance. Target is < 2.5s." icon={<Monitor/>}/>
                        <MetricCard title="Total Blocking Time" value={data.tbt} desc="Sum of all time periods where the main thread was blocked." icon={<AlertTriangle/>}/>
                        <MetricCard title="Cumulative Layout Shift" value={data.cls} desc="Measures visual stability. Target is < 0.1." icon={<Zap/>}/>
                    </div>
                </div>

                {/* 2. OPPORTUNITIES (How to fix) */}
                {data.opportunities.length > 0 && (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Zap className="text-orange-500" /> Opportunities (How to make it faster)
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">These suggestions can help your page load faster. They don't directly affect the Performance score.</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {data.opportunities.map((item, index) => (
                                <details key={index} className="group p-6 hover:bg-slate-50 transition cursor-pointer">
                                    <summary className="flex items-center justify-between font-medium text-slate-800 list-none outline-none">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                            {item.title}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full whitespace-nowrap">
                                                Save {item.displayValue}
                                            </span>
                                            <ChevronDown size={18} className="text-slate-400 group-open:rotate-180 transition" />
                                        </div>
                                    </summary>
                                    <div className="mt-4 pl-5 text-sm text-slate-600 border-l-2 border-slate-200 ml-1 leading-relaxed markdown-content" dangerouslySetInnerHTML={{ __html: item.description.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 underline hover:text-indigo-800">$1</a>') }} />
                                </details>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. DIAGNOSTICS (Errors & Warnings) */}
                {data.diagnostics.length > 0 && (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <AlertCircle className="text-red-500" /> Diagnostics & Errors
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">More information about the performance of your application.</p>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.diagnostics.map((item, index) => (
                                <div key={index} className="flex gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl">
                                    <div className="mt-0.5"><AlertTriangle size={16} className="text-slate-400"/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                                        <p className="text-xs text-slate-500" dangerouslySetInnerHTML={{ __html: item.description.split('.')[0] + '.' }}></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* --- SEO & GUIDE CONTENT --- */}
        <section className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 prose prose-indigo max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Page Speed Matters in 2026</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-10">
                <div className="p-6 bg-indigo-50 rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-4"><Zap size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">SEO Rankings</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Google uses Core Web Vitals as a direct ranking factor. Faster sites consistently rank higher in search results than slower competitors.</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4"><Activity size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Lower Bounce Rate</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">If a page takes longer than 3 seconds to load, over 53% of mobile users will abandon the site. Speed directly retains visitors.</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4"><CheckCircle size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">More Sales & Conversions</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">For e-commerce sites, a 1-second delay in page response can result in a 7% reduction in conversions. Speed equals revenue.</p>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">How to improve your Lighthouse Score?</h3>
                <ul className="space-y-4 not-prose">
                    <li className="flex gap-3">
                        <ArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Optimize Images:</strong> Serve images in next-gen formats like WebP or AVIF and ensure they are properly sized for mobile devices.</div>
                    </li>
                    <li className="flex gap-3">
                        <ArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Minify CSS & JavaScript:</strong> Remove unnecessary spaces, comments, and unused code from your files to reduce load payload.</div>
                    </li>
                    <li className="flex gap-3">
                        <ArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Use a Fast CDN:</strong> A Content Delivery Network like Cloudflare serves your website files from servers closest to your users.</div>
                    </li>
                    <li className="flex gap-3">
                        <ArrowRight className="text-indigo-500 mt-1 flex-shrink-0" size={18}/>
                        <div><strong>Enable Browser Caching:</strong> Store static assets in the user's browser so they don't have to download them again on repeat visits.</div>
                    </li>
                </ul>
            </div>
        </section>

      </div>

      <style jsx global>{`
        @keyframes progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 95%; }
        }
      `}</style>
    </div>
  );
}

// Sub-component for Metrics
function MetricCard({ title, value, desc, icon }) {
    // Determine color based on common Lighthouse thresholds (simplified)
    const valNum = parseFloat(value);
    let colorClass = 'text-green-600 bg-green-50 border-green-200';
    
    if (title.includes('Layout Shift')) {
        if (valNum > 0.25) colorClass = 'text-red-600 bg-red-50 border-red-200';
        else if (valNum > 0.1) colorClass = 'text-orange-600 bg-orange-50 border-orange-200';
    } else {
        // Time based (seconds or ms)
        if (value.includes('s') && !value.includes('ms')) {
            if (valNum > 4) colorClass = 'text-red-600 bg-red-50 border-red-200';
            else if (valNum > 2.5) colorClass = 'text-orange-600 bg-orange-50 border-orange-200';
        } else if (value.includes('ms')) {
             if (valNum > 600) colorClass = 'text-red-600 bg-red-50 border-red-200';
             else if (valNum > 200) colorClass = 'text-orange-600 bg-orange-50 border-orange-200';
        }
    }

    return (
        <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-700 text-sm max-w-[150px]">{title}</h4>
                <div className={`p-2 rounded-xl border ${colorClass} bg-opacity-50`}>
                    {icon}
                </div>
            </div>
            <div>
                <div className={`text-3xl font-black mb-1 ${colorClass.split(' ')[0]}`}>{value}</div>
                <p className="text-xs text-slate-500 line-clamp-2">{desc}</p>
            </div>
        </div>
    );
}