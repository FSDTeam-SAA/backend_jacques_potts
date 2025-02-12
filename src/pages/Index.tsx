import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import PremiumFeaturesSection from "@/components/home/PremiumFeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <StatisticsSection />
      <PremiumFeaturesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;