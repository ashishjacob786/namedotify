import React from 'react';
import UtmClient from './UtmClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free UTM Link Builder - Generate Campaign Tracking URLs | NameDotify',
  description: 'Create custom UTM tracking links for Google Analytics instantly. Add source, medium, and campaign parameters to track your marketing success accurately.',
  keywords: ['utm link builder', 'utm generator', 'campaign url builder', 'google analytics url builder', 'custom tracking link', 'utm parameter generator'],
  openGraph: {
    title: 'Advanced UTM Campaign URL Builder | NameDotify',
    description: 'Generate accurate tracking links for your ads, emails, and social media campaigns in seconds.',
    url: 'https://namedotify.com/utm-builder',
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
      "name": "NameDotify UTM Link Builder",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "url": "https://namedotify.com/utm-builder",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Generate custom UTM tracking links for Google Analytics. Add source, medium, and campaign parameters easily."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are UTM parameters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UTM parameters are short text codes added to URLs that help you track the performance of webpages or campaigns in Google Analytics."
          }
        },
        {
          "@type": "Question",
          "name": "Why is utm_source important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The utm_source identifies the specific advertiser, site, or publication that is sending traffic to your property (e.g., google, newsletter, facebook)."
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
          "name": "UTM Link Builder",
          "item": "https://namedotify.com/utm-builder"
        }
      ]
    }
  ]
};

export default function UtmBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UtmClient />
    </>
  );
}