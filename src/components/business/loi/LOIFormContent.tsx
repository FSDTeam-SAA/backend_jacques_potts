import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const loiSchema = z.object({
  content: z.string().min(100, "Letter of Intent must be at least 100 characters"),
});

type LoiFormValues = z.infer<typeof loiSchema>;

interface LOIFormContentProps {
  form: UseFormReturn<LoiFormValues>;
}

const LOIFormContent = ({ form }: LOIFormContentProps) => {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Your Letter of Intent</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write your letter of intent here..."
              className="min-h-[300px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { loiSchema };
export type { LoiFormValues };
export default LOIFormContent;