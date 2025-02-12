import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import TourUrlForm from "./tour-form/TourUrlForm";
import TourGallerySection from "./gallery/TourGallerySection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VirtualTourSectionProps {
  businessId: string;
  initialTourUrl?: string;
  initialImages?: string[];
  onUpdate?: () => void;
}

const VirtualTourSection = ({ 
  businessId, 
  initialTourUrl = '', 
  initialImages = [],
  onUpdate 
}: VirtualTourSectionProps) => {
  const handleImagesUpdate = async (newImages: string[]) => {
    try {
      const { error } = await supabase
        .from('business_listings')
        .update({ 
          image_urls: newImages
        })
        .eq('id', businessId);

      if (error) throw error;
      
      onUpdate?.();
    } catch (error) {
      console.error('Error updating tour images:', error);
      toast.error("Failed to update tour images");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Virtual Tour
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TourUrlForm
          businessId={businessId}
          initialTourUrl={initialTourUrl}
          onUpdate={onUpdate}
        />
        <TourGallerySection
          businessId={businessId}
          initialImages={initialImages}
          onImagesUpdate={handleImagesUpdate}
        />
      </CardContent>
    </Card>
  );
};

export default VirtualTourSection;