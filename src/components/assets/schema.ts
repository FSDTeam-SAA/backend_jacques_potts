import * as z from "zod";
import type { AssetCategory, AssetCondition } from "./types";

export const assetSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum([
    'Equipment',
    'Inventory',
    'Vehicles',
    'Furniture',
    'Technology',
    'Real Estate',
    'Intellectual Property',
    'Licenses',
    'Other'
  ] as const),
  condition: z.enum([
    'New',
    'Like New',
    'Excellent',
    'Good',
    'Fair',
    'Poor'
  ] as const),
  location: z.string().min(2, "Location is required"),
  image_url: z.string().optional(),
  escrowProviderId: z.string().optional()
});