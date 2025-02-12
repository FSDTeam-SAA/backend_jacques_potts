import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TourUrlFormProps {
  businessId: string;
  initialTourUrl?: string;
  onUpdate?: () => void;
}

const TourUrlForm = ({ businessId, initialTourUrl = '', onUpdate }: TourUrlFormProps) => {
  const [tourUrl, setTourUrl] = useState(initialTourUrl);
  const [editing, setEditing] = useState(false);

  const handleTourUrlUpdate = async () => {
    try {
      const { error } = await supabase
        .from('business_listings')
        .update({ 
          has_virtual_tour: true,
          virtual_tour_url: tourUrl 
        })
        .eq('id', businessId);

      if (error) throw error;
      
      toast.success("Virtual tour URL updated successfully");
      setEditing(false);
      onUpdate?.();
    } catch (error) {
      console.error('Error updating tour URL:', error);
      toast.error("Failed to update virtual tour URL");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {editing ? (
          <>
            <Input
              value={tourUrl}
              onChange={(e) => setTourUrl(e.target.value)}
              placeholder="Enter virtual tour URL (e.g., Matterport, YouTube)"
            />
            <Button onClick={handleTourUrlUpdate}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            {tourUrl ? (
              <div className="flex-1">
                <iframe
                  src={tourUrl}
                  className="w-full h-[400px] rounded-lg"
                  allowFullScreen
                />
              </div>
            ) : (
              <Button variant="outline" onClick={() => setEditing(true)}>
                Add Virtual Tour URL
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TourUrlForm;