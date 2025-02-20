import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ValuationData {
  businessId: string;
  yearlyRevenue: number;
  profitMargin: number;
  industryType: string;
  yearsInOperation: number;
  employeeCount: number;
  assets: any;
  location: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      businessId,
      yearlyRevenue,
      profitMargin,
      industryType,
      yearsInOperation,
      employeeCount,
      assets,
      location,
    } = (await req.json()) as ValuationData;

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch industry multipliers and market data
    const industryMultiplier = calculateIndustryMultiplier(
      industryType,
      location
    );

    // Calculate base valuation using revenue and profit margin
    const baseValuation =
      yearlyRevenue * (profitMargin / 100) * industryMultiplier;

    // Adjust for years in operation
    const yearsMultiplier = Math.min(1 + yearsInOperation * 0.05, 1.5);

    // Calculate asset value
    const assetValue = calculateAssetValue(assets);

    // Calculate final valuation
    const finalValuation = baseValuation * yearsMultiplier + assetValue;

    // Calculate confidence score based on data completeness and variance
    const confidenceScore = calculateConfidenceScore({
      yearlyRevenue,
      profitMargin,
      yearsInOperation,
      employeeCount,
      assets,
    });

    // Prepare valuation analysis
    const valuationData = {
      business_id: businessId,
      industry_multiplier: industryMultiplier,
      revenue_analysis: {
        base_valuation: baseValuation,
        years_multiplier: yearsMultiplier,
        adjusted_valuation: baseValuation * yearsMultiplier,
      },
      asset_valuation: {
        total_asset_value: assetValue,
        breakdown: assets,
      },
      market_comparison: {
        industry_average: industryMultiplier * yearlyRevenue,
        location_factor: getLocationFactor(location),
        market_trend: "stable",
      },
      final_valuation: finalValuation,
      confidence_score: confidenceScore,
    };

    // Store valuation result
    const { data, error } = await supabaseClient
      .from("business_valuations")
      .insert([valuationData])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function calculateIndustryMultiplier(
  industry: string,
  location: string
): number {
  // Industry multipliers based on typical valuation metrics
  const baseMultipliers: Record<string, number> = {
    technology: 3.5,
    retail: 2.0,
    manufacturing: 2.5,
    services: 2.2,
    healthcare: 3.0,
    restaurant: 1.8,
    construction: 2.3,
    default: 2.0,
  };

  const multiplier =
    baseMultipliers[industry.toLowerCase()] || baseMultipliers.default;
  const locationFactor = getLocationFactor(location);

  return multiplier * locationFactor;
}

function getLocationFactor(location: string): number {
  // Location-based adjustment factors
  const locationFactors: Record<string, number> = {
    "new york": 1.3,
    "san francisco": 1.3,
    "los angeles": 1.2,
    chicago: 1.1,
    default: 1.0,
  };

  const normalizedLocation = location.toLowerCase();
  return locationFactors[normalizedLocation] || locationFactors.default;
}

function calculateAssetValue(assets: any): number {
  if (!assets) return 0;

  // Sum up the value of all assets
  return Object.values(assets).reduce((sum: number, asset: any) => {
    return sum + (typeof asset.value === "number" ? asset.value : 0);
  }, 0);
}

function calculateConfidenceScore(data: any): number {
  let score = 100;
  const requiredFields = ["yearlyRevenue", "profitMargin", "yearsInOperation"];

  // Reduce score for missing critical data
  requiredFields.forEach((field) => {
    if (!data[field]) score -= 20;
  });

  // Reduce score for missing optional data
  if (!data.employeeCount) score -= 5;
  if (!data.assets) score -= 10;

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
}
