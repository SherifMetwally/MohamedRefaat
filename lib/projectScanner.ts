import fs from 'fs';
import path from 'path';

export interface ProjectCategory {
  name: string;
  images: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  images: string[];
  categories?: ProjectCategory[];
  source: 'home-projects' | 'our-projects';
  orderNumber?: number;
}

// Helper function to get all image files from a directory
function getImageFiles(dirPath: string): string[] {
  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.avif', '.webp', '.gif'].includes(ext);
      })
      .map(file => path.join(dirPath, file))
      .sort();
  } catch (error) {
    return [];
  }
}

// Helper function to check if a path is a directory
function isDirectory(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

// Scan a project folder and return project data
function scanProjectFolder(
  projectFolderName: string,
  projectFolderPath: string,
  source: 'home-projects' | 'our-projects'
): Project | null {
  try {
    const images: string[] = [];
    const categories: ProjectCategory[] = [];
    
    // Get all items in the project folder
    const items = fs.readdirSync(projectFolderPath, { withFileTypes: true });
  
  // Separate files and directories
  const files = items.filter(item => item.isFile());
  const directories = items.filter(item => item.isDirectory());
  
  // Get direct images in the project folder
  files.forEach(file => {
    const ext = path.extname(file.name).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.avif', '.webp', '.gif'].includes(ext)) {
      const imagePath = path.join(projectFolderPath, file.name);
      images.push(imagePath);
    }
  });
  
  // Process subdirectories as categories
  directories.forEach(dir => {
    const categoryPath = path.join(projectFolderPath, dir.name);
    const categoryImages = getImageFiles(categoryPath);
    
    if (categoryImages.length > 0) {
      categories.push({
        name: dir.name,
        images: categoryImages,
      });
    }
  });
  
  // If no images found, return null
  if (images.length === 0 && categories.length === 0) {
    return null;
  }
  
  // Generate slug from folder name
  const slug = projectFolderName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Extract order number and clean title
  const orderMatch = projectFolderName.match(/^(\d+)[\s-]+(.+)$/);
  const orderNumber = orderMatch ? parseInt(orderMatch[1], 10) : 9999; // Default to end if no number
  const cleanTitle = orderMatch ? orderMatch[2] : projectFolderName;
  
  // Get thumbnail - prefer random image from categories if available
  let thumbnail = '';
  const allAvailableImages = [
    ...images,
    ...categories.flatMap(cat => cat.images)
  ];
  
  if (allAvailableImages.length > 0) {
    // Pick a random image from all available images
    const randomIndex = Math.floor(Math.random() * allAvailableImages.length);
    thumbnail = allAvailableImages[randomIndex];
  } else if (images.length > 0) {
    thumbnail = images[0];
  } else if (categories.length > 0 && categories[0].images.length > 0) {
    thumbnail = categories[0].images[0];
  }
  
  // Convert paths to web paths
  const convertToWebPath = (filePath: string) => {
    const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);
    return '/' + relativePath.replace(/\\/g, '/');
  };
  
  const project: Project = {
    id: slug,
    title: cleanTitle,
    slug,
    thumbnail: convertToWebPath(thumbnail),
    images: images.map(convertToWebPath),
    source,
    orderNumber, // Add order number for sorting
  };
  
  if (categories.length > 0) {
    project.categories = categories.map(cat => ({
      name: cat.name,
      images: cat.images.map(convertToWebPath),
    }));
  }
  
  return project;
  } catch (error) {
    console.error(`Error scanning project folder ${projectFolderName}:`, error);
    return null;
  }
}

// Scan all projects from a source folder
export function scanProjects(source: 'home-projects' | 'our-projects'): Project[] {
  try {
    const projectsPath = path.join(process.cwd(), 'public', 'images', source);
    
    if (!fs.existsSync(projectsPath)) {
      console.warn(`Projects folder does not exist: ${projectsPath}`);
      return [];
    }
    
    const projects: Project[] = [];
    const items = fs.readdirSync(projectsPath, { withFileTypes: true });
    
    items.forEach(item => {
      if (item.isDirectory()) {
        try {
          const projectPath = path.join(projectsPath, item.name);
          const project = scanProjectFolder(item.name, projectPath, source);
          if (project) {
            projects.push(project);
          }
        } catch (error) {
          console.error(`Error processing project ${item.name}:`, error);
        }
      }
    });
    
    // Sort by order number
    projects.sort((a, b) => {
      const orderA = a.orderNumber ?? 9999;
      const orderB = b.orderNumber ?? 9999;
      return orderA - orderB;
    });
    
    return projects;
  } catch (error) {
    console.error(`Error scanning projects from ${source}:`, error);
    return [];
  }
}

// Get all projects (home-projects and our-projects)
export function getAllProjects(): Project[] {
  const homeProjects = scanProjects('home-projects');
  const ourProjects = scanProjects('our-projects');
  return [...homeProjects, ...ourProjects];
}

// Get only home projects
export function getHomeProjects(): Project[] {
  return scanProjects('home-projects');
}

// Get project by slug
export function getProjectBySlug(slug: string | undefined | null): Project | undefined {
  if (!slug) {
    return undefined;
  }
  
  try {
    const projects = getAllProjects();
    const normalizedSlug = slug.trim().toLowerCase().replace(/\/$/, '');
    return projects.find(project => 
      project.slug.toLowerCase() === normalizedSlug ||
      project.id.toLowerCase() === normalizedSlug
    );
  } catch (error) {
    console.error('Error getting project by slug:', error);
    return undefined;
  }
}

