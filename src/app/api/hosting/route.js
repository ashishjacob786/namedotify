import { NextResponse } from 'next/server';
import dns from 'dns';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  // Helper function to get IP from domain
  const getIP = (hostname) => {
    return new Promise((resolve, reject) => {
      dns.lookup(hostname, (err, address) => {
        if (err) reject(err);
        else resolve(address);
      });
    });
  };

  try {
    // 1. Get IP address
    const ip = await getIP(domain);
    
    // 2. Check Hosting Provider details using free IP API
    const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,city,isp,org,as,query`);
    
    if (response.data.status === 'fail') {
        throw new Error('Failed to fetch hosting info');
    }

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: 'Could not determine hosting provider' }, { status: 500 });
  }
}