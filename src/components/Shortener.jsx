
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { generateShortCode, validateURL } from './Helper';
import { logEvent } from './Logger';

export default function Shortener() {
    const [url, setUrl] = useState('');
    const [code, setCode] = useState('');
    const [shortLinks, setShortLinks] = useState([]);

    useEffect(() => {
        const existing = JSON.parse(localStorage.getItem('short_links') || '[]');
        setShortLinks(existing);
    }, []);

    const handleShorten = () => {
        if (!validateURL(url)) {
            alert('Invalid URL');
            return;
        }

        let finalCode = code || generateShortCode();
        const existing = JSON.parse(localStorage.getItem('short_links') || '[]');

        if (existing.find(item => item.code === finalCode)) {
            alert('Shortcode already exists');
            return;
        }

        const newLink = { code: finalCode, original: url };
        const updated = [...existing, newLink];
        localStorage.setItem('short_links', JSON.stringify(updated));
        logEvent('shorten', 'Created short link', newLink);

        setShortLinks(updated);
        setUrl('');
        setCode('');
    };

    return (
        <div className="bg-[#f4f6fa] min-h-screen py-10 px-4">
            <Box
                sx={{
                    maxWidth: 600,
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" textAlign="center" gutterBottom>
                    URL Shortener
                </Typography>

                <TextField
                    fullWidth
                    label="Enter Long URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Custom Shortcode (optional)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={handleShorten} fullWidth sx={{ mt: 2 }}>
                    Shorten Link
                </Button>

                {shortLinks.length > 0 && (
                    <Paper elevation={1} sx={{ mt: 5, p: 2, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Shortened URLs
                        </Typography>
                        <List>
                            {shortLinks.map((link, i) => (
                                <ListItem key={i} disablePadding>
                                    <ListItemText
                                        primary={
                                            <a
                                                href={`http://localhost:3000/${link.code}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ color: '#1976d2' }}
                                            >
                                                {`http://localhost:3000/${link.code}`}
                                            </a>
                                        }
                                        secondary={link.original}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </Box>
        </div>
    );
}
