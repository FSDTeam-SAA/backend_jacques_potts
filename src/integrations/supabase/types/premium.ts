export type PremiumFeatureType = 
  | "dynamic_filters"
  | "priority_message"
  | "loi_submission"
  | "verification"
  | "featured_listing"
  | "priority_listing";

export interface PremiumFeature {
  type: PremiumFeatureType;
  isActive: boolean;
  expiresAt?: string;
}