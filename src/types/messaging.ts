export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  content: string;
  is_priority?: boolean;
  read?: boolean;
  created_at: string;
}

export interface MessageWithProfile extends Message {
  profiles?: {
    full_name: string | null;
    email: string | null;
  };
}