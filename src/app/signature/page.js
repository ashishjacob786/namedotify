import React from 'react';
import SignatureClient from './SignatureClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Email Signature Generator for Gmail & Outlook | NameDotify.com',
  description: 'Create a professional HTML email signature in seconds. Add your photo, logo, and social icons. Compatible with Gmail, Outlook, Apple Mail. 100% Free.',
  keywords: ['email signature generator', 'free gmail signature', 'outlook signature template', 'html email signature', 'professional email footer'],
  openGraph: {
    title: 'Free Email Signature Generator | NameDotify.com',
    description: 'Make your emails look professional with our free signature builder.',
    type: 'website',
    url: 'https://namedotify.com/signature',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + Breadcrumbs + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Email Signature Generator",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "url": "https://namedotify.com/signature",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Create professional, HTML-optimized email signatures for Gmail, Outlook, and Apple Mail with Social Links. No watermarks."
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
          "name": "Email Signature",
          "item": "https://namedotify.com/signature"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I add this signature to Gmail?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Copy the generated signature, go to Gmail Settings > General > Signature, paste it there, and save changes."
          }
        },
        {
          "@type": "Question",
          "name": "Does this signature work in Outlook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our HTML signatures are fully compatible with Microsoft Outlook, Apple Mail, Thunderbird, and Gmail."
          }
        }
      ]
    }
  ]
};

export default function SignaturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SignatureClient />
    </>
  );
}