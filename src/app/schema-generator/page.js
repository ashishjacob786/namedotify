import React from 'react';
import SchemaClient from './SchemaClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Free Schema Markup Generator - JSON-LD Structured Data | NameDotify',
  description: 'Generate advanced JSON-LD Schema Markup for Articles, FAQs, Products, Local Businesses, and more. Boost your SEO and get Google Rich Snippets easily.',
  keywords: ['schema markup generator', 'json-ld generator', 'faq schema generator', 'article schema', 'product structured data', 'seo schema tool', 'local business schema'],
  openGraph: {
    title: 'Advanced Schema Markup Generator | NameDotify',
    description: 'Create highly optimized JSON-LD structured data for your website instantly to win Google Rich Results.',
    url: 'https://namedotify.com/schema-generator',
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
      "name": "NameDotify Schema Generator",
      "operatingSystem": "Web",
      "applicationCategory": "DeveloperApplication",
      "url": "https://namedotify.com/schema-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Generate dynamic JSON-LD structured data to improve search engine visibility and get rich snippets."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Schema Markup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Schema markup is a form of microdata. Once added to a webpage, schema markup creates an enhanced description (commonly known as a rich snippet), which appears in search results."
          }
        },
        {
          "@type": "Question",
          "name": "Why use JSON-LD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JSON-LD is Google's recommended format for implementing structured data. It is easy to add to the <head> or <body> of your webpage without changing the visible HTML."
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
          "name": "Schema Generator",
          "item": "https://namedotify.com/schema-generator"
        }
      ]
    }
  ]
};

export default function SchemaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SchemaClient />
    </>
  );
}