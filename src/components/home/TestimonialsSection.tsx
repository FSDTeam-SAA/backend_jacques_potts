import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "John Smith",
    role: "Business Seller",
    content: "The platform made selling my business incredibly smooth. The verification process gave buyers confidence in my listing.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    type: "seller"
  },
  {
    name: "Sarah Johnson",
    role: "Business Buyer",
    content: "Found exactly what I was looking for. The detailed analytics helped me make an informed decision.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    type: "buyer"
  },
  {
    name: "Michael Brown",
    role: "Business Owner",
    content: "The premium features are worth every penny. Got multiple serious offers within weeks.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    type: "seller"
  },
];

const TestimonialsSection = () => {
  const [filter, setFilter] = useState<"all" | "buyer" | "seller">("all");

  const filteredTestimonials = testimonials.filter(
    (testimonial) => filter === "all" || testimonial.type === filter
  );

  return (
    <section className="container mx-auto py-16 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-6 text-[#1a365d]"
      >
        What Our Users Say
      </motion.h2>
      
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="transition-all duration-300"
        >
          All
        </Button>
        <Button
          variant={filter === "buyer" ? "default" : "outline"}
          onClick={() => setFilter("buyer")}
          className="transition-all duration-300"
        >
          Buyers
        </Button>
        <Button
          variant={filter === "seller" ? "default" : "outline"}
          onClick={() => setFilter("seller")}
          className="transition-all duration-300"
        >
          Sellers
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-[#1a365d]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 min-h-[100px]">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-[#1a365d]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
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

export default TestimonialsSection;