"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Unique Visitor ID बनाएँ (ताकि पता चले नया यूज़र है या पुराना)
    let visitorId = localStorage.getItem('nd_visitor_id');
    if (!visitorId) {
      visitorId = 'vis_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem('nd_visitor_id', visitorId);
    }

    // 2. डिवाइस और ब्राउज़र की पहचान करें
    const ua = navigator.userAgent;
    let device = 'Desktop';
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    else if (/Tablet|iPad/i.test(ua)) device = 'Tablet';

    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edge')) browser = 'Edge';

    let os = 'Unknown';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('like Mac')) os = 'iOS';

    // 3. Referrer (कहाँ से आया)
    let referrer = document.referrer;
    if (!referrer) referrer = 'Direct';
    else if (referrer.includes('google.com')) referrer = 'Google';
    else if (referrer.includes('bing.com')) referrer = 'Bing';
    else if (referrer.includes('twitter.com') || referrer.includes('t.co')) referrer = 'Twitter';
    else if (referrer.includes('facebook.com')) referrer = 'Facebook';

    // 4. डेटा API को भेजें
    const trackData = {
      visitorId,
      pageUrl: pathname,
      referrer,
      device,
      browser,
      os,
    };

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }).catch(err => console.error("Tracking failed", err));

  }, [pathname]); // जब भी पेज (pathname) बदलेगा, यह कोड चलेगा

  return null; // यह कुछ भी UI में नहीं दिखाएगा, पूरी तरह अदृश्य है!
}