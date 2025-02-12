import React from 'react';
import VirtualTourViewer from "../VirtualTourViewer";
import VirtualTourUpload from "../VirtualTourUpload";

interface TourGallerySectionProps {
  businessId: string;
  initialImages: string[];
  onImagesUpdate: (newImages: string[]) => void;
}

const TourGallerySection = ({ businessId, initialImages, onImagesUpdate }: TourGallerySectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tour Gallery</h3>
      {initialImages.length > 0 && (
        <VirtualTourViewer images={initialImages} />
      )}
      <VirtualTourUpload
        businessId={businessId}
        initialImages={initialImages}
        onImagesUpdate={onImagesUpdate}
      />
    </div>
  );
};

export default TourGallerySection;