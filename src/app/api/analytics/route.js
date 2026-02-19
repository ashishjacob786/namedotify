import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // पिछले 30 दिन का डेटा निकालेंगे
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const allViews = await prisma.pageView.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: 'asc' }
    });

    // 1. Totals (कुल व्यूज़ और नए यूज़र्स)
    const totalViews = allViews.length;
    const uniqueVisitors = new Set(allViews.map(v => v.visitorId)).size;

    // 2. Chart Data (रोज़ाना के व्यूज़)
    const viewsByDate = {};
    allViews.forEach(v => {
      // डेट को YYYY-MM-DD फॉर्मेट में बदलना
      const date = v.createdAt.toISOString().split('T')[0];
      viewsByDate[date] = (viewsByDate[date] || 0) + 1;
    });
    const chartData = Object.keys(viewsByDate).map(date => ({
      date,
      views: viewsByDate[date]
    }));

    // 3. Top Pages (सबसे पॉपुलर टूल्स)
    const pageCounts = {};
    allViews.forEach(v => {
      pageCounts[v.pageUrl] = (pageCounts[v.pageUrl] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .map(([url, views]) => ({ url, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // 4. Referrers (लोग कहाँ से आ रहे हैं)
    const refCounts = {};
    allViews.forEach(v => {
      const ref = v.referrer || 'Direct';
      refCounts[ref] = (refCounts[ref] || 0) + 1;
    });
    const referrers = Object.entries(refCounts)
      .map(([source, views]) => ({ source, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // 5. Devices (मोबाइल vs डेस्कटॉप)
    const devCounts = {};
    allViews.forEach(v => {
      const dev = v.device || 'Desktop';
      devCounts[dev] = (devCounts[dev] || 0) + 1;
    });
    const devices = Object.entries(devCounts).map(([name, value]) => ({ name, value }));

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      chartData,
      topPages,
      referrers,
      devices
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}