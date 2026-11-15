export type Listing = {
  id: string;
  title: string;
  description: string;
  price_cents: number;
  category: string;
  seller_email: string;
  image_path: string;
  created_at: string;
};

export type MarketplaceDatabase = {
  public: {
    Tables: {
      listings: {
        Row: Listing;
        Insert: Omit<Listing, "id" | "created_at">;
        Update: Partial<Omit<Listing, "id" | "created_at">>;
        Relationships: [];
      };
      messages: {
        Row: { id: string; listing_id: string; buyer_email: string; message: string; created_at: string };
        Insert: { listing_id: string; buyer_email: string; message: string };
        Update: { message?: string };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
