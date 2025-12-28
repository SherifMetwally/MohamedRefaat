// Base path for GitHub Pages deployment
export const basePath = '/MohamedRefaat';

// Helper function to get image path with basePath
// Only adds basePath in production builds, not in development
export function getImagePath(path: string): string {
  // In development, Next.js handles routing without basePath
  // So we return the path as-is for local development
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // In production/static export (GitHub Pages), we need to add basePath
  // because Next.js Image component with unoptimized: true doesn't auto-apply it
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}

