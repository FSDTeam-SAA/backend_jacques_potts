interface PlatformHeaderProps {
  title: string;
  description: string;
}

const PlatformHeader = ({ title, description }: PlatformHeaderProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default PlatformHeader;