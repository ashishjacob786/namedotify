import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET(req) {
  try {
    const authCookie = req.cookies.get('adminAuthToken');
    const expectedToken = process.env.ADMIN_SECURE_TOKEN || 'secure_token_fallback';
    
    if (!authCookie || authCookie.value !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const daysParam = searchParams.get('days') || '7';
    const days = parseInt(daysParam);

    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    // 1. Prisma से पूरा डेटा मंगाना
    const views = await prisma.pageView.findMany({
      where: { createdAt: { gte: dateLimit } },
      select: { createdAt: true, referrer: true, country: true, device: true, browser: true, pageUrl: true, visitorId: true }
    });

    // 2. Data Processing
    let totalViews = views.length;
    let uniqueVisitorsSet = new Set();
    
    let chartDataMap = {};
    let referrersCount = {};
    let countriesCount = {};
    let pagesCount = {};
    let devicesCount = {};

    // Chart के लिए खाली दिन
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      chartDataMap[d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })] = { views: 0, unique: new Set() };
    }

    views.forEach(view => {
      // Unique Visitor
      if (view.visitorId) uniqueVisitorsSet.add(view.visitorId);

      // Chart
      const dateStr = new Date(view.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (chartDataMap[dateStr]) {
        chartDataMap[dateStr].views += 1;
        if (view.visitorId) chartDataMap[dateStr].unique.add(view.visitorId);
      }

      // Aggregations
      const ref = view.referrer || 'Direct';
      referrersCount[ref] = (referrersCount[ref] || 0) + 1;

      const cntry = view.country || 'Unknown';
      countriesCount[cntry] = (countriesCount[cntry] || 0) + 1;

      const page = view.pageUrl || '/';
      pagesCount[page] = (pagesCount[page] || 0) + 1;

      const dev = view.device || 'Desktop';
      devicesCount[dev] = (devicesCount[dev] || 0) + 1;
    });

    // Formatting Output
    const chartData = Object.keys(chartDataMap).map(date => ({
      date,
      views: chartDataMap[date].views,
      unique: chartDataMap[date].unique.size
    }));

    const sortObject = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const formatBarData = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));

    return NextResponse.json({
      totalViews,
      uniqueVisitors: uniqueVisitorsSet.size,
      chartData,
      topPages: sortObject(pagesCount).map(p => ({ url: p[0], views: p[1] })),
      referrersList: sortObject(referrersCount),
      countriesList: sortObject(countriesCount),
      devicesList: formatBarData(devicesCount),
      topReferrer: sortObject(referrersCount)[0] || null,
      topCountry: sortObject(countriesCount)[0] || null
    });

  } catch (error) {
    console.error("Analytics DB Error:", error);
    return NextResponse.json({ error: 'Failed to load from Database' }, { status: 500 });
  }
}