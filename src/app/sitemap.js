export default function sitemap() {
  const baseUrl = 'https://namedotify.com';

  // Add all your pages here (Total 23 Tools + 4 Static Pages + Home)
  const routes = [
    '',
    '/dns',
    '/fonts-generator',
    '/generator',
    '/hosting',
    '/ip',
    '/live-editor',
    '/malware-scanner',
    '/mockup',
    '/password',
    '/qrcode',
    '/reverse-ip',
    '/schema-generator',
    '/seo-auditor',             // ✅ Added Advanced SEO Auditor
    '/signature',
    '/speed-test',
    '/ssl',
    '/status',
    '/utm-builder',
    '/webmcp-schema-generator', // ✅ Added WebMCP Schema Gen
    '/webmcp-validate',         // ✅ Added WebMCP Validator
    '/website-speed',
    '/whois',
    '/youtube-analyzer',
    
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