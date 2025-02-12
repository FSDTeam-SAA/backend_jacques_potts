import PlatformCard from "./PlatformCard";

interface PlatformConnection {
  id: string;
  platform_name: string;
  status: string;
  last_sync_at: string | null;
}

interface PlatformGridProps {
  connections: PlatformConnection[];
  onSync: (connectionId: string) => Promise<void>;
}

const PlatformGrid = ({ connections, onSync }: PlatformGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {connections?.map((connection) => (
        <PlatformCard
          key={connection.id}
          connection={connection}
          onSync={onSync}
        />
      ))}
    </div>
  );
};

export default PlatformGrid;