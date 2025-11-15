# How to Run and Deploy the Instagram Reel Downloader

This document provides instructions on how to run the application locally and how to deploy it to different hosting services.

## Running Locally

### Prerequisites

*   [Node.js](https://nodejs.org/) installed on your machine.
*   `yt-dlp` installed and accessible in your system's PATH. You can find installation instructions [here](https://github.com/yt-dlp/yt-dlp#installation).

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the backend server:**
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`.

4.  **Open the frontend:**
    Open the `index.html` file in your web browser. You can do this by double-clicking the file or by using a live server extension in your code editor.

## Deploying to Render

Render is a platform that makes it easy to deploy web applications.

### Steps

1.  **Create a new Web Service on Render:**
    *   Go to your Render dashboard and click "New" -> "Web Service".
    *   Connect your GitHub repository.

2.  **Configure the service:**
    *   **Name:** Give your service a name (e.g., `reel-downloader`).
    *   **Root Directory:** Leave this as the default.
    *   **Environment:** Select `Node`.
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`

3.  **Deploy:**
    *   Click "Create Web Service". Render will automatically build and deploy your application.

4.  **Update Frontend:**
    *   After deployment, Render will provide you with a public URL for your service (e.g., `https://reel-downloader.onrender.com`).
    *   You need to update the `fetch` URL in your `script.js` file to point to this new URL.
        ```javascript
        // script.js
        const response = await fetch('https://reel-downloader.onrender.com/api/reel', {
            // ...
        });
        ```
    *   Commit and push this change to your repository, and Render will automatically redeploy.

## Deploying to GitHub Pages

GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub. Since our application has a backend, we can only host the frontend part on GitHub Pages. The backend will need to be deployed separately (e.g., on Render as described above).

### Steps

1.  **Deploy the backend:**
    Follow the steps in the "Deploying to Render" section to deploy the backend server.

2.  **Update the frontend:**
    *   Update the `fetch` URL in `script.js` to point to your deployed backend URL (from Render).
    *   Commit and push this change.

3.  **Configure GitHub Pages:**
    *   Go to your repository settings on GitHub.
    *   In the "Pages" section, select the branch you want to deploy from (usually `main` or `master`).
    *   Select the `/ (root)` folder as the source.
    *   Click "Save".

4.  **Access your site:**
    Your site will be available at `https://<your-username>.github.io/<your-repository-name>/`.

**Note:** When deploying to GitHub Pages, you might need to adjust the paths to your CSS and JavaScript files in `index.html` if you are using a custom domain or a project site. For a simple project like this, the default settings should work.
