"use client";
import React, { useState, useEffect } from 'react';
import { 
  Code2, Copy, CheckCircle, ExternalLink, 
  FileText, HelpCircle, ShoppingBag, Store, 
  User, Building2, Plus, Trash2, LayoutTemplate,
  Globe, Image as ImageIcon, Briefcase, MapPin, Star
} from 'lucide-react';

export default function SchemaClient() {
  const [activeSchema, setActiveSchema] = useState('Article');
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [highlightedCode, setHighlightedCode] = useState('');

  // Form States
  const [article, setArticle] = useState({ type: 'Article', headline: '', url: '', image: '', author: '', publisher: '', publisherLogo: '', datePublished: '' });
  const [faq, setFaq] = useState([{ question: '', answer: '' }]);
  const [product, setProduct] = useState({ name: '', image: '', description: '', brand: '', price: '', currency: 'USD', availability: 'InStock', rating: '', reviewCount: '' });
  const [localBiz, setLocalBiz] = useState({ type: 'LocalBusiness', name: '', image: '', id: '', url: '', phone: '', priceRange: '$$', street: '', city: '', zip: '', country: '' });
  const [person, setPerson] = useState({ name: '', url: '', image: '', jobTitle: '', worksFor: '', sameAs: '' });
  const [org, setOrg] = useState({ name: '', url: '', logo: '', sameAs: '' });

  const schemaTypes = [
    { id: 'Article', icon: <FileText size={16}/> },
    { id: 'FAQ', icon: <HelpCircle size={16}/> },
    { id: 'Product', icon: <ShoppingBag size={16}/> },
    { id: 'LocalBusiness', icon: <Store size={16}/> },
    { id: 'Person', icon: <User size={16}/> },
    { id: 'Organization', icon: <Building2 size={16}/> },
  ];

  // Logic to Generate JSON-LD
  useEffect(() => {
    let schemaObj = {};

    if (activeSchema === 'Article') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": article.type,
        "headline": article.headline || "Enter your article headline",
        "image": article.image ? [article.image] : [],
        "datePublished": article.datePublished || new Date().toISOString().split('T')[0],
        "author": [{ "@type": "Person", "name": article.author || "Author Name" }],
        "publisher": {
          "@type": "Organization",
          "name": article.publisher || "Publisher Name",
          "logo": { "@type": "ImageObject", "url": article.publisherLogo || "https://example.com/logo.png" }
        }
      };
    } 
    else if (activeSchema === 'FAQ') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.filter(f => f.question && f.answer).map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      };
      if (schemaObj.mainEntity.length === 0) schemaObj.mainEntity = [{ "@type": "Question", "name": "Question?", "acceptedAnswer": { "@type": "Answer", "text": "Answer" } }];
    }
    else if (activeSchema === 'Product') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name || "Product Name",
        "image": product.image || "https://example.com/product.jpg",
        "description": product.description || "Product description...",
        "brand": { "@type": "Brand", "name": product.brand || "Brand Name" },
        "offers": {
          "@type": "Offer",
          "url": "https://example.com/product",
          "priceCurrency": product.currency,
          "price": product.price || "19.99",
          "availability": `https://schema.org/${product.availability}`
        }
      };
      if (product.rating && product.reviewCount) {
        schemaObj.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount
        };
      }
    }
    else if (activeSchema === 'LocalBusiness') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": localBiz.type,
        "name": localBiz.name || "Business Name",
        "image": localBiz.image || "https://example.com/image.jpg",
        "@id": localBiz.id || "https://example.com",
        "url": localBiz.url || "https://example.com",
        "telephone": localBiz.phone || "+1234567890",
        "priceRange": localBiz.priceRange,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localBiz.street || "123 Main St",
          "addressLocality": localBiz.city || "City",
          "postalCode": localBiz.zip || "12345",
          "addressCountry": localBiz.country || "US"
        }
      };
    }
    else if (activeSchema === 'Person') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": person.name || "John Doe",
        "url": person.url || "https://example.com",
        "image": person.image || "https://example.com/photo.jpg",
        "jobTitle": person.jobTitle || "Software Engineer",
        "worksFor": { "@type": "Organization", "name": person.worksFor || "Company Name" },
        "sameAs": person.sameAs ? person.sameAs.split(',').map(s => s.trim()) : ["https://linkedin.com/in/johndoe"]
      };
    }
    else if (activeSchema === 'Organization') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": org.name || "Company Name",
        "url": org.url || "https://example.com",
        "logo": org.logo || "https://example.com/logo.png",
        "sameAs": org.sameAs ? org.sameAs.split(',').map(s => s.trim()) : ["https://facebook.com/company"]
      };
    }

    const rawCode = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;
    setGeneratedCode(rawCode);

    // FIX: Safely escape HTML tags before setting innerHTML so the script tags actually display!
    let safeHtml = rawCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Custom Syntax Highlighting (Regex)
    safeHtml = safeHtml.replace(/"(.*?)":/g, '<span class="text-cyan-400">"$1"</span>:'); // Keys
    safeHtml = safeHtml.replace(/: "(.*?)"/g, ': <span class="text-amber-300">"$1"</span>'); // Values
    safeHtml = safeHtml.replace(/&lt;script(.*?)&gt;/g, '<span class="text-purple-400 font-bold">&lt;script$1&gt;</span>'); // Open Script
    safeHtml = safeHtml.replace(/&lt;\/script&gt;/g, '<span class="text-purple-400 font-bold">&lt;/script&gt;</span>'); // Close Script
    
    setHighlightedCode(safeHtml);

  }, [activeSchema, article, faq, product, localBiz, person, org]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addFaq = () => setFaq([...faq, { question: '', answer: '' }]);
  const removeFaq = (index) => setFaq(faq.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const newFaq = [...faq];
    newFaq[index][field] = value;
    setFaq(newFaq);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-800 font-sans pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-200 shadow-sm">
                <Code2 size={14} className="mr-2" /> Developer SEO Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                Schema Markup <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Generator</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Generate flawless JSON-LD structured data for your website. Secure Google Rich Snippets and dominate search results instantly.
            </p>
        </header>

        {/* --- MAIN DASHBOARD INTERFACE --- */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* LEFT: FORM CONTROLS (Col 6) */}
                <div className="lg:col-span-6 border-r border-slate-200 bg-white">
                    
                    {/* Schema Selector (Tabs) */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Select Schema Type</label>
                        <div className="flex flex-wrap gap-2">
                            {schemaTypes.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSchema(tab.id)}
                                    className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                                        activeSchema === tab.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {tab.icon} {tab.id}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Inputs Area */}
                    <div className="p-6 md:p-8 space-y-6 max-h-[700px] overflow-y-auto custom-scroll">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                            <LayoutTemplate className="text-indigo-500"/> Customize {activeSchema} Data
                        </h2>

                        {/* --- ARTICLE FORM --- */}
                        {activeSchema === 'Article' && (
                            <div className="space-y-4">
                                <InputWrapper label="Article Type">
                                    <select value={article.type} onChange={(e)=>setArticle({...article, type: e.target.value})} className="form-input">
                                        <option value="Article">Standard Article</option>
                                        <option value="NewsArticle">News Article</option>
                                        <option value="BlogPosting">Blog Posting</option>
                                    </select>
                                </InputWrapper>
                                <InputWrapper label="Headline / Title">
                                    <input type="text" placeholder="e.g. How to improve SEO in 2026" value={article.headline} onChange={(e)=>setArticle({...article, headline: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Author Name">
                                        <input type="text" placeholder="e.g. John Doe" value={article.author} onChange={(e)=>setArticle({...article, author: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Date Published">
                                        <input type="date" value={article.datePublished} onChange={(e)=>setArticle({...article, datePublished: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                                <InputWrapper label="Featured Image URL" icon={<ImageIcon size={16}/>}>
                                    <input type="url" placeholder="https://..." value={article.image} onChange={(e)=>setArticle({...article, image: e.target.value})} className="form-input pl-10" />
                                </InputWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Publisher Name">
                                        <input type="text" placeholder="e.g. NameDotify" value={article.publisher} onChange={(e)=>setArticle({...article, publisher: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Publisher Logo URL">
                                        <input type="url" placeholder="https://..." value={article.publisherLogo} onChange={(e)=>setArticle({...article, publisherLogo: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                            </div>
                        )}

                        {/* --- FAQ FORM --- */}
                        {activeSchema === 'FAQ' && (
                            <div className="space-y-4">
                                {faq.map((item, index) => (
                                    <div key={index} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-slate-500 uppercase">Question #{index + 1}</span>
                                            {faq.length > 1 && (
                                                <button onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold transition">Remove</button>
                                            )}
                                        </div>
                                        <input type="text" placeholder="Enter the question..." value={item.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} className="form-input mb-3 font-semibold" />
                                        <textarea placeholder="Write the answer here..." value={item.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)} className="form-input h-24 resize-none" />
                                    </div>
                                ))}
                                <button onClick={addFaq} className="w-full py-4 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition">
                                    <Plus size={18}/> Add Another FAQ Item
                                </button>
                            </div>
                        )}

                        {/* --- PRODUCT FORM --- */}
                        {activeSchema === 'Product' && (
                            <div className="space-y-4">
                                <InputWrapper label="Product Name">
                                    <input type="text" placeholder="e.g. Wireless Headphones" value={product.name} onChange={(e)=>setProduct({...product, name: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <InputWrapper label="Description">
                                    <textarea placeholder="Short description of the product..." value={product.description} onChange={(e)=>setProduct({...product, description: e.target.value})} className="form-input h-20 resize-none" />
                                </InputWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Brand">
                                        <input type="text" placeholder="e.g. Sony" value={product.brand} onChange={(e)=>setProduct({...product, brand: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Image URL">
                                        <input type="url" placeholder="https://..." value={product.image} onChange={(e)=>setProduct({...product, image: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputWrapper label="Price">
                                        <input type="number" placeholder="199.99" value={product.price} onChange={(e)=>setProduct({...product, price: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Currency">
                                        <input type="text" placeholder="USD" value={product.currency} onChange={(e)=>setProduct({...product, currency: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Availability">
                                        <select value={product.availability} onChange={(e)=>setProduct({...product, availability: e.target.value})} className="form-input">
                                            <option value="InStock">In Stock</option>
                                            <option value="OutOfStock">Out of Stock</option>
                                        </select>
                                    </InputWrapper>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Aggregate Rating (1-5)" icon={<Star size={16}/>}>
                                        <input type="number" step="0.1" max="5" placeholder="e.g. 4.8" value={product.rating} onChange={(e)=>setProduct({...product, rating: e.target.value})} className="form-input pl-10" />
                                    </InputWrapper>
                                    <InputWrapper label="Total Reviews">
                                        <input type="number" placeholder="e.g. 245" value={product.reviewCount} onChange={(e)=>setProduct({...product, reviewCount: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                            </div>
                        )}

                        {/* --- LOCAL BUSINESS FORM --- */}
                        {activeSchema === 'LocalBusiness' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Business Type">
                                        <select value={localBiz.type} onChange={(e)=>setLocalBiz({...localBiz, type: e.target.value})} className="form-input">
                                            <option value="LocalBusiness">Local Business</option>
                                            <option value="Store">Store</option>
                                            <option value="Restaurant">Restaurant</option>
                                            <option value="MedicalClinic">Medical Clinic</option>
                                        </select>
                                    </InputWrapper>
                                    <InputWrapper label="Price Range">
                                        <input type="text" placeholder="e.g. $$" value={localBiz.priceRange} onChange={(e)=>setLocalBiz({...localBiz, priceRange: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                                <InputWrapper label="Business Name">
                                    <input type="text" placeholder="e.g. Joe's Pizza" value={localBiz.name} onChange={(e)=>setLocalBiz({...localBiz, name: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Website URL" icon={<Globe size={16}/>}>
                                        <input type="url" placeholder="https://..." value={localBiz.url} onChange={(e)=>setLocalBiz({...localBiz, url: e.target.value})} className="form-input pl-10" />
                                    </InputWrapper>
                                    <InputWrapper label="Phone Number">
                                        <input type="text" placeholder="+1 234 567 890" value={localBiz.phone} onChange={(e)=>setLocalBiz({...localBiz, phone: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                                <InputWrapper label="Street Address" icon={<MapPin size={16}/>}>
                                    <input type="text" placeholder="123 Main St" value={localBiz.street} onChange={(e)=>setLocalBiz({...localBiz, street: e.target.value})} className="form-input pl-10" />
                                </InputWrapper>
                                <div className="grid grid-cols-3 gap-4">
                                    <InputWrapper label="City">
                                        <input type="text" placeholder="New York" value={localBiz.city} onChange={(e)=>setLocalBiz({...localBiz, city: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Zip Code">
                                        <input type="text" placeholder="10001" value={localBiz.zip} onChange={(e)=>setLocalBiz({...localBiz, zip: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                    <InputWrapper label="Country">
                                        <input type="text" placeholder="US" value={localBiz.country} onChange={(e)=>setLocalBiz({...localBiz, country: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                            </div>
                        )}

                        {/* --- PERSON FORM --- */}
                        {activeSchema === 'Person' && (
                            <div className="space-y-4">
                                <InputWrapper label="Full Name">
                                    <input type="text" placeholder="e.g. Elon Musk" value={person.name} onChange={(e)=>setPerson({...person, name: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Job Title" icon={<Briefcase size={16}/>}>
                                        <input type="text" placeholder="e.g. CEO" value={person.jobTitle} onChange={(e)=>setPerson({...person, jobTitle: e.target.value})} className="form-input pl-10" />
                                    </InputWrapper>
                                    <InputWrapper label="Works For (Company)">
                                        <input type="text" placeholder="e.g. Tesla" value={person.worksFor} onChange={(e)=>setPerson({...person, worksFor: e.target.value})} className="form-input" />
                                    </InputWrapper>
                                </div>
                                <InputWrapper label="Website or Profile URL">
                                    <input type="url" placeholder="https://..." value={person.url} onChange={(e)=>setPerson({...person, url: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <InputWrapper label="Picture URL">
                                    <input type="url" placeholder="https://..." value={person.image} onChange={(e)=>setPerson({...person, image: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <InputWrapper label="Social Profiles (Comma separated URLs)">
                                    <textarea placeholder="https://twitter.com/elonmusk, https://linkedin.com/..." value={person.sameAs} onChange={(e)=>setPerson({...person, sameAs: e.target.value})} className="form-input h-20 resize-none" />
                                </InputWrapper>
                            </div>
                        )}

                        {/* --- ORGANIZATION FORM --- */}
                        {activeSchema === 'Organization' && (
                            <div className="space-y-4">
                                <InputWrapper label="Organization Name">
                                    <input type="text" placeholder="e.g. NameDotify" value={org.name} onChange={(e)=>setOrg({...org, name: e.target.value})} className="form-input" />
                                </InputWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputWrapper label="Website URL" icon={<Globe size={16}/>}>
                                        <input type="url" placeholder="https://namedotify.com" value={org.url} onChange={(e)=>setOrg({...org, url: e.target.value})} className="form-input pl-10" />
                                    </InputWrapper>
                                    <InputWrapper label="Logo URL" icon={<ImageIcon size={16}/>}>
                                        <input type="url" placeholder="https://.../logo.png" value={org.logo} onChange={(e)=>setOrg({...org, logo: e.target.value})} className="form-input pl-10" />
                                    </InputWrapper>
                                </div>
                                <InputWrapper label="Social Profiles (Comma separated URLs)">
                                    <textarea placeholder="https://facebook.com/namedotify, https://twitter.com/..." value={org.sameAs} onChange={(e)=>setOrg({...org, sameAs: e.target.value})} className="form-input h-24 resize-none" />
                                </InputWrapper>
                            </div>
                        )}
                        
                    </div>
                </div>

                {/* RIGHT: MAC-STYLE CODE OUTPUT (Col 6) */}
                <div className="lg:col-span-6 bg-[#0d1117] flex flex-col relative h-full min-h-[500px]">
                    
                    {/* Fake Mac Window Controls */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#161b22]">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs font-mono text-slate-400 font-bold tracking-wider">schema.jsonld</span>
                        <div className="w-10"></div> {/* Spacer */}
                    </div>

                    {/* Code Display Area (Fixed Black Screen Issue) */}
                    <div className="flex-1 overflow-auto custom-scroll relative p-6">
                        {/* Floating Copy Button inside Editor */}
                        <button 
                            onClick={handleCopy}
                            className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg backdrop-blur-sm transition border border-slate-700 z-10"
                            title="Copy to clipboard"
                        >
                            {copied ? <CheckCircle size={18} className="text-emerald-400"/> : <Copy size={18} />}
                        </button>

                        <pre className="text-[13px] font-mono leading-relaxed tracking-wide m-0">
                            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                        </pre>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-6 border-t border-slate-800 bg-[#161b22] flex gap-4">
                        <button 
                            onClick={handleCopy}
                            className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                copied 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20'
                            }`}
                        >
                            {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                            {copied ? 'Code Copied!' : 'Copy Schema Code'}
                        </button>

                        <a 
                            href="https://search.google.com/test/rich-results"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 bg-slate-800 text-white hover:bg-slate-700 rounded-xl font-bold transition flex items-center justify-center gap-2 border border-slate-700"
                        >
                            <ExternalLink size={18}/> Test with Google
                        </a>
                    </div>
                </div>
            </div>
        </div>

      </div>
      
      {/* Global CSS for Form Inputs and Scrollbars */}
      <style jsx global>{`
        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            outline: none;
            color: #1e293b;
            font-size: 0.875rem;
            transition: all 0.2s ease;
        }
        .form-input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
        .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
}

// Helper Component for consistent input styling
function InputWrapper({ label, children, icon }) {
    return (
        <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
            <div className="relative">
                {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">{icon}</div>}
                {children}
            </div>
        </div>
    );
}