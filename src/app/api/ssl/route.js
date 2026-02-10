import { NextResponse } from 'next/server';
import tls from 'tls';
import net from 'net';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  // Promise wrap karke SSL check karenge
  const getSSLInfo = (hostname) => {
    return new Promise((resolve, reject) => {
      const socket = tls.connect({
        host: hostname,
        port: 443,
        servername: hostname, // SNI support ke liye zaroori hai
        rejectUnauthorized: false // Agar self-signed ho tab bhi error na de
      }, () => {
        const cert = socket.getPeerCertificate();
        
        if (!cert || Object.keys(cert).length === 0) {
            resolve({ valid: false, error: 'No certificate found' });
            return;
        }

        // Days remaining calculate karna
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.floor((validTo - new Date()) / (1000 * 60 * 60 * 24));

        resolve({
          valid: true,
          issuer: cert.issuer.O || cert.issuer.CN,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          daysRemaining: daysRemaining,
          secure: daysRemaining > 0
        });
        socket.end();
      });

      socket.on('error', (err) => {
        resolve({ valid: false, error: err.message });
      });
      
      // Timeout lagana zaroori hai
      socket.setTimeout(5000, () => {
          socket.destroy();
          resolve({ valid: false, error: 'Connection timed out' });
      });
    });
  };

  try {
    const data = await getSSLInfo(domain);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check SSL' }, { status: 500 });
  }
}