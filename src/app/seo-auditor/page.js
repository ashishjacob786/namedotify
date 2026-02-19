import React from 'react';
import SeoAuditorClient from './SeoAuditorClient';

// ✅ ADVANCED SEO METADATA
export const metadata = {
  title: 'Advanced SEO Website Auditor | Free Mini Ahrefs | NameDotify',
  description: 'Perform a comprehensive technical and on-page SEO audit. Scan single pages or entire websites to find broken links, missing meta tags, and boost your Google rankings.',
  keywords: ['SEO auditor', 'website scanner', 'free SEO checker', 'Ahrefs alternative', 'technical SEO audit', 'full website crawl'],
  openGraph: {
    title: 'Advanced SEO Website Auditor | NameDotify',
    description: 'Perform a comprehensive technical and on-page SEO audit for free.',
    url: 'https://namedotify.com/seo-auditor',
    type: 'website',
  },
};

export default function SeoAuditorPage() {
  // ✅ RICH RESULTS (SCHEMA.ORG) FOR GOOGLE
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NameDotify Advanced SEO Auditor",
    "url": "https://namedotify.com/seo-auditor",
    "applicationCategory": "SEO Tool",
    "operatingSystem": "All",
    "description": "An advanced technical and on-page SEO analysis tool that scans single URLs or entire websites for errors, performance issues, and ranking opportunities.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Optimized Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Pro-Level SEO Scanner
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Advanced SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Auditor</span>
          </h1>
          <p className="text-lg text-gray-600">
            Uncover hidden technical issues, missing meta tags, and critical ranking factors. Scan a single page or deep-crawl your entire website instantly.
          </p>
        </div>

        {/* Client Component Load (The Interactive Tool) */}
        <SeoAuditorClient />

        {/* SEO Optimized Content / FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto prose prose-blue">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Why Use Our Advanced SEO Auditor?</h2>
          <p className="text-gray-600 mt-4">
            Search engine algorithms update constantly. A single broken link or a missing <strong>H1 tag</strong> can drop your rankings overnight. Our Mini-Ahrefs alternative provides a deep, actionable report that helps webmasters, developers, and marketers fix critical errors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Single Page Audit</h3>
              <p className="text-gray-600 text-sm">Perfect for optimizing new blog posts or landing pages. Checks exact keyword density, image alt text, and mobile performance.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Entire Website Crawl</h3>
              <p className="text-gray-600 text-sm">Scans your sitemap to find 404 errors, internal linking structures, and overall domain health score, just like premium enterprise tools.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}