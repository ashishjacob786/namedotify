"use client";
import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Palette, Upload, Trash2, Wifi, Mail, FileText, Smartphone, Loader2, Square, Circle, MousePointer2 } from 'lucide-react';

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
        // 🔥 MAGIC FIX: Ye Global CSS ko clone se hata dega taaki 'lab()' error na aaye
        onclone: (clonedDoc) => {
            const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(style => style.remove());
            
            // Clone wale element ko visible aur sahi font ensure karo
            const cloneEl = clonedDoc.getElementById('qr-capture-zone');
            if(cloneEl) {
                cloneEl.style.fontFamily = 'Arial, sans-serif'; 
            }
        }
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `QR-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        console.error("Download Error:", err);
        alert(`Download Failed: ${err.message}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-6">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <QrCode className="text-indigo-600 w-10 h-10" /> Pro QR Studio
            </h1>
            <p className="text-gray-600">Create custom Dot-Style QR codes with Logos and Frames.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: Controls (Cols 6) */}
            <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Content Tabs */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-2">
                    {[
                        { id: 'url', icon: LinkIcon, label: 'URL' },
                        { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
                        { id: 'text', icon: FileText, label: 'Text' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition ${
                                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-100'
                            }`}
                        >
                            <tab.icon size={16} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* 2. Inputs */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">1. Enter Data</h3>
                    {activeTab === 'url' && <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 border rounded-lg outline-none focus:border-indigo-500" />}
                    {activeTab === 'text' && <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border rounded-lg outline-none focus:border-indigo-500" />}
                    {activeTab === 'wifi' && (
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="SSID" className="w-full p-3 border rounded-lg" />
                            <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="w-full p-3 border rounded-lg" />
                        </div>
                    )}
                </div>

                {/* 3. Design Controls */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    <h3 className="font-bold text-gray-800">2. Design & Style</h3>

                    {/* Template */}
                    <div className="flex gap-2 mb-4">
                        {['classic', 'modern'].map((t) => (
                            <button key={t} onClick={() => setTemplate(t)} className={`flex-1 py-2 border rounded capitalize ${template === t ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold' : ''}`}>
                                {t} Card
                            </button>
                        ))}
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

                    {/* PIXEL STYLE & RADIUS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Pixel Style</label>
                            <div className="flex gap-2">
                                <button onClick={() => setQrStyle('squares')} className={`flex-1 py-2 border rounded flex justify-center ${qrStyle === 'squares' ? 'bg-gray-200 ring-2 ring-indigo-500' : ''}`} title="Squares"><Square size={18}/></button>
                                <button onClick={() => setQrStyle('dots')} className={`flex-1 py-2 border rounded flex justify-center ${qrStyle === 'dots' ? 'bg-gray-200 ring-2 ring-indigo-500' : ''}`} title="Dots"><Circle size={18}/></button>
                                <button onClick={() => setQrStyle('fluid')} className={`flex-1 py-2 border rounded flex justify-center ${qrStyle === 'fluid' ? 'bg-gray-200 ring-2 ring-indigo-500' : ''}`} title="Fluid"><MousePointer2 size={18}/></button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Eye Roundness: {eyeRadius}</label>
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
                                <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded border text-sm flex items-center gap-1 w-full justify-center ${uploading ? 'opacity-50' : ''}`}>
                                    {uploading ? <Loader2 size={14} className="animate-spin"/> : <Upload size={14} />} Upload
                                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" disabled={uploading} />
                                </label>
                                {icon && <button onClick={() => setIcon('')} className="text-red-500 p-2"><Trash2 size={16}/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Preview (Cols 6) */}
            <div className="lg:col-span-6">
                <div className="sticky top-6">
                    <div className="bg-gray-800 p-6 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-h-[500px]">
                        
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

                        <p className="mt-8 text-gray-400 text-xs flex items-center justify-center gap-1 mb-4">
                            <Smartphone size={12} /> Scan to test before downloading
                        </p>

                        <button 
                            onClick={downloadQR}
                            className="bg-green-500 hover:bg-green-600 text-white w-full max-w-sm py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Download size={24} />
                            Download High Quality
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}