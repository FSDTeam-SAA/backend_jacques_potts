import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainInfo from './MainInfo';
import DetailedInfo from './DetailedInfo';
import AdditionalInfoSection from './AdditionalInfoSection';
import BusinessValuationForm from '../valuation/BusinessValuationForm';
import VirtualTourSection from '../../virtual-tour/VirtualTourSection';
import { User } from '@supabase/supabase-js';
import { BusinessListing } from '@/types/business';

interface ListingContentProps {
  listing: BusinessListing;
  user: User | null;
  hasUnlockedInfo: boolean;
  onUnlock: () => void;
}

const ListingContent = ({ listing, user, hasUnlockedInfo, onUnlock }: ListingContentProps) => {
  return (
    <div className="lg:col-span-2">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="virtual-tour">Virtual Tour</TabsTrigger>
          {hasUnlockedInfo && <TabsTrigger value="additional">Additional Info</TabsTrigger>}
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MainInfo listing={listing} />
        </TabsContent>

        <TabsContent value="details">
          <DetailedInfo listing={listing} />
        </TabsContent>

        <TabsContent value="virtual-tour">
          <VirtualTourSection
            businessId={listing.id}
            initialTourUrl={listing.virtual_tour_url}
            initialImages={listing.image_urls || []}
          />
        </TabsContent>

        {hasUnlockedInfo && (
          <TabsContent value="additional">
            <AdditionalInfoSection listing={listing} />
          </TabsContent>
        )}

        <TabsContent value="valuation">
          <BusinessValuationForm 
            businessId={listing.id}
            initialData={{
              yearlyRevenue: listing.yearly_revenue,
              profitMargin: Number(listing.profit_margin) || 0,
              industryType: listing.industry,
              location: listing.location
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ListingContent;