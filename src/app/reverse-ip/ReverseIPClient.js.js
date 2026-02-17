"use client";
import React, { useState } from 'react';
import { 
  Search, Server, MapPin, Globe, Shield, 
  Download, Copy, CheckCircle, AlertCircle, 
  RefreshCw, Search as SearchIcon, Map
} from 'lucide-react';

export default function ReverseIPClient() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Results State
  const [domains, setDomains] = useState([]);
  const [serverInfo, setServerInfo] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [copied, setCopied] = useState(false);

  // --- API LOGIC ---
  const handleLookup = async (e) => {
    e.preventDefault(); // Prevent page reload on Enter
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setDomains([]);
    setServerInfo(null);
    setFilterText('');

    // Clean input (remove http://, www., trailing slash)
    const target = input.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');

    try {
      // 1. Fetch Reverse IP Data (HackerTarget Free API)
      const reverseIpRes = await fetch(`https://api.hackertarget.com/reverseiplookup/?q=${target}`);
      const textData = await reverseIpRes.text();

      if (textData.includes('error') || textData.includes('No DNS A records')) {
          throw new Error('No domains found or API limit reached. Try another IP/Domain.');
      }
      
      // Parse Domains
      const domainList = textData.split('\n').filter(d => d.trim() !== '');
      if(domainList.length === 0) throw new Error('No additional domains found on this server.');
      setDomains(domainList);

      // 2. Fetch Server Geo/ISP Data (IPAPI Free API) - Bonus Feature
      try {
          const geoRes = await fetch(`https://ipapi.co/${target}/json/`);
          const geoData = await geoRes.json();
          if (!geoData.error) {
              setServerInfo({
                  ip: geoData.ip,
                  isp: geoData.org || geoData.asn,
                  city: geoData.city,
                  country: geoData.country_name,
                  loc: `${geoData.latitude}, ${geoData.longitude}`
              });
          }
      } catch (geoErr) {
          console.log("Geo IP fetch failed, but continuing with domains.");
      }

    } catch (err) {
      setError(err.message || 'Network Error: Could not fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- EXTRA FEATURES LOGIC ---
  const handleCopyAll = () => {
    navigator.clipboard.writeText(domains.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([domains.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reverse-ip-${input.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredDomains = domains.filter(d => d.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200">
                <Shield size={14} className="mr-2" /> OSINT & Security Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Reverse IP <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Lookup</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Discover all websites hosted on the <span className="font-bold text-gray-800">same server</span>. 
                Enter an IP address or domain to expose its digital neighborhood.
            </p>
        </header>

        {/* --- SEARCH BOX --- */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-100 flex flex-col sm:flex-row gap-3 mb-16 relative z-10">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter IP (e.g. 8.8.8.8) or Domain" 
                    className="w-full h-full p-4 pl-14 outline-none text-lg rounded-2xl bg-gray-50 focus:bg-white transition border border-transparent focus:border-blue-200"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLookup(e)}
                />
            </div>
            <button 
                onClick={handleLookup} 
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-blue-200 transform active:scale-95"
            >
                {loading ? <RefreshCw className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} className="flex-shrink-0" /> <p>{error}</p>
            </div>
        )}

        {/* --- RESULTS AREA --- */}
        {domains.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* LEFT: SERVER INFO (Bonus Feature) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 border-b pb-4">
                            <Server size={18} className="text-blue-600"/> Server Identity
                        </h3>
                        
                        {serverInfo ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Target IP Address</p>
                                    <p className="font-mono text-gray-900 font-bold bg-gray-50 px-3 py-2 rounded-lg mt-1 border border-gray-100">{serverInfo.ip}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Hosting Provider / ISP</p>
                                    <p className="font-medium text-gray-800 flex items-center gap-2 mt-1">
                                        <Server size={14} className="text-gray-400"/> {serverInfo.isp || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                                    <p className="font-medium text-gray-800 flex items-center gap-2 mt-1">
                                        <MapPin size={14} className="text-red-500"/> {serverInfo.city}, {serverInfo.country}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Coordinates</p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                        <Map size={14} className="text-gray-400"/> {serverInfo.loc}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <RefreshCw className="animate-spin text-gray-300 mx-auto mb-2" size={24}/>
                                <p className="text-xs text-gray-500">Resolving server details...</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Stats Widget */}
                    <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-6 rounded-3xl text-white shadow-lg">
                        <h4 className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-1">Total Domains Found</h4>
                        <div className="text-5xl font-extrabold">{domains.length}</div>
                        <p className="text-xs text-blue-100/70 mt-3">These domains are hosted on the exact same server/IP address.</p>
                    </div>
                </div>

                {/* RIGHT: DOMAINS LIST */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
                    
                    {/* Table Toolbar */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Search in results */}
                        <div className="relative w-full sm:w-64">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14}/>
                            <input 
                                type="text" 
                                placeholder="Filter domains..." 
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition bg-white"
                            />
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button onClick={handleCopyAll} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition">
                                {copied ? <CheckCircle size={16} className="text-green-500"/> : <Copy size={16}/>}
                                {copied ? 'Copied!' : 'Copy All'}
                            </button>
                            <button onClick={handleExport} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold rounded-lg hover:bg-blue-100 transition">
                                <Download size={16}/> Export TXT
                            </button>
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                        {filteredDomains.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {filteredDomains.map((domain, index) => (
                                    <li key={index} className="px-6 py-4 hover:bg-gray-50 flex justify-between items-center group transition">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-gray-400 w-8">{index + 1}.</span>
                                            <span className="font-medium text-gray-900">{domain}</span>
                                        </div>
                                        <a 
                                            href={`http://${domain}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="opacity-0 group-hover:opacity-100 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
                                        >
                                            Visit
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <SearchIcon size={40} className="mb-3 opacity-20"/>
                                <p>No domains match your filter.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <section className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Perform a Reverse IP Lookup?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose">
                <div className="p-6 bg-blue-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 text-sm font-bold shadow-sm">1</span>
                        SEO & Bad Neighborhoods
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        If you are on shared hosting, you share an IP address with other websites. If those sites are spammy, adult, or blacklisted, it can negatively impact your own SEO. Use this tool to check your "digital neighborhood".
                    </p>
                </div>
                <div className="p-6 bg-teal-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-teal-600 text-sm font-bold shadow-sm">2</span>
                        Cyber Security (OSINT)
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Ethical hackers and security researchers use Reverse IP to map the attack surface. If one website on a server is vulnerable, an attacker might compromise the whole server to reach other sites.
                    </p>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 text-sm font-bold shadow-sm">3</span>
                        Competitor Analysis
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Enter a competitor's domain name to discover what other projects or "hidden" websites they might be running on the same dedicated server.
                    </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-600 text-sm font-bold shadow-sm">4</span>
                        Hosting Verification
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Verify if your hosting provider actually put your site on a dedicated IP as promised, or if they crammed it onto a shared IP with thousands of other domains.
                    </p>
                </div>
            </div>
        </section>

      </div>
      
      {/* Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f9fafb; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </div>
  );
}