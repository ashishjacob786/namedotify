"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();
  
  // ✅ OVERCOUNTING FIX: डुप्लीकेट रिक्वेस्ट रोकने के लिए मेमोरी
  const lastTracked = useRef(''); 

  useEffect(() => {
    // अगर वही पेज दोबारा लोड हो रहा है (React Strict Mode), तो इग्नोर करो
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const trackVisit = async () => {
      try {
        // 1. Unique Visitor ID बनाएँ
        let visitorId = localStorage.getItem('nd_visitor_id');
        if (!visitorId) {
          visitorId = 'vis_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
          localStorage.setItem('nd_visitor_id', visitorId);
        }

        // 2. डिवाइस और ब्राउज़र की पहचान करें
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
        else if (referrer.includes('google.')) referrer = 'Google Search';
        else if (referrer.includes('bing.com')) referrer = 'Bing';
        else if (referrer.includes('twitter.com') || referrer.includes('t.co')) referrer = 'Twitter';
        else if (referrer.includes('facebook.com')) referrer = 'Facebook';
        else referrer = new URL(referrer).hostname; // बाकी साइट्स का डोमेन नाम

        // 4. डेटा API को भेजें
        const trackData = {
          visitorId,
          pageUrl: pathname, // ✅ API में pageUrl पास कर रहे हैं
          referrer,
          device,
          browser,
          os,
        };

        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackData),
        });
      } catch (err) {
        console.error("Tracking failed", err);
      }
    };

    // ✅ 1 सेकंड का डिले: ताकि फालतू के बैकग्राउंड क्लिक्स और Next.js के प्रीफेच इग्नोर हो जाएं
    const timer = setTimeout(() => {
      trackVisit();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]); 

  return null; 
}