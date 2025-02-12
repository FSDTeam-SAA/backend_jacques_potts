export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  is_verified: boolean;
  is_admin: boolean;
  created_at: string;
  verification_date: string | null;
}

export interface Asset {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  status: string;
  profiles?: Profile;
}

export interface Ad {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  is_priority: boolean;
  views_count: number;
  inquiries_count: number;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessListing {
  id: string;
  user_id: string | null;
  business_name: string;
  listing_title: string;
  industry: string;
  location: string;
  asking_price: number;
  yearly_revenue: number;
  description: string;
  image_url: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
  employee_count: string | null;
  operating_hours: string | null;
  established_date: string | null;
  profit_margin: string | null;
  assets: string | null;
  competitor_analysis: string | null;
  is_temporary: boolean | null;
  years_in_operation: string | null;
  business_type: string | null;
  location_type: string | null;
  customer_type: string | null;
  recurring_revenue_percentage: number | null;
  has_website: boolean | null;
  has_social_media: boolean | null;
  scalability_rating: number | null;
  debt_to_equity_ratio: number | null;
  monthly_revenue: number | null;
  is_franchise_available: boolean | null;
  verification_type: string | null;
  verification_date: string | null;
  api_verified_data: any | null;
  property_type: string | null;
  square_footage: number | null;
  number_of_units: number | null;
  year_built: number | null;
  lot_size: string | null;
  zoning_type: string | null;
  parking_spaces: number | null;
  has_virtual_tour: boolean | null;
  virtual_tour_url: string | null;
  property_category: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  property_features: any | null;
  document_verification_status: string | null;
  verified_documents: any | null;
  is_featured: boolean | null;
  featured_until: string | null;
  property_tax_info: any | null;
  zoning_info: string | null;
  property_style: string | null;
  construction_status: string | null;
  building_class: string | null;
  energy_rating: string | null;
  amenities: any[] | null;
  neighborhood_features: any[] | null;
  investment_metrics: Record<string, any> | null;
  is_priority?: boolean;
  views_count?: number | null;
  profiles?: Profile;
  image_urls?: string[];
}
