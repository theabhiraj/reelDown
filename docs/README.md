# GitHub Pages Deployment

This folder contains the frontend files for GitHub Pages deployment.

## Setup Instructions:

1. **Deploy Backend to Render First**
   - Follow the Render deployment steps
   - Get your Render URL (e.g., `https://your-app-name.onrender.com`)

2. **Update API URL**
   - Open `docs/script.js`
   - Replace `https://your-app-name.onrender.com` with your actual Render URL on line 2

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/docs`
   - Click Save

4. **Access Your Site**
   - Your site will be available at: `https://your-username.github.io/your-repo-name/`

## Important Notes:

- The frontend on GitHub Pages will communicate with your backend on Render
- Make sure CORS is enabled on your backend (already configured)
- After any changes to `script.js`, commit and push to update the live site
