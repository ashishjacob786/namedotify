import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let ip = searchParams.get('ip');

  // Agar user ne IP nahi di, to hum USKI khud ki IP nikalenge
  if (!ip) {
    const forwarded = request.headers.get("x-forwarded-for");
    ip = forwarded ? forwarded.split(',')[0] : null;
    
    // Agar localhost par hain
    if (!ip || ip === '::1') {
        ip = ''; // Empty chhod denge taaki external API khud detect kare
    }
  }

  try {
    // External API se data maangenge
    // Note: ip-api.com free hai aur badhiya data deta hai
    const apiUrl = ip ? `http://ip-api.com/json/${ip}` : `http://ip-api.com/json/`;
    
    const response = await axios.get(`${apiUrl}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
    
    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch IP details' }, { status: 500 });
  }
}