const express = require('express');
const cors = require('cors');
const youtubedl = require('youtube-dl-exec');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

        res.json({ videoUrl: metadata.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch video information' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});