import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function POST(req) {
  try {
    const data = await req.json();

    // 👉 ADVANCED: Country ढूँढना (Cloudflare या Vercel के Headers से)
    let country = req.headers.get('cf-ipcountry') || 
                  req.headers.get('x-vercel-ip-country') || 
                  'Unknown';

    // अगर कोई खुद से (localhost) खोल रहा है
    if (country === 'Unknown' || !country) country = 'India';

    // डेटाबेस में नई एंट्री सेव करें
    await prisma.pageView.create({
      data: {
        visitorId: data.visitorId || 'unknown',
        pageUrl: data.pageUrl || '/',
        referrer: data.referrer || 'Direct',
        eventType: data.eventType || 'pageview',
        eventData: data.eventData || null,
        country: country, // ✅ अब Country असली IP एड्रेस से आ रही है
        device: data.device || 'Desktop',
        browser: data.browser || 'Unknown',
        os: data.os || 'Unknown',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}