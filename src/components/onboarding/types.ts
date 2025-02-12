import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  role: z.enum(["buyer", "seller", "both"]),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;