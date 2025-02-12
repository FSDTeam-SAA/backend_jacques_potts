import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash2, Eye, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdManagement = () => {
  const { user } = useAuth();

  const { data: ads, isLoading } = useQuery({
    queryKey: ["user-ads", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads")
        .select(`
          *,
          ad_images(image_url, is_primary),
          ad_categories(name)
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleDelete = async (adId: string) => {
    try {
      const { error } = await supabase
        .from("ads")
        .delete()
        .eq("id", adId)
        .eq("user_id", user?.id);

      if (error) throw error;
      toast.success("Ad deleted successfully");
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Failed to delete ad");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ad Management</h1>
        <Link to="/create-ad">
          <Button>Create New Ad</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {ads && ads.length > 0 ? (
          ads.map((ad) => (
            <Card key={ad.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{ad.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Category: {ad.ad_categories?.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/ads/${ad.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/ads/${ad.id}/analytics`}>
                        <ChartBar className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/ads/${ad.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(ad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{ad.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${ad.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="font-medium">{ad.views_count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't created any ads yet.
              </p>
              <Link to="/create-ad">
                <Button>Create Your First Ad</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdManagement;