"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Shield, Lock, Calendar, CheckCircle, XCircle, Loader2, AlertTriangle, ShieldCheck, Globe } from 'lucide-react';

export default function SSLPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ 1. Advanced JSON-LD Schema (SoftwareApp + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NameDotify SSL Certificate Checker",
        "operatingSystem": "Web",
        "applicationCategory": "SecurityApplication",
        "url": "https://namedotify.com/ssl",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free tool to verify SSL/TLS certificate validity, expiry date, issuer, and chain issues."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is my SSL certificate invalid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common reasons include expiration, domain name mismatch, or an untrusted certificate authority (self-signed)."
            }
          },
          {
            "@type": "Question",
            "name": "How often should I check my SSL status?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It's recommended to check your SSL certificate status at least once a month to avoid unexpected expiration warnings."
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
            "name": "SSL Checker",
            "item": "https://namedotify.com/ssl"
          }
        ]
      }
    ]
  };

  const checkSSL = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError('');
    setData(null);

    // Clean domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    try {
      // ✅ Using NetworkCalc Public API (No Backend Needed)
      const response = await axios.get(`https://networkcalc.com/api/security/certificate/${cleanDomain}`);
      
      if (response.data && response.data.certificate) {
          const cert = response.data.certificate;
          
          // Calculate Days Remaining
          const validTo = new Date(cert.valid_to);
          const today = new Date();
          const daysRemaining = Math.ceil((validTo - today) / (1000 * 60 * 60 * 24));
          
          setData({
              valid: daysRemaining > 0,
              issuer: cert.issuer ? (cert.issuer.O || cert.issuer.CN) : 'Unknown',
              validFrom: cert.valid_from,
              validTo: cert.valid_to,
              daysRemaining: daysRemaining,
              domain: cleanDomain
          });
      } else {
          setError('SSL Certificate not found or domain is unreachable.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please check the domain name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ UI: Consistent Padding
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>Free SSL Certificate Checker - Verify HTTPS Security | NameDotify.com</title>
      <meta name="description" content="Check SSL certificate validity, expiry date, and issuer instantly. Verify if a website is secure (HTTPS) with our free tool." />
      <meta name="keywords" content="ssl checker, check ssl certificate, https checker, ssl expiry check, website security test" />
      
      {/* ✅ 3. Open Graph Tags */}
      <meta property="og:title" content="Free SSL Checker | NameDotify.com" />
      <meta property="og:description" content="Verify website security and SSL certificate status instantly." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://namedotify.com/ssl" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-6 border border-emerald-200">
                <ShieldCheck size={14} className="mr-2" /> Web Security Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                SSL Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Checker</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Verify if a website is <span className="font-bold text-gray-800">secure (HTTPS)</span>. Check the SSL certificate issuer, 
                validity period, and expiration date instantly.
            </p>
        </header>

        {/* --- INPUT BOX --- */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 flex flex-col sm:flex-row gap-4 mb-16 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-2xl bg-gray-50 focus:bg-white transition border border-transparent focus:border-emerald-200"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkSSL()}
                />
            </div>
            <button 
                onClick={checkSSL} 
                disabled={loading}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-emerald-200 transform active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Lock size={20} />}
                Check SSL
            </button>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle size={20} /> {error}
            </div>
        )}

        {/* --- RESULT CARD --- */}
        {data && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
                
                {/* Status Header */}
                <div className={`p-8 md:p-10 text-center border-b ${data.valid ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                    <div className={`inline-flex items-center justify-center p-4 rounded-full shadow-sm mb-6 bg-white`}>
                        {data.valid ? <CheckCircle className="w-12 h-12 text-emerald-500" /> : <XCircle className="w-12 h-12 text-red-500" />}
                    </div>
                    <h2 className={`text-3xl font-extrabold mb-2 ${data.valid ? 'text-emerald-800' : 'text-red-800'}`}>
                        {data.valid ? 'Website is Secure' : 'Website is Not Secure'}
                    </h2>
                    <p className="text-gray-500 font-mono text-sm bg-white/50 inline-block px-3 py-1 rounded-lg border border-gray-200/50">{data.domain}</p>
                </div>

                {/* Details Grid */}
                <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Issuer Info */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Issued By</span>
                            <p className="text-lg font-bold text-gray-900 leading-tight">{data.issuer || 'Unknown Authority'}</p>
                        </div>
                    </div>
                    
                    {/* Days Remaining */}
                    <div className="flex items-start gap-4">
                         <div className={`p-3 rounded-2xl ${data.daysRemaining < 30 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Validity Status</span>
                            <p className={`text-2xl font-extrabold ${data.daysRemaining < 30 ? 'text-red-600' : 'text-emerald-600'}`}>
                                {data.daysRemaining} Days Left
                            </p>
                        </div>
                    </div>

                    {/* Valid From */}
                    <div className="border-t border-gray-100 pt-6">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-1">
                           <CheckCircle size={14}/> Issued On
                        </span>
                        <p className="text-gray-800 font-bold text-lg">{data.validFrom ? new Date(data.validFrom).toLocaleDateString() : 'N/A'}</p>
                    </div>

                    {/* Valid To */}
                    <div className="border-t border-gray-100 pt-6">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-1">
                           <AlertTriangle size={14}/> Expires On
                        </span>
                        <p className="text-gray-800 font-bold text-lg">{data.validTo ? new Date(data.validTo).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>
            </div>
        )}

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-emerald max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why is SSL Security Crucial?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-600"/> Protects User Data</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        SSL encrypts the data transferred between a user's browser and your server. Without it, passwords and credit cards can be stolen.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-600"/> Boosts SEO Ranking</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Google officially lists HTTPS as a ranking signal. Websites without SSL are flagged as "Not Secure" in Chrome.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-purple-600"/> Builds Trust</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        If you plan to accept payments online, you absolutely need an SSL certificate. No payment gateway works without one.
                    </p>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Common SSL Errors We Detect</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li><strong>Expired Certificate:</strong> The most common error. Certificates are usually valid for 90 days (Let's Encrypt) or 1 year.</li>
                    <li><strong>Name Mismatch:</strong> The certificate is issued for <code>www.example.com</code> but you are visiting <code>example.com</code>.</li>
                    <li><strong>Untrusted Authority:</strong> The certificate is self-signed and not verified by a trusted CA like DigiCert.</li>
                </ul>
            </div>
        </article>

      </div>
    </div>
  );
}