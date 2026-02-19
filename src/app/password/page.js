import React from 'react';
import PasswordClient from './PasswordClient';

// ✅ 1. Advanced SEO Tags (Server-Side Metadata)
export const metadata = {
  title: 'Strong Random Password Generator (100% Secure) | NameDotify.com',
  description: 'Generate highly secure, random passwords instantly. Protect your accounts from hackers with our free uncrackable password tool.',
  keywords: ['password generator', 'random password', 'secure password maker', 'strong password tool', 'password security'],
  openGraph: {
    title: 'Strong Random Password Generator | NameDotify.com',
    description: 'Create uncrackable passwords in seconds. 100% Secure & Client-Side.',
    type: 'website',
    url: 'https://namedotify.com/password',
  },
};

// ✅ 2. Advanced JSON-LD Schema (SoftwareApp + FAQ)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NameDotify Strong Password Generator",
      "operatingSystem": "Web",
      "applicationCategory": "SecurityApplication",
      "url": "https://namedotify.com/password",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Generate secure, random, and uncrackable passwords instantly. Protect your accounts from brute-force attacks."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this password generator safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our password generator runs locally in your browser. No passwords are ever sent to our servers."
          }
        },
        {
          "@type": "Question",
          "name": "What is the recommended password length?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Security experts recommend a minimum length of 12-16 characters with a mix of letters, numbers, and symbols."
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
          "name": "Password Generator",
          "item": "https://namedotify.com/password"
        }
      ]
    }
  ]
};

export default function PasswordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PasswordClient />
    </>
  );
}