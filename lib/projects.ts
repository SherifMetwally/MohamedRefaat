// Portfolio images extracted from the website
const portfolioImages = [
  '/images/portfolio-1.png',
  '/images/portfolio-2.jpg',
  '/images/portfolio-3.png',
  '/images/portfolio-4.png',
  '/images/portfolio-5.png',
  '/images/portfolio-6.png',
  '/images/portfolio-7.png',
  '/images/portfolio-8.png',
  '/images/portfolio-9.png',
  '/images/portfolio-10.jpg',
  '/images/portfolio-11.png',
  '/images/portfolio-12.png',
  '/images/portfolio-13.png',
  '/images/portfolio-14.png',
  '/images/portfolio-15.png',
  '/images/portfolio-16.png',
  '/images/portfolio-17.png',
];

export interface Project {
  id: string;
  title: string;
  slug: string;
  thumbnail: string; // First image for thumbnail
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'crest-development',
    title: 'Crest Development',
    slug: 'crest-development',
    thumbnail: '/images/projects/Crest/ee14d0_41ba60c04de5477ab40a3cb9fa96f39d~mv2.jpg',
    images: [
      '/images/projects/Crest/ee14d0_41ba60c04de5477ab40a3cb9fa96f39d~mv2.jpg',
      '/images/projects/Crest/ee14d0_485bb0587a864d538d103ab06e4ca477~mv2.png',
      '/images/projects/Crest/ee14d0_55088973dafd48abbddad127e03eb66b~mv2.png',
      '/images/projects/Crest/ee14d0_55ea31a00e1e4669be1791e36fc8c418~mv2.png',
      '/images/projects/Crest/ee14d0_6b842dc6292b409cb139695ea04d4194~mv2.jpg',
      '/images/projects/Crest/ee14d0_9c453538e804428a8b6bd1d9a3f96ac9~mv2.png',
      '/images/projects/Crest/ee14d0_ea7d68d70d2a4ba1814314c90ff82496~mv2.png',
      '/images/projects/Crest/ee14d0_eec0b05a0006406784ab340ec54e983a~mv2.png',
    ],
  },
  {
    id: 'o-west-villa',
    title: 'O West Villa',
    slug: 'o-west-villa',
    thumbnail: '/images/projects/Owest/1.jpg',
    images: [
      '/images/projects/Owest/1.jpg',
      '/images/projects/Owest/2.jpg',
    ],
  },
  {
    id: 'living-lines-development',
    title: 'Living Lines Development',
    slug: 'living-lines-development',
    thumbnail: '/images/projects/livingline/1.avif',
    images: [
      '/images/projects/livingline/1.avif',
      '/images/projects/livingline/2.avif',
      '/images/projects/livingline/3.avif',
      '/images/projects/livingline/4.avif',
      '/images/projects/livingline/5.avif',
    ],
  },
  {
    id: 'new-giza-villa',
    title: 'New Giza Villa',
    slug: 'new-giza-villa',
    thumbnail: '/images/projects/NewGiza/1.avif',
    images: [
      '/images/projects/NewGiza/1.avif',
      '/images/projects/NewGiza/2.avif',
      '/images/projects/NewGiza/3.avif',
      '/images/projects/NewGiza/4.avif',
      '/images/projects/NewGiza/5.avif',
      '/images/projects/NewGiza/6.avif',
    ],
  },
  {
    id: 'lake-villa',
    title: 'Lake Villa',
    slug: 'lake-villa',
    thumbnail: '/images/projects/lakevilla/1.avif',
    images: [
      '/images/projects/lakevilla/1.avif',
      '/images/projects/lakevilla/2.avif',
      '/images/projects/lakevilla/3.avif',
      '/images/projects/lakevilla/4.avif',
      '/images/projects/lakevilla/5.avif',
    ],
  },
  {
    id: 'niobe-store',
    title: 'Niobe Store',
    slug: 'niobe-store',
    thumbnail: '/images/projects/NiobeStore/1.png',
    images: [
      '/images/projects/NiobeStore/1.png',
      '/images/projects/NiobeStore/2.png',
      '/images/projects/NiobeStore/3.png',
      '/images/projects/NiobeStore/4.png',
      '/images/projects/NiobeStore/5.png',
      '/images/projects/NiobeStore/6.png',
      '/images/projects/NiobeStore/7.png',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  // Normalize the slug: trim, lowercase, remove trailing slash
  const normalizedSlug = slug.trim().toLowerCase().replace(/\/$/, '');
  return projects.find(project => 
    project.slug.toLowerCase() === normalizedSlug ||
    project.id.toLowerCase() === normalizedSlug
  );
}

