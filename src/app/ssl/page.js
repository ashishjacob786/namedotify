"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Shield, Lock, Calendar, CheckCircle, XCircle, Loader2, AlertTriangle, Server, ShieldCheck } from 'lucide-react';

export default function SSLPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Advanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify SSL Certificate Checker',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    description: 'Free tool to verify SSL/TLS certificate validity, expiry date, issuer, and chain issues.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const checkSSL = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      // NOTE: Ensure /api/ssl is implemented on backend
      const response = await axios.get(`/api/ssl?domain=${domain}`);
      
      // Handle API structure flexibility
      if (response.data.valid === false || response.data.error) {
          setError(response.data.error || 'SSL Certificate not found or invalid.');
          // Still set data if partial info is available
          if(response.data.issuer) setData(response.data);
      } else {
          setData(response.data);
      }
    } catch (err) {
      setError('Could not connect to the server. Check domain name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FIX: Used 'pt-24' to prevent black strip issue
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-4">
                <ShieldCheck size={12} className="mr-1" /> Web Security
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                SSL Certificate Checker
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Verify if a website is secure (HTTPS). Check the SSL certificate issuer, 
                validity period, and expiration date instantly.
            </p>
        </div>

        {/* Input Box */}
        <div className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-emerald-100 border border-emerald-50 flex flex-col sm:flex-row gap-3 mb-12 relative z-10">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Enter domain (e.g. namedotify.com)" 
                    className="w-full h-full p-4 pl-6 outline-none text-lg rounded-xl bg-transparent"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkSSL()}
                />
            </div>
            <button 
                onClick={checkSSL} 
                disabled={loading}
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-lg disabled:opacity-70 shadow-lg shadow-emerald-200"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Lock size={20} />}
                Check SSL
            </button>
        </div>

        {/* Error State */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center gap-3 mb-8 animate-in fade-in">
                <AlertTriangle size={20} /> {error}
            </div>
        )}

        {/* Result Card */}
        {data && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in zoom-in duration-300 mb-20">
                
                {/* Status Header */}
                <div className={`p-8 text-center border-b ${data.valid !== false ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                    <div className={`inline-flex items-center justify-center p-4 rounded-full shadow-sm mb-4 bg-white`}>
                        {data.valid !== false ? <CheckCircle className="w-10 h-10 text-emerald-500" /> : <XCircle className="w-10 h-10 text-red-500" />}
                    </div>
                    <h2 className={`text-3xl font-bold ${data.valid !== false ? 'text-emerald-800' : 'text-red-800'}`}>
                        {data.valid !== false ? 'Website is Secure' : 'Website is Not Secure'}
                    </h2>
                    <p className="text-gray-500 mt-2 font-mono">{domain}</p>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Issuer Info */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Issued By</span>
                            <p className="text-lg font-bold text-gray-800 leading-tight">{data.issuer || 'Unknown Authority'}</p>
                        </div>
                    </div>
                    
                    {/* Days Remaining */}
                    <div className="flex items-start gap-4">
                         <div className={`p-3 rounded-xl ${data.daysRemaining < 30 ? 'bg-red-50' : 'bg-emerald-50'}`}>
                            <Calendar className={`w-6 h-6 ${data.daysRemaining < 30 ? 'text-red-600' : 'text-emerald-600'}`} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Validity Status</span>
                            <p className={`text-2xl font-bold ${data.daysRemaining < 30 ? 'text-red-500' : 'text-emerald-600'}`}>
                                {data.daysRemaining} Days Left
                            </p>
                        </div>
                    </div>

                    {/* Valid From */}
                    <div className="border-t border-gray-100 pt-6">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                           <CheckCircle size={12}/> Issued On
                        </span>
                        <p className="text-gray-700 font-medium">{data.validFrom ? new Date(data.validFrom).toDateString() : 'N/A'}</p>
                    </div>

                    {/* Valid To */}
                    <div className="border-t border-gray-100 pt-6">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                           <AlertTriangle size={12}/> Expires On
                        </span>
                        <p className="text-gray-700 font-medium">{data.validTo ? new Date(data.validTo).toDateString() : 'N/A'}</p>
                    </div>
                </div>
            </div>
        )}

        {/* ✅ Human Written SEO Content */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-emerald max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why is SSL Security Crucial?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">🔒 Protects User Data</h3>
                    <p className="text-gray-600 text-sm">
                        SSL (Secure Sockets Layer) encrypts the data transferred between a user's browser and your server. 
                        Without it, passwords and credit card numbers can be stolen by hackers.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">🚀 Boosts SEO Ranking</h3>
                    <p className="text-gray-600 text-sm">
                        Google officially lists HTTPS as a ranking signal. Websites without SSL are flagged as "Not Secure" in Chrome, 
                        which destroys visitor trust and increases bounce rates.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">💳 Mandatory for Payments</h3>
                    <p className="text-gray-600 text-sm">
                        If you plan to accept payments online (PCI DSS compliance), you absolutely need an SSL certificate. 
                        No payment gateway will work without one.
                    </p>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Common SSL Errors We Detect</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li><strong>Expired Certificate:</strong> The most common error. Certificates are usually valid for 90 days (Let's Encrypt) or 1 year.</li>
                    <li><strong>Name Mismatch:</strong> The certificate is issued for <code>www.example.com</code> but you are visiting <code>example.com</code>.</li>
                    <li><strong>Untrusted Authority:</strong> The certificate is self-signed and not verified by a trusted CA like DigiCert or Cloudflare.</li>
                </ul>
            </div>
        </section>

      </div>
    </div>
  );
}