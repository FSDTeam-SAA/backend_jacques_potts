import BrokerCard from "./BrokerCard";
import type { BrokerProfile } from "../types";

interface BrokerSearchResultsProps {
  brokers: BrokerProfile[] | undefined;
}

const BrokerSearchResults = ({ brokers }: BrokerSearchResultsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brokers?.map((broker) => (
        <BrokerCard key={broker.id} broker={broker} />
      ))}
    </div>
  );
};

export default BrokerSearchResults;