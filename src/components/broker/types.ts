export interface BrokerProfile {
  id: string;
  user_id: string;
  license_number: string;
  years_experience: number;
  specialties: string[];
  verification_status: string;
  profiles: {
    full_name: string;
    email: string;
    city: string;
    state: string;
    avatar_url: string;
    ratings: {
      rating: number;
    }[];
  };
}