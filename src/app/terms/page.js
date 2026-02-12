"use client";
import React from 'react';
import { ScrollText, Shield, AlertCircle, FileText, CheckCircle, Scale, Building2, ExternalLink } from 'lucide-react';

export default function TermsPage() {
  
  // ✅ Advanced JSON-LD Schema (TermsPage)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service | NameDotify',
    url: 'https://namedotify.com/terms',
    description: 'Terms and Conditions for using NameDotify (A unit of SNERIC PACIFIC LLP).',
    publisher: {
      '@type': 'Organization',
      name: 'SNERIC PACIFIC LLP',
      subOrganization: {
        '@type': 'Organization',
        name: 'NameDotify'
      },
      logo: {
        '@type': 'ImageObject',
        url: 'https://namedotify.com/logo.png'
      }
    }
  };

  return (
    // ✅ UI: Consistent Padding (pt-28)
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ SEO Meta Tags */}
      <title>Terms of Service & Usage Agreement | NameDotify</title>
      <meta name="description" content="Read the Terms of Service for NameDotify. Guidelines on using our free tools, affiliate links, and data usage." />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-200">
                <Scale size={14} className="mr-2" /> User Agreement
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                Terms of Service
            </h1>
            <p className="text-gray-500 text-lg">
                Effective Date: <span className="font-bold text-gray-900">February 2026</span>
            </p>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-indigo max-w-none leading-relaxed">
            
            <p className="lead text-lg text-gray-600">
                Welcome to <strong>NameDotify</strong>! These terms and conditions outline the rules and regulations for the use of NameDotify's Website, located at <a href="https://namedotify.com">https://namedotify.com</a>.
                <br/><br/>
                NameDotify is a digital property owned and operated by <strong>SNERIC PACIFIC LLP</strong>.
            </p>

            <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500 my-8 not-prose">
                <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-2">
                    <ScrollText size={20}/> Acceptance of Terms
                </h3>
                <p className="text-indigo-800 text-sm">
                    By accessing this website, we assume you accept these terms and conditions. Do not continue to use NameDotify if you do not agree to take all of the terms and conditions stated on this page.
                </p>
            </div>

            <h3>1. License to Use</h3>
            <p>
                Unless otherwise stated, <strong>SNERIC PACIFIC LLP</strong> and/or its licensors own the intellectual property rights for all material on NameDotify. All intellectual property rights are reserved. You may access this from NameDotify for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
                <li>Republish material from NameDotify (without attribution).</li>
                <li>Sell, rent, or sub-license material from NameDotify.</li>
                <li>Reproduce, duplicate or copy material from NameDotify for commercial competitors.</li>
                <li>Run automated scripts/bots to scrape data from our Whois or Domain Search tools.</li>
            </ul>

            <h3>2. Affiliate & Monetization Disclosure</h3>
            <p>
                To provide our tools (Domain Generator, Whois, DNS Checker, etc.) for free, NameDotify participates in various affiliate marketing programs.
            </p>
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 not-prose mb-6">
                <h4 className="font-bold text-yellow-900 flex items-center gap-2 mb-2">
                    <ExternalLink size={18}/> Third-Party Links & Commissions
                </h4>
                <ul className="text-sm text-yellow-800 space-y-2 list-disc pl-5">
                    <li>We may earn a commission if you purchase a domain or hosting through our links (e.g., Hostinger, Namecheap).</li>
                    <li>We display Google AdSense advertisements.</li>
                    <li>We are <strong>not responsible</strong> for the services provided by these third-party companies. Your transaction is directly with them.</li>
                </ul>
            </div>

            <h3>3. User Representations</h3>
            <p>
                By using our Tools, you represent and warrant that:
            </p>
            <ul>
                <li>You will not use the tools for any illegal or unauthorized purpose (e.g., hacking, spamming).</li>
                <li>You acknowledge that domain availability data is fetched from third-party registries and may not always be 100% real-time.</li>
                <li>You will not attempt to reverse engineer our API or backend systems.</li>
            </ul>

            <h3>4. Disclaimer of Warranties</h3>
            <p>
                The materials on NameDotify's website are provided on an 'as is' basis. <strong>SNERIC PACIFIC LLP</strong> makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>

            <h3>5. Limitations of Liability</h3>
            <p>
                In no event shall NameDotify, SNERIC PACIFIC LLP, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NameDotify's website.
            </p>

            <h3>6. Governing Law</h3>
            <p>
                These terms and conditions are governed by and construed in accordance with the laws of <strong>India</strong>, and you irrevocably submit to the exclusive jurisdiction of the courts in that location regarding any disputes.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms, please contact us at:
                </p>
                <a href="mailto:contact@namedotify.com" className="text-indigo-600 font-bold hover:underline text-lg">
                    contact@namedotify.com
                </a>
                <p className="text-sm text-gray-400 mt-2">
                    Operated by SNERIC PACIFIC LLP
                </p>
            </div>

        </div>

      </div>
    </div>
  );
}