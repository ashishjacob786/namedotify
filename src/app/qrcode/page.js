"use client";
import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Palette, Upload, Trash2, Wifi, FileText, Smartphone, Loader2, Square, Circle, MousePointer2, Shield, Zap, Info } from 'lucide-react';

export default function QrPage() {
  const [activeTab, setActiveTab] = useState('url'); 
  const qrRef = useRef(null);
  
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

  // ✅ 1. Advanced JSON-LD Schema (SoftwareApp + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NameDotify Pro QR Studio",
        "operatingSystem": "Web",
        "applicationCategory": "DesignApplication",
        "url": "https://namedotify.com/qrcode",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Create professional custom QR codes with logos, colors, and frames. Supports URL, WiFi, and Text. Download in HD PNG."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I add a logo to my QR code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our tool allows you to upload a custom logo which is placed in the center of the QR code without affecting scannability."
            }
          },
          {
            "@type": "Question",
            "name": "Do these QR codes expire?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, the QR codes generated here are static and will work forever as long as the link or content remains valid."
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
            "name": "QR Code Generator",
            "item": "https://namedotify.com/qrcode"
          }
        ]
      }
    ]
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

  // ✅ ROBUST DOWNLOAD FUNCTION
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
    // ✅ UI: Consistent Padding
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ 2. Advanced SEO Tags */}
      <title>Free Custom QR Code Generator with Logo | NameDotify.com</title>
      <meta name="description" content="Create professional QR codes with your logo, colors, and frames. Perfect for WiFi, URLs, and Business Cards. Download high-quality PNGs for free." />
      <meta name="keywords" content="qr code generator, custom qr code, qr code with logo, wifi qr code, free qr code maker, hd qr code" />
      
      {/* ✅ 3. Open Graph Tags */}
      <meta property="og:title" content="Pro QR Code Studio | NameDotify.com" />
      <meta property="og:description" content="Design custom QR codes with logos and colors instantly." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://namedotify.com/qrcode" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide mb-6 border border-orange-200">
                <QrCode size={14} className="mr-2" /> Design Studio
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Pro QR Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">Generator</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Create stunning, brand-aware QR codes with <span className="font-bold text-gray-800">custom logos, colors, and frames</span>. 
                Perfect for WiFi, Marketing, and Print.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            
            {/* LEFT: Controls (Cols 6) */}
            <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Content Tabs */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap gap-2">
                    {[
                        { id: 'url', icon: LinkIcon, label: 'Website URL' },
                        { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
                        { id: 'text', icon: FileText, label: 'Text' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition ${
                                activeTab === tab.id ? 'bg-orange-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'
                            }`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* 2. Inputs */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">1</span> 
                        Enter Content
                    </h3>
                    
                    {activeTab === 'url' && (
                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2">Website Link</label>
                             <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition" placeholder="https://example.com" />
                        </div>
                    )}
                    
                    {activeTab === 'text' && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                            <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition h-32" placeholder="Type your text here..." />
                        </div>
                    )}
                    
                    {activeTab === 'wifi' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Network Name (SSID)</label>
                                <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="Home_WiFi" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 outline-none transition focus:border-orange-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                                <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="SecretKey123" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 outline-none transition focus:border-orange-500" />
                            </div>
                            <p className="text-xs text-gray-500 col-span-2 flex items-center gap-1 bg-gray-50 p-2 rounded-lg"><Shield size={12}/> Your WiFi data is generated locally and not stored.</p>
                        </div>
                    )}
                </div>

                {/* 3. Design Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-8 transition-all hover:shadow-md">
                    <h3 className="font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">2</span> 
                        Customize Design
                    </h3>

                    {/* Template */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Frame Style</label>
                        <div className="flex gap-3">
                            {['classic', 'modern'].map((t) => (
                                <button key={t} onClick={() => setTemplate(t)} className={`flex-1 py-3 border rounded-xl capitalize transition font-bold ${template === t ? 'bg-orange-50 border-orange-500 text-orange-700' : 'hover:bg-gray-50 text-gray-600'}`}>
                                    {t} Card
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Dots Color</label>
                            <div className="flex items-center gap-3 border border-gray-200 p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg border-0 cursor-pointer p-0 bg-transparent" />
                                <span className="text-xs font-mono text-gray-500 font-bold">{fgColor}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Background</label>
                            <div className="flex items-center gap-3 border border-gray-200 p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg border-0 cursor-pointer p-0 bg-transparent" />
                                <span className="text-xs font-mono text-gray-500 font-bold">{bgColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* PIXEL STYLE & RADIUS */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Pixel Style</label>
                            <div className="flex gap-2">
                                <button onClick={() => setQrStyle('squares')} className={`flex-1 py-2.5 border rounded-xl flex justify-center transition ${qrStyle === 'squares' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'hover:bg-gray-50 text-gray-400'}`} title="Squares"><Square size={20}/></button>
                                <button onClick={() => setQrStyle('dots')} className={`flex-1 py-2.5 border rounded-xl flex justify-center transition ${qrStyle === 'dots' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'hover:bg-gray-50 text-gray-400'}`} title="Dots"><Circle size={20}/></button>
                                <button onClick={() => setQrStyle('fluid')} className={`flex-1 py-2.5 border rounded-xl flex justify-center transition ${qrStyle === 'fluid' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'hover:bg-gray-50 text-gray-400'}`} title="Fluid"><MousePointer2 size={20}/></button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Corner Roundness</label>
                            <input type="range" min="0" max="20" value={eyeRadius} onChange={(e) => setEyeRadius(Number(e.target.value))} className="w-full accent-orange-600 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none" />
                        </div>
                    </div>

                    {/* Logo & Label */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Label Text</label>
                            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={20} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 outline-none transition focus:border-orange-500" placeholder="SCAN ME" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Logo (Center)</label>
                            <div className="flex items-center gap-2">
                                <label className={`cursor-pointer bg-gray-50 hover:bg-orange-50 border border-dashed border-gray-300 hover:border-orange-300 px-3 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full transition text-gray-600 hover:text-orange-600 ${uploading ? 'opacity-50' : ''}`}>
                                    {uploading ? <Loader2 size={16} className="animate-spin"/> : <Upload size={16} />} 
                                    {icon ? 'Change Logo' : 'Upload Logo'}
                                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" disabled={uploading} />
                                </label>
                                {icon && <button onClick={() => setIcon('')} className="text-red-500 hover:text-red-600 p-3 bg-red-50 rounded-xl transition"><Trash2 size={16}/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Preview (Cols 6) */}
            <div className="lg:col-span-6">
                <div className="sticky top-28">
                    <div className="bg-gray-900 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center min-h-[500px] border border-gray-800 relative overflow-hidden">
                        
                        {/* Background Gradient Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
                        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-orange-500 rounded-full blur-[100px] opacity-20"></div>

                        {/* 🟢 CAPTURE ZONE 🟢 */}
                        <div className="relative z-10 scale-90 md:scale-100 transition-transform">
                            <div 
                                id="qr-capture-zone" 
                                style={{
                                    backgroundColor: template === 'modern' ? fgColor : 'transparent',
                                    padding: template === 'modern' ? '20px' : '0px',
                                    borderRadius: '24px',
                                    display: 'inline-block', 
                                    textAlign: 'center',
                                    fontFamily: 'sans-serif'
                                }}
                            >
                                <div style={{
                                    backgroundColor: bgColor,
                                    padding: '30px',
                                    borderRadius: template === 'modern' ? '20px' : '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}>
                                    {/* Label Top */}
                                    {label && template === 'modern' && (
                                        <div style={{ marginBottom: '20px', fontWeight: '800', textTransform: 'uppercase', color: fgColor, fontSize: '20px', fontFamily: 'sans-serif', letterSpacing: '1px' }}>
                                            {label}
                                        </div>
                                    )}

                                    <QRCode 
                                        value={getQrValue()}
                                        size={220}
                                        fgColor={fgColor}
                                        bgColor={bgColor}
                                        qrStyle={qrStyle}
                                        eyeRadius={eyeRadius} 
                                        logoImage={icon}
                                        logoWidth={55}
                                        logoHeight={55}
                                        logoOpacity={1}
                                        removeQrCodeBehindLogo={true}
                                        ecLevel="H"
                                    />

                                    {/* Label Bottom */}
                                    {label && template === 'classic' && (
                                        <div style={{ marginTop: '20px', fontWeight: '800', textTransform: 'uppercase', color: fgColor, fontSize: '22px', fontFamily: 'sans-serif', letterSpacing: '1px' }}>
                                            {label}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* 🔴 END CAPTURE ZONE 🔴 */}

                        <p className="mt-10 text-gray-500 text-xs flex items-center justify-center gap-1 mb-6 uppercase tracking-wider font-bold relative z-10">
                            <Smartphone size={14} /> Scan with camera to test
                        </p>

                        <button 
                            onClick={downloadQR}
                            className="relative z-10 bg-green-500 hover:bg-green-600 text-white w-full max-w-sm py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-900/20 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Download size={24} />
                            Download High Quality
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-orange max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create Custom QR Codes for Business & Personal Use</h2>
            <p className="text-gray-600 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-12">
                Welcome to the <strong>Pro QR Studio</strong> by NameDotify. Unlike basic generators, our tool allows you to fully customize your QR codes 
                to match your brand identity. Upload your logo, choose your brand colors, and select from unique pixel styles like "Dots" or "Fluid".
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4"><Wifi size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">WiFi QR Codes</h3>
                    <p className="text-gray-600 text-sm">Share your home or office WiFi without revealing the password. Guests simply scan to connect instantly.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm mb-4"><Upload size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">Logo Integration</h3>
                    <p className="text-gray-600 text-sm">Upload your company logo to the center of the QR code. We automatically adjust the error correction level.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm mb-4"><Download size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">HD Download</h3>
                    <p className="text-gray-600 text-sm">Download in ultra-high definition (4x Scale) PNG format, perfect for printing on flyers and business cards.</p>
                </div>
            </div>

            <div className="mt-12 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <Zap size={20}/> Best Practices for Printing
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-yellow-800/80 text-sm">
                    <li><strong>Contrast is Key:</strong> Always ensure the dots (foreground) are darker than the background.</li>
                    <li><strong>Test Before Print:</strong> Always scan the code with your phone camera before printing 1,000 flyers.</li>
                    <li><strong>Size Matters:</strong> For print, ensure the QR code is at least 1x1 inch (2.5x2.5 cm) for easy scanning.</li>
                </ul>
            </div>
        </article>

      </div>
    </div>
  );
}