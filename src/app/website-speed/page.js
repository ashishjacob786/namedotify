import React from 'react';
import WebSpeedClient from './WebSpeedClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Website Speed Test & Performance Checker | NameDotify',
  description: 'Analyze your website loading speed, Core Web Vitals, and get detailed recommendations to make your site faster. Powered by Google Lighthouse.',
  keywords: ['website speed test', 'pagespeed checker', 'core web vitals test', 'lighthouse performance', 'check website load time', 'seo speed tool'],
  openGraph: {
    title: 'Advanced Website Speed Checker | NameDotify',
    description: 'Find out exactly why your website is slow and how to fix it instantly.',
    url: 'https://namedotify.com/website-speed',
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
      "name": "NameDotify Web Performance Analyzer",
      "operatingSystem": "Web",
      "applicationCategory": "DeveloperApplication",
      "url": "https://namedotify.com/website-speed",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Analyze page load times, Core Web Vitals, and receive actionable diagnostic insights."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good website performance score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A score of 90 or above is considered good. 50 to 89 is a score that needs improvement, and below 50 is considered poor."
          }
        },
        {
          "@type": "Question",
          "name": "What are Core Web Vitals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience, including LCP (loading), FID (interactivity), and CLS (visual stability)."
          }
        }
      ]
    }
  ]
};

export default function WebSpeedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WebSpeedClient />
    </>
  );
}