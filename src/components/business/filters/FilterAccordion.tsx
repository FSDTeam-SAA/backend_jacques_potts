import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FilterState, FilterProps } from "./types";
import BusinessInfoFilters from "./BusinessInfoFilters";
import FinancialFilters from "./FinancialFilters";
import OperationalFilters from "./OperationalFilters";
import AssetsFilters from "./AssetsFilters";
import MarketPresenceFilters from "./MarketPresenceFilters";
import SoftwareFilters from "./SoftwareFilters";

interface FilterAccordionProps extends FilterProps {
  formatCurrency: (value: number) => string;
}

const FilterAccordion = ({ onFilterChange, formatCurrency }: FilterAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="business-info">
        <AccordionTrigger>Business Information</AccordionTrigger>
        <AccordionContent>
          <BusinessInfoFilters onFilterChange={onFilterChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="financial">
        <AccordionTrigger>Financial Metrics</AccordionTrigger>
        <AccordionContent>
          <FinancialFilters 
            onFilterChange={onFilterChange}
            formatCurrency={formatCurrency}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="operational">
        <AccordionTrigger>Operational Details</AccordionTrigger>
        <AccordionContent>
          <OperationalFilters onFilterChange={onFilterChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="assets">
        <AccordionTrigger>Assets & Liabilities</AccordionTrigger>
        <AccordionContent>
          <AssetsFilters onFilterChange={onFilterChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="market">
        <AccordionTrigger>Market Presence</AccordionTrigger>
        <AccordionContent>
          <MarketPresenceFilters onFilterChange={onFilterChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="software">
        <AccordionTrigger>Software & Management</AccordionTrigger>
        <AccordionContent>
          <SoftwareFilters onFilterChange={onFilterChange} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordion;