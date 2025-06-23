import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function RedirectPage() {
    const { shortcode } = useParams();
    const hasRedirected = useRef(false); 

    useEffect(() => {
        if (hasRedirected.current) return; 
        hasRedirected.current = true;

        const stored = JSON.parse(localStorage.getItem('short_links') || '[]');
        const index = stored.findIndex(link => link.code === shortcode);

        if (index !== -1) {
            const now = new Date().toISOString();
            const referrer = document.referrer || "Direct";
            const location = "Unknown";

            const updatedLinks = [...stored];
            const link = updatedLinks[index];

            link.clickCount = (link.clickCount || 0) + 1;
            link.clicks.push({ timestamp: now, source: referrer, location });

            localStorage.setItem('short_links', JSON.stringify(updatedLinks));
            window.location.href = link.original;
        } else {
            alert('Short link not found or expired.');
        }
    }, [shortcode]);

    return null;
}
