interface AnalyticsHeaderProps {
  title: string;
  description: string;
}

const AnalyticsHeader = ({ title, description }: AnalyticsHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default AnalyticsHeader;