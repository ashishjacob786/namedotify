export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: Hide private routes if any
    },
    sitemap: 'https://namedotify.com/sitemap.xml',
  };
}