"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Search, Server, Shield, Globe, Activity, Loader2, AlertCircle, CheckCircle, HelpCircle, Info } from 'lucide-react';

export default function DnsPage() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ 1. Advanced JSON-LD Schema (SoftwareApp + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NameDotify DNS Record Checker",
        "operatingSystem": "Web",
        "applicationCategory": "NetworkTool",
        "url": "https://namedotify.com/dns",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free DNS propagation tool. Check A, MX, NS, CNAME, and TXT records globally. Debug website connectivity and email issues."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an A Record?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An A Record maps a domain name to the IP address (IPv4) of the computer hosting the domain."
            }
          },
          {
            "@type": "Question",
            "name": "How long does DNS propagation take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DNS changes can take anywhere from a few minutes to 48 hours to update globally depending on the TTL settings."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://namedotify.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "DNS Checker",
            "item": "https://namedotify.com/dns"
          }
        ]
      }
    ]
  };

  const checkDns = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      // ✅ Using Google's Public DNS API (No Backend Required)
      const response = await axios.get(`https://dns.google/resolve?name=${domain}&type=${recordType}`);
      
      if (response.data.Status !== 0) {
        setError(`No ${recordType} records found or domain does not exist.`);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError('Failed to fetch DNS records. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ UI: Consistent Padding
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>Free DNS Record Checker - Check A, MX, CNAME & TXT | NameDotify.com</title>
      <meta name="description" content="Instantly check DNS records (A, MX, NS, CNAME, TXT) for any domain. Verify email setup and global DNS propagation with our free tool." />
      <meta name="keywords" content="dns checker, dns lookup, check mx records, dns propagation, a record checker, txt record lookup" />
      
      {/* ✅ 3. Open Graph Tags */}
      <meta property="og:title" content="Free DNS Record Checker | NameDotify.com" />
      <meta property="og:description" content="Debug website and email issues by checking DNS records instantly." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://namedotify.com/dns" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide mb-6 border border-green-200">
                <Activity size={14} className="mr-2" /> Network Diagnostic Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                DNS Record <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">Checker</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Instantly verify <span className="font-bold text-gray-800">A, MX, NS, CNAME, and TXT</span> records. 
                Debug website connectivity and email configuration issues in seconds.
            </p>
        </header>

        {/* --- SEARCH & FILTER BOX --- */}
        <div className="bg-white p-4 rounded-3xl shadow-xl shadow-green-100/50 border border-green-100 flex flex-col md:flex-row gap-4 mb-16 relative z-10">
            
            {/* Dropdown for Record Type */}
            <div className="md:w-1/4 relative">
                <select 
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value)}
                    className="w-full h-full p-4 border border-gray-200 rounded-2xl bg-gray-50 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-green-100 appearance-none cursor-pointer transition hover:bg-gray-100"
                >
                    <option value="A">A Record (IP)</option>
                    <option value="MX">MX Record (Email)</option>
                    <option value="NS">NS (Nameserver)</option>
                    <option value="CNAME">CNAME (Alias)</option>
                    <option value="TXT">TXT (Verify)</option>
                    <option value="AAAA">AAAA (IPv6)</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
            </div>

            {/* Input Box */}
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com)" 
                    className="w-full h-full p-4 pl-6 border border-gray-200 rounded-2xl outline-none text-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition placeholder-gray-400"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkDns()}
                />
            </div>

            {/* Button */}
            <button 
                onClick={checkDns} 
                disabled={loading}
                className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 md:w-auto w-full shadow-lg shadow-green-200 disabled:opacity-70 transform active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Lookup
            </button>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} /> {error}
            </div>
        )}

        {/* --- RESULTS DISPLAY --- */}
        {data && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
                <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Globe size={24} className="text-green-600"/> 
                        <span className="font-bold text-gray-900 text-xl">{domain}</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200 shadow-sm">
                        {recordType} Records Found
                    </span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-5 md:pl-8 font-bold w-16 text-center">#</th>
                                <th className="p-5 font-bold">Record Value / Destination</th>
                                {recordType === 'MX' && <th className="p-5 font-bold w-32">Priority</th>}
                                <th className="p-5 font-bold w-32 text-center">TTL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {data.Answer ? data.Answer.map((rec, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition group">
                                    <td className="p-5 md:pl-8 text-gray-400 text-center font-mono font-bold">{index + 1}</td>
                                    <td className="p-5 font-mono text-gray-800 font-medium break-all text-base">
                                        {rec.data.replace(/"/g, '')} {/* Clean TXT records */}
                                    </td>
                                    {recordType === 'MX' && (
                                        <td className="p-5 font-mono text-purple-600 font-bold">
                                            {/* Google DNS doesn't separate priority, usually part of data string. 
                                                For simpler UX, we keep it in data unless parsing logic is added */}
                                            -
                                        </td>
                                    )}
                                    <td className="p-5 text-center text-gray-500 font-mono bg-gray-50/50">
                                        {rec.TTL}s
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-500">
                                        <Info className="mx-auto mb-3 opacity-20" size={40}/>
                                        No {recordType} records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-green max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding DNS Records</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
                <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="mt-1"><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm shadow-sm">A</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">A Record (Address)</h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            Maps your domain (e.g., example.com) to the IP address of the server hosting your website. Crucial for site uptime.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="mt-1"><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 font-bold text-sm shadow-sm">MX</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">MX Record (Mail Exchange)</h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            Controls email delivery. It directs emails to your provider (like Gmail or Outlook). Incorrect records mean lost emails.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                    <div className="mt-1"><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 font-bold text-sm shadow-sm">NS</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">NS Record (Nameserver)</h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            Delegates authority. It tells the internet which company manages your domain's DNS settings (e.g., Cloudflare, GoDaddy).
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="mt-1"><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 font-bold text-sm shadow-sm">TXT</div></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">TXT Record (Text)</h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            Used for verification (Google Search Console), security (SPF, DKIM), and proving domain ownership.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <HelpCircle size={18}/> What is DNS Propagation?
                </h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                    When you update your DNS records, it can take anywhere from a few minutes to 48 hours for the changes to update worldwide. 
                    This delay is called "DNS Propagation". ISPs cache old records to speed up browsing, and they need time to clear this cache.
                </p>
            </div>
        </article>

      </div>
    </div>
  );
}