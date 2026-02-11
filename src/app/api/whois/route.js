import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  // Clean the domain (remove http://, https://, www., and trailing slashes)
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].toLowerCase();

  try {
    // NetworkCalc is a robust, free API that handles all TLDs (.com, .net, .org, .in) seamlessly
    const res = await fetch(`https://networkcalc.com/api/whois/${cleanDomain}`, {
        next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
    });
    
    const data = await res.json();

    // Check if domain is not registered or API failed
    if (data.status !== 'OK' || !data.whois || !data.whois.registered) {
      return NextResponse.json({ error: 'Domain not found, unregistered, or data is hidden by privacy protection.' });
    }

    // Standardize the response so the frontend always gets the exact same keys
    return NextResponse.json({
      domain: cleanDomain,
      registrar: data.whois.registrar || 'Not Available',
      creationDate: data.whois.created_date || null,
      expiryDate: data.whois.expires_date || null,
      nameServer: data.whois.nameservers || [],
      raw: data.whois.raw || data.whois // Sending full raw text/object
    });

  } catch (error) {
    console.error("Whois API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch WHOIS data. Server timeout.' }, { status: 500 });
  }
}