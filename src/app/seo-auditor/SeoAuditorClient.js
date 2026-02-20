"use client";
import React, { useState, useEffect } from 'react';
import { Search, Globe, FileText, Activity, AlertTriangle, CheckCircle, XCircle, Loader2, Link as LinkIcon, Download, Terminal } from 'lucide-react';

export default function SeoAuditorClient() {
  const [url, setUrl] = useState('');
  const [scanMode, setScanMode] = useState('single');
  const [scanState, setScanState] = useState('idle'); // idle, scanning, finalizing, done
  const [progress, setProgress] = useState(0);
  const [currentActionText, setCurrentActionText] = useState('');
  const [results, setResults] = useState(null);

  // 20 सेकंड वाले इफ़ेक्ट के लिए हैकर मैसेज
  const finalizingMessages = [
    "Aggregating deeply crawled data...",
    "Analyzing internal link structures...",
    "Checking keyword density across pages...",
    "Calculating Domain Health Score...",
    "Cross-referencing with Google Core Vitals...",
    "Compiling final actionable insights...",
    "Generating secure PDF report structure...",
    "Finalizing SEO Audit..."
  ];

  // 🚀 WEBMCP (Model Context Protocol) SETUP FOR AI AGENTS
  useEffect(() => {
    // चेक करें कि ब्राउज़र WebMCP सपोर्ट करता है या नहीं
    if (typeof window !== 'undefined' && window.navigator && 'modelContext' in window.navigator) {
      try {
        window.navigator.modelContext.registerTool({
          name: "run_seo_audit",
          description: "Runs an advanced SEO audit on a given URL using NameDotify.",
          parameters: {
            type: "object",
            properties: {
              targetUrl: { type: "string", description: "The full URL of the website to audit (e.g., https://example.com)" },
              scanType: { type: "string", enum: ["single", "entire"], description: "Choose 'single' for one page, or 'entire' for a deep sitemap crawl." }
            },
            required: ["targetUrl"]
          },
          // जब AI Agent इसे कॉल करेगा, तो यह फंक्शन चलेगा
          handler: async (params) => {
            console.log("🤖 AI Agent initiated SEO Audit for:", params.targetUrl);
            const aiMode = params.scanType || 'single';
            
            // AI से मिले डेटा को स्टेट में सेट करें
            setUrl(params.targetUrl);
            setScanMode(aiMode);
            
            // AI के लिए सीधे स्कैन चालू करें (बिना बटन क्लिक के)
            startAudit(null, params.targetUrl, aiMode);

            return { 
              status: "success", 
              message: `SEO Audit initialized for ${params.targetUrl}. The NameDotify UI is now actively processing the deep scan.` 
            };
          }
        });
        console.log("✅ WebMCP Protocol Active: SEO Tool is now Agent-Ready!");
      } catch (err) {
        console.error("WebMCP Registration Failed:", err);
      }
    }
  }, []);

  // 🤖 AI और Human दोनों के लिए स्मार्ट ऑडिट फंक्शन
  const startAudit = async (e, overrideUrl = null, overrideMode = null) => {
    if (e) e.preventDefault(); // अगर इंसान ने क्लिक किया है
    
    const currentUrl = overrideUrl || url;
    const currentMode = overrideMode || scanMode;

    if (!currentUrl) return;

    let targetUrl = currentUrl;
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    setScanState('scanning');
    setProgress(0);
    setResults(null);
    setCurrentActionText('Initializing Web Crawler...');

    try {
      let urlsToScan = [targetUrl];
      
      // 1. अगर Entire Website है, तो पहले सारे लिंक्स निकालो
      if (currentMode === 'entire') {
        setCurrentActionText('Extracting sitemap and internal links...');
        const linkRes = await fetch('/api/seo-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl, action: 'get_links' }),
        });
        const linkData = await linkRes.json();
        if (linkData.success && linkData.links.length > 0) {
          urlsToScan = linkData.links;
        }
      }

      // 2. एक-एक करके पेजेस को स्कैन करो (असली क्रॉलिंग)
      let aggregatedData = { healthScore: 0, errors: 0, warnings: 0, passed: 0, issues: [] };
      
      for (let i = 0; i < urlsToScan.length; i++) {
        const urlToAnalyze = urlsToScan[i];
        setCurrentActionText(`Scanning URL (${i+1}/${urlsToScan.length}): ${urlToAnalyze}`);
        setProgress(((i) / urlsToScan.length) * 50); // स्कैनिंग 50% तक जाएगी

        const scanRes = await fetch('/api/seo-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlToAnalyze, action: 'analyze' }),
        });
        const scanData = await scanRes.json();

        if (scanData.success) {
          aggregatedData.errors += scanData.data.metrics.errors;
          aggregatedData.warnings += scanData.data.metrics.warnings;
          aggregatedData.passed += scanData.data.metrics.passed;
          aggregatedData.healthScore += scanData.data.healthScore;
          aggregatedData.issues = [...aggregatedData.issues, ...scanData.data.issues];
        }
      }

      // स्कोर का एवरेज निकालना
      aggregatedData.healthScore = Math.floor(aggregatedData.healthScore / urlsToScan.length);
      // Issues को लिमिट करना ताकि पेज क्रैश न हो
      aggregatedData.issues = aggregatedData.issues.slice(0, 15); 

      // 3. 20-Second Artificial Delay (Advanced Processing Effect)
      setScanState('finalizing');
      let msgIndex = 0;
      
      const delayInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2.5, 99)); // धीरे-धीरे 99% तक
        setCurrentActionText(finalizingMessages[msgIndex]);
        msgIndex++;
        
        if (msgIndex >= finalizingMessages.length) {
          clearInterval(delayInterval);
          // 20 सेकंड पूरे होने पर रिजल्ट दिखाओ
          setTimeout(() => {
            const formattedIssues = aggregatedData.issues.map((issue, idx) => ({
              ...issue,
              icon: issue.type === 'error' ? <XCircle size={16}/> : issue.type === 'warning' ? <AlertTriangle size={16}/> : <CheckCircle size={16}/>,
              key: idx
            }));
            
            setResults({
              healthScore: aggregatedData.healthScore,
              mode: currentMode,
              metrics: { errors: aggregatedData.errors, warnings: aggregatedData.warnings, passed: aggregatedData.passed },
              issues: formattedIssues
            });
            setScanState('done');
            setProgress(100);
          }, 2000);
        }
      }, 2500);

    } catch (err) {
      alert('SYSTEM ERROR: Crawler failed.');
      setScanState('idle');
    }
  };

  return (
    <div className="w-full">
      {/* INPUT SECTION */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="p-8">
          <form onSubmit={startAudit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
                />
              </div>
              <button
                type="submit" disabled={scanState !== 'idle' && scanState !== 'done'}
                className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 whitespace-nowrap"
              >
                {(scanState === 'scanning' || scanState === 'finalizing') ? <><Loader2 className="animate-spin" size={20} /> Analyzing...</> : <><Search size={20} /> Audit Now</>}
              </button>
            </div>

            {/* TOGGLE */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 bg-gray-50 p-2 rounded-xl w-fit mx-auto border border-gray-200">
              <button type="button" onClick={() => setScanMode('single')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${scanMode === 'single' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-gray-500'}`}>
                <FileText size={16} /> Single Page
              </button>
              <button type="button" onClick={() => setScanMode('entire')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${scanMode === 'entire' ? 'bg-white text-indigo-700 shadow-sm border border-gray-200' : 'text-gray-500'}`}>
                <Activity size={16} /> Entire Website (Deep Crawl)
              </button>
            </div>
          </form>
        </div>

        {/* 🚀 LIVE SCANNING & DELAY PROGRESS BAR */}
        {(scanState === 'scanning' || scanState === 'finalizing') && (
          <div className="px-8 pb-8">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-3 rounded-xl border border-gray-200">
              <Terminal size={16} className={scanState === 'finalizing' ? "text-green-600 animate-pulse" : "text-blue-600"} />
              <span className="truncate">{currentActionText}</span>
              <span className="ml-auto text-blue-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className={`h-2 rounded-full transition-all duration-500 ease-out relative ${scanState === 'finalizing' ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${progress}%` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RESULTS DASHBOARD */}
      {scanState === 'done' && results && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">Advanced Audit Report</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              <Download size={16} /> Export PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 - (351.8 * results.healthScore) / 100} className={`${results.healthScore >= 80 ? 'text-green-500' : results.healthScore >= 50 ? 'text-orange-500' : 'text-red-500'} transition-all duration-1000 ease-out`} />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-4xl font-black text-gray-900">{results.healthScore}</span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">Domain Health Score</h3>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-3xl p-6 border border-red-100 flex flex-col justify-center">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><XCircle size={20} /></div>
                <span className="text-4xl font-black text-red-600">{results.metrics.errors}</span>
                <span className="text-sm font-bold text-red-800 mt-1">Critical Errors</span>
              </div>
              <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 flex flex-col justify-center">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4"><AlertTriangle size={20} /></div>
                <span className="text-4xl font-black text-orange-600">{results.metrics.warnings}</span>
                <span className="text-sm font-bold text-orange-800 mt-1">Warnings</span>
              </div>
              <div className="bg-green-50 rounded-3xl p-6 border border-green-100 flex flex-col justify-center">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><CheckCircle size={20} /></div>
                <span className="text-4xl font-black text-green-600">{results.metrics.passed}</span>
                <span className="text-sm font-bold text-green-800 mt-1">Passed Checks</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Detailed Actionable Insights</h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {results.issues.map((issue) => (
                <div key={issue.key} className="p-5 flex items-start gap-4 hover:bg-gray-50 transition">
                  <div className={`mt-0.5 ${issue.type === 'error' ? 'text-red-500' : issue.type === 'warning' ? 'text-orange-500' : 'text-green-500'}`}>{issue.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900">{issue.text}</p>
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