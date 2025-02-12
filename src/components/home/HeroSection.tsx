import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SmartSearchBar from "@/components/search/SmartSearchBar";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[700px] flex items-center justify-center bg-gradient-to-r from-[#1a365d] to-[#2a4a7d] w-full -mt-16 pt-24 md:pt-32">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 text-center space-y-8 mx-auto px-4 py-12 md:py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          The Ultimate Marketplace for Business Transactions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
        >
          Empowering buyers and sellers with innovative tools for faster, secure business transactions
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-2xl mx-auto"
        >
          <SmartSearchBar />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Link to="/sell" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
              List Your Business
            </Button>
          </Link>
          <Link to="/browse" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
              Search Listings
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;