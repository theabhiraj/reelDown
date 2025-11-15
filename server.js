const express = require('express');
const cors = require('cors');
const youtubedl = require('youtube-dl-exec');
const https = require('https');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/reel', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const metadata = await youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
        });

        res.json({ 
            videoUrl: metadata.url,
            title: metadata.title || 'instagram_reel',
            thumbnail: metadata.thumbnail,
            description: metadata.description || ''
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch video information' });
    }
});

app.get('/api/download', async (req, res) => {
    const { url, title } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const filename = `${title || 'instagram_reel'}.mp4`;
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'video/mp4');

        const protocol = url.startsWith('https') ? https : http;
        
        protocol.get(url, (videoStream) => {
            videoStream.pipe(res);
        }).on('error', (error) => {
            console.error('Download error:', error);
            res.status(500).json({ error: 'Failed to download video' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download video' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});