import { NextResponse } from 'next/server';
import whois from 'whois-json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  try {
    // 1. डोमेन चेक करें (WHOIS lookup)
    const results = await whois(domain);
    
    // 2. लॉजिक: अगर रिजल्ट में 'Domain Name' नहीं मिलता, तो शायद वो खाली है
    const isTaken = results.domainName || results.domain; 

    if (isTaken) {
      return NextResponse.json({ available: false });
    } else {
      return NextResponse.json({ available: true });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Check failed' }, { status: 500 });
  }
}