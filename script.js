const form = document.getElementById('reel-form');
const urlInput = document.getElementById('reel-url');
const previewContainer = document.getElementById('preview-container');
const downloadContainer = document.getElementById('download-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const reelUrl = urlInput.value;

    // Mock backend response for now
    const videoUrl = await fetchVideoUrl(reelUrl);

    if (videoUrl) {
        previewContainer.innerHTML = `
            <video controls>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        downloadContainer.innerHTML = `<a href="${videoUrl}" download>Download Reel</a>`;
    } else {
        previewContainer.innerHTML = `<p>Could not fetch video. Please check the URL.</p>`;
        downloadContainer.innerHTML = '';
    }
});

async function fetchVideoUrl(reelUrl) {
    try {
        const response = await fetch('http://localhost:3000/api/reel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: reelUrl }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch video');
        }

        const data = await response.json();
        return data.videoUrl;
    } catch (error) {
        console.error(error);
        return null;
    }
}