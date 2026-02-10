import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  // Agar user ne http/https nahi lagaya, to hum laga denge
  if (!domain.startsWith('http')) {
    domain = `https://${domain}`;
  }

  try {
    const startTime = Date.now();
    
    // Website ko request bhejo
    const response = await fetch(domain, {
      method: 'GET',
      headers: { 'User-Agent': 'Namedotify-Bot/1.0' } // Fake browser user-agent
    });

    const endTime = Date.now();
    const duration = endTime - startTime; // Kitna time laga (ms)

    return NextResponse.json({
      online: response.status >= 200 && response.status < 400,
      statusCode: response.status,
      statusText: response.statusText || (response.status === 200 ? 'OK' : 'Unknown'),
      responseTime: duration,
      url: response.url
    });

  } catch (error) {
    return NextResponse.json({ 
      online: false, 
      statusCode: 0, 
      statusText: 'Unreachable / Down',
      error: error.message 
    });
  }
}