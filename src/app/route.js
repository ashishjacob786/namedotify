import { NextResponse } from 'next/server';
import { promises as dns } from 'dns';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const type = searchParams.get('type') || 'A'; // By default 'A' record check karenge

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  try {
    let records;
    
    // DNS Records fetch karne ka logic
    switch (type) {
        case 'A':
            records = await dns.resolve4(domain);
            break;
        case 'AAAA':
            records = await dns.resolve6(domain);
            break;
        case 'MX':
            records = await dns.resolveMx(domain);
            break;
        case 'NS':
            records = await dns.resolveNs(domain);
            break;
        case 'TXT':
            records = await dns.resolveTxt(domain);
            break;
        case 'CNAME':
            records = await dns.resolveCname(domain);
            break;
        default:
            records = await dns.resolve4(domain);
    }

    return NextResponse.json({ type, records });

  } catch (error) {
    // Agar record nahi mila ya domain galat hai
    return NextResponse.json({ 
        error: `No ${type} records found or invalid domain.`, 
        details: error.message 
    }, { status: 500 });
  }
}