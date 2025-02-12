import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  return (
    <img 
      src={imageUrl} 
      alt="Ad preview" 
      className="w-full max-w-md h-48 object-cover rounded-lg"
    />
  );
};

export default ImagePreview;