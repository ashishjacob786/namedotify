export default function sitemap() {
  const baseUrl = 'https://namedotify.com';

  // Add all your pages here
  const routes = [
    '',
    '/whois',
    '/dns',
    '/qrcode',
    '/signature',
    '/ip',
    '/ssl',
    '/password',
    '/hosting',
    '/status',
    '/fonts-generator', // Corrected path
    '/generator',       // Name Generator
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}