import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ValuationResultsProps {
  result: {
    final_valuation: number;
    confidence_score: number;
    revenue_analysis: {
      base_valuation: number;
      years_multiplier: number;
      adjusted_valuation: number;
    };
    asset_valuation: {
      total_asset_value: number;
      breakdown: any;
    };
    market_comparison: {
      industry_average: number;
      location_factor: number;
      market_trend: string;
    };
  };
}

const ValuationResults = ({ result }: ValuationResultsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Valuation Results</CardTitle>
          <CardDescription>
            AI-powered business valuation based on provided data and market analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary">
                {formatCurrency(result.final_valuation)}
              </h3>
              <p className="text-sm text-muted-foreground">Estimated Business Value</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-sm text-muted-foreground">{result.confidence_score}%</span>
              </div>
              <Progress value={result.confidence_score} className="h-2" />
            </div>

            <div className="grid gap-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Base Valuation</h4>
                  <p className="text-2xl font-bold">
                    {formatCurrency(result.revenue_analysis.base_valuation)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Asset Value</h4>
                  <p className="text-2xl font-bold">
                    {formatCurrency(result.asset_valuation.total_asset_value)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Industry Average</h4>
                  <p className="text-2xl font-bold">
                    {formatCurrency(result.market_comparison.industry_average)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Location Factor</h4>
                  <p className="text-2xl font-bold">
                    {result.market_comparison.location_factor.toFixed(2)}x
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Market Trend</h4>
                <p className="text-lg capitalize">{result.market_comparison.market_trend}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValuationResults;