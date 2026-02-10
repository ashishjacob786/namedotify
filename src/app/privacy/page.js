"use client";
import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
  
  // ✅ JSON-LD Schema (Privacy Policy)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: 'https://namedotify.com/privacy',
    description: 'Privacy Policy for NameDotify. Learn how we collect, use, and protect your data.',
    publisher: {
      '@type': 'Organization',
      name: 'NameDotify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://namedotify.com/logo.png'
      }
    }
  };

  return (
    // ✅ FIX: 'pt-24' added to prevent black strip
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 pt-24">
      
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">
                <Shield size={12} className="mr-1" /> Legal Document
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm">
                Last Updated: <span className="font-semibold text-gray-900">February 2026</span>
            </p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none">
            
            <p className="lead text-lg text-gray-600">
                At <strong>NameDotify</strong>, accessible from https://namedotify.com, one of our main priorities is the privacy of our visitors. 
                This Privacy Policy document contains types of information that is collected and recorded by NameDotify and how we use it.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 my-8 not-prose">
                <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-2">
                    <Lock size={20}/> Consent
                </h3>
                <p className="text-blue-800 text-sm">
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </p>
            </div>

            <h3>1. Information We Collect</h3>
            <p>
                NameDotify is a free tool provider. We generally <strong>do not require you to create an account</strong> to use our services (DNS Checker, Whois, etc.).
            </p>
            <ul>
                <li><strong>Log Files:</strong> Like many other websites, we use log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</li>
                <li><strong>Search Queries:</strong> When you use our Domain Generator or Whois tool, the domain names you search for are processed to provide results but are not permanently associated with your personal identity.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
                <li>Provide, operate, and maintain our website.</li>
                <li>Improve, personalize, and expand our website.</li>
                <li>Analyze and understand how you use our website (e.g., Google Analytics).</li>
                <li>Develop new products, services, features, and functionality.</li>
                <li>Detect and prevent fraud.</li>
            </ul>

            <h3>3. Cookies and Web Beacons</h3>
            <p>
                NameDotify uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. 
                The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h3>4. Google DoubleClick DART Cookie</h3>
            <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. 
                However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="nofollow">https://policies.google.com/technologies/ads</a>
            </p>

            <h3>5. Third Party Privacy Policies</h3>
            <p>
                NameDotify's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. 
                It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <h3>6. GDPR Data Protection Rights</h3>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> The right to access</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> The right to rectification</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> The right to erasure</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> The right to restrict processing</li>
            </ul>

            <h3>7. Children's Information</h3>
            <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                NameDotify does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>

        </div>

    </div>
    </div>
  );
}