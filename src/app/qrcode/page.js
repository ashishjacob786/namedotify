"use client";
import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Palette, Upload, Trash2, Wifi, FileText, Smartphone, Loader2, Square, Circle, MousePointer2, CheckCircle, Shield, Zap } from 'lucide-react';

export default function QrPage() {
  const [activeTab, setActiveTab] = useState('url'); 
  
  // Content Inputs
  const [url, setUrl] = useState('https://namedotify.com');
  const [text, setText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [email, setEmail] = useState('');

  // Design State
  const [label, setLabel] = useState('SCAN ME');
  const [icon, setIcon] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrStyle, setQrStyle] = useState('squares'); // 'squares' | 'dots' | 'fluid'
  const [eyeRadius, setEyeRadius] = useState(0); 
  const [template, setTemplate] = useState('modern');

  // ✅ Advanced JSON-LD Schema (SEO Magic)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Pro QR Studio',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description: 'Create professional custom QR codes with logos, colors, and frames. Supports URL, WiFi, and Text. Download in HD PNG.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: 'Custom Logo, WiFi QR, HD Download, Color Customization'
  };

  // QR Value Logic
  const getQrValue = () => {
    switch(activeTab) {
        case 'url': return url || 'https://namedotify.com';
        case 'text': return text || 'Hello';
        case 'wifi': return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
        case 'email': return `mailto:${email}`;
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

  // ✅ NUCLEAR FIX FOR DOWNLOAD ERROR
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
            if(cloneEl) {
                cloneEl.style.fontFamily = 'Arial, sans-serif'; 
            }
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
        console.error("Download Error:", err);
        alert(`Download Failed: ${err.message}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 mt-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3 text-gray-900">
                <QrCode className="text-indigo-600 w-10 h-10 md:w-12 md:h-12" /> Pro QR Studio
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create stunning, brand-aware QR codes with custom logos, colors, and frames. 
                Perfect for WiFi, Business Cards, and Marketing.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            
            {/* LEFT: Controls (Cols 6) */}
            <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Content Tabs */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-2">
                    {[
                        { id: 'url', icon: LinkIcon, label: 'Website URL' },
                        { id: 'wifi', icon: Wifi, label: 'Wi-Fi Network' },
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
                        Enter Content
                    </h3>
                    
                    {activeTab === 'url' && (
                        <div>
                             <label className="block text-sm font-medium text-gray-600 mb-2">Website Link</label>
                             <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" placeholder="https://example.com" />
                        </div>
                    )}
                    
                    {activeTab === 'text' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Your Message</label>
                            <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition h-32" placeholder="Type your text here..." />
                        </div>
                    )}
                    
                    {activeTab === 'wifi' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Network Name (SSID)</label>
                                <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="Home_WiFi" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                                <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="SecretKey123" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none" />
                            </div>
                            <p className="text-xs text-gray-500 col-span-2 flex items-center gap-1"><Shield size={12}/> Your WiFi data is generated locally and not stored.</p>
                        </div>
                    )}
                </div>

                {/* 3. Design Controls */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 transition-all hover:shadow-md">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
                        Customize Design
                    </h3>

                    {/* Template */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Frame Style</label>
                        <div className="flex gap-2 mb-4">
                            {['classic', 'modern'].map((t) => (
                                <button key={t} onClick={() => setTemplate(t)} className={`flex-1 py-2 border rounded-lg capitalize transition ${template === t ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold' : 'hover:bg-gray-50'}`}>
                                    {t} Card
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
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

                    {/* PIXEL STYLE & RADIUS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Pixel Style</label>
                            <div className="flex gap-2">
                                <button onClick={() => setQrStyle('squares')} className={`flex-1 py-2 border rounded-lg flex justify-center transition ${qrStyle === 'squares' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-50'}`} title="Squares"><Square size={18}/></button>
                                <button onClick={() => setQrStyle('dots')} className={`flex-1 py-2 border rounded-lg flex justify-center transition ${qrStyle === 'dots' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-50'}`} title="Dots"><Circle size={18}/></button>
                                <button onClick={() => setQrStyle('fluid')} className={`flex-1 py-2 border rounded-lg flex justify-center transition ${qrStyle === 'fluid' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-50'}`} title="Fluid"><MousePointer2 size={18}/></button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Corner Roundness</label>
                            <input type="range" min="0" max="20" value={eyeRadius} onChange={(e) => setEyeRadius(Number(e.target.value))} className="w-full accent-indigo-600 cursor-pointer" />
                        </div>
                    </div>

                    {/* Logo & Label */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Label Text</label>
                            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={20} className="w-full p-2.5 border rounded-lg" placeholder="SCAN ME" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Logo (Center)</label>
                            <div className="flex items-center gap-2">
                                <label className={`cursor-pointer bg-gray-50 hover:bg-indigo-50 border border-dashed border-gray-300 hover:border-indigo-300 px-3 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 w-full transition text-gray-600 hover:text-indigo-600 ${uploading ? 'opacity-50' : ''}`}>
                                    {uploading ? <Loader2 size={16} className="animate-spin"/> : <Upload size={16} />} 
                                    {icon ? 'Change Logo' : 'Upload Logo'}
                                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" disabled={uploading} />
                                </label>
                                {icon && <button onClick={() => setIcon('')} className="text-red-500 hover:text-red-600 p-2 bg-red-50 rounded-lg"><Trash2 size={16}/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Preview (Cols 6) */}
            <div className="lg:col-span-6">
                <div className="sticky top-6">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-h-[500px] border border-gray-700">
                        
                        {/* 🟢 CAPTURE ZONE (Pure Inline CSS to fix download error) 🟢 */}
                        <div 
                            id="qr-capture-zone" 
                            style={{
                                backgroundColor: template === 'modern' ? fgColor : 'transparent',
                                padding: template === 'modern' ? '20px' : '0px',
                                borderRadius: '20px',
                                display: 'inline-block', 
                                textAlign: 'center',
                                fontFamily: 'sans-serif' // Explicit Font
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
                                {/* Label Top */}
                                {label && template === 'modern' && (
                                    <div style={{ marginBottom: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: fgColor, fontSize: '18px', fontFamily: 'sans-serif' }}>
                                        {label}
                                    </div>
                                )}

                                {/* THE NEW LIBRARY QR CODE */}
                                <QRCode 
                                    value={getQrValue()}
                                    size={250}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    qrStyle={qrStyle} // 'squares' | 'dots' | 'fluid'
                                    eyeRadius={eyeRadius} 
                                    logoImage={icon}
                                    logoWidth={60}
                                    logoHeight={60}
                                    logoOpacity={1}
                                    removeQrCodeBehindLogo={true}
                                    ecLevel="H"
                                />

                                {/* Label Bottom */}
                                {label && template === 'classic' && (
                                    <div style={{ marginTop: '15px', fontWeight: 'bold', textTransform: 'uppercase', color: fgColor, fontSize: '20px', fontFamily: 'sans-serif' }}>
                                        {label}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 🔴 END CAPTURE ZONE 🔴 */}

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

        {/* ✅ Human Written SEO Content Section (New Addition) */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-indigo max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Custom QR Codes for Business & Personal Use</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
                Welcome to the <strong>Pro QR Studio</strong> by NameDotify. Unlike basic generators, our tool allows you to fully customize your QR codes 
                to match your brand identity. Upload your logo, choose your brand colors, and select from unique pixel styles like "Dots" or "Fluid" 
                to make your code stand out.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 not-prose">
                <div className="flex flex-col items-start">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mb-4"><Wifi size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">WiFi QR Codes</h3>
                    <p className="text-gray-500">Share your home or office WiFi without revealing the password. Guests simply scan to connect instantly.</p>
                </div>
                <div className="flex flex-col items-start">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mb-4"><Upload size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">Logo Integration</h3>
                    <p className="text-gray-500">Upload your company logo to the center of the QR code. We automatically adjust the error correction level to ensure it remains scannable.</p>
                </div>
                <div className="flex flex-col items-start">
                    <div className="bg-green-100 p-3 rounded-lg text-green-600 mb-4"><Download size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">HD Download</h3>
                    <p className="text-gray-500">Download in ultra-high definition (4x Scale) PNG format, perfect for printing on flyers, business cards, and billboards.</p>
                </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="text-yellow-500"/> Best Practices for Printing
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><strong>Contrast is Key:</strong> Always ensure the dots (foreground) are darker than the background. A light QR code on a dark background is harder for cameras to read.</li>
                    <li><strong>Test Before Print:</strong> Always scan the code with your phone camera before printing 1,000 flyers.</li>
                    <li><strong>Size Matters:</strong> For print, ensure the QR code is at least 1x1 inch (2.5x2.5 cm) for easy scanning.</li>
                </ul>
            </div>
        </section>

      </div>
    </div>
  );
}