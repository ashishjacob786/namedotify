import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // जो फाइल हमने पहले बनाई थी

export async function POST(req) {
  try {
    const data = await req.json();

    // डेटाबेस में नई एंट्री सेव करें
    await prisma.pageView.create({
      data: {
        visitorId: data.visitorId || 'unknown',
        pageUrl: data.pageUrl || '/',
        referrer: data.referrer || 'Direct',
        eventType: data.eventType || 'pageview',
        eventData: data.eventData || null,
        country: data.country || 'Unknown', // (हम इसे बाद में IP से ट्रैक कर सकते हैं)
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