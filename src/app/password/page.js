"use client";
import React, { useState, useEffect } from 'react';
import { Key, RefreshCw, Copy, CheckCircle, ShieldCheck, Settings } from 'lucide-react';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState('Strong');

  // Password Generator Logic
  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') return;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    checkStrength(length);
    setCopied(false);
  };

  // Strength Checker Logic
  const checkStrength = (len) => {
    if (len < 8) setStrength('Weak');
    else if (len < 12) setStrength('Medium');
    else setStrength('Strong');
  };

  // Initial load par generate karo
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <ShieldCheck className="text-teal-600 w-10 h-10" /> Password Generator
            </h1>
            <p className="text-gray-600">Generate secure, random passwords to stay safe online.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left: Controls */}
            <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex items-center gap-2 mb-2 text-gray-700 font-bold">
                    <Settings size={20} /> Settings
                </div>

                {/* Length Slider */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2 flex justify-between">
                        Password Length <span>{length}</span>
                    </label>
                    <input 
                        type="range" 
                        min="6" max="50" 
                        value={length} 
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500" />
                        <span className="text-gray-700">Uppercase (A-Z)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500" />
                        <span className="text-gray-700">Lowercase (a-z)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500" />
                        <span className="text-gray-700">Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500" />
                        <span className="text-gray-700">Symbols (!@#$)</span>
                    </label>
                </div>
            </div>

            {/* Right: Display */}
            <div className="md:col-span-2 space-y-6">
                
                {/* Password Box */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 relative group">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Generated Password</p>
                    <div className="flex items-center justify-between break-all">
                        <h2 className="text-3xl md:text-4xl font-mono text-gray-800 tracking-wider break-all">{password}</h2>
                    </div>
                    
                    {/* Strength Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        strength === 'Strong' ? 'bg-green-100 text-green-700' : 
                        strength === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {strength}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={generatePassword}
                        className="bg-gray-800 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-900 transition flex items-center justify-center gap-2 shadow-lg"
                    >
                        <RefreshCw size={20} /> Regenerate
                    </button>
                    <button 
                        onClick={copyToClipboard}
                        className={`${copied ? 'bg-green-600' : 'bg-teal-600'} text-white px-6 py-4 rounded-xl font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg`}
                    >
                        {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <Key size={18} /> Security Tip
                    </h3>
                    <p className="text-blue-800 text-sm">
                        Never use the same password for multiple websites. Use a password manager to keep track of your secure passwords.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}