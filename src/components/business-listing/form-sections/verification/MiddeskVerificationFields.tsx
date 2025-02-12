// import { UseFormReturn } from "react-hook-form";
// import { BusinessListingFormData } from "../../schema";
// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// interface MiddeskVerificationFieldsProps {
//   form: UseFormReturn<BusinessListingFormData>;
// }

// export const MiddeskVerificationFields = ({ form }: MiddeskVerificationFieldsProps) => {
//   return (
//     <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
//       <h3 className="text-sm font-medium">Business Verification Details</h3>
//       <div className="grid gap-4 md:grid-cols-2">
//         <FormField
//           control={form.control}
//           name="taxId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tax ID (EIN)</FormLabel>
//               <FormControl>
//                 <Input placeholder="XX-XXXXXXX" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="street"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Street Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="123 Business St" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="city"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>City</FormLabel>
//               <FormControl>
//                 <Input placeholder="City" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="state"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>State</FormLabel>
//               <FormControl>
//                 <Input placeholder="State" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="postalCode"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Postal Code</FormLabel>
//               <FormControl>
//                 <Input placeholder="12345" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };