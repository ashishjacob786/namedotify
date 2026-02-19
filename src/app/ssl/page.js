import React from 'react';
import SslClient from './SslClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free SSL Certificate Checker - Verify HTTPS Security | NameDotify.com',
  description: 'Check SSL certificate validity, expiry date, and issuer instantly. Verify if a website is secure (HTTPS) with our free tool.',
  keywords: ['ssl checker', 'check ssl certificate', 'https checker', 'ssl expiry check', 'website security test'],
  openGraph: {
    title: 'Free SSL Checker | NameDotify.com',
    description: 'Verify website security and SSL certificate status instantly.',
    type: 'website',
    url: 'https://namedotify.com/ssl',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify SSL Certificate Checker",
      "operatingSystem": "Web",
      "applicationCategory": "SecurityApplication",
      "url": "https://namedotify.com/ssl",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free tool to verify SSL/TLS certificate validity, expiry date, issuer, and chain issues."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is my SSL certificate invalid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common reasons include expiration, domain name mismatch, or an untrusted certificate authority (self-signed)."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I check my SSL status?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's recommended to check your SSL certificate status at least once a month to avoid unexpected expiration warnings."
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
          "name": "SSL Checker",
          "item": "https://namedotify.com/ssl"
        }
      ]
    }
  ]
};

export default function SSLPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SslClient />
    </>
  );
}