interface LOIHeaderProps {
  title: string;
}

const LOIHeader = ({ title }: LOIHeaderProps) => {
  return (
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
  );
};

export default LOIHeader;