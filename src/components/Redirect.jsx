import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RedirectPage() {
    const { shortcode } = useParams();

    useEffect(() => {
        const links = JSON.parse(localStorage.getItem('short_links') || '[]');
        const match = links.find(link => link.code === shortcode);
        if (match) {
            window.location.href = match.original;
        } else {
            alert('Invalid or expired link');
        }
    }, [shortcode]);

    return <p>Redirecting...</p>;
}
