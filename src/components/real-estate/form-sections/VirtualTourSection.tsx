import { UseFormReturn } from "react-hook-form";
import TourForm from "../virtual-tour/TourForm";
import TourPreview from "../virtual-tour/TourPreview";

interface VirtualTourSectionProps {
  form: UseFormReturn<any>;
}

const VirtualTourSection = ({ form }: VirtualTourSectionProps) => {
  const virtualTourUrl = form.watch("virtual_tour_url");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <TourForm form={form} />
        </div>
        {virtualTourUrl && <TourPreview url={virtualTourUrl} />}
      </div>
    </div>
  );
};

export default VirtualTourSection;