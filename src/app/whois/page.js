import React from 'react';
import WhoisClient from './WhoisClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Whois Lookup Tool - Check Domain Age & Owner | NameDotify.com',
  description: 'Instantly check domain ownership, registration age, expiry date, and nameservers. Free Whois Lookup tool for .com, .net, .io & more.',
  keywords: ['whois lookup', 'domain age checker', 'domain owner search', 'check domain expiry', 'website owner info'],
  openGraph: {
    title: 'Free Whois Lookup Tool | NameDotify.com',
    description: 'Find out who owns a domain and when it expires. Free lookup tool.',
    type: 'website',
    url: 'https://namedotify.com/whois',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp & Breadcrumbs)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Whois Lookup",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "url": "https://namedotify.com/whois",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free tool to check domain ownership, registration date, expiry status, and nameservers instantly."
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
          "name": "Whois Lookup",
          "item": "https://namedotify.com/whois"
        }
      ]
    }
  ]
};

export default function WhoisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WhoisClient />
    </>
  );
}