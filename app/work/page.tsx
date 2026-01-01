import WorkGalleryServer from '@/components/WorkGalleryServer';

export default function WorkPage() {
  return (
    <div className="pt-20">
      <WorkGalleryServer source="all" showCategories={false} />
    </div>
  );
}

