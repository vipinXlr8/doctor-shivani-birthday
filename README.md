# Birthday website for Doctor Shivani Mishra

A cinematic, emotional, mobile-first birthday microsite built with React + Vite. It is configured for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Personalise before publishing

1. In `src/App.jsx`, edit the letter text to make it sound like you.
2. Add three photos to `public/photos/` named exactly:
   - `memory-1.jpg`
   - `memory-2.jpg`
   - `memory-3.jpg`
   The gallery will show a tasteful placeholder until you add each photo.
3. Add an MP3 you have permission to use as `public/music.mp3`. The Play Music button will play it. Browsers require a user click before audio can start.
4. If you rename the GitHub repository, update `base` in `vite.config.js` to `/<new-repository-name>/`.

## Deploy to GitHub Pages

1. Create a public GitHub repository named `doctor-shivani-birthday`.
2. Upload the contents of this project to the repository root (not the containing folder).
3. In the project terminal, run:

```bash
npm install
npm run deploy
```

4. In GitHub, open **Settings → Pages** and set the source to **Deploy from a branch**, branch **gh-pages**, folder **/(root)**.
5. Wait for the deployment to finish. Your website URL will be:

`https://YOUR-GITHUB-USERNAME.github.io/doctor-shivani-birthday/`

If you use a different repository name, change the Vite `base` path before building/deploying.

## Notes

- Hosting on GitHub Pages is free for public repositories.
- The page uses Google Fonts, so those fonts need an internet connection. System fallbacks remain available.
- Do not commit private photos or personal information to a public repository unless you are comfortable with anyone viewing them.
