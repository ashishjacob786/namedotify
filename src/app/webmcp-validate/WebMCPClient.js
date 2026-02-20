"use client";
import React, { useState, useEffect } from 'react';
import { Bot, Globe, CheckCircle, XCircle, AlertTriangle, Loader2, Zap, Terminal, Cpu } from 'lucide-react';

export default function WebMCPClient() {
  const [url, setUrl] = useState('');
  const [scanState, setScanState] = useState('idle'); 
  const [progress, setProgress] = useState(0);
  const [actionText, setActionText] = useState('');
  const [results, setResults] = useState(null);

  const processingMessages = [
    "Establishing secure connection...",
    "Extracting DOM structure...",
    "Scanning for Declarative AI Meta Tags...",
    "Analyzing Imperative API (navigator.modelContext)...",
    "Pinging /.well-known/webmcp.json manifest...",
    "Calculating Agent Readiness Score..."
  ];

  // 🤖 WEBMCP REGISTRATION FOR THIS TOOL
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator && 'modelContext' in window.navigator) {
      try {
        window.navigator.modelContext.registerTool({
          name: "validate_webmcp",
          description: "Scans a website to check if it supports WebMCP and is ready for AI Agents.",
          parameters: {
            type: "object",
            properties: { targetUrl: { type: "string" } },
            required: ["targetUrl"]
          },
          handler: async (params) => {
            setUrl(params.targetUrl);
            startScan(null, params.targetUrl);
            return { status: "success", message: `WebMCP validation started for ${params.targetUrl}.` };
          }
        });
      } catch (err) { console.error("WebMCP Auth failed"); }
    }
  }, []);

  const startScan = async (e, overrideUrl = null) => {
    if (e) e.preventDefault();
    const targetUrl = overrideUrl || url;
    if (!targetUrl) return;

    setScanState('scanning');
    setProgress(0);
    setResults(null);

    // Artificial 15-second delay for Deep Scan feeling
    let msgIndex = 0;
    setActionText(processingMessages[msgIndex]);
    
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 5, 90));
      msgIndex = Math.min(msgIndex + 1, processingMessages.length - 1);
      setActionText(processingMessages[msgIndex]);
    }, 1500);

    try {
      const res = await fetch('/api/webmcp-validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });
      const data = await res.json();

      clearInterval(interval);
      setProgress(100);
      setActionText("Validation Complete!");

      setTimeout(() => {
        if (data.success) {
          setResults(data.data);
          setScanState('done');
        } else {
          alert("Scan Failed: " + data.error);
          setScanState('idle');
        }
      }, 1000);

    } catch (err) {
      clearInterval(interval);
      alert("SYSTEM ERROR: Could not reach the server.");
      setScanState('idle');
    }
  };

  return (
    <div className="w-full">
      {/* INPUT SECTION */}
      <div className="bg-slate-900 rounded-3xl shadow-2xl border border-indigo-500/30 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="p-8">
          <form onSubmit={startScan}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full pl-11 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-medium tracking-wide"
                />
              </div>
              <button
                type="submit" disabled={scanState === 'scanning'}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 whitespace-nowrap shadow-[0_0_20px_rgba(79,70,229,0.4)]"
              >
                {scanState === 'scanning' ? <><Loader2 className="animate-spin" size={20} /> Scanning Core...</> : <><Bot size={20} /> Validate AI Readiness</>}
              </button>
            </div>
          </form>
        </div>

        {/* PROGRESS BAR */}
        {scanState === 'scanning' && (
          <div className="px-8 pb-8">
            <div className="flex items-center gap-3 text-sm font-bold text-indigo-400 mb-3 bg-slate-950/50 p-4 rounded-xl border border-indigo-900/50">
              <Terminal size={18} className="animate-pulse text-pink-500" />
              <span className="font-mono tracking-widest uppercase">{actionText}</span>
              <span className="ml-auto text-indigo-2000">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full transition-all duration-500 relative" style={{ width: `${progress}%` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RESULTS DASHBOARD */}
      {scanState === 'done' && results && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SCORE CARD */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-100/50 border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-5 text-indigo-900"><Cpu size={200}/></div>
              <div className="relative z-10">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={402} strokeDashoffset={402 - (402 * results.agentScore) / 100} className={`${results.agentScore >= 80 ? 'text-emerald-500' : results.agentScore >= 40 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`} />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-5xl font-black text-slate-900">{results.agentScore}</span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-black text-slate-800 uppercase tracking-widest">Agent Score</h3>
              <p className="text-sm font-bold text-slate-400 mt-1">Out of 100</p>
            </div>

            {/* METRICS */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex flex-col justify-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><CheckCircle size={24} /></div>
                <span className="text-5xl font-black text-emerald-600">{results.metrics.passed}</span>
                <span className="text-sm font-bold text-emerald-800 mt-2 uppercase tracking-wider">Checks Passed</span>
              </div>
              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex flex-col justify-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4"><AlertTriangle size={24} /></div>
                <span className="text-5xl font-black text-amber-600">{results.metrics.warnings}</span>
                <span className="text-sm font-bold text-amber-800 mt-2 uppercase tracking-wider">Warnings</span>
              </div>
              <div className="bg-red-50 rounded-3xl p-6 border border-red-100 flex flex-col justify-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4"><XCircle size={24} /></div>
                <span className="text-5xl font-black text-red-600">{results.metrics.failed}</span>
                <span className="text-sm font-bold text-red-800 mt-2 uppercase tracking-wider">Critical Failures</span>
              </div>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="mt-6 bg-white rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <Zap className="text-indigo-500" size={24} />
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">WebMCP Diagnostic Logs</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {results.insights.map((issue, idx) => (
                <div key={idx} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition">
                  <div className={`mt-0.5 ${issue.type === 'error' ? 'text-red-500' : issue.type === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {issue.type === 'error' ? <XCircle size={20}/> : issue.type === 'warning' ? <AlertTriangle size={20}/> : <CheckCircle size={20}/>}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg leading-tight">{issue.text}</p>
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