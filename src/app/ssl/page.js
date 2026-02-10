"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Shield, Lock, Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function SSLPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkSSL = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/ssl?domain=${domain}`);
      if (response.data.valid === false) {
          setError(response.data.error || 'SSL Certificate not found or invalid.');
      } else {
          setData(response.data);
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Shield className="text-emerald-600 w-10 h-10" /> SSL Checker
            </h1>
            <p className="text-gray-600">Verify if a website is secure and check certificate expiry date.</p>
        </div>

        {/* Input Box */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2 mb-8">
            <input 
                type="text" 
                placeholder="Enter domain (e.g. namedotify.com)" 
                className="flex-1 p-3 outline-none text-lg"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkSSL()}
            />
            <button 
                onClick={checkSSL} 
                disabled={loading}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition flex items-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Lock size={20} />}
                Check SSL
            </button>
        </div>

        {/* Result Card */}
        {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
                <XCircle size={20} /> {error}
            </div>
        )}

        {data && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in zoom-in duration-300">
                {/* Status Header */}
                <div className={`p-6 text-center ${data.secure ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-3">
                        {data.secure ? <CheckCircle className="w-8 h-8 text-emerald-500" /> : <XCircle className="w-8 h-8 text-red-500" />}
                    </div>
                    <h2 className="text-2xl font-bold">{data.secure ? 'Website is Secure' : 'Website is Not Secure'}</h2>
                    <p className="opacity-80">{domain}</p>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Issued By</span>
                        <p className="text-lg font-medium text-gray-800">{data.issuer}</p>
                    </div>
                    
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Days Remaining</span>
                        <p className={`text-3xl font-bold ${data.daysRemaining < 30 ? 'text-red-500' : 'text-emerald-500'}`}>
                            {data.daysRemaining} Days
                        </p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <Calendar size={12}/> Valid From
                        </span>
                        <p className="text-gray-600 text-sm">{new Date(data.validFrom).toDateString()}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                           <Calendar size={12}/> Expires On
                        </span>
                        <p className="text-gray-600 text-sm">{new Date(data.validTo).toDateString()}</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}