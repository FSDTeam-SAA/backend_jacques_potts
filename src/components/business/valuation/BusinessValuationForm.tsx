import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import ValuationResults from './ValuationResults';

interface BusinessValuationFormProps {
  businessId: string;
  initialData?: {
    yearlyRevenue: number;
    profitMargin: number;
    industryType: string;
    location: string;
  };
}

const BusinessValuationForm = ({ businessId, initialData }: BusinessValuationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [valuationResult, setValuationResult] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      yearlyRevenue: initialData?.yearlyRevenue || 0,
      profitMargin: initialData?.profitMargin || 0,
      industryType: initialData?.industryType || '',
      location: initialData?.location || '',
      employeeCount: 0,
      yearsInOperation: 0,
      assets: {}
    }
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      const { data: valuationData, error } = await supabase.functions.invoke('calculate-business-valuation', {
        body: {
          businessId,
          ...data
        }
      });

      if (error) throw error;

      setValuationResult(valuationData);
      toast.success('Business valuation completed successfully');
    } catch (error) {
      console.error('Valuation error:', error);
      toast.error('Failed to complete business valuation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Valuation Calculator</CardTitle>
          <CardDescription>
            Get an AI-powered estimate of your business value based on industry standards and market data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="yearlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Revenue ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profitMargin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit Margin (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsInOperation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years in Operation</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter city name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Valuation'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {valuationResult && (
        <ValuationResults result={valuationResult} />
      )}
    </div>
  );
};

export default BusinessValuationForm;