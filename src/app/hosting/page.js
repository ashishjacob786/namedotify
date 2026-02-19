import React from 'react';
import HostingClient from './HostingClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Web Hosting Checker - Who Hosts This Website? | NameDotify.com',
  description: 'Find out who hosts any website instantly. Detect WordPress hosting, Cloudflare, AWS, and server location with our free Hosting Checker tool.',
  keywords: ['hosting checker', 'who hosts this website', 'check web hosting', 'find website host', 'server location finder', 'detect cloudflare'],
  openGraph: {
    title: 'Free Web Hosting Checker | NameDotify.com',
    description: 'Discover the hosting provider behind any domain.',
    type: 'website',
    url: 'https://namedotify.com/hosting',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Web Hosting Checker",
      "operatingSystem": "Web",
      "applicationCategory": "NetworkTool",
      "url": "https://namedotify.com/hosting",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free tool to find who hosts a website. Detects WordPress hosting, Cloud providers, Dedicated servers, and CDNs instantly."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to find out who hosts a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply enter the domain name in our Hosting Checker tool, and we will reveal the hosting provider, server IP, and data center location."
          }
        },
        {
          "@type": "Question",
          "name": "Can I check if a site uses Cloudflare?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our tool detects if a website is using a CDN like Cloudflare, which often hides the true hosting provider."
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
          "name": "Hosting Checker",
          "item": "https://namedotify.com/hosting"
        }
      ]
    }
  ]
};

export default function HostingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HostingClient />
    </>
  );
}