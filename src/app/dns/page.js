import React from 'react';
import DnsClient from './DnsClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free DNS Record Checker - Check A, MX, CNAME & TXT | NameDotify.com',
  description: 'Instantly check DNS records (A, MX, NS, CNAME, TXT) for any domain. Verify email setup and global DNS propagation with our free tool.',
  keywords: ['dns checker', 'dns lookup', 'check mx records', 'dns propagation', 'a record checker', 'txt record lookup'],
  openGraph: {
    title: 'Free DNS Record Checker | NameDotify.com',
    description: 'Debug website and email issues by checking DNS records instantly.',
    url: 'https://namedotify.com/dns',
    siteName: 'NameDotify',
    type: 'website',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify DNS Record Checker",
      "operatingSystem": "Web",
      "applicationCategory": "NetworkTool",
      "url": "https://namedotify.com/dns",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free DNS propagation tool. Check A, MX, NS, CNAME, and TXT records globally. Debug website connectivity and email issues."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an A Record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An A Record maps a domain name to the IP address (IPv4) of the computer hosting the domain."
          }
        },
        {
          "@type": "Question",
          "name": "How long does DNS propagation take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DNS changes can take anywhere from a few minutes to 48 hours to update globally depending on the TTL settings."
          }
        }
      ]
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
          "name": "DNS Checker",
          "item": "https://namedotify.com/dns"
        }
      ]
    }
  ]
};

export default function DnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DnsClient />
    </>
  );
}