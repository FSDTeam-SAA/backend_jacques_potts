import { Card } from "@/components/ui/card";
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: <Building2 className="h-6 w-6 text-[#1a365d]" />,
    title: "Active Listings",
    value: 500,
    description: "Businesses for sale",
  },
  {
    icon: <Users className="h-6 w-6 text-[#1a365d]" />,
    title: "Users",
    value: 10000,
    description: "Active platform users",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-[#1a365d]" />,
    title: "Total Value",
    value: 100,
    suffix: "M+",
    description: "In listed businesses",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-[#1a365d]" />,
    title: "Success Rate",
    value: 95,
    suffix: "%",
    description: "Successful transactions",
  },
];

const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-2xl font-bold text-[#1a365d]">
      {count}
      {suffix}
    </span>
  );
};

const StatisticsSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-[#1a365d]/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#1a365d]/5 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;