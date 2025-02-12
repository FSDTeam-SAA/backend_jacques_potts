import { 
  Building2, Filter, Shield, FileText, 
  Lock, DollarSign, Rocket 
} from "lucide-react";
import HelpCategoryCard from "./HelpCategoryCard";

export const helpCategories = [
  {
    icon: Rocket,
    title: "Getting Started",
    sections: [
      {
        title: "Creating Your Account",
        description: "Learn how to set up your Buy Biz Fast account and get started.",
        steps: [
          "Visit the signup page and enter your details",
          "Verify your email address",
          "Complete your profile information",
          "Set up your preferences and notification settings"
        ],
        tips: [
          "Use a business email for better credibility",
          "Add a professional profile picture",
          "Enable two-factor authentication for extra security"
        ]
      },
      {
        title: "Platform Navigation",
        description: "Understanding the key features and how to navigate the platform effectively.",
        steps: [
          "Explore the dashboard overview",
          "Use the main navigation menu",
          "Access quick actions and shortcuts",
          "Customize your view preferences"
        ]
      }
    ]
  },
  {
    icon: Building2,
    title: "Listing Your Business",
    sections: [
      {
        title: "Creating a Business Listing",
        description: "Step-by-step guide to create an attractive business listing.",
        steps: [
          "Click on 'List Your Business' button",
          "Fill in the basic business information",
          "Add detailed financial information",
          "Upload high-quality images",
          "Set your asking price and terms"
        ],
        tips: [
          "Be thorough with your business description",
          "Include recent financial statements",
          "Highlight unique selling points",
          "Be transparent about challenges and opportunities"
        ]
      },
      {
        title: "Optimizing Your Listing",
        description: "Tips to make your listing stand out and attract serious buyers.",
        tips: [
          "Use clear, professional photos",
          "Provide detailed financial history",
          "Highlight growth potential",
          "Include market analysis"
        ]
      }
    ]
  },
  {
    icon: Filter,
    title: "Using Dynamic Filters",
    sections: [
      {
        title: "Advanced Search Features",
        description: "Master the use of dynamic filters to find exactly what you're looking for.",
        steps: [
          "Access the search filters panel",
          "Select your desired criteria",
          "Save your search preferences",
          "Set up alerts for new matches"
        ]
      },
      {
        title: "Understanding Filter Categories",
        description: "Learn about different filter categories and how to use them effectively.",
        tips: [
          "Combine multiple filters for better results",
          "Save your most used filter combinations",
          "Use price range filters wisely",
          "Consider location-based filtering"
        ]
      }
    ]
  },
  {
    icon: Shield,
    title: "Verification Process",
    sections: [
      {
        title: "Buyer Verification",
        description: "Understanding the buyer verification process and requirements.",
        steps: [
          "Submit identification documents",
          "Provide proof of funds",
          "Complete background check",
          "Sign required agreements"
        ]
      },
      {
        title: "Seller Verification",
        description: "Learn about seller verification and maintaining verified status.",
        steps: [
          "Submit business documentation",
          "Verify ownership status",
          "Provide financial records",
          "Complete business validation"
        ]
      }
    ]
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    sections: [
      {
        title: "Data Protection",
        description: "How we protect your sensitive business information.",
        tips: [
          "Use strong passwords",
          "Enable two-factor authentication",
          "Regularly review access logs",
          "Keep your contact information updated"
        ]
      },
      {
        title: "Confidentiality Agreements",
        description: "Understanding and managing NDAs and confidentiality.",
        steps: [
          "Review the Global NDA terms",
          "Sign required documentation",
          "Manage document access",
          "Track information sharing"
        ]
      }
    ]
  },
  {
    icon: DollarSign,
    title: "Transaction Process",
    sections: [
      {
        title: "Making an Offer",
        description: "Learn how to submit and negotiate offers effectively.",
        steps: [
          "Review business details thoroughly",
          "Submit letter of intent",
          "Negotiate terms",
          "Complete due diligence"
        ]
      },
      {
        title: "Closing the Deal",
        description: "Understanding the final steps of the transaction process.",
        steps: [
          "Review final agreement",
          "Complete payment process",
          "Transfer documentation",
          "Finalize ownership change"
        ]
      }
    ]
  }
];

const HelpCategories = () => {
  return (
    <div className="grid gap-8">
      {helpCategories.map((category, index) => (
        <HelpCategoryCard
          key={index}
          icon={category.icon}
          title={category.title}
          sections={category.sections}
        />
      ))}
    </div>
  );
};

export default HelpCategories;
