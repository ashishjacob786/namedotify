import React from 'react';
import ReverseIPClient from './ReverseIPClient'; // हम Client Logic को अलग करेंगे

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Reverse IP Lookup Tool - Find Hosted Domains | NameDotify',
  description: 'Advanced Reverse IP Lookup tool. Enter an IP address or domain to find all other websites hosted on the same web server. Free OSINT & SEO tool.',
  keywords: ['reverse ip lookup', 'find domains on ip', 'who is hosted here', 'server neighborhood checker', 'seo reverse ip', 'osint tools'],
  openGraph: {
    title: 'Advanced Reverse IP Lookup | NameDotify',
    description: 'Discover all domains hosted on a single IP address with our free Reverse IP lookup tool. Includes Server Geolocation and ISP data.',
    url: 'https://namedotify.com/reverse-ip',
    siteName: 'NameDotify',
    type: 'website',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Reverse IP Lookup",
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "url": "https://namedotify.com/reverse-ip",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Find all domains hosted on a specific IP address or server. Free Reverse IP lookup and OSINT tool."
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
          "name": "Reverse IP Lookup",
          "item": "https://namedotify.com/reverse-ip"
        }
      ]
    }
  ]
};

export default function ReverseIPPage() {
  return (
    <>
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Client Component Load (UI & Logic) */}
      <ReverseIPClient />
    </>
  );
}