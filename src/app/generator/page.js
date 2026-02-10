"use client";
import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Upload, Trash2, Wifi, FileText, Smartphone, Loader2, Square, Circle, MousePointer2, Zap, ShieldCheck, Layers } from 'lucide-react';

export default function QrPage() {
  const [activeTab, setActiveTab] = useState('url'); 
  
  // Content Inputs
  const [url, setUrl] = useState('https://namedotify.com');
  const [text, setText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  
  // Design State
  const [label, setLabel] = useState('SCAN ME');
  const [icon, setIcon] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrStyle, setQrStyle] = useState('squares'); 
  const [eyeRadius, setEyeRadius] = useState(0); 
  const [template, setTemplate] = useState('modern');

  // ✅ Advanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Pro QR Code Generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description: 'Create professional custom QR codes with logos, colors, and frames. Free tool for WiFi, URLs, and Business Cards.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  // QR Value Logic
  const getQrValue = () => {
    switch(activeTab) {
        case 'url': return url || 'https://namedotify.com';
        case 'text': return text || 'Hello';
        case 'wifi': return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
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
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    const element = document.getElementById('qr-capture-zone');
    if (!element) return;

    html2canvas(element, {
        useCORS: true,
        scale: 4, // Ultra HD Quality
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
            const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(style => style.remove());
            const cloneEl = clonedDoc.getElementById('qr-capture-zone');
            if(cloneEl) { cloneEl.style.fontFamily = 'Arial, sans-serif'; }
        }
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `NameDotify-QR-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        alert('Download failed. Please try again.');
    });
  };

  return (
    // ✅ FIX: 'pt-32' increased padding to strictly cover top area
    // 'bg-gray-50' is on the parent to ensure background color fills the padding
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-32">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: REMOVED all 'mt-' (margin-top) to prevent black strip */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-4">
                <QrCode size={12} className="mr-1" /> Marketing Tools
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Pro QR Code Generator
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Create stunning, brand-aware QR codes with custom logos and colors. 
                Perfect for <span className="text-indigo-600 font-bold">Business Cards</span>, <span className="text-indigo-600 font-bold">WiFi access</span>, and <span className="text-indigo-600 font-bold">Menus</span>.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            
            {/* LEFT: Controls (Cols 6) */}
            <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Content Tabs */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-2">
                    {[
                        { id: 'url', icon: LinkIcon, label: 'Website URL' },
                        { id: 'wifi', icon: Wifi, label: 'WiFi Network' },
                        { id: 'text', icon: FileText, label: 'Plain Text' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition ${
                                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* 2. Inputs */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
                        Enter Data
                    </h3>
                    
                    {activeTab === 'url' && (
                        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" placeholder="https://example.com" />
                    )}
                    
                    {activeTab === 'text' && (
                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition h-32" placeholder="Type your text here..." />
                    )}
                    
                    {activeTab === 'wifi' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="Network Name (SSID)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none" />
                            <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none" />
                        </div>
                    )}
                </div>

                {/* 3. Design Controls */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 transition-all hover:shadow-md">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
                        Customize Design
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Dots Color</label>
                            <div className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent" />
                                <span className="text-xs font-mono text-gray-500">{fgColor}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Background</label>
                            <div className="flex items-center gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent" />
                                <span className="text-xs font-mono text-gray-500">{bgColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* PIXEL STYLE */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Pixel Style</label>
                        <div className="flex gap-2">
                            <button onClick={() => setQrStyle('squares')} className={`flex-1 py-2 border rounded-lg flex justify-center transition ${qrStyle === 'squares' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-50'}`} title="Squares"><Square size={18}/></button>
                            <button onClick={() => setQrStyle('dots')} className={`flex-1 py-2 border rounded-lg flex justify-center transition ${qrStyle === 'dots' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-50'}`} title="Dots"><Circle size={18}/></button>
                            <button onClick={() => setQrStyle('fluid')} className={`flex-1 py-2 border rounded-lg flex justify-center transition ${qrStyle === 'fluid' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-50'}`} title="Fluid"><MousePointer2 size={18}/></button>
                        </div>
                    </div>

                    {/* Logo & Label */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Label Text</label>
                            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={20} className="w-full p-2.5 border rounded-lg" placeholder="SCAN ME" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Upload Logo</label>
                            <div className="flex items-center gap-2">
                                <label className={`cursor-pointer bg-gray-50 hover:bg-indigo-50 border border-dashed border-gray-300 hover:border-indigo-300 px-3 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 w-full transition text-gray-600 hover:text-indigo-600 ${uploading ? 'opacity-50' : ''}`}>
                                    {uploading ? <Loader2 size={16} className="animate-spin"/> : <Upload size={16} />} 
                                    {icon ? 'Change Logo' : 'Upload'}
                                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" disabled={uploading} />
                                </label>
                                {icon && <button onClick={() => setIcon('')} className="text-red-500 p-2 bg-red-50 rounded-lg"><Trash2 size={16}/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Preview (Cols 6) */}
            <div className="lg:col-span-6">
                <div className="sticky top-32">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-h-[500px] border border-gray-700">
                        
                        {/* CAPTURE ZONE */}
                        <div 
                            id="qr-capture-zone" 
                            style={{
                                backgroundColor: template === 'modern' ? fgColor : 'transparent',
                                padding: template === 'modern' ? '20px' : '0px',
                                borderRadius: '20px',
                                display: 'inline-block', 
                                textAlign: 'center',
                                fontFamily: 'sans-serif' 
                            }}
                        >
                            <div style={{
                                backgroundColor: bgColor,
                                padding: '25px',
                                borderRadius: template === 'modern' ? '16px' : '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                {label && template === 'modern' && (
                                    <div style={{ marginBottom: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: fgColor, fontSize: '18px', fontFamily: 'sans-serif' }}>
                                        {label}
                                    </div>
                                )}

                                <QRCode 
                                    value={getQrValue()}
                                    size={250}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    qrStyle={qrStyle} 
                                    eyeRadius={eyeRadius} 
                                    logoImage={icon}
                                    logoWidth={60}
                                    logoHeight={60}
                                    logoOpacity={1}
                                    removeQrCodeBehindLogo={true}
                                    ecLevel="H"
                                />

                                {label && template === 'classic' && (
                                    <div style={{ marginTop: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: fgColor, fontSize: '20px', fontFamily: 'sans-serif' }}>
                                        {label}
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="mt-8 text-gray-400 text-xs flex items-center justify-center gap-1 mb-4 uppercase tracking-wider">
                            <Smartphone size={14} /> Scan camera to test
                        </p>

                        <button 
                            onClick={downloadQR}
                            className="bg-green-500 hover:bg-green-600 text-white w-full max-w-sm py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Download size={24} />
                            Download High Quality
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* ✅ High CPC Keyword Content */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-indigo max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Boost Your Business with Custom QR Codes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4"><Zap size={20}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Contactless Menus</h3>
                    <p className="text-gray-600 text-sm">
                        Restaurants use QR codes to replace physical menus. It’s hygienic, saves printing costs, and allows instant updates to pricing.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mb-4"><Layers size={20}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Product Packaging</h3>
                    <p className="text-gray-600 text-sm">
                        Add a QR code to your product labels to link to user manuals, video tutorials, or warranty registration pages.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4"><ShieldCheck size={20}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Secure WiFi Access</h3>
                    <p className="text-gray-600 text-sm">
                        Stop shouting your WiFi password across the room. Generate a secure WiFi QR code that guests can scan to connect instantly.
                    </p>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}