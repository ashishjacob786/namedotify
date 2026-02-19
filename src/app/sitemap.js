export default function sitemap() {
  const baseUrl = 'https://namedotify.com';

  // Add all your pages here (Total 20 Tools + 4 Static Pages + Home)
  const routes = [
    '',
    '/dns',
    '/fonts-generator',
    '/generator',
    '/hosting',
    '/ip',
    '/live-editor',       // Added
    '/malware-scanner',   // Added
    '/mockup',
    '/password',
    '/qrcode',
    '/reverse-ip',
    '/schema-generator',  // Added
    '/signature',
    '/speed-test',
    '/ssl',
    '/status',
    '/utm-builder',       // Added
    '/website-speed',
    '/whois',
    '/youtube-analyzer',  // Added
    
    // Static Pages
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