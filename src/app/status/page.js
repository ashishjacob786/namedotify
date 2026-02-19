import React from 'react';
import StatusClient from './StatusClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Server Status Checker - Is Website Down? | NameDotify.com',
  description: 'Check if a website is down for everyone or just you. Real-time server status, HTTP code checker, and response time monitor. Free tool.',
  keywords: ['is it down', 'server status', 'website down checker', 'http status code', 'ping test', 'website uptime'],
  openGraph: {
    title: 'Server Status Checker | NameDotify.com',
    description: 'Check real-time server status and response codes instantly.',
    type: 'website',
    url: 'https://namedotify.com/status',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Server Status Checker",
      "operatingSystem": "Web",
      "applicationCategory": "NetworkTool",
      "url": "https://namedotify.com/status",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free tool to check if a website is down. Monitor server uptime, response time (ping), and HTTP status codes instantly."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does HTTP 500 error mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HTTP 500 indicates an Internal Server Error, meaning the server encountered an unexpected condition that prevented it from fulfilling the request."
          }
        },
        {
          "@type": "Question",
          "name": "How do I fix a 502 Bad Gateway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 502 error usually means one server received an invalid response from another. Try clearing your browser cache or checking your CDN settings."
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
          "name": "Server Status",
          "item": "https://namedotify.com/status"
        }
      ]
    }
  ]
};

export default function StatusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StatusClient />
    </>
  );
}