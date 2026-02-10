"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Clock, CheckCircle, XCircle, Globe, Loader2, AlertTriangle } from 'lucide-react';

export default function StatusPage() {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!domain) return;
    setLoading(true);
    setData(null);

    try {
      const response = await axios.get(`/api/status?domain=${domain}`);
      setData(response.data);
    } catch (err) {
      setData({ online: false, statusCode: 500, statusText: 'Error', error: 'Check failed' });
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
                <Activity className="text-pink-600 w-10 h-10" /> Server Status Checker
            </h1>
            <p className="text-gray-600">Check if a website is down for everyone or just you. Analyze response time.</p>
        </div>

        {/* Input Box */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2 mb-8">
            <input 
                type="text" 
                placeholder="Enter website URL (e.g. google.com)" 
                className="flex-1 p-3 outline-none text-lg"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
            />
            <button 
                onClick={checkStatus} 
                disabled={loading}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition flex items-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Activity size={20} />}
                Check Status
            </button>
        </div>

        {/* Result Card */}
        {data && (
            <div className={`rounded-xl shadow-lg border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ${data.online ? 'bg-white border-green-200' : 'bg-white border-red-200'}`}>
                
                {/* Main Status Banner */}
                <div className={`p-8 text-center ${data.online ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4">
                        {data.online ? <CheckCircle className="w-10 h-10 text-green-500" /> : <XCircle className="w-10 h-10 text-red-500" />}
                    </div>
                    <h2 className={`text-3xl font-bold ${data.online ? 'text-green-700' : 'text-red-700'}`}>
                        {data.online ? 'Website is Online' : 'Website is Down'}
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg">{domain}</p>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">HTTP Code</p>
                        <span className={`text-2xl font-mono font-bold ${data.statusCode === 200 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {data.statusCode}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{data.statusText}</p>
                    </div>

                    <div className="p-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Response Time</p>
                        <div className="flex items-center justify-center gap-2">
                            <Clock size={18} className="text-blue-500" />
                            <span className="text-2xl font-bold text-gray-800">{data.responseTime || '0'} <span className="text-sm font-normal text-gray-500">ms</span></span>
                        </div>
                    </div>

                    <div className="p-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Checked</p>
                        <span className="text-lg font-medium text-gray-700">Just Now</span>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}