import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req) {
  try {
    const { url, mode, action } = await req.json();

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NameDotifyBot/2.0)' },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to access the website. Check the URL.' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 🚀 ADVANCED CRAWLER: वेबसाइट के अंदर के लिंक्स ढूँढना (अगर Entire Website सिलेक्टेड है)
    if (action === 'get_links') {
      const baseUrl = new URL(url).origin;
      const links = new Set([url]); // होमपेज सबसे पहले
      
      $('a').each((i, el) => {
        let href = $(el).attr('href');
        if (href) {
          // सिर्फ उसी डोमेन के लिंक्स उठाना (बाहर के नहीं)
          if (href.startsWith('/') && !href.startsWith('//')) {
            links.add(baseUrl + href);
          } else if (href.startsWith(baseUrl)) {
            links.add(href);
          }
        }
      });
      
      // सर्वर क्रैश न हो इसलिए एक बार में मैक्सिमम 10 पेजेस स्कैन करेंगे
      return NextResponse.json({ success: true, links: Array.from(links).slice(0, 10) });
    }

    // 🚀 SEO ANALYSIS (Single Page Analysis)
    let errors = 0; let warnings = 0; let passed = 0; let issues = [];

    // Title
    const title = $('title').text();
    if (!title) { errors++; issues.push({ type: 'error', text: `Missing Title Tag on ${url}` }); }
    else if (title.length < 10 || title.length > 70) { warnings++; }
    else { passed++; }

    // Meta
    const metaDesc = $('meta[name="description"]').attr('content');
    if (!metaDesc) { errors++; issues.push({ type: 'error', text: `Missing Meta Description on ${url}` }); }
    else { passed++; }

    // H1
    const h1Count = $('h1').length;
    if (h1Count === 0) { errors++; issues.push({ type: 'error', text: `Missing H1 Tag on ${url}` }); }
    else if (h1Count > 1) { warnings++; issues.push({ type: 'warning', text: `Multiple H1 tags found on ${url}` }); }
    else { passed++; }

    // Images Alt
    const images = $('img');
    let missingAltCount = 0;
    images.each((i, img) => { if (!$(img).attr('alt')) missingAltCount++; });
    if (missingAltCount > 0) { warnings++; issues.push({ type: 'warning', text: `${missingAltCount} images missing ALT on ${url}` }); }
    else if (images.length > 0) { passed++; }

    // SSL
    if (url.startsWith('https://')) { passed++; } else { errors++; issues.push({ type: 'error', text: `No HTTPS on ${url}` }); }

    let healthScore = 100 - (errors * 15) - (warnings * 5);
    if (healthScore < 0) healthScore = 0; if (healthScore > 100) healthScore = 100;

    return NextResponse.json({
      success: true,
      data: { healthScore, metrics: { errors, warnings, passed }, issues }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error analyzing website.' }, { status: 500 });
  }
}