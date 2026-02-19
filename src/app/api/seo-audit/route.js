import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req) {
  try {
    const { url, mode } = await req.json();

    // 1. वेबसाइट का HTML लाइव फेच करना
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NameDotifyBot/1.0)' },
      next: { revalidate: 0 } // कैश नहीं करना है
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to access the website. Check the URL.' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 2. SEO एनालिटिक्स का लॉजिक
    let errors = 0;
    let warnings = 0;
    let passed = 0;
    let issues = [];

    // 👉 A. Title Tag Check
    const title = $('title').text();
    if (!title) {
      errors++;
      issues.push({ type: 'error', text: 'Missing Title Tag' });
    } else if (title.length < 10 || title.length > 70) {
      warnings++;
      issues.push({ type: 'warning', text: `Title length is suboptimal (${title.length} chars). Best is 50-60.` });
    } else {
      passed++;
      issues.push({ type: 'success', text: `Perfect Title: "${title}"` });
    }

    // 👉 B. Meta Description Check
    const metaDesc = $('meta[name="description"]').attr('content');
    if (!metaDesc) {
      errors++;
      issues.push({ type: 'error', text: 'Missing Meta Description' });
    } else if (metaDesc.length < 50 || metaDesc.length > 160) {
      warnings++;
      issues.push({ type: 'warning', text: `Meta description length is suboptimal (${metaDesc.length} chars).` });
    } else {
      passed++;
      issues.push({ type: 'success', text: 'Meta description is present and optimal length.' });
    }

    // 👉 C. H1 Tag Check
    const h1Count = $('h1').length;
    if (h1Count === 0) {
      errors++;
      issues.push({ type: 'error', text: 'Missing H1 Tag. Every page needs exactly one H1.' });
    } else if (h1Count > 1) {
      warnings++;
      issues.push({ type: 'warning', text: `Multiple H1 tags found (${h1Count}). Best practice is exactly one.` });
    } else {
      passed++;
      issues.push({ type: 'success', text: `Perfect! Exactly one H1 tag found: "${$('h1').first().text().substring(0, 30)}..."` });
    }

    // 👉 D. Image Alt Tags Check
    const images = $('img');
    let missingAltCount = 0;
    images.each((i, img) => {
      if (!$(img).attr('alt')) missingAltCount++;
    });

    if (missingAltCount > 0) {
      warnings++;
      issues.push({ type: 'warning', text: `${missingAltCount} images are missing ALT attributes.` });
    } else if (images.length > 0) {
      passed++;
      issues.push({ type: 'success', text: 'All images have proper ALT attributes.' });
    }

    // 👉 E. SSL (HTTPS) Check
    if (url.startsWith('https://')) {
      passed++;
      issues.push({ type: 'success', text: 'Website uses secure HTTPS.' });
    } else {
      errors++;
      issues.push({ type: 'error', text: 'Website does NOT use secure HTTPS. Very bad for SEO.' });
    }

    // 3. Health Score Calculate करना
    let healthScore = 100 - (errors * 15) - (warnings * 5);
    if (healthScore < 0) healthScore = 0;
    if (healthScore > 100) healthScore = 100;

    // डेटा को फ्रंटएंड पर भेजना
    return NextResponse.json({
      success: true,
      data: {
        healthScore,
        mode,
        metrics: { errors, warnings, passed },
        issues
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error analyzing website.' }, { status: 500 });
  }
}