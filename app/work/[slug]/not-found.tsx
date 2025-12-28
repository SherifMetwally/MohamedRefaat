import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
        <Link
          href="/work"
          className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}

