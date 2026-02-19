import React from 'react';
import IpClient from './IpClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free IP Address Lookup & Geolocation Tracker | NameDotify.com',
  description: 'Find the geographical location, ISP, and timezone of any IP address instantly. Free IP Tracker tool for IPv4 and IPv6.',
  keywords: ['ip lookup', 'ip tracker', 'my ip address', 'geolocation finder', 'check isp', 'ip address details'],
  openGraph: {
    title: 'Free IP Address Lookup | NameDotify.com',
    description: 'Trace any IP address to its physical location and ISP.',
    type: 'website',
    url: 'https://namedotify.com/ip',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + Breadcrumbs)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify IP Lookup",
      "operatingSystem": "Web",
      "applicationCategory": "NetworkTool",
      "url": "https://namedotify.com/ip",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free tool to check IP address location, ISP, ASN, and timezone instantly."
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
          "name": "IP Lookup",
          "item": "https://namedotify.com/ip"
        }
      ]
    }
  ]
};

export default function IpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IpClient />
    </>
  );
}