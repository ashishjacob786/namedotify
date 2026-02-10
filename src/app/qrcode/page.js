"use client";
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Palette, Image as ImageIcon, Type, Upload, Trash2, Wifi, Mail, FileText, Smartphone } from 'lucide-react';

export default function QrPage() {
  const [activeTab, setActiveTab] = useState('url'); // url, wifi, email, text
  
  // Inputs
  const [url, setUrl] = useState('https://namedotify.com');
  const [text, setText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  // Design
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState(null);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [frame, setFrame] = useState('none'); // none, simple, scanme
  
  const qrRef = useRef(null);

  // Generate Final QR Value based on Tab
  const getQrValue = () => {
    switch(activeTab) {
        case 'url': return url;
        case 'text': return text;
        case 'wifi': return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
        case 'email': return `mailto:${email}?subject=${subject}`;
        default: return url;
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setIcon(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = async () => {
    if (!qrRef.current) return;
    
    try {
        // Wait for images to load
        const canvas = await html2canvas(qrRef.current, {
            useCORS: true, // Cross-origin images allow
            scale: 3,      // High Resolution (3x quality)
            backgroundColor: null, 
            logging: false
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `qrcode-${activeTab}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Download failed:", error);
        alert("Download failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-6">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <QrCode className="text-indigo-600 w-10 h-10" /> Ultimate QR Creator
            </h1>
            <p className="text-gray-600">Create Wi-Fi, Email, Link, or Text QR Codes with custom designs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT SIDE: Controls (Cols 7) */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Type Selection Tabs */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-2">
                    {[
                        { id: 'url', icon: LinkIcon, label: 'URL' },
                        { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
                        { id: 'email', icon: Mail, label: 'Email' },
                        { id: 'text', icon: FileText, label: 'Text' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition ${
                                activeTab === tab.id 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* 2. Input Fields (Dynamic) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <h3 className="font-bold text-gray-800">1. Enter Content</h3>
                    
                    {activeTab === 'url' && (
                        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourwebsite.com" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    )}

                    {activeTab === 'text' && (
                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here..." rows="3" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    )}

                    {activeTab === 'wifi' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="Network Name (SSID)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div className="space-y-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Recipient Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject Line" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    )}
                </div>

                {/* 3. Design Controls */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    <h3 className="font-bold text-gray-800">2. Customize Design</h3>
                    
                    {/* Label & Frame */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Label / Text</label>
                            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. SCAN ME" maxLength={20} className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Frame Style</label>
                            <select value={frame} onChange={(e) => setFrame(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                                <option value="none">No Frame</option>
                                <option value="simple">Simple Box</option>
                                <option value="scanme">"Scan Me" Header</option>
                            </select>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">QR Color</label>
                            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 cursor-pointer rounded border p-1" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Background</label>
                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 cursor-pointer rounded border p-1" />
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Center Logo</label>
                        <div className="flex items-center gap-3">
                            <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition text-sm font-medium">
                                <Upload size={16} /> Choose Image
                                <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" />
                            </label>
                            {icon && (
                                <button onClick={() => setIcon(null)} className="text-red-500 hover:text-red-700 p-2">
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Preview (Cols 5) */}
            <div className="lg:col-span-5">
                <div className="sticky top-6">
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
                        
                        {/* 🟢 THIS AREA WILL BE DOWNLOADED 🟢 */}
                        <div 
                            ref={qrRef} 
                            className={`relative bg-white p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                                frame === 'simple' ? 'border-4 border-black rounded-lg p-6' : 
                                frame === 'scanme' ? 'pt-12 pb-6 px-6 rounded-xl shadow-lg' : 'rounded-xl'
                            }`}
                            style={{ backgroundColor: bgColor }}
                        >
                            {/* Scan Me Frame Header */}
                            {frame === 'scanme' && (
                                <div className="absolute top-0 left-0 right-0 bg-black text-white text-center py-2 font-bold uppercase tracking-widest text-sm rounded-t-lg">
                                    Scan Me
                                </div>
                            )}

                            <QRCodeCanvas 
                                value={getQrValue()} 
                                size={250} 
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level={"H"} 
                                includeMargin={true}
                                imageSettings={icon ? {
                                    src: icon,
                                    x: undefined,
                                    y: undefined,
                                    height: 50,
                                    width: 50,
                                    excavate: true,
                                } : undefined}
                            />

                            {label && (
                                <div 
                                    className="mt-2 text-xl font-bold text-center uppercase tracking-wide"
                                    style={{ color: fgColor, maxWidth: '250px' }}
                                >
                                    {label}
                                </div>
                            )}
                        </div>
                        {/* 🔴 END DOWNLOAD AREA 🔴 */}

                        <p className="mt-8 text-gray-400 text-sm mb-4 flex items-center gap-2">
                            <Smartphone size={16} /> Open camera to test
                        </p>

                        <button 
                            onClick={downloadQR}
                            className="bg-green-500 hover:bg-green-600 text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Download size={24} />
                            Download High Quality PNG
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}