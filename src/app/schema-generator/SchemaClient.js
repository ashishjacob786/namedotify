"use client";
import React, { useState, useEffect } from 'react';
import { 
  Code2, Copy, CheckCircle, ExternalLink, 
  FileText, HelpCircle, ShoppingBag, Store, 
  User, Building2, Plus, Trash2, Zap, LayoutTemplate
} from 'lucide-react';

export default function SchemaClient() {
  const [activeSchema, setActiveSchema] = useState('Article');
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Form States for different schemas
  const [article, setArticle] = useState({ type: 'Article', headline: '', url: '', image: '', author: '', publisher: '', publisherLogo: '', datePublished: '' });
  const [faq, setFaq] = useState([{ question: '', answer: '' }]);
  const [product, setProduct] = useState({ name: '', image: '', description: '', brand: '', price: '', currency: 'USD', availability: 'InStock', rating: '', reviewCount: '' });
  const [localBiz, setLocalBiz] = useState({ type: 'LocalBusiness', name: '', image: '', id: '', url: '', phone: '', priceRange: '$$', street: '', city: '', zip: '', country: '' });
  const [person, setPerson] = useState({ name: '', url: '', image: '', jobTitle: '', worksFor: '', sameAs: '' });
  const [org, setOrg] = useState({ name: '', url: '', logo: '', sameAs: '' });

  // Schema Types List
  const schemaTypes = [
    { id: 'Article', icon: <FileText size={18}/> },
    { id: 'FAQ', icon: <HelpCircle size={18}/> },
    { id: 'Product', icon: <ShoppingBag size={18}/> },
    { id: 'LocalBusiness', icon: <Store size={18}/> },
    { id: 'Person', icon: <User size={18}/> },
    { id: 'Organization', icon: <Building2 size={18}/> },
  ];

  // Logic to Generate JSON-LD
  useEffect(() => {
    let schemaObj = {};

    if (activeSchema === 'Article') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": article.type,
        "headline": article.headline || "Example Headline",
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
        "description": product.description || "Product description goes here.",
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
        "sameAs": org.sameAs ? org.sameAs.split(',').map(s => s.trim()) : ["https://facebook.com/company", "https://twitter.com/company"]
      };
    }

    setGeneratedCode(`<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`);
  }, [activeSchema, article, faq, product, localBiz, person, org]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // FAQ Handlers
  const addFaq = () => setFaq([...faq, { question: '', answer: '' }]);
  const removeFaq = (index) => setFaq(faq.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const newFaq = [...faq];
    newFaq[index][field] = value;
    setFaq(newFaq);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-200 shadow-sm">
                <Code2 size={14} className="mr-2" /> Developer Tools
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
                Schema Markup <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Generator</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
                Generate dynamic JSON-LD structured data for your website. Win Google Rich Results and boost your CTR instantly.
            </p>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* LEFT: FORM CONTROLS (Col 6) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
                
                {/* Schema Selector */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2">
                    {schemaTypes.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSchema(tab.id)}
                            className={`flex items-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                                activeSchema === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                            {tab.icon} {tab.id}
                        </button>
                    ))}
                </div>

                {/* Form Inputs */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                        <LayoutTemplate className="text-indigo-500"/> {activeSchema} Details
                    </h2>

                    <div className="space-y-5">
                        
                        {/* --- ARTICLE FORM --- */}
                        {activeSchema === 'Article' && (
                            <>
                                <select value={article.type} onChange={(e)=>setArticle({...article, type: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm font-bold">
                                    <option value="Article">Article</option>
                                    <option value="NewsArticle">News Article</option>
                                    <option value="BlogPosting">Blog Posting</option>
                                </select>
                                <input type="text" placeholder="Headline" value={article.headline} onChange={(e)=>setArticle({...article, headline: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Author Name" value={article.author} onChange={(e)=>setArticle({...article, author: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="date" value={article.datePublished} onChange={(e)=>setArticle({...article, datePublished: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                                <input type="text" placeholder="Featured Image URL" value={article.image} onChange={(e)=>setArticle({...article, image: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Publisher Name (e.g. NameDotify)" value={article.publisher} onChange={(e)=>setArticle({...article, publisher: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Publisher Logo URL" value={article.publisherLogo} onChange={(e)=>setArticle({...article, publisherLogo: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                            </>
                        )}

                        {/* --- FAQ FORM --- */}
                        {activeSchema === 'FAQ' && (
                            <div className="space-y-4">
                                {faq.map((item, index) => (
                                    <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                                        {faq.length > 1 && (
                                            <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                                        )}
                                        <input type="text" placeholder={`Question ${index + 1}`} value={item.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm mb-3 font-bold" />
                                        <textarea placeholder={`Answer ${index + 1}`} value={item.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm h-24 resize-none" />
                                    </div>
                                ))}
                                <button onClick={addFaq} className="w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition">
                                    <Plus size={18}/> Add Another FAQ
                                </button>
                            </div>
                        )}

                        {/* --- PRODUCT FORM --- */}
                        {activeSchema === 'Product' && (
                            <>
                                <input type="text" placeholder="Product Name" value={product.name} onChange={(e)=>setProduct({...product, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <textarea placeholder="Product Description" value={product.description} onChange={(e)=>setProduct({...product, description: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm h-20" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Brand Name" value={product.brand} onChange={(e)=>setProduct({...product, brand: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Image URL" value={product.image} onChange={(e)=>setProduct({...product, image: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <input type="number" placeholder="Price" value={product.price} onChange={(e)=>setProduct({...product, price: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Currency (USD)" value={product.currency} onChange={(e)=>setProduct({...product, currency: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <select value={product.availability} onChange={(e)=>setProduct({...product, availability: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm">
                                        <option value="InStock">In Stock</option>
                                        <option value="OutOfStock">Out of Stock</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" step="0.1" max="5" placeholder="Rating (e.g. 4.5)" value={product.rating} onChange={(e)=>setProduct({...product, rating: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="number" placeholder="Review Count (e.g. 120)" value={product.reviewCount} onChange={(e)=>setProduct({...product, reviewCount: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                            </>
                        )}

                        {/* --- LOCAL BUSINESS FORM --- */}
                        {activeSchema === 'LocalBusiness' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <select value={localBiz.type} onChange={(e)=>setLocalBiz({...localBiz, type: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm font-bold">
                                        <option value="LocalBusiness">Local Business</option>
                                        <option value="Store">Store</option>
                                        <option value="Restaurant">Restaurant</option>
                                    </select>
                                    <input type="text" placeholder="Price Range ($$)" value={localBiz.priceRange} onChange={(e)=>setLocalBiz({...localBiz, priceRange: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                                <input type="text" placeholder="Business Name" value={localBiz.name} onChange={(e)=>setLocalBiz({...localBiz, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Phone Number" value={localBiz.phone} onChange={(e)=>setLocalBiz({...localBiz, phone: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Image URL" value={localBiz.image} onChange={(e)=>setLocalBiz({...localBiz, image: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                                <input type="text" placeholder="Street Address" value={localBiz.street} onChange={(e)=>setLocalBiz({...localBiz, street: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <div className="grid grid-cols-3 gap-4">
                                    <input type="text" placeholder="City" value={localBiz.city} onChange={(e)=>setLocalBiz({...localBiz, city: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Zip" value={localBiz.zip} onChange={(e)=>setLocalBiz({...localBiz, zip: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Country" value={localBiz.country} onChange={(e)=>setLocalBiz({...localBiz, country: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                            </>
                        )}

                        {/* --- PERSON FORM --- */}
                        {activeSchema === 'Person' && (
                            <>
                                <input type="text" placeholder="Full Name" value={person.name} onChange={(e)=>setPerson({...person, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Job Title" value={person.jobTitle} onChange={(e)=>setPerson({...person, jobTitle: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                    <input type="text" placeholder="Works For (Company)" value={person.worksFor} onChange={(e)=>setPerson({...person, worksFor: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                </div>
                                <input type="text" placeholder="Picture URL" value={person.image} onChange={(e)=>setPerson({...person, image: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <input type="text" placeholder="Social Profiles (comma separated URLs)" value={person.sameAs} onChange={(e)=>setPerson({...person, sameAs: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                            </>
                        )}

                        {/* --- ORGANIZATION FORM --- */}
                        {activeSchema === 'Organization' && (
                            <>
                                <input type="text" placeholder="Organization Name" value={org.name} onChange={(e)=>setOrg({...org, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <input type="text" placeholder="Website URL" value={org.url} onChange={(e)=>setOrg({...org, url: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <input type="text" placeholder="Logo URL" value={org.logo} onChange={(e)=>setOrg({...org, logo: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm" />
                                <textarea placeholder="Social Profiles (comma separated URLs)" value={org.sameAs} onChange={(e)=>setOrg({...org, sameAs: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm h-24 resize-none" />
                            </>
                        )}
                        
                    </div>
                </div>
            </div>

            {/* RIGHT: CODE OUTPUT (Col 6) */}
            <div className="lg:col-span-6">
                <div className="sticky top-28 bg-[#0d1117] rounded-3xl p-6 shadow-2xl border border-slate-800 flex flex-col h-[600px] overflow-hidden">
                    
                    {/* Fake Window Controls */}
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="text-xs font-mono text-slate-500">schema.jsonld</span>
                        <div className="w-10"></div> {/* Spacer for centering */}
                    </div>

                    {/* Code Display Area */}
                    <div className="flex-1 overflow-auto custom-scroll bg-[#0d1117] relative">
                        <pre className="text-[13px] font-mono leading-relaxed text-indigo-300">
                            <code dangerouslySetInnerHTML={{ 
                                __html: generatedCode
                                    .replace(/"(.*?)":/g, '<span class="text-emerald-400">"$1"</span>:') 
                                    .replace(/:\s"(.*?)"/g, ': <span class="text-amber-300">"$1"</span>')
                                    .replace(/&lt;script/g, '<span class="text-purple-400">&lt;script</span>')
                                    .replace(/&lt;\/script&gt;/g, '<span class="text-purple-400">&lt;/script&gt;</span>')
                                    .replace(/type="application\/ld\+json"/g, '<span class="text-cyan-400">type=</span><span class="text-amber-300">"application/ld+json"</span>')
                            }} />
                        </pre>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-slate-800 flex gap-4 mt-auto">
                        <button 
                            onClick={handleCopy}
                            className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                copied 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20'
                            }`}
                        >
                            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                            {copied ? 'Code Copied!' : 'Copy Schema Code'}
                        </button>

                        <a 
                            href="https://search.google.com/test/rich-results"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-4 bg-slate-800 text-white hover:bg-slate-700 rounded-xl font-bold transition flex items-center justify-center gap-2 whitespace-nowrap"
                            title="Test with Google Rich Results Tool"
                        >
                            <ExternalLink size={20}/> Test
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* --- SEO ARTICLE --- */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 prose prose-indigo max-w-none mt-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How Schema Markup Boosts Your SEO</h2>
            <p className="text-slate-600 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-12">
                Search engines like Google use <strong>Structured Data (JSON-LD)</strong> to understand the content of your pages better. Adding Schema Markup helps you earn <strong>Rich Snippets</strong> in search results, dramatically increasing your Click-Through Rate (CTR).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-12">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4"><HelpCircle size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">FAQ Schema</h3>
                    <p className="text-slate-600 text-sm">Makes your questions and answers appear directly under your website link in Google Search, taking up more screen space.</p>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4"><ShoppingBag size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Product Schema</h3>
                    <p className="text-slate-600 text-sm">Displays product price, availability, and review ratings (stars) directly in the search results, driving more sales.</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4"><Zap size={24}/></div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Instant JSON-LD</h3>
                    <p className="text-slate-600 text-sm">Google's recommended format. It doesn't break your site's design and is invisible to users, but highly visible to search bots.</p>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 not-prose">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Code2 className="text-indigo-600"/> How to use the generated code?</h3>
                <ol className="list-decimal pl-5 space-y-3 text-slate-600">
                    <li>Select the type of Schema you want to create from the top menu.</li>
                    <li>Fill out the required information in the form fields.</li>
                    <li>Click the <strong>"Copy Schema Code"</strong> button.</li>
                    <li>Paste the code into the <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code> section of your specific webpage.</li>
                    <li>Use the <strong>"Test"</strong> button to verify the code in Google's Rich Results Testing Tool.</li>
                </ol>
            </div>
        </article>

      </div>
      
      {/* Scrollbar CSS for Code Editor */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #475569; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}