"use client";
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Palette, Upload, Trash2, Wifi, Mail, FileText, Smartphone, Loader2, Layout, Square, Circle } from 'lucide-react';

export default function QrPage() {
  const [activeTab, setActiveTab] = useState('url'); // url, wifi, email, text
  
  // Inputs
  const [url, setUrl] = useState('https://namedotify.com');
  const [text, setText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  // Design State
  const [label, setLabel] = useState('SCAN ME');
  const [icon, setIcon] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  // Advanced Design Options
  const [qrStyle, setQrStyle] = useState('squares'); // 'squares' or 'dots'
  const [eyeRadius, setEyeRadius] = useState(0); // 0 to 15 (Corner roundness)
  const [template, setTemplate] = useState('classic'); // 'classic', 'modern', 'polaroid'

  // Generate Final QR Value
  const getQrValue = () => {
    switch(activeTab) {
        case 'url': return url || 'https://namedotify.com';
        case 'text': return text || 'Hello World';
        case 'wifi': return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
        case 'email': return `mailto:${email}?subject=${subject}`;
        default: return url;
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
            setIcon(reader.result);
            setUploading(false);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ FIXED DOWNLOAD FUNCTION (Solves 'lab' color error)
  const downloadQR = () => {
    const element = document.getElementById('qr-download-area');
    
    if (!element) {
        alert("Error: Element not found.");
        return;
    }

    setTimeout(async () => {
        try {
            const canvas = await html2canvas(element, {
                useCORS: true,
                allowTaint: true,
                scale: 3, // High Quality
                backgroundColor: null, // Transparent background fix
                logging: false,
                // Fix for 'lab' color error: Force sRGB
                onclone: (clonedDoc) => {
                    const el = clonedDoc.getElementById('qr-download-area');
                    if (el) {
                        // Ensure no modern CSS variables leak in
                        el.style.fontFeatureSettings = '"liga" 0'; 
                    }
                }
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `namedotify-qr-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download Error:", error);
            alert("Download failed. Try changing the color slightly.");
        }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-6">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <QrCode className="text-indigo-600 w-10 h-10" /> Ultimate QR Studio
            </h1>
            <p className="text-gray-600">Create professional, high-quality QR codes with custom styles and templates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT SIDE: Controls (Cols 6) */}
            <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Content Type */}
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
                            <tab.icon size={16} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* 2. Input Fields */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">1. Content</h3>
                    {activeTab === 'url' && <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />}
                    {activeTab === 'text' && <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />}
                    {activeTab === 'wifi' && (
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="SSID" className="w-full p-3 border rounded-lg" />
                            <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="w-full p-3 border rounded-lg" />
                        </div>
                    )}
                    {activeTab === 'email' && <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded-lg" />}
                </div>

                {/* 3. Design Controls */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    <h3 className="font-bold text-gray-800">2. Design & Style</h3>

                    {/* Template Selection */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2 font-semibold">Card Template</label>
                        <div className="flex gap-2">
                            {['classic', 'modern', 'polaroid'].map((t) => (
                                <button 
                                    key={t}
                                    onClick={() => setTemplate(t)}
                                    className={`flex-1 py-2 rounded-lg border capitalize ${template === t ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold' : 'bg-white border-gray-200'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Dots Color</label>
                            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 cursor-pointer rounded border p-1" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Background</label>
                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 cursor-pointer rounded border p-1" />
                        </div>
                    </div>

                    {/* QR Style (Dots vs Squares) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Pixel Style</label>
                            <div className="flex gap-2">
                                <button onClick={() => setQrStyle('squares')} className={`p-2 rounded border ${qrStyle === 'squares' ? 'bg-gray-200' : ''}`}><Square size={20}/></button>
                                <button onClick={() => setQrStyle('dots')} className={`p-2 rounded border ${qrStyle === 'dots' ? 'bg-gray-200' : ''}`}><Circle size={20}/></button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Corner Roundness</label>
                            <input type="range" min="0" max="20" value={eyeRadius} onChange={(e) => setEyeRadius(Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>
                    </div>

                    {/* Logo & Label */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Label Text</label>
                            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={15} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Logo</label>
                            <div className="flex items-center gap-2">
                                <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded border text-sm flex items-center gap-1 ${uploading ? 'opacity-50' : ''}`}>
                                    {uploading ? <Loader2 size={14} className="animate-spin"/> : <Upload size={14} />} Upload
                                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" disabled={uploading} />
                                </label>
                                {icon && <button onClick={() => setIcon(null)} className="text-red-500 p-2"><Trash2 size={16}/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Preview (Cols 6) */}
            <div className="lg:col-span-6">
                <div className="sticky top-6">
                    <div className="bg-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-h-[500px]">
                        
                        {/* 🟢 DOWNLOAD AREA START 🟢 */}
                        <div 
                            id="qr-download-area" 
                            className="transition-all duration-300 transform hover:scale-[1.01]"
                            style={{ 
                                // Explicit styling to prevent 'lab' errors
                                backgroundColor: template === 'polaroid' ? '#ffffff' : (template === 'modern' ? fgColor : 'transparent'),
                                padding: template === 'polaroid' ? '20px 20px 60px 20px' : '0px',
                                borderRadius: template === 'modern' ? '24px' : '0px',
                                boxShadow: template === 'polaroid' ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
                                textAlign: 'center'
                            }}
                        >
                            {/* Inner Card */}
                            <div 
                                style={{
                                    backgroundColor: bgColor,
                                    padding: '25px',
                                    borderRadius: template === 'modern' ? '20px' : (template === 'polaroid' ? '4px' : '16px'),
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: template === 'modern' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                                }}
                            >
                                {/* Header Text */}
                                {label && template === 'modern' && (
                                    <div style={{ marginBottom: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: fgColor, letterSpacing: '1px' }}>
                                        {label}
                                    </div>
                                )}

                                {/* THE QR CODE */}
                                <QRCodeCanvas 
                                    value={getQrValue()} 
                                    size={280} 
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    level={"H"}
                                    includeMargin={false}
                                    imageSettings={icon ? { src: icon, height: 60, width: 60, excavate: true } : undefined}
                                    style={{ 
                                        borderRadius: `${eyeRadius}px` // Applying radius to the canvas element roughly
                                    }}
                                />

                                {/* Footer Text */}
                                {label && template !== 'modern' && (
                                    <div style={{ 
                                        marginTop: '15px', 
                                        fontFamily: 'monospace', 
                                        fontWeight: 'bold', 
                                        color: fgColor, 
                                        fontSize: '20px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {label}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 🔴 DOWNLOAD AREA END 🔴 */}

                        <div className="mt-8 w-full max-w-sm space-y-3">
                            <p className="text-gray-400 text-xs text-center flex items-center justify-center gap-1">
                                <Smartphone size={12} /> Test with your camera before downloading
                            </p>
                            <button 
                                onClick={downloadQR}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/40 transition flex items-center justify-center gap-2"
                            >
                                <Download size={22} />
                                Download Card
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}