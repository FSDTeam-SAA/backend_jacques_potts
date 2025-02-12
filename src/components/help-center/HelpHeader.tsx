interface HelpHeaderProps {
  title: string;
  imageSrc: string;
}

const HelpHeader = ({ title, imageSrc }: HelpHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-[#1a365d] mb-6">
        {title}
      </h1>
      <img
        src={imageSrc}
        alt="Help center"
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
    </div>
  );
};

export default HelpHeader;