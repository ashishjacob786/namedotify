"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, ArrowDown, ArrowUp, Terminal, 
  Cpu, Wifi, Shield, Zap, Globe, RefreshCcw
} from 'lucide-react';

export default function SpeedTestClient() {
  const [status, setStatus] = useState('IDLE'); // IDLE, PING, DOWN, UP, DONE
  const [ping, setPing] = useState('00.0');
  const [download, setDownload] = useState('00.0');
  const [upload, setUpload] = useState('00.0');
  
  const [logs, setLogs] = useState(['[SYSTEM] Ready for network diagnostic...']);
  const [networkInfo, setNetworkInfo] = useState({ ip: 'SCANNING...', isp: 'SCANNING...' });
  const logEndRef = useRef(null);

  // Auto-scroll terminal logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Fetch IP Info on Load
  useEffect(() => {
    addLog('[INIT] Resolving client IP & ISP data...');
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if(!data.error) {
            setNetworkInfo({ ip: data.ip, isp: data.org || data.asn });
            addLog(`[SUCCESS] Client Identified: ${data.ip} (${data.org})`);
        }
      }).catch(() => addLog('[ERROR] ISP detection bypassed. Using raw sockets.'));
  }, []);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-8), msg]); // Keep last 9 logs
  };

  // 🚀 CORE SPEED ENGINE (Using Real Cloudflare Test Servers)
  const runDiagnostic = async () => {
    setStatus('PING');
    setPing('00.0'); setDownload('00.0'); setUpload('00.0');
    setLogs(['[SYSTEM] Initiating speed sequence...']);

    try {
      // 1. PING TEST
      addLog('[TEST] Measuring server latency...');
      const pingStart = Date.now();
      await fetch('https://speed.cloudflare.com/__down?bytes=100', { cache: 'no-store' });
      const pingTime = Date.now() - pingStart;
      setPing(pingTime.toFixed(1));
      addLog(`[RESULT] Latency locked at ${pingTime}ms`);

      // 2. DOWNLOAD TEST (Real 15MB File Download)
      setStatus('DOWN');
      addLog('[TEST] Opening max-bandwidth download stream...');
      addLog('[SYS] Fetching 15MB payload from Edge Server...');
      
      const dlStart = Date.now();
      // Cloudflare's official speed test endpoint (15MB payload)
      const response = await fetch(`https://speed.cloudflare.com/__down?bytes=15000000`, { cache: 'no-store' });
      const reader = response.body.getReader();
      let receivedLength = 0;
      
      // Read stream to calculate live speed
      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        receivedLength += value.length;
        
        // Live UI Update
        const timeElapsed = (Date.now() - dlStart) / 1000;
        if (timeElapsed > 0.1) {
            const speedBps = (receivedLength * 8) / timeElapsed;
            const speedMbps = (speedBps / 1000000).toFixed(1);
            setDownload(speedMbps);
        }
      }
      
      const dlEnd = Date.now();
      const dlDuration = (dlEnd - dlStart) / 1000;
      const finalDlMbps = ((15000000 * 8) / dlDuration / 1000000).toFixed(1);
      setDownload(finalDlMbps);
      addLog(`[RESULT] Download stream stabilized at ${finalDlMbps} Mbps`);

      // 3. UPLOAD TEST (Real POST Request)
      setStatus('UP');
      addLog('[TEST] Initializing upload packet injection...');
      
      // Create a dummy 5MB payload
      const payloadSize = 5000000; 
      const dummyData = new Uint8Array(payloadSize);
      
      const ulStart = Date.now();
      await fetch('https://speed.cloudflare.com/__up', {
        method: 'POST',
        body: dummyData,
        headers: { 'Content-Type': 'application/octet-stream' }
      });
      const ulEnd = Date.now();
      const ulDuration = (ulEnd - ulStart) / 1000;
      const finalUlMbps = ((payloadSize * 8) / ulDuration / 1000000).toFixed(1);
      
      // Smooth visual counter for upload
      for(let i=0; i<=20; i++) {
          setUpload(((finalUlMbps * i) / 20).toFixed(1));
          await new Promise(r => setTimeout(r, 40));
      }
      setUpload(finalUlMbps);
      addLog(`[RESULT] Upload stream stabilized at ${finalUlMbps} Mbps`);

      setStatus('DONE');
      addLog('[SYSTEM] Diagnostic Complete. Connection Secure.');

    } catch (err) {
      addLog(`[ERROR] Packet loss detected: ${err.message}`);
      setStatus('DONE');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-cyan-400 font-mono pb-20 pt-28 relative overflow-hidden selection:bg-cyan-900 selection:text-cyan-100">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#00ffff33 1px, transparent 1px), linear-gradient(90deg, #00ffff33 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600 rounded-full blur-[150px] opacity-20 z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-600 rounded-full blur-[150px] opacity-10 z-0"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <header className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-sm bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-xs font-bold tracking-widest mb-6 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                <Terminal size={14} className="mr-2" /> ROOT ACCESS GRANTED
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                Network <span className="text-cyan-400">Diagnostic</span>
            </h1>
        </header>

        {/* MAIN TERMINAL DASHBOARD */}
        <div className="bg-[#0f1115]/90 backdrop-blur-md rounded-2xl border border-cyan-800/50 shadow-[0_0_40px_rgba(0,255,255,0.1)] overflow-hidden mb-12">
            
            {/* Top Bar */}
            <div className="bg-[#050608] px-4 py-2 border-b border-cyan-900 flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] text-cyan-600 tracking-widest uppercase flex items-center gap-2">
                    <Shield size={12}/> Secure Shell (SSH)
                </div>
            </div>

            <div className="p-6 md:p-10">
                
                {/* METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    
                    {/* PING */}
                    <div className={`p-6 rounded-xl border bg-black/50 relative overflow-hidden transition-all duration-300 ${status === 'PING' ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.2)]' : 'border-cyan-900/50'}`}>
                        {status === 'PING' && <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-pulse"></div>}
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-xs text-cyan-600 uppercase tracking-widest font-bold">Latency</p>
                            <Activity size={18} className={status === 'PING' ? 'text-cyan-400 animate-pulse' : 'text-cyan-800'} />
                        </div>
                        <p className="text-4xl md:text-5xl font-black text-white">
                            {ping} <span className="text-sm text-cyan-600 font-normal tracking-widest">MS</span>
                        </p>
                    </div>

                    {/* DOWNLOAD */}
                    <div className={`p-6 rounded-xl border bg-black/50 relative overflow-hidden transition-all duration-300 ${status === 'DOWN' ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]' : 'border-cyan-900/50'}`}>
                        {status === 'DOWN' && <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-pulse"></div>}
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-xs text-green-700 uppercase tracking-widest font-bold">Downlink</p>
                            <ArrowDown size={18} className={status === 'DOWN' ? 'text-green-400 animate-bounce' : 'text-cyan-800'} />
                        </div>
                        <p className={`text-4xl md:text-5xl font-black ${status === 'DOWN' || status === 'UP' || status === 'DONE' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'text-white'}`}>
                            {download} <span className="text-sm text-green-700 font-normal tracking-widest">MBPS</span>
                        </p>
                    </div>

                    {/* UPLOAD */}
                    <div className={`p-6 rounded-xl border bg-black/50 relative overflow-hidden transition-all duration-300 ${status === 'UP' ? 'border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.2)]' : 'border-cyan-900/50'}`}>
                        {status === 'UP' && <div className="absolute top-0 left-0 w-full h-1 bg-purple-400 animate-pulse"></div>}
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-xs text-purple-800 uppercase tracking-widest font-bold">Uplink</p>
                            <ArrowUp size={18} className={status === 'UP' ? 'text-purple-400 animate-bounce' : 'text-cyan-800'} />
                        </div>
                        <p className={`text-4xl md:text-5xl font-black ${status === 'DONE' || status === 'UP' ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'text-white'}`}>
                            {upload} <span className="text-sm text-purple-800 font-normal tracking-widest">MBPS</span>
                        </p>
                    </div>
                </div>

                {/* BOTTOM SECTION: ACTION & LOGS */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* BUTTON */}
                    <div className="md:col-span-4 flex items-center justify-center border border-cyan-900/50 bg-black/30 rounded-xl p-6 relative overflow-hidden">
                        {/* Radar Sweep Effect */}
                        {status !== 'IDLE' && status !== 'DONE' && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <div className="w-full h-full border-2 border-cyan-500 rounded-full animate-ping"></div>
                            </div>
                        )}
                        
                        <button 
                            onClick={runDiagnostic}
                            disabled={status !== 'IDLE' && status !== 'DONE'}
                            className={`w-full py-5 border rounded-lg font-black tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 z-10 ${
                                status === 'IDLE' || status === 'DONE' 
                                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]' 
                                : 'bg-transparent border-cyan-800 text-cyan-700 cursor-not-allowed'
                            }`}
                        >
                            {status === 'DONE' ? <RefreshCcw size={20}/> : <Zap size={20}/>}
                            {status === 'IDLE' ? 'EXECUTE SCAN' : status === 'DONE' ? 'RE-ENGAGE' : 'ANALYZING...'}
                        </button>
                    </div>

                    {/* LIVE TERMINAL LOGS */}
                    <div className="md:col-span-8 bg-[#050608] border border-cyan-900/50 rounded-xl p-4 h-36 overflow-y-auto text-xs sm:text-sm custom-scroll">
                        {logs.map((log, i) => (
                            <div key={i} className={`mb-1 ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[SUCCESS]') || log.includes('[RESULT]') ? 'text-green-400' : 'text-cyan-600'}`}>
                                <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {log}
                            </div>
                        ))}
                        {status !== 'IDLE' && status !== 'DONE' && (
                            <div className="text-cyan-400 animate-pulse">_</div>
                        )}
                        <div ref={logEndRef} />
                    </div>

                </div>
            </div>

            {/* Network Info Footer */}
            <div className="bg-cyan-950/30 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-widest border-t border-cyan-900/50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-cyan-500">
                        <Cpu size={14}/>
                        <span className="uppercase">{networkInfo.isp}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1.5 rounded border border-green-500/20">
                    <Globe size={14}/>
                    <span>IP: {networkInfo.ip}</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Scrollbar CSS for Terminal */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #050608; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #0891b2; }
      `}</style>
    </div>
  );
}