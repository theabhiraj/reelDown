// Auto-detect API URL based on environment
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : window.location.origin;

const form = document.getElementById('reel-form');
const urlInput = document.getElementById('reel-url');
const previewContainer = document.getElementById('preview-container');
const downloadContainer = document.getElementById('download-container');
const loadingElement = document.getElementById('loading');
const errorContainer = document.getElementById('error-container');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const reelUrl = urlInput.value.trim();

    // Clear previous results
    previewContainer.innerHTML = '';
    downloadContainer.innerHTML = '';
    errorContainer.classList.add('hidden');
    errorContainer.innerHTML = '';

    // Show loading
    loadingElement.classList.remove('hidden');
    submitBtn.disabled = true;

    // Fetch video
    const videoUrl = await fetchVideoUrl(reelUrl);

    // Hide loading
    loadingElement.classList.add('hidden');
    submitBtn.disabled = false;

    if (videoUrl) {
        const { url, title, description } = videoUrl;
        const downloadUrl = `http://localhost:3000/api/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || 'instagram_reel')}`;
        
        downloadContainer.innerHTML = `
            <div class="download-buttons">
                <a href="${downloadUrl}" download="${title || 'instagram_reel'}.mp4" class="download-btn video-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3V13M10 13L6 9M10 13L14 9M3 17H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Download Video
                </a>
                ${description ? `
                    <!-- <button onclick="downloadDescription('${escapeHtml(description).replace(/'/g, "\\'")}', '${escapeHtml(title || 'instagram_reel')}')" class="download-btn desc-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Download Description
                    </button> -->
                ` : ''}
            </div>
            ${description ? `
                <div class="description-box">
                    <div class="description-header">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Description</span>
                    </div>
                    <p class="description-text">${escapeHtml(description)}</p>
                </div>
            ` : ''}
        `;
        
        previewContainer.innerHTML = `
            <video controls autoplay muted>
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        showError('Could not fetch the video. Please check the URL and try again.');
    }
});

function showError(message) {
    errorContainer.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
            <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/>
            <path d="M10 6V10M10 14H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        ${message}
    `;
    errorContainer.classList.remove('hidden');
}

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
        return { url: data.videoUrl, title: data.title, description: data.description };
    } catch (error) {
        console.error(error);
        return null;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function downloadDescription(description, title) {
    const blob = new Blob([description], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}_description.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}