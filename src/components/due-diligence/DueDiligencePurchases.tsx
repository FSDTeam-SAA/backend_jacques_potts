import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PurchaseCard from "./purchases/PurchaseCard";
import EmptyState from "./purchases/EmptyState";
import { normalizeDocuments } from "./utils/documentNormalizer";

const DueDiligencePurchases = () => {
  const { data: purchases, isLoading } = useQuery({
    queryKey: ["dueDiligencePurchases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("due_diligence_purchases")
        .select(`
          *,
          due_diligence_packages (
            name,
            description
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!purchases || purchases.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {purchases.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          {...purchase}
          documents={normalizeDocuments(purchase.documents)}
        />
      ))}
    </div>
  );
};

export default DueDiligencePurchases;