"use client";
import React from 'react';
import { Mail, MessageSquare, LifeBuoy, MapPin, HeartHandshake, Building2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  
  // ✅ Advanced JSON-LD Schema (ContactPage + Organization)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NameDotify',
    url: 'https://namedotify.com/contact',
    description: 'Contact NameDotify support team for inquiries, bug reports, and partnerships. Operated by SNERIC PACIFIC LLP.',
    mainEntity: {
      '@type': 'Organization',
      name: 'SNERIC PACIFIC LLP',
      subOrganization: {
        '@type': 'Organization',
        name: 'NameDotify'
      },
      email: 'contact@namedotify.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@namedotify.com',
        contactType: 'customer support',
        availableLanguage: ['English', 'Hindi']
      }
    }
  };

  return (
    // ✅ UI: Consistent Padding (pt-28)
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-28">
      
      {/* ✅ SEO Meta Tags */}
      <title>Contact Us - Support & Partnerships | NameDotify</title>
      <meta name="description" content="Get in touch with NameDotify team. For support, bug reports, or partnership inquiries with SNERIC PACIFIC LLP, email us today." />

      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200">
                <MessageSquare size={14} className="mr-2" /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                Contact Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Team</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Have a question, found a bug, or want to partner with us? 
                We'd love to hear from you.
            </p>
        </div>

        {/* --- MAIN HERO CARD --- */}
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl shadow-blue-100/50 border border-blue-50 text-center mb-16 transform hover:-translate-y-1 transition duration-500 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition duration-500"></div>
            
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative z-10">
                <Mail className="w-10 h-10 text-blue-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Email Us Directly</h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                The fastest way to reach us. We typically respond to all valid inquiries within 24-48 hours.
            </p>
            
            <a 
                href="mailto:contact@namedotify.com" 
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 gap-3 transform active:scale-95"
            >
                <Mail size={22} /> contact@namedotify.com
            </a>
        </div>

        {/* --- INFO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Support Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:border-orange-200 transition duration-300">
                <div className="bg-orange-50 p-4 rounded-2xl">
                    <LifeBuoy className="text-orange-600 w-8 h-8" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">Technical Support</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                        Found a bug in our Domain Generator, DNS Checker, or other tools? Let us know the details.
                    </p>
                    <span className="inline-flex items-center text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                        Subject: [Bug Report]
                    </span>
                </div>
            </div>

            {/* Partnership Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:border-green-200 transition duration-300">
                <div className="bg-green-50 p-4 rounded-2xl">
                    <HeartHandshake className="text-green-600 w-8 h-8" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">Partnerships</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                        Interested in advertising, API integration, or business collaboration?
                    </p>
                    <span className="inline-flex items-center text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        Subject: [Partnership]
                    </span>
                </div>
            </div>

        </div>

        {/* --- FOOTER NOTE --- */}
        <div className="mt-20 pt-10 border-t border-gray-200 text-center">
            <div className="inline-flex flex-col items-center gap-2 text-gray-400">
                <div className="bg-gray-50 p-3 rounded-full mb-2">
                    <Building2 size={24} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium">Operated by</p>
                <p className="text-lg font-bold text-gray-700">SNERIC PACIFIC LLP</p>
                <p className="text-xs flex items-center gap-1 mt-1">
                    <MapPin size={12} /> New Delhi, India
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}