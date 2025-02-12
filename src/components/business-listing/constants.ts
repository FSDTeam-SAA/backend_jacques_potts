export const industries = [
  "Automotive & Transportation",
  "Beauty & Personal Care",
  "Business Services",
  "Construction & Contracting",
  "Consulting & Professional Services",
  "Convenience Store & Gas Station",
  "Daycare & Child Services",
  "Distribution & Wholesale",
  "E-commerce & Online Retail",
  "Education & Training",
  "Entertainment & Recreation",
  "Fashion & Apparel",
  "Financial Services",
  "Fitness & Wellness",
  "Food Truck & Mobile Business",
  "Healthcare & Medical",
  "Home Services & Maintenance",
  "Hotel & Hospitality",
  "Industrial & Manufacturing",
  "IT & Technology Services",
  "Landscaping & Outdoor Services",
  "Laundry & Dry Cleaning",
  "Legal Services",
  "Marketing & Advertising",
  "Pet Care & Veterinary",
  "Pharmacy & Healthcare Retail",
  "Print & Sign Shop",
  "Real Estate Services",
  "Restaurant & Food Service",
  "Retail Store",
  "Salon & Spa",
  "Security Services",
  "Software & SaaS",
  "Storage & Warehousing",
  "Vending Machine Business"
];

export const subIndustries: { [key: string]: string[] } = {
  "restaurant & food service": [
    "Quick Service Restaurant",
    "Fine Dining",
    "Casual Dining",
    "Cafe & Coffee Shop",
    "Bar & Nightclub",
    "Catering Service",
    "Food Truck",
    "Bakery",
    "Pizza Restaurant",
    "Ice Cream Shop"
  ],
  "retail store": [
    "Clothing & Accessories",
    "Electronics",
    "Home Goods",
    "Sporting Goods",
    "Books & Stationery",
    "Jewelry",
    "Toys & Games",
    "Pet Supplies",
    "Health & Beauty",
    "Specialty Foods"
  ],
  "healthcare & medical": [
    "Medical Practice",
    "Dental Practice",
    "Physical Therapy",
    "Chiropractic",
    "Mental Health",
    "Optometry",
    "Veterinary",
    "Medical Spa",
    "Pharmacy",
    "Home Healthcare"
  ],
  "automotive & transportation": [
    "Auto Repair Shop",
    "Car Wash",
    "Auto Dealership",
    "Auto Parts Store",
    "Tire Shop",
    "Transportation Service",
    "Towing Service",
    "Fleet Service",
    "Motorcycle Shop",
    "RV Sales & Service"
  ],
  "it & technology services": [
    "IT Consulting",
    "Software Development",
    "Web Development",
    "Managed IT Services",
    "Cybersecurity",
    "Cloud Services",
    "Data Analytics",
    "Digital Marketing",
    "App Development",
    "Network Solutions"
  ]
};

export const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export const priceRanges = [
  { label: "Under $100K", min: 0, max: 100000 },
  { label: "$100K - $250K", min: 100000, max: 250000 },
  { label: "$250K - $500K", min: 250000, max: 500000 },
  { label: "$500K - $1M", min: 500000, max: 1000000 },
  { label: "$1M - $2M", min: 1000000, max: 2000000 },
  { label: "$2M - $5M", min: 2000000, max: 5000000 },
  { label: "$5M - $10M", min: 5000000, max: 10000000 },
  { label: "$10M - $25M", min: 10000000, max: 25000000 },
  { label: "$25M - $50M", min: 25000000, max: 50000000 },
  { label: "$50M+", min: 50000000, max: null }
];

// This will be populated dynamically based on listings
export const activeCities: { [state: string]: string[] } = {};