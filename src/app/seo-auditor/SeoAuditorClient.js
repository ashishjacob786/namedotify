"use client";
import React, { useState } from 'react';
import { 
  Search, Globe, FileText, Activity, AlertTriangle, 
  CheckCircle, XCircle, ChevronRight, Loader2, Link as LinkIcon, 
  Image as ImageIcon, Zap, Download
} from 'lucide-react';

export default function SeoAuditorClient() {
  const [url, setUrl] = useState('');
  const [scanMode, setScanMode] = useState('single'); // 'single' or 'entire'
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  const startAudit = async (e) => {
    e.preventDefault();
    if (!url) return;

    // URL में http/https नहीं है तो लगा दो
    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsScanning(true);
    setProgress(0);
    setResults(null);

    // 🚀 Fake Progress animation while real API fetches data
    const interval = setInterval(() => {
      setProgress((old) => Math.min(old + Math.random() * 10, 85)); // 85% पर रुक जाएगा
    }, 300);

    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl, mode: scanMode }),
      });

      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);

      if (data.success) {
        // API से आये डेटा में Icons ऐड करना
        const formattedIssues = data.data.issues.map(issue => ({
          ...issue,
          icon: issue.type === 'error' ? <XCircle size={16}/> : 
                issue.type === 'warning' ? <AlertTriangle size={16}/> : 
                <CheckCircle size={16}/>
        }));

        // रिजल्ट्स सेट कर दो
        setTimeout(() => {
          setResults({ ...data.data, issues: formattedIssues });
          setIsScanning(false);
        }, 500); // 100% होने का फील देने के लिए आधा सेकंड का डिले
        
      } else {
        alert('Audit Failed: ' + data.error);
        setIsScanning(false);
      }
    } catch (err) {
      clearInterval(interval);
      alert('SYSTEM ERROR: Could not connect to the target server.');
      setIsScanning(false);
    }
  };

  // 📊 Mock Results Generation for UI testing
  const generateMockResults = () => {
    setResults({
      healthScore: Math.floor(Math.random() * 20) + 75, // 75-95 score
      mode: scanMode,
      metrics: {
        errors: Math.floor(Math.random() * 10),
        warnings: Math.floor(Math.random() * 25) + 5,
        passed: Math.floor(Math.random() * 50) + 40,
      },
      issues: [
        { type: 'error', text: 'Missing H1 Tag on homepage', icon: <AlertTriangle size={16}/> },
        { type: 'error', text: '3 Broken internal links (404)', icon: <LinkIcon size={16}/> },
        { type: 'warning', text: '12 Images missing ALT attributes', icon: <ImageIcon size={16}/> },
        { type: 'warning', text: 'Meta description is too short (under 50 chars)', icon: <FileText size={16}/> },
        { type: 'success', text: 'SSL Certificate is valid and active', icon: <CheckCircle size={16}/> },
        { type: 'success', text: 'Mobile viewport is configured correctly', icon: <Zap size={16}/> },
      ]
    });
  };

  return (
    <div className="w-full">
      {/* --- INPUT & TOGGLE SECTION --- */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <div className="p-8">
          <form onSubmit={startAudit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-lg font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isScanning ? (
                  <><Loader2 className="animate-spin" size={20} /> Analyzing...</>
                ) : (
                  <><Search size={20} /> Audit Now</>
                )}
              </button>
            </div>

            {/* ✅ ADVANCED TOGGLE SWITCH */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 bg-gray-50 p-2 rounded-xl w-fit mx-auto border border-gray-200">
              <button
                type="button"
                onClick={() => setScanMode('single')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  scanMode === 'single' 
                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText size={16} /> Single Page
              </button>
              <button
                type="button"
                onClick={() => setScanMode('entire')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  scanMode === 'entire' 
                    ? 'bg-white text-indigo-700 shadow-sm border border-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Activity size={16} /> Entire Website
              </button>
            </div>
          </form>
        </div>

        {/* --- SCANNING PROGRESS BAR --- */}
        {isScanning && (
          <div className="px-8 pb-8">
            <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
              <span>{scanMode === 'entire' ? 'Deep Crawling Sitemap & Pages...' : 'Analyzing DOM & Meta Tags...'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- RESULTS DASHBOARD --- */}
      {results && !isScanning && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">Audit Report</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              <Download size={16} /> Export PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Health Score Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                  <circle 
                    cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={351.8} 
                    strokeDashoffset={351.8 - (351.8 * results.healthScore) / 100}
                    className={`${results.healthScore >= 80 ? 'text-green-500' : 'text-orange-500'} transition-all duration-1000 ease-out`} 
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-4xl font-black text-gray-900">{results.healthScore}</span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">SEO Health Score</h3>
              <p className="text-sm text-gray-500 mt-1">
                {results.mode === 'entire' ? 'Based on full site crawl' : 'Based on single page analysis'}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-3xl p-6 border border-red-100 flex flex-col justify-center">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <XCircle size={20} />
                </div>
                <span className="text-4xl font-black text-red-600">{results.metrics.errors}</span>
                <span className="text-sm font-bold text-red-800 mt-1">Critical Errors</span>
              </div>
              <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 flex flex-col justify-center">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={20} />
                </div>
                <span className="text-4xl font-black text-orange-600">{results.metrics.warnings}</span>
                <span className="text-sm font-bold text-orange-800 mt-1">Warnings</span>
              </div>
              <div className="bg-green-50 rounded-3xl p-6 border border-green-100 flex flex-col justify-center">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={20} />
                </div>
                <span className="text-4xl font-black text-green-600">{results.metrics.passed}</span>
                <span className="text-sm font-bold text-green-800 mt-1">Passed Checks</span>
              </div>
            </div>
          </div>

          {/* Detailed Issues List */}
          <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Actionable Insights</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {results.issues.map((issue, index) => (
                <div key={index} className="p-5 flex items-start gap-4 hover:bg-gray-50 transition">
                  <div className={`mt-0.5 ${
                    issue.type === 'error' ? 'text-red-500' : 
                    issue.type === 'warning' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {issue.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{issue.text}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {issue.type === 'error' ? 'Needs immediate fixing to prevent ranking drops.' : 
                       issue.type === 'warning' ? 'Fixing this will improve user experience and visibility.' : 
                       'Great job! Keep this up.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}