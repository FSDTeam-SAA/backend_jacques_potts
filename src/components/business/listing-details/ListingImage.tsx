import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ListingImageProps {
  imageUrl?: string | null;
  businessName: string;
}

const ListingImage = ({ imageUrl, businessName }: ListingImageProps) => {
  if (!imageUrl) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <AspectRatio ratio={16 / 9}>
        <img
          src={imageUrl}
          alt={`${businessName} listing image`}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </AspectRatio>
    </div>
  );
};

export default ListingImage;