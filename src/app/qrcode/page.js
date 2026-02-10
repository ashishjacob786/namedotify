"use client";
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { QrCode, Download, Link as LinkIcon, Palette, Image as ImageIcon, Type, Upload, Trash2 } from 'lucide-react';

export default function QrPage() {
  const [text, setText] = useState('https://namedotify.com');
  const [label, setLabel] = useState(''); // Name/Label
  const [icon, setIcon] = useState(null); // Logo
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const qrRef = useRef();

  // Logo Upload karne ka function
  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download logic (Ab ye pure card ka screenshot lega)
  const downloadQR = async () => {
    if (!qrRef.current) return;
    
    // Canvas capture karo
    const canvas = await html2canvas(qrRef.current, {
        backgroundColor: null, // Transparent background support
        scale: 2 // High resolution ke liye
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = `qrcode-${label || 'namedotify'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <QrCode className="text-indigo-600 w-10 h-10" /> Pro QR Generator
            </h1>
            <p className="text-gray-600">Create branded QR codes with your Logo, Custom Colors, and Label.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Input Controls */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                
                {/* 1. URL Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <LinkIcon size={16}/> Content (URL or Text)
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://example.com"
                    />
                </div>

                {/* 2. Label Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <Type size={16}/> Label / Name (Optional)
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="e.g. Scan for Menu"
                        maxLength={25}
                    />
                </div>

                {/* 3. Logo Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <ImageIcon size={16}/> Center Logo (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition">
                            <Upload size={16} /> Upload Logo
                            <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" />
                        </label>
                        {icon && (
                            <button onClick={() => setIcon(null)} className="text-red-500 hover:text-red-700 p-2">
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* 4. Colors */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Palette size={16}/> Foreground
                        </label>
                        <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-10 w-full cursor-pointer rounded border p-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Palette size={16}/> Background
                        </label>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-full cursor-pointer rounded border p-1" />
                    </div>
                </div>
            </div>

            {/* Right: Preview & Download */}
            <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
                
                {/* Is div ka screenshot liya jayega */}
                <div 
                    ref={qrRef} 
                    className="p-6 rounded-xl shadow-xl flex flex-col items-center justify-center"
                    style={{ backgroundColor: bgColor }}
                >
                    <QRCodeCanvas 
                        value={text} 
                        size={250} 
                        fgColor={fgColor}
                        bgColor={bgColor} // Transparent rakho canvas ka, wrapper ka color dikhega
                        level={"H"} 
                        includeMargin={false}
                        imageSettings={icon ? {
                            src: icon,
                            x: undefined,
                            y: undefined,
                            height: 50,
                            width: 50,
                            excavate: true, // Logo ke peeche dots hatane ke liye
                        } : undefined}
                    />
                    
                    {/* Label Area */}
                    {label && (
                        <div 
                            className="mt-4 text-xl font-bold text-center w-full break-words"
                            style={{ color: fgColor, maxWidth: '250px' }}
                        >
                            {label}
                        </div>
                    )}
                </div>

                <p className="mt-6 text-sm text-gray-500 mb-4">Preview updates automatically</p>

                <button 
                    onClick={downloadQR}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg transform hover:scale-105 active:scale-95 transition"
                >
                    <Download size={20} />
                    Download PNG
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}