export type AssetCategory = 
  | 'Equipment'
  | 'Inventory'
  | 'Vehicles'
  | 'Furniture'
  | 'Technology'
  | 'Real Estate'
  | 'Intellectual Property'
  | 'Licenses'
  | 'Other';

export type AssetCondition = 
  | 'New'
  | 'Like New'
  | 'Excellent'
  | 'Good'
  | 'Fair'
  | 'Poor';

export interface AssetFormData {
  title: string;
  description: string;
  price: number;
  category: AssetCategory;
  condition: AssetCondition;
  location: string;
  image_url?: string;
  escrowProviderId?: string;
}