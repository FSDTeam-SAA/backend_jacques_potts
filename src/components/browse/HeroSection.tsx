import SmartSearchBar from "@/components/search/SmartSearchBar";

interface HeroSectionProps {
  activeTab: string;
}

const HeroSection = ({ activeTab }: HeroSectionProps) => {
  const getHeadingText = () => {
    switch (activeTab) {
      case "real-estate":
        return "Find Your Perfect Property";
      case "assets":
        return "Discover Business Assets";
      default:
        return "Find Your Next Business Opportunity";
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#1a365d] to-[#2a4a7d] w-full mt-0 animate-fade-in">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">{getHeadingText()}</h1>
          <SmartSearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;