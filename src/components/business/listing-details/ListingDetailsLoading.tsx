import { Skeleton } from "@/components/ui/skeleton";

const ListingDetailsLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsLoading;