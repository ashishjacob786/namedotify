"use client";
import React, { useState, useRef } from 'react';
import { Mail, Phone, Globe, MapPin, Copy, CheckCircle, User, Briefcase, Link as LinkIcon, Palette, Image as ImageIcon, BriefcaseBusiness, PenTool, LayoutTemplate, Share2 } from 'lucide-react';

export default function SignaturePage() {
  // Form States
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [jobTitle, setJobTitle] = useState('Marketing Manager');
  const [department, setDepartment] = useState('Growth Team');
  const [company, setCompany] = useState('NameDotify Inc.');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [mobile, setMobile] = useState('+1 (555) 987-6543');
  const [email, setEmail] = useState('john.doe@namedotify.com');
  const [website, setWebsite] = useState('www.namedotify.com');
  const [address, setAddress] = useState('123 Innovation Drive, Tech City, NY 10001');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200');
  const [themeColor, setThemeColor] = useState('#2563eb'); // Default Blue
  
  // Social Links States
  const [linkedin, setLinkedin] = useState('https://linkedin.com');
  const [twitter, setTwitter] = useState('https://twitter.com');
  const [instagram, setInstagram] = useState('https://instagram.com');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');

  const [copied, setCopied] = useState(false);
  const signatureRef = useRef(null);

  // ✅ Advanced JSON-LD Schema (B2B SaaS Tool)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NameDotify Free Email Signature Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Create professional, HTML-optimized email signatures for Gmail, Outlook, and Apple Mail with Social Links. No watermarks, completely free.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  // Modern Rich Text Copy Logic (Preserves HTML for Gmail/Outlook)
  const copySignature = async () => {
    if (!signatureRef.current) return;
    
    try {
      const html = signatureRef.current.innerHTML;
      const text = signatureRef.current.innerText;
      
      const blobHtml = new Blob([html], { type: "text/html" });
      const blobText = new Blob([text], { type: "text/plain" });
      
      const data = [new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
      })];
      
      await navigator.clipboard.write(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback for older browsers
      const range = document.createRange();
      range.selectNode(signatureRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* ✅ SEO: Dynamic Title & Meta Tags injected directly for Client Component */}
      <title>Free Email Signature Generator (No Watermarks) | NameDotify</title>
      <meta name="description" content="Create a professional HTML email signature for Gmail, Outlook, and Apple Mail. Add your photo, logo, and social media links. 100% Free." />
      <meta name="keywords" content="email signature generator, free email signature, gmail signature, html email signature, b2b signature tool" />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                <BriefcaseBusiness size={12} className="mr-1" /> Professional Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Pro Email Signature Generator
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Create beautiful, corporate-ready email signatures in seconds. 
                Works perfectly with <span className="font-bold text-gray-800">Gmail, Outlook, and Apple Mail</span>. 
                <span className="text-blue-600 font-bold ml-1">Zero Watermarks.</span>
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            
            {/* LEFT COLUMN: Input Forms (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* Personal Info */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <User className="text-blue-600" size={20} /> Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <Briefcase className="text-blue-600" size={20} /> Company Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Office Phone</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Phone</label>
                            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Website URL</label>
                            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Office Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                    </div>
                </div>

                {/* Design & Photo */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <Palette className="text-blue-600" size={20} /> Design & Graphics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1"><ImageIcon size={14}/> Photo / Logo URL</label>
                            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="https://..." />
                            <p className="text-xs text-gray-400 mt-1">Must be a direct image link ending in .jpg or .png</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Theme Color</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-12 h-12 rounded-lg border-0 cursor-pointer p-0" />
                                <span className="font-mono text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-md">{themeColor}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links Form */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <Share2 className="text-blue-600" size={20} /> Social Media Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn URL</label>
                            <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="https://linkedin.com/in/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Twitter URL</label>
                            <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="https://twitter.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Instagram URL</label>
                            <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="https://instagram.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Facebook URL</label>
                            <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="https://facebook.com/..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">YouTube URL</label>
                            <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="https://youtube.com/..." />
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Live Preview (5 Cols) */}
            <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-6">
                    
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <LayoutTemplate size={18} /> Live Preview
                            </h3>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                        </div>
                        
                        {/* ACTUAL SIGNATURE RENDER AREA (HTML Tables for Email compatibility) */}
                        <div className="p-8 overflow-x-auto bg-white" style={{ minHeight: '300px' }}>
                            <div ref={signatureRef}>
                                <table cellPadding="0" cellSpacing="0" style={{ verticalAlign: '-webkit-baseline-middle', fontSize: 'medium', fontFamily: 'Arial, sans-serif' }}>
                                    <tbody>
                                        <tr>
                                            {/* Avatar/Logo Side */}
                                            {photoUrl && (
                                                <td style={{ verticalAlign: 'middle', paddingRight: '20px' }}>
                                                    <img src={photoUrl} alt={`${firstName} ${lastName}`} width="100" style={{ maxWidth: '100px', borderRadius: '50%', objectFit: 'cover', width: '100px', height: '100px' }} />
                                                </td>
                                            )}
                                            
                                            {/* Divider Line */}
                                            {photoUrl && (
                                                <td style={{ verticalAlign: 'middle', borderRight: `2px solid ${themeColor}`, paddingRight: '20px' }}></td>
                                            )}

                                            {/* Details Side */}
                                            <td style={{ verticalAlign: 'middle', paddingLeft: photoUrl ? '20px' : '0px' }}>
                                                <h3 style={{ margin: '0 0 2px 0', fontSize: '18px', color: '#111827', fontWeight: 'bold' }}>
                                                    {firstName} {lastName}
                                                </h3>
                                                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: themeColor, fontWeight: '600' }}>
                                                    {jobTitle} {department && `| ${department}`}
                                                </p>
                                                
                                                {company && (
                                                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#4B5563', fontWeight: 'bold' }}>
                                                        {company}
                                                    </p>
                                                )}

                                                <table cellPadding="0" cellSpacing="0" style={{ verticalAlign: '-webkit-baseline-middle', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#4B5563' }}>
                                                    <tbody>
                                                        {(phone || mobile) && (
                                                            <tr style={{ height: '20px' }}>
                                                                <td style={{ paddingRight: '5px', color: themeColor }}><b>P:</b></td>
                                                                <td>
                                                                    {phone && <a href={`tel:${phone}`} style={{ textDecoration: 'none', color: '#4B5563' }}>{phone}</a>}
                                                                    {phone && mobile && <span style={{ margin: '0 5px' }}>|</span>}
                                                                    {mobile && <a href={`tel:${mobile}`} style={{ textDecoration: 'none', color: '#4B5563' }}>{mobile}</a>}
                                                                </td>
                                                            </tr>
                                                        )}
                                                        {email && (
                                                            <tr style={{ height: '20px' }}>
                                                                <td style={{ paddingRight: '5px', color: themeColor }}><b>E:</b></td>
                                                                <td><a href={`mailto:${email}`} style={{ textDecoration: 'none', color: '#4B5563' }}>{email}</a></td>
                                                            </tr>
                                                        )}
                                                        {website && (
                                                            <tr style={{ height: '20px' }}>
                                                                <td style={{ paddingRight: '5px', color: themeColor }}><b>W:</b></td>
                                                                <td><a href={`https://${website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#4B5563' }}>{website}</a></td>
                                                            </tr>
                                                        )}
                                                        {address && (
                                                            <tr style={{ height: '20px' }}>
                                                                <td style={{ paddingRight: '5px', color: themeColor }}><b>A:</b></td>
                                                                <td>{address}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>

                                                {/* Social Icons (Simple Text Links for Max Compatibility) */}
                                                {(linkedin || twitter || instagram || facebook || youtube) && (
                                                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                        {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: themeColor, fontSize: '12px', fontWeight: 'bold' }}>LinkedIn</a>}
                                                        {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: themeColor, fontSize: '12px', fontWeight: 'bold' }}>Twitter</a>}
                                                        {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: themeColor, fontSize: '12px', fontWeight: 'bold' }}>Instagram</a>}
                                                        {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: themeColor, fontSize: '12px', fontWeight: 'bold' }}>Facebook</a>}
                                                        {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: themeColor, fontSize: '12px', fontWeight: 'bold' }}>YouTube</a>}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={copySignature}
                        className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white shadow-green-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'}`}
                    >
                        {copied ? <CheckCircle size={24} /> : <Copy size={24} />}
                        {copied ? 'Copied to Clipboard!' : 'Copy Signature'}
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Clicking copy preserves the layout for Gmail, Outlook & Apple Mail.
                    </p>
                </div>
            </div>
        </div>

        {/* ✅ High CPC Keyword Content (B2B SaaS Focus) */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Every Professional Needs a Custom Email Signature?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4"><BriefcaseBusiness size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Build Corporate Trust</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        An email without a signature looks like spam. A properly formatted HTML signature with your <strong>Company Logo</strong> and contact details instantly builds trust and authority with clients.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4"><Globe size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Free Marketing Channel</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Think of your signature as a digital business card. By adding links to your <strong>Corporate Website</strong> and <strong>LinkedIn Profile</strong>, you turn every outbound email into a lead generation tool.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4"><PenTool size={24}/></div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Cross-Platform Compatibility</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Designing a signature that looks good on both mobile and desktop is hard. Our generator uses strictly coded <strong>HTML Tables</strong> to ensure it renders perfectly on Gmail, Outlook, and Apple Mail.
                    </p>
                </div>
            </div>

            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">How to install your signature in Gmail?</h3>
                <ol className="list-decimal pl-5 text-blue-800 space-y-2 font-medium">
                    <li>Fill out the form above with your professional details.</li>
                    <li>Click the massive <strong>"Copy Signature"</strong> button. (Do not highlight and copy manually).</li>
                    <li>Open Gmail, click the Gear Icon (Settings) ➔ See all settings.</li>
                    <li>Scroll down to the "Signature" section, create a new one, and simply press <strong>Ctrl+V (or Cmd+V)</strong> to paste.</li>
                    <li>Save changes at the bottom of the page. You're done!</li>
                </ol>
            </div>
        </section>

      </div>
    </div>
  );
}