export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      ad_images: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          image_url: string
          is_primary: boolean
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "ad_images_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_premium_features: {
        Row: {
          ad_id: string
          created_at: string
          expires_at: string | null
          feature_type: Database["public"]["Enums"]["premium_listing_type"]
          id: string
          payment_amount: number
          payment_status: string
          starts_at: string | null
        }
        Insert: {
          ad_id: string
          created_at?: string
          expires_at?: string | null
          feature_type: Database["public"]["Enums"]["premium_listing_type"]
          id?: string
          payment_amount: number
          payment_status?: string
          starts_at?: string | null
        }
        Update: {
          ad_id?: string
          created_at?: string
          expires_at?: string | null
          feature_type?: Database["public"]["Enums"]["premium_listing_type"]
          id?: string
          payment_amount?: number
          payment_status?: string
          starts_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_premium_features_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_reports: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          reason: string
          reporter_id: string
          status: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          reason: string
          reporter_id: string
          status?: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          reason?: string
          reporter_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_reports_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          admin_notes: string | null
          category_id: string
          created_at: string
          description: string
          id: string
          inquiries_count: number
          is_featured: boolean
          is_priority: boolean
          location: string
          price: number
          status: Database["public"]["Enums"]["ad_status"]
          title: string
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          admin_notes?: string | null
          category_id: string
          created_at?: string
          description: string
          id?: string
          inquiries_count?: number
          is_featured?: boolean
          is_priority?: boolean
          location: string
          price: number
          status?: Database["public"]["Enums"]["ad_status"]
          title: string
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          admin_notes?: string | null
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          inquiries_count?: number
          is_featured?: boolean
          is_priority?: boolean
          location?: string
          price?: number
          status?: Database["public"]["Enums"]["ad_status"]
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "ads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ad_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_suggestions: {
        Row: {
          content: string
          context: Json | null
          created_at: string
          id: string
          is_clicked: boolean | null
          is_displayed: boolean | null
          suggestion_type: string
          user_id: string | null
        }
        Insert: {
          content: string
          context?: Json | null
          created_at?: string
          id?: string
          is_clicked?: boolean | null
          is_displayed?: boolean | null
          suggestion_type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          context?: Json | null
          created_at?: string
          id?: string
          is_clicked?: boolean | null
          is_displayed?: boolean | null
          suggestion_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      asset_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      asset_listings: {
        Row: {
          category: string
          condition: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          location: string
          price: number
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          condition: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          location: string
          price: number
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          condition?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          price?: number
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_listings: {
        Row: {
          broker_id: string | null
          created_at: string | null
          id: string
          listing_id: string | null
        }
        Insert: {
          broker_id?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
        }
        Update: {
          broker_id?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broker_listings_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "broker_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_listings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_listings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_profiles: {
        Row: {
          created_at: string | null
          id: string
          license_number: string
          specialties: string[] | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          license_number: string
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          license_number?: string
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "broker_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_profiles_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_integrations: {
        Row: {
          business_id: string | null
          created_at: string | null
          credentials: Json | null
          id: string
          integration_type: string
          metadata: Json | null
          status: string | null
          updated_at: string | null
          verified_at: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type: string
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type?: string
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_integrations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_integrations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      business_listings: {
        Row: {
          amenities: Json | null
          api_verified_data: Json | null
          asking_price: number
          assets: string | null
          bathrooms: number | null
          bedrooms: number | null
          building_class: string | null
          business_name: string
          business_type: string | null
          competitor_analysis: string | null
          construction_status: string | null
          created_at: string
          customer_type: string | null
          debt_to_equity_ratio: number | null
          deleted_at: string | null
          deletion_reason: string | null
          description: string
          document_verification_status: string | null
          employee_count: string | null
          energy_rating: string | null
          established_date: string | null
          featured_until: string | null
          has_social_media: boolean | null
          has_virtual_tour: boolean | null
          has_website: boolean | null
          id: string
          image_url: string | null
          image_urls: string[] | null
          industry: string
          investment_metrics: Json | null
          is_featured: boolean | null
          is_franchise_available: boolean | null
          is_temporary: boolean | null
          listing_title: string
          location: string
          location_type: string | null
          lot_size: string | null
          monthly_revenue: number | null
          neighborhood_features: Json | null
          number_of_units: number | null
          operating_hours: string | null
          parking_spaces: number | null
          profit_margin: string | null
          property_category: string | null
          property_features: Json | null
          property_style: string | null
          property_tax_info: Json | null
          property_type: string | null
          recurring_revenue_percentage: number | null
          scalability_rating: number | null
          square_footage: number | null
          status: string | null
          updated_at: string
          user_id: string | null
          verification_date: string | null
          verification_type: string | null
          verified_documents: Json | null
          views_count: number | null
          virtual_tour_url: string | null
          year_built: number | null
          yearly_revenue: number
          years_in_operation: string | null
          zoning_info: string | null
          zoning_type: string | null
        }
        Insert: {
          amenities?: Json | null
          api_verified_data?: Json | null
          asking_price: number
          assets?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_class?: string | null
          business_name: string
          business_type?: string | null
          competitor_analysis?: string | null
          construction_status?: string | null
          created_at?: string
          customer_type?: string | null
          debt_to_equity_ratio?: number | null
          deleted_at?: string | null
          deletion_reason?: string | null
          description: string
          document_verification_status?: string | null
          employee_count?: string | null
          energy_rating?: string | null
          established_date?: string | null
          featured_until?: string | null
          has_social_media?: boolean | null
          has_virtual_tour?: boolean | null
          has_website?: boolean | null
          id?: string
          image_url?: string | null
          image_urls?: string[] | null
          industry: string
          investment_metrics?: Json | null
          is_featured?: boolean | null
          is_franchise_available?: boolean | null
          is_temporary?: boolean | null
          listing_title?: string
          location: string
          location_type?: string | null
          lot_size?: string | null
          monthly_revenue?: number | null
          neighborhood_features?: Json | null
          number_of_units?: number | null
          operating_hours?: string | null
          parking_spaces?: number | null
          profit_margin?: string | null
          property_category?: string | null
          property_features?: Json | null
          property_style?: string | null
          property_tax_info?: Json | null
          property_type?: string | null
          recurring_revenue_percentage?: number | null
          scalability_rating?: number | null
          square_footage?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          verification_date?: string | null
          verification_type?: string | null
          verified_documents?: Json | null
          views_count?: number | null
          virtual_tour_url?: string | null
          year_built?: number | null
          yearly_revenue: number
          years_in_operation?: string | null
          zoning_info?: string | null
          zoning_type?: string | null
        }
        Update: {
          amenities?: Json | null
          api_verified_data?: Json | null
          asking_price?: number
          assets?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_class?: string | null
          business_name?: string
          business_type?: string | null
          competitor_analysis?: string | null
          construction_status?: string | null
          created_at?: string
          customer_type?: string | null
          debt_to_equity_ratio?: number | null
          deleted_at?: string | null
          deletion_reason?: string | null
          description?: string
          document_verification_status?: string | null
          employee_count?: string | null
          energy_rating?: string | null
          established_date?: string | null
          featured_until?: string | null
          has_social_media?: boolean | null
          has_virtual_tour?: boolean | null
          has_website?: boolean | null
          id?: string
          image_url?: string | null
          image_urls?: string[] | null
          industry?: string
          investment_metrics?: Json | null
          is_featured?: boolean | null
          is_franchise_available?: boolean | null
          is_temporary?: boolean | null
          listing_title?: string
          location?: string
          location_type?: string | null
          lot_size?: string | null
          monthly_revenue?: number | null
          neighborhood_features?: Json | null
          number_of_units?: number | null
          operating_hours?: string | null
          parking_spaces?: number | null
          profit_margin?: string | null
          property_category?: string | null
          property_features?: Json | null
          property_style?: string | null
          property_tax_info?: Json | null
          property_type?: string | null
          recurring_revenue_percentage?: number | null
          scalability_rating?: number | null
          square_footage?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          verification_date?: string | null
          verification_type?: string | null
          verified_documents?: Json | null
          views_count?: number | null
          virtual_tour_url?: string | null
          year_built?: number | null
          yearly_revenue?: number
          years_in_operation?: string | null
          zoning_info?: string | null
          zoning_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_valuations: {
        Row: {
          asset_valuation: Json | null
          business_id: string | null
          confidence_score: number | null
          created_at: string
          final_valuation: number | null
          id: string
          industry_multiplier: number | null
          market_comparison: Json | null
          revenue_analysis: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          asset_valuation?: Json | null
          business_id?: string | null
          confidence_score?: number | null
          created_at?: string
          final_valuation?: number | null
          id?: string
          industry_multiplier?: number | null
          market_comparison?: Json | null
          revenue_analysis?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          asset_valuation?: Json | null
          business_id?: string | null
          confidence_score?: number | null
          created_at?: string
          final_valuation?: number | null
          id?: string
          industry_multiplier?: number | null
          market_comparison?: Json | null
          revenue_analysis?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_valuations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_valuations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_valuations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      due_diligence_packages: {
        Row: {
          created_at: string
          description: string
          features: Json
          id: string
          is_active: boolean | null
          name: string
          package_type: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          features?: Json
          id?: string
          is_active?: boolean | null
          name: string
          package_type: string
          price?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          package_type?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      due_diligence_purchases: {
        Row: {
          created_at: string
          documents: Json | null
          id: string
          listing_id: string
          package_id: string
          payment_amount: number
          payment_status: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          documents?: Json | null
          id?: string
          listing_id: string
          package_id: string
          payment_amount: number
          payment_status?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          documents?: Json | null
          id?: string
          listing_id?: string
          package_id?: string
          payment_amount?: number
          payment_status?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "due_diligence_purchases_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "due_diligence_purchases_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "due_diligence_purchases_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "due_diligence_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_conditions: {
        Row: {
          condition_type: string
          created_at: string | null
          description: string
          id: string
          required_proof: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          condition_type: string
          created_at?: string | null
          description: string
          id?: string
          required_proof?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          condition_type?: string
          created_at?: string | null
          description?: string
          id?: string
          required_proof?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escrow_conditions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "escrow_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_conditions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_disputes: {
        Row: {
          created_at: string
          description: string
          dispute_type: string
          id: string
          raised_by: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          dispute_type: string
          id?: string
          raised_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          dispute_type?: string
          id?: string
          raised_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "escrow_disputes_raised_by_fkey"
            columns: ["raised_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_disputes_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_disputes_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "escrow_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_milestone_templates: {
        Row: {
          created_at: string
          default_amount_percentage: number | null
          description: string | null
          id: string
          name: string
          sequence_order: number
        }
        Insert: {
          created_at?: string
          default_amount_percentage?: number | null
          description?: string | null
          id?: string
          name: string
          sequence_order: number
        }
        Update: {
          created_at?: string
          default_amount_percentage?: number | null
          description?: string | null
          id?: string
          name?: string
          sequence_order?: number
        }
        Relationships: []
      }
      escrow_milestones: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          milestone_type: string
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          milestone_type: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          milestone_type?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escrow_milestones_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "escrow_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_providers: {
        Row: {
          commission_rate: number | null
          created_at: string
          credentials: Json | null
          id: string
          name: string
          provider_type: string
          status: Database["public"]["Enums"]["escrow_provider_status"] | null
          updated_at: string
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string
          credentials?: Json | null
          id?: string
          name: string
          provider_type: string
          status?: Database["public"]["Enums"]["escrow_provider_status"] | null
          updated_at?: string
        }
        Update: {
          commission_rate?: number | null
          created_at?: string
          credentials?: Json | null
          id?: string
          name?: string
          provider_type?: string
          status?: Database["public"]["Enums"]["escrow_provider_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      escrow_transactions: {
        Row: {
          amount: number
          approval_status: Json | null
          buyer_id: string
          commission_amount: number | null
          completed_at: string | null
          conditions_met: Json | null
          created_at: string
          dispute_details: Json | null
          id: string
          last_action_at: string | null
          listing_id: string
          next_action_deadline: string | null
          payment_details: Json | null
          provider_id: string | null
          release_conditions: string[] | null
          release_schedule: Json | null
          required_approvals: Json | null
          seller_id: string
          status: Database["public"]["Enums"]["escrow_status"] | null
          updated_at: string
          workflow_stage: string | null
        }
        Insert: {
          amount: number
          approval_status?: Json | null
          buyer_id: string
          commission_amount?: number | null
          completed_at?: string | null
          conditions_met?: Json | null
          created_at?: string
          dispute_details?: Json | null
          id?: string
          last_action_at?: string | null
          listing_id: string
          next_action_deadline?: string | null
          payment_details?: Json | null
          provider_id?: string | null
          release_conditions?: string[] | null
          release_schedule?: Json | null
          required_approvals?: Json | null
          seller_id: string
          status?: Database["public"]["Enums"]["escrow_status"] | null
          updated_at?: string
          workflow_stage?: string | null
        }
        Update: {
          amount?: number
          approval_status?: Json | null
          buyer_id?: string
          commission_amount?: number | null
          completed_at?: string | null
          conditions_met?: Json | null
          created_at?: string
          dispute_details?: Json | null
          id?: string
          last_action_at?: string | null
          listing_id?: string
          next_action_deadline?: string | null
          payment_details?: Json | null
          provider_id?: string | null
          release_conditions?: string[] | null
          release_schedule?: Json | null
          required_approvals?: Json | null
          seller_id?: string
          status?: Database["public"]["Enums"]["escrow_status"] | null
          updated_at?: string
          workflow_stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escrow_transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_transactions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "escrow_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      external_platform_connections: {
        Row: {
          created_at: string
          credentials: Json | null
          id: string
          last_sync_at: string | null
          platform_name: string
          status: string | null
          sync_status: Database["public"]["Enums"]["sync_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credentials?: Json | null
          id?: string
          last_sync_at?: string | null
          platform_name: string
          status?: string | null
          sync_status?: Database["public"]["Enums"]["sync_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credentials?: Json | null
          id?: string
          last_sync_at?: string | null
          platform_name?: string
          status?: string | null
          sync_status?: Database["public"]["Enums"]["sync_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financing_providers: {
        Row: {
          approval_criteria: Json | null
          created_at: string
          credentials: Json | null
          id: string
          interest_rate_range: unknown | null
          loan_term_range: unknown | null
          minimum_credit_score: number | null
          name: string
          processing_time_days: number | null
          provider_type: string
          required_documents: string[] | null
          status: string | null
          success_rate: number | null
          updated_at: string
        }
        Insert: {
          approval_criteria?: Json | null
          created_at?: string
          credentials?: Json | null
          id?: string
          interest_rate_range?: unknown | null
          loan_term_range?: unknown | null
          minimum_credit_score?: number | null
          name: string
          processing_time_days?: number | null
          provider_type: string
          required_documents?: string[] | null
          status?: string | null
          success_rate?: number | null
          updated_at?: string
        }
        Update: {
          approval_criteria?: Json | null
          created_at?: string
          credentials?: Json | null
          id?: string
          interest_rate_range?: unknown | null
          loan_term_range?: unknown | null
          minimum_credit_score?: number | null
          name?: string
          processing_time_days?: number | null
          provider_type?: string
          required_documents?: string[] | null
          status?: string | null
          success_rate?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      imported_listings: {
        Row: {
          connection_id: string
          created_at: string
          external_id: string
          id: string
          last_sync_at: string | null
          listing_data: Json
          platform_name: string
          sync_status: string | null
          updated_at: string
        }
        Insert: {
          connection_id: string
          created_at?: string
          external_id: string
          id?: string
          last_sync_at?: string | null
          listing_data: Json
          platform_name: string
          sync_status?: string | null
          updated_at?: string
        }
        Update: {
          connection_id?: string
          created_at?: string
          external_id?: string
          id?: string
          last_sync_at?: string | null
          listing_data?: Json
          platform_name?: string
          sync_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "imported_listings_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "external_platform_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_engagements: {
        Row: {
          client_id: string | null
          created_at: string | null
          end_date: string | null
          engagement_type: string
          id: string
          lawyer_id: string | null
          listing_id: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          engagement_type: string
          id?: string
          lawyer_id?: string | null
          listing_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          engagement_type?: string
          id?: string
          lawyer_id?: string | null
          listing_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_engagements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_engagements_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_engagements_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_engagements_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_profiles: {
        Row: {
          created_at: string | null
          id: string
          license_number: string
          specialties: string[] | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          license_number: string
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          license_number?: string
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_profiles_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_available: boolean | null
          lawyer_id: string | null
          price_range: unknown | null
          service_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          lawyer_id?: string | null
          price_range?: unknown | null
          service_type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          lawyer_id?: string | null
          price_range?: unknown | null
          service_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_services_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_templates: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      letters_of_intent: {
        Row: {
          buyer_id: string
          content: string
          created_at: string
          id: string
          listing_id: string
          payment_amount: number
          payment_status: string
          seller_id: string
          status: string
          updated_at: string
        }
        Insert: {
          buyer_id: string
          content: string
          created_at?: string
          id?: string
          listing_id: string
          payment_amount?: number
          payment_status?: string
          seller_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          content?: string
          created_at?: string
          id?: string
          listing_id?: string
          payment_amount?: number
          payment_status?: string
          seller_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "letters_of_intent_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letters_of_intent_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letters_of_intent_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letters_of_intent_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          application_data: Json | null
          created_at: string | null
          credit_score: number | null
          documents: Json | null
          id: string
          listing_id: string | null
          loan_amount: number
          loan_term: number
          provider_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          application_data?: Json | null
          created_at?: string | null
          credit_score?: number | null
          documents?: Json | null
          id?: string
          listing_id?: string | null
          loan_amount: number
          loan_term: number
          provider_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          application_data?: Json | null
          created_at?: string | null
          credit_score?: number | null
          documents?: Json | null
          id?: string
          listing_id?: string | null
          loan_amount?: number
          loan_term?: number
          provider_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loan_applications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loan_applications_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "financing_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loan_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          is_priority: boolean | null
          listing_id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_priority?: boolean | null
          listing_id: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_priority?: boolean | null
          listing_id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mortgage_calculations: {
        Row: {
          created_at: string
          down_payment: number
          id: string
          interest_rate: number
          listing_id: string | null
          loan_amount: number
          loan_term: number
          monthly_payment: number
          total_interest: number
          total_payment: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          down_payment: number
          id?: string
          interest_rate: number
          listing_id?: string | null
          loan_amount: number
          loan_term: number
          monthly_payment: number
          total_interest: number
          total_payment: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          down_payment?: number
          id?: string
          interest_rate?: number
          listing_id?: string | null
          loan_amount?: number
          loan_term?: number
          monthly_payment?: number
          total_interest?: number
          total_payment?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mortgage_calculations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mortgage_calculations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mortgage_calculations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          card_brand: string
          created_at: string
          expiry_month: string
          expiry_year: string
          id: string
          is_default: boolean | null
          last_four: string
          status: Database["public"]["Enums"]["payment_method_status"] | null
          stripe_payment_method_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          card_brand: string
          created_at?: string
          expiry_month: string
          expiry_year: string
          id?: string
          is_default?: boolean | null
          last_four: string
          status?: Database["public"]["Enums"]["payment_method_status"] | null
          stripe_payment_method_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          card_brand?: string
          created_at?: string
          expiry_month?: string
          expiry_year?: string
          id?: string
          is_default?: boolean | null
          last_four?: string
          status?: Database["public"]["Enums"]["payment_method_status"] | null
          stripe_payment_method_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_plans: {
        Row: {
          buyer_id: string | null
          created_at: string
          down_payment: number
          id: string
          installment_amount: number
          listing_id: string | null
          number_of_installments: number
          payment_frequency: string
          seller_id: string | null
          start_date: string
          status: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string
          down_payment: number
          id?: string
          installment_amount: number
          listing_id?: string | null
          number_of_installments: number
          payment_frequency: string
          seller_id?: string | null
          start_date: string
          status?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string | null
          created_at?: string
          down_payment?: number
          id?: string
          installment_amount?: number
          listing_id?: string | null
          number_of_installments?: number
          payment_frequency?: string
          seller_id?: string | null
          start_date?: string
          status?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_plans_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_plans_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_plans_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_plans_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plaid_connections: {
        Row: {
          access_token: string
          created_at: string
          id: string
          institution_name: string | null
          item_id: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          id?: string
          institution_name?: string | null
          item_id: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          id?: string
          institution_name?: string | null
          item_id?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          created_at: string
          id: string
          setting_name: string
          setting_value: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_name: string
          setting_value: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_name?: string
          setting_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      post_acquisition_metrics: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          measurement_date: string | null
          metric_name: string
          metric_value: number | null
          target_value: number | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          measurement_date?: string | null
          metric_name: string
          metric_value?: number | null
          target_value?: number | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          measurement_date?: string | null
          metric_name?: string
          metric_value?: number | null
          target_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_acquisition_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_acquisition_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      post_acquisition_milestones: {
        Row: {
          business_id: string | null
          completion_date: string | null
          created_at: string | null
          id: string
          status: string
          target_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_acquisition_milestones_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_acquisition_milestones_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      post_acquisition_tasks: {
        Row: {
          assigned_to: string | null
          business_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          business_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          business_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_acquisition_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_acquisition_tasks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_acquisition_tasks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_acquisition_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_business_services: {
        Row: {
          created_at: string | null
          description: string | null
          duration_days: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          service_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          service_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          service_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      premium_content: {
        Row: {
          content: string
          content_type: string
          created_at: string
          id: string
          price: number
          status: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          id?: string
          price?: number
          status?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          id?: string
          price?: number
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      premium_content_purchases: {
        Row: {
          content_id: string | null
          id: string
          payment_amount: number
          payment_status: string | null
          purchase_date: string
          user_id: string | null
        }
        Insert: {
          content_id?: string | null
          id?: string
          payment_amount: number
          payment_status?: string | null
          purchase_date?: string
          user_id?: string | null
        }
        Update: {
          content_id?: string | null
          id?: string
          payment_amount?: number
          payment_status?: string | null
          purchase_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "premium_content_purchases_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "premium_content"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_feature_usage: {
        Row: {
          created_at: string
          expires_at: string | null
          feature_type: Database["public"]["Enums"]["premium_feature_type"]
          id: string
          payment_amount: number
          payment_id: string | null
          payment_status: string
          started_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          feature_type: Database["public"]["Enums"]["premium_feature_type"]
          id?: string
          payment_amount: number
          payment_id?: string | null
          payment_status?: string
          started_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          feature_type?: Database["public"]["Enums"]["premium_feature_type"]
          id?: string
          payment_amount?: number
          payment_id?: string | null
          payment_status?: string
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      premium_service_subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          payment_id: string | null
          payment_status: string
          service_id: string
          started_at: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          payment_id?: string | null
          payment_status?: string
          service_id: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          payment_id?: string | null
          payment_status?: string
          service_id?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_service_subscriptions_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "premium_business_services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          is_verified: boolean | null
          linkedin_profile_url: string | null
          phone: string | null
          professional_title: string | null
          role: string | null
          social_id: string | null
          social_provider: string | null
          state: string | null
          verification_date: string | null
          verification_payment_id: string | null
          yelp_business_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          is_verified?: boolean | null
          linkedin_profile_url?: string | null
          phone?: string | null
          professional_title?: string | null
          role?: string | null
          social_id?: string | null
          social_provider?: string | null
          state?: string | null
          verification_date?: string | null
          verification_payment_id?: string | null
          yelp_business_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_verified?: boolean | null
          linkedin_profile_url?: string | null
          phone?: string | null
          professional_title?: string | null
          role?: string | null
          social_id?: string | null
          social_provider?: string | null
          state?: string | null
          verification_date?: string | null
          verification_payment_id?: string | null
          yelp_business_id?: string | null
        }
        Relationships: []
      }
      property_analytics: {
        Row: {
          created_at: string | null
          favorite_count: number | null
          id: string
          inquiries_count: number | null
          last_viewed_at: string | null
          listing_id: string | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          created_at?: string | null
          favorite_count?: number | null
          id?: string
          inquiries_count?: number | null
          last_viewed_at?: string | null
          listing_id?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          created_at?: string | null
          favorite_count?: number | null
          id?: string
          inquiries_count?: number | null
          last_viewed_at?: string | null
          listing_id?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_analytics_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_analytics_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      property_categories: {
        Row: {
          attributes: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          attributes?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          attributes?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "property_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      property_classifications: {
        Row: {
          attributes: Json | null
          category_id: string | null
          created_at: string
          id: string
          listing_id: string | null
          updated_at: string
        }
        Insert: {
          attributes?: Json | null
          category_id?: string | null
          created_at?: string
          id?: string
          listing_id?: string | null
          updated_at?: string
        }
        Update: {
          attributes?: Json | null
          category_id?: string | null
          created_at?: string
          id?: string
          listing_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_classifications_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "property_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_classifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_classifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      property_documents: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          document_type: string
          document_url: string
          id: string
          listing_id: string | null
          updated_at: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          document_type: string
          document_url: string
          id?: string
          listing_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          listing_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_documents_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_documents_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action_type: string
          attempt_count: number | null
          id: string
          last_attempt: string
          reset_at: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          attempt_count?: number | null
          id?: string
          last_attempt?: string
          reset_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          attempt_count?: number | null
          id?: string
          last_attempt?: string
          reset_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      show_more_info_purchases: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          payment_amount: number
          payment_status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          payment_amount?: number
          payment_status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          payment_amount?: number
          payment_status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "show_more_info_purchases_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "show_more_info_purchases_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      support_requests: {
        Row: {
          created_at: string | null
          id: string
          service_id: string
          status: Database["public"]["Enums"]["support_request_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_id: string
          status?: Database["public"]["Enums"]["support_request_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          service_id?: string
          status?: Database["public"]["Enums"]["support_request_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      template_purchases: {
        Row: {
          created_at: string
          id: string
          payment_amount: number
          payment_status: string
          template_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_amount: number
          payment_status?: string
          template_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_amount?: number
          payment_status?: string
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_purchases_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "legal_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          listing_id: string | null
          rated_user_id: string | null
          rater_id: string | null
          rating: number | null
          status: string | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          rated_user_id?: string | null
          rater_id?: string | null
          rating?: number | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          rated_user_id?: string | null
          rater_id?: string | null
          rating?: number | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_ratings_rated_user_id_fkey"
            columns: ["rated_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_ratings_rater_id_fkey"
            columns: ["rater_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_ratings_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      two_factor_auth: {
        Row: {
          backup_codes: string[] | null
          created_at: string
          id: string
          is_enabled: boolean | null
          secret_key: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          secret_key?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          secret_key?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_behavior_logs: {
        Row: {
          created_at: string
          duration: number | null
          event_type: string
          id: string
          interaction_details: Json | null
          page_path: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          event_type: string
          id?: string
          interaction_details?: Json | null
          page_path: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          event_type?: string
          id?: string
          interaction_details?: Json | null
          page_path?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_business_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_segments: {
        Row: {
          id: string
          last_updated: string
          segment_data: Json | null
          segment_type: string
          user_id: string | null
        }
        Insert: {
          id?: string
          last_updated?: string
          segment_data?: Json | null
          segment_type: string
          user_id?: string | null
        }
        Update: {
          id?: string
          last_updated?: string
          segment_data?: Json | null
          segment_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_business_listings: {
        Row: {
          amenities: Json | null
          api_verified_data: Json | null
          asking_price: number | null
          assets: string | null
          bathrooms: number | null
          bedrooms: number | null
          building_class: string | null
          business_name: string | null
          business_type: string | null
          competitor_analysis: string | null
          construction_status: string | null
          created_at: string | null
          customer_type: string | null
          debt_to_equity_ratio: number | null
          deleted_at: string | null
          deletion_reason: string | null
          description: string | null
          document_verification_status: string | null
          employee_count: string | null
          energy_rating: string | null
          established_date: string | null
          featured_until: string | null
          has_social_media: boolean | null
          has_virtual_tour: boolean | null
          has_website: boolean | null
          id: string | null
          image_url: string | null
          image_urls: string[] | null
          industry: string | null
          investment_metrics: Json | null
          is_featured: boolean | null
          is_franchise_available: boolean | null
          is_temporary: boolean | null
          listing_title: string | null
          location: string | null
          location_type: string | null
          lot_size: string | null
          monthly_revenue: number | null
          neighborhood_features: Json | null
          number_of_units: number | null
          operating_hours: string | null
          parking_spaces: number | null
          profit_margin: string | null
          property_category: string | null
          property_features: Json | null
          property_style: string | null
          property_tax_info: Json | null
          property_type: string | null
          recurring_revenue_percentage: number | null
          scalability_rating: number | null
          square_footage: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          verification_date: string | null
          verification_type: string | null
          verified_documents: Json | null
          views_count: number | null
          virtual_tour_url: string | null
          year_built: number | null
          yearly_revenue: number | null
          years_in_operation: string | null
          zoning_info: string | null
          zoning_type: string | null
        }
        Insert: {
          amenities?: Json | null
          api_verified_data?: Json | null
          asking_price?: number | null
          assets?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_class?: string | null
          business_name?: string | null
          business_type?: string | null
          competitor_analysis?: string | null
          construction_status?: string | null
          created_at?: string | null
          customer_type?: string | null
          debt_to_equity_ratio?: number | null
          deleted_at?: string | null
          deletion_reason?: string | null
          description?: string | null
          document_verification_status?: string | null
          employee_count?: string | null
          energy_rating?: string | null
          established_date?: string | null
          featured_until?: string | null
          has_social_media?: boolean | null
          has_virtual_tour?: boolean | null
          has_website?: boolean | null
          id?: string | null
          image_url?: string | null
          image_urls?: string[] | null
          industry?: string | null
          investment_metrics?: Json | null
          is_featured?: boolean | null
          is_franchise_available?: boolean | null
          is_temporary?: boolean | null
          listing_title?: string | null
          location?: string | null
          location_type?: string | null
          lot_size?: string | null
          monthly_revenue?: number | null
          neighborhood_features?: Json | null
          number_of_units?: number | null
          operating_hours?: string | null
          parking_spaces?: number | null
          profit_margin?: string | null
          property_category?: string | null
          property_features?: Json | null
          property_style?: string | null
          property_tax_info?: Json | null
          property_type?: string | null
          recurring_revenue_percentage?: number | null
          scalability_rating?: number | null
          square_footage?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_date?: string | null
          verification_type?: string | null
          verified_documents?: Json | null
          views_count?: number | null
          virtual_tour_url?: string | null
          year_built?: number | null
          yearly_revenue?: number | null
          years_in_operation?: string | null
          zoning_info?: string | null
          zoning_type?: string | null
        }
        Update: {
          amenities?: Json | null
          api_verified_data?: Json | null
          asking_price?: number | null
          assets?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_class?: string | null
          business_name?: string | null
          business_type?: string | null
          competitor_analysis?: string | null
          construction_status?: string | null
          created_at?: string | null
          customer_type?: string | null
          debt_to_equity_ratio?: number | null
          deleted_at?: string | null
          deletion_reason?: string | null
          description?: string | null
          document_verification_status?: string | null
          employee_count?: string | null
          energy_rating?: string | null
          established_date?: string | null
          featured_until?: string | null
          has_social_media?: boolean | null
          has_virtual_tour?: boolean | null
          has_website?: boolean | null
          id?: string | null
          image_url?: string | null
          image_urls?: string[] | null
          industry?: string | null
          investment_metrics?: Json | null
          is_featured?: boolean | null
          is_franchise_available?: boolean | null
          is_temporary?: boolean | null
          listing_title?: string | null
          location?: string | null
          location_type?: string | null
          lot_size?: string | null
          monthly_revenue?: number | null
          neighborhood_features?: Json | null
          number_of_units?: number | null
          operating_hours?: string | null
          parking_spaces?: number | null
          profit_margin?: string | null
          property_category?: string | null
          property_features?: Json | null
          property_style?: string | null
          property_tax_info?: Json | null
          property_type?: string | null
          recurring_revenue_percentage?: number | null
          scalability_rating?: number | null
          square_footage?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_date?: string | null
          verification_type?: string | null
          verified_documents?: Json | null
          views_count?: number | null
          virtual_tour_url?: string | null
          year_built?: number | null
          yearly_revenue?: number | null
          years_in_operation?: string | null
          zoning_info?: string | null
          zoning_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      cleanup_expired_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_listing_popularity: {
        Args: {
          views: number
        }
        Returns: string
      }
      has_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_feature_active: {
        Args: {
          p_user_id: string
          p_feature_type: Database["public"]["Enums"]["premium_feature_type"]
        }
        Returns: boolean
      }
    }
    Enums: {
      ad_status: "pending" | "approved" | "rejected"
      app_role: "owner" | "admin" | "staff"
      escrow_provider_status: "active" | "inactive" | "suspended"
      escrow_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "disputed"
      payment_method_status: "active" | "expired" | "invalid"
      premium_feature_type:
        | "dynamic_filters"
        | "priority_message"
        | "loi_submission"
        | "verification"
        | "premium_content"
      premium_listing_type: "featured" | "priority"
      support_request_status: "pending" | "approved" | "rejected" | "completed"
      sync_status: "pending" | "in_progress" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
