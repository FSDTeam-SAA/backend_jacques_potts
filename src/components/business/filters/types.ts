export interface FilterState {
  revenueRange: [number, number];
  profitMargin: [number, number];
  employeeCount: string;
  yearsInOperation: string;
  businessType: string;
  locationType: string;
  hasWebsite: boolean;
  hasSocialMedia: boolean;
  scalabilityRating: number;
  isFranchiseAvailable: boolean;
  verificationType: string;
  subIndustry: string;
  city: string;
  establishedAfterYear: string;
  cashFlowRange: [number, number];
  profitMargins: [number, number];
  maxDebt: string;
  hasRecurringRevenue: boolean;
  sellerFinancing: boolean;
  realEstateIncluded: boolean;
  isFranchise: boolean;
  absenteeOwner: boolean;
  locationCount: string;
  hasLiens: boolean;
  includesIP: boolean;
  includesEquipment: boolean;
  minSocialFollowers: number;
  financialSoftware: string;
  managementSoftware: string;
}

export interface FilterProps {
  onFilterChange: (key: keyof FilterState, value: any) => void;
}