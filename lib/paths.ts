// Base path for GitHub Pages deployment
export const basePath = '/MohamedRefaat';

// Helper function to get image path with basePath
export function getImagePath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}

