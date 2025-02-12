import AboutSection from "./footer/AboutSection";
import ResourcesSection from "./footer/ResourcesSection";
import SupportSection from "./footer/SupportSection";
import LegalSection from "./footer/LegalSection";
import Copyright from "./footer/Copyright";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AboutSection />
          <ResourcesSection />
          <SupportSection />
          <LegalSection />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;