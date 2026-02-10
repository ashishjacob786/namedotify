import { NextResponse } from 'next/server';
import { lookup } from 'whois'; // ✅ FIX: Named import use kar rahe hain

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  // Promise wrapper for whois lookup
  const lookupPromise = new Promise((resolve, reject) => {
    // ✅ FIX: 'whois.lookup' ki jagah seedha 'lookup' use karenge
    lookup(domain, { timeout: 5000 }, (err, data) => {
      if (err) {
        resolve({ error: true, raw: '' });
        return;
      }
      resolve({ error: false, raw: data });
    });
  });

  try {
    const result = await lookupPromise;
    
    if (result.error) {
       // Agar connection fail hua, to assume taken (unsafe to say available)
       return NextResponse.json({ domain, available: false, error: 'Lookup failed' });
    }

    const rawData = result.raw.toLowerCase();

    // Ye keywords batate hain ki domain available hai
    const availablePatterns = [
        'no match for',        // .com, .net
        'not found',           // .in, .org, .me
        'no data found',       // .co.in
        'is available',        // Some other TLDs
        'no entries found',    // .ca etc
        'status: free',
        'nothing new to add'
    ];

    // Check karo ki upar wale keywords me se koi match hua kya?
    const isAvailable = availablePatterns.some(pattern => rawData.includes(pattern));

    return NextResponse.json({ 
        domain, 
        available: isAvailable 
    });

  } catch (error) {
    return NextResponse.json({ available: false }, { status: 500 });
  }
}