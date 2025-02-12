import { technologicalListing } from "./technologicalListing";
import { luxuryPropertyListing } from "./luxuryPropertyListing";
import { commercialPlazaListing } from "./commercialPlazaListing";
import type { BusinessListing } from "@/types/supabase";

export const mockListings: BusinessListing[] = [
  technologicalListing,
  luxuryPropertyListing,
  commercialPlazaListing
];

export default mockListings;