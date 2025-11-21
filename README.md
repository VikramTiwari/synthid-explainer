<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1MZgWuVhckLw5rluEUtWsms3Od8klxGQz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

#### Deployment

This repository can be published as a GitHub Pages project site. The repository already builds to a static dist/ output using Vite.

To enable automatic deploys on push to main:

1. Add the workflow file `.github/workflows/deploy.yml` (already added by this PR). The workflow will build the project and push the built files to the `gh-pages` branch.
2. In GitHub, go to Settings → Pages and set the site source to the `gh-pages` branch (the action will create the branch automatically on first deploy).

Security note about GEMINI_API_KEY (important):

- Do NOT commit your GEMINI_API_KEY (or any secret) into the repo or bake it into the client build. GitHub Pages hosts static files publicly and any secret included in the built bundle is effectively public.
- If the app needs to call Gemini or any other API that requires a secret key, host a small server-side proxy (Vercel, Netlify Functions, Cloud Run, etc.) that keeps the secret in server environment variables and forwards requests from the client.
- Alternatively, make the UI require users to paste their own API key at runtime (so the repo and build contain no secret).

If you need me to also add a small serverless proxy example or modify the app to call a proxy endpoint, I can prepare that in a follow-up PR.
