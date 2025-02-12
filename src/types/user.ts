export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  is_verified: boolean;
  is_admin: boolean;
  created_at: string;
}