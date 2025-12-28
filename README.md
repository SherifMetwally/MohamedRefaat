# MRD Website - Mohamed Refaat Design

A modern, animated website redesign for Mohamed Refaat Design using Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Black color scheme with elegant animations
- **Smooth Animations**: Scroll-triggered animations, hover effects, and page transitions
- **Responsive**: Fully responsive design for all screen sizes
- **Performance**: Optimized images and code splitting
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Swiper (for carousels)
- React Intersection Observer

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── [pages]/     # Individual pages
├── components/       # React components
├── lib/             # Utilities and animations
├── public/          # Static assets
└── scripts/         # Utility scripts
```

## Pages

- `/` - Home page with all sections
- `/about` - About page
- `/services` - Services page
- `/work` - Portfolio/work gallery
- `/contact` - Contact information
- `/more` - Additional content

## Build

```bash
npm run build
npm start
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the changes

3. **Deploy**:
   - The site will automatically deploy when you push to the `main` branch
   - You can also manually trigger deployment from the **Actions** tab
   - After deployment, your site will be available at `https://[username].github.io/[repository-name]`

### If your repository is not at the root:

If your site is deployed at a subpath (e.g., `username.github.io/MRD`), update `next.config.js`:

```javascript
basePath: '/MRD',
trailingSlash: true,
```

Then rebuild and redeploy.

## Notes

- Images are stored in `/public/images/`
- Portfolio images should be added to the respective project folders
- All animations are optimized for 60fps performance
- The site is exported as static files for GitHub Pages compatibility

