export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_action_events: {
        Row: {
          action_data: Json
          action_type: string
          ai_reasoning: string | null
          code_after: string | null
          code_before: string | null
          created_at: string | null
          file_path: string | null
          id: string
          timestamp_ms: number
          tutorial_id: string | null
        }
        Insert: {
          action_data: Json
          action_type: string
          ai_reasoning?: string | null
          code_after?: string | null
          code_before?: string | null
          created_at?: string | null
          file_path?: string | null
          id?: string
          timestamp_ms: number
          tutorial_id?: string | null
        }
        Update: {
          action_data?: Json
          action_type?: string
          ai_reasoning?: string | null
          code_after?: string | null
          code_before?: string | null
          created_at?: string | null
          file_path?: string | null
          id?: string
          timestamp_ms?: number
          tutorial_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_action_events_tutorial_id_fkey"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "ai_tutorials"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          conversation_context: Json | null
          conversation_title: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          project_id: string | null
          total_messages: number | null
          total_tokens_used: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          conversation_context?: Json | null
          conversation_title?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          project_id?: string | null
          total_messages?: number | null
          total_tokens_used?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          conversation_context?: Json | null
          conversation_title?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          project_id?: string | null
          total_messages?: number | null
          total_tokens_used?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_messages: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          id: string
          message_content: string
          message_metadata: Json | null
          message_type: string
          model_used: string | null
          processing_time_ms: number | null
          tokens_used: number | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          message_content: string
          message_metadata?: Json | null
          message_type: string
          model_used?: string | null
          processing_time_ms?: number | null
          tokens_used?: number | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          message_content?: string
          message_metadata?: Json | null
          message_type?: string
          model_used?: string | null
          processing_time_ms?: number | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_suggestions: {
        Row: {
          applied_at: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          is_applied: boolean | null
          is_dismissed: boolean | null
          project_id: string | null
          suggestion_data: Json
          suggestion_description: string | null
          suggestion_title: string
          suggestion_type: string
          user_id: string | null
        }
        Insert: {
          applied_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          is_applied?: boolean | null
          is_dismissed?: boolean | null
          project_id?: string | null
          suggestion_data?: Json
          suggestion_description?: string | null
          suggestion_title: string
          suggestion_type: string
          user_id?: string | null
        }
        Update: {
          applied_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          is_applied?: boolean | null
          is_dismissed?: boolean | null
          project_id?: string | null
          suggestion_data?: Json
          suggestion_description?: string | null
          suggestion_title?: string
          suggestion_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tutorial_steps: {
        Row: {
          ai_intention: string | null
          code_changes: string[] | null
          created_at: string | null
          description: string
          end_event_id: string | null
          id: string
          start_event_id: string | null
          step_number: number
          title: string
          tutorial_id: string | null
        }
        Insert: {
          ai_intention?: string | null
          code_changes?: string[] | null
          created_at?: string | null
          description: string
          end_event_id?: string | null
          id?: string
          start_event_id?: string | null
          step_number: number
          title: string
          tutorial_id?: string | null
        }
        Update: {
          ai_intention?: string | null
          code_changes?: string[] | null
          created_at?: string | null
          description?: string
          end_event_id?: string | null
          id?: string
          start_event_id?: string | null
          step_number?: number
          title?: string
          tutorial_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tutorial_steps_end_event_id_fkey"
            columns: ["end_event_id"]
            isOneToOne: false
            referencedRelation: "ai_action_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_tutorial_steps_start_event_id_fkey"
            columns: ["start_event_id"]
            isOneToOne: false
            referencedRelation: "ai_action_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_tutorial_steps_tutorial_id_fkey"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "ai_tutorials"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tutorials: {
        Row: {
          ai_model_used: string | null
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          id: string
          project_id: string | null
          status: string | null
          title: string
          total_actions: number | null
          updated_at: string | null
        }
        Insert: {
          ai_model_used?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          project_id?: string | null
          status?: string | null
          title: string
          total_actions?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_model_used?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          project_id?: string | null
          status?: string | null
          title?: string
          total_actions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tutorials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      app_builds: {
        Row: {
          build_artifacts: Json | null
          build_config: Json | null
          build_duration_seconds: number | null
          build_log: string | null
          build_number: number
          build_status: string | null
          build_url: string | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          platform: string
          started_at: string | null
          updated_at: string | null
          version_id: string | null
        }
        Insert: {
          build_artifacts?: Json | null
          build_config?: Json | null
          build_duration_seconds?: number | null
          build_log?: string | null
          build_number: number
          build_status?: string | null
          build_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          platform: string
          started_at?: string | null
          updated_at?: string | null
          version_id?: string | null
        }
        Update: {
          build_artifacts?: Json | null
          build_config?: Json | null
          build_duration_seconds?: number | null
          build_log?: string | null
          build_number?: number
          build_status?: string | null
          build_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          platform?: string
          started_at?: string | null
          updated_at?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_builds_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "app_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      app_categories: {
        Row: {
          color_primary: string | null
          color_secondary: string | null
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color_primary?: string | null
          color_secondary?: string | null
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color_primary?: string | null
          color_secondary?: string | null
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "app_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      app_downloads: {
        Row: {
          app_id: string | null
          country_code: string | null
          created_at: string | null
          download_source: string | null
          id: string
          ip_address: unknown | null
          platform: string
          referrer_url: string | null
          user_agent: string | null
          user_id: string | null
          version_id: string | null
        }
        Insert: {
          app_id?: string | null
          country_code?: string | null
          created_at?: string | null
          download_source?: string | null
          id?: string
          ip_address?: unknown | null
          platform: string
          referrer_url?: string | null
          user_agent?: string | null
          user_id?: string | null
          version_id?: string | null
        }
        Update: {
          app_id?: string | null
          country_code?: string | null
          created_at?: string | null
          download_source?: string | null
          id?: string
          ip_address?: unknown | null
          platform?: string
          referrer_url?: string | null
          user_agent?: string | null
          user_id?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_downloads_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_downloads_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "app_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      app_ratings: {
        Row: {
          app_id: string | null
          created_at: string | null
          id: string
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          app_id?: string | null
          created_at?: string | null
          id?: string
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          app_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_ratings_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
        ]
      }
      app_reviews: {
        Row: {
          app_id: string | null
          content: string | null
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_helpful_count: number | null
          is_spam: boolean | null
          is_verified_purchase: boolean | null
          moderation_notes: string | null
          rating: number
          title: string | null
          updated_at: string | null
          user_id: string | null
          version_id: string | null
        }
        Insert: {
          app_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_helpful_count?: number | null
          is_spam?: boolean | null
          is_verified_purchase?: boolean | null
          moderation_notes?: string | null
          rating: number
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          version_id?: string | null
        }
        Update: {
          app_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_helpful_count?: number | null
          is_spam?: boolean | null
          is_verified_purchase?: boolean | null
          moderation_notes?: string | null
          rating?: number
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_reviews_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_reviews_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "app_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      app_versions: {
        Row: {
          app_id: string | null
          build_hash: string | null
          build_url: string | null
          changelog: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          features: string[] | null
          id: string
          is_active: boolean | null
          is_beta: boolean | null
          min_sdk_version: number | null
          permissions: string[] | null
          published_at: string | null
          release_notes: string | null
          size_bytes: number | null
          target_sdk_version: number | null
          updated_at: string | null
          version_code: number
          version_name: string
        }
        Insert: {
          app_id?: string | null
          build_hash?: string | null
          build_url?: string | null
          changelog?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_beta?: boolean | null
          min_sdk_version?: number | null
          permissions?: string[] | null
          published_at?: string | null
          release_notes?: string | null
          size_bytes?: number | null
          target_sdk_version?: number | null
          updated_at?: string | null
          version_code: number
          version_name: string
        }
        Update: {
          app_id?: string | null
          build_hash?: string | null
          build_url?: string | null
          changelog?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_beta?: boolean | null
          min_sdk_version?: number | null
          permissions?: string[] | null
          published_at?: string | null
          release_notes?: string | null
          size_bytes?: number | null
          target_sdk_version?: number | null
          updated_at?: string | null
          version_code?: number
          version_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_versions_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
        ]
      }
      apps: {
        Row: {
          banner_url: string | null
          category_id: string | null
          changelog: string | null
          content_rating: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          developer_id: string | null
          download_count: number | null
          featured_at: string | null
          icon_url: string | null
          id: string
          install_count: number | null
          is_featured: boolean | null
          is_free: boolean | null
          is_published: boolean | null
          keywords: string[] | null
          min_age_rating: number | null
          name: string
          price_cents: number | null
          privacy_policy_url: string | null
          published_at: string | null
          rating_average: number | null
          rating_count: number | null
          release_notes: string | null
          screenshots: string[] | null
          short_description: string | null
          size_bytes: number | null
          slug: string
          support_url: string | null
          tags: string[] | null
          terms_url: string | null
          updated_at: string | null
          video_url: string | null
          website_url: string | null
        }
        Insert: {
          banner_url?: string | null
          category_id?: string | null
          changelog?: string | null
          content_rating?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          developer_id?: string | null
          download_count?: number | null
          featured_at?: string | null
          icon_url?: string | null
          id?: string
          install_count?: number | null
          is_featured?: boolean | null
          is_free?: boolean | null
          is_published?: boolean | null
          keywords?: string[] | null
          min_age_rating?: number | null
          name: string
          price_cents?: number | null
          privacy_policy_url?: string | null
          published_at?: string | null
          rating_average?: number | null
          rating_count?: number | null
          release_notes?: string | null
          screenshots?: string[] | null
          short_description?: string | null
          size_bytes?: number | null
          slug: string
          support_url?: string | null
          tags?: string[] | null
          terms_url?: string | null
          updated_at?: string | null
          video_url?: string | null
          website_url?: string | null
        }
        Update: {
          banner_url?: string | null
          category_id?: string | null
          changelog?: string | null
          content_rating?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          developer_id?: string | null
          download_count?: number | null
          featured_at?: string | null
          icon_url?: string | null
          id?: string
          install_count?: number | null
          is_featured?: boolean | null
          is_free?: boolean | null
          is_published?: boolean | null
          keywords?: string[] | null
          min_age_rating?: number | null
          name?: string
          price_cents?: number | null
          privacy_policy_url?: string | null
          published_at?: string | null
          rating_average?: number | null
          rating_count?: number | null
          release_notes?: string | null
          screenshots?: string[] | null
          short_description?: string | null
          size_bytes?: number | null
          slug?: string
          support_url?: string | null
          tags?: string[] | null
          terms_url?: string | null
          updated_at?: string | null
          video_url?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "app_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          source: string | null
          status: string | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          source?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          source?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      cydjerr_levels: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          jerrcoin_allocation: number
          level_number: number
          name: string
          required_events: number
          required_interactions: number
          required_publications: number
          required_purchases: number
          required_universes: number
          required_validated_referrals: number
          requires_dao_mission: boolean | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          jerrcoin_allocation?: number
          level_number: number
          name: string
          required_events?: number
          required_interactions?: number
          required_publications?: number
          required_purchases?: number
          required_universes?: number
          required_validated_referrals?: number
          requires_dao_mission?: boolean | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          jerrcoin_allocation?: number
          level_number?: number
          name?: string
          required_events?: number
          required_interactions?: number
          required_publications?: number
          required_purchases?: number
          required_universes?: number
          required_validated_referrals?: number
          requires_dao_mission?: boolean | null
        }
        Relationships: []
      }
      domain_listings: {
        Row: {
          created_at: string | null
          domain_name: string | null
          expires_at: string | null
          id: string
          listing_type: string | null
          price_jerr: number
          seller_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain_name?: string | null
          expires_at?: string | null
          id?: string
          listing_type?: string | null
          price_jerr: number
          seller_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain_name?: string | null
          expires_at?: string | null
          id?: string
          listing_type?: string | null
          price_jerr?: number
          seller_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_listings_domain_name_fkey"
            columns: ["domain_name"]
            isOneToOne: false
            referencedRelation: "domains_owned"
            referencedColumns: ["name"]
          },
        ]
      }
      domain_records: {
        Row: {
          created_at: string | null
          domain_name: string | null
          id: string
          record_type: string
          record_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain_name?: string | null
          id?: string
          record_type: string
          record_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain_name?: string | null
          id?: string
          record_type?: string
          record_value?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_records_domain_name_fkey"
            columns: ["domain_name"]
            isOneToOne: false
            referencedRelation: "domains_owned"
            referencedColumns: ["name"]
          },
        ]
      }
      domain_transactions: {
        Row: {
          amount_eur: number | null
          amount_jerr: number | null
          created_at: string | null
          domain_name: string
          from_user_id: string | null
          id: string
          status: string | null
          to_user_id: string | null
          transaction_type: string
          tx_hash: string | null
        }
        Insert: {
          amount_eur?: number | null
          amount_jerr?: number | null
          created_at?: string | null
          domain_name: string
          from_user_id?: string | null
          id?: string
          status?: string | null
          to_user_id?: string | null
          transaction_type: string
          tx_hash?: string | null
        }
        Update: {
          amount_eur?: number | null
          amount_jerr?: number | null
          created_at?: string | null
          domain_name?: string
          from_user_id?: string | null
          id?: string
          status?: string | null
          to_user_id?: string | null
          transaction_type?: string
          tx_hash?: string | null
        }
        Relationships: []
      }
      domains_owned: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          json_uri: string | null
          name: string
          nft_mint: string | null
          owner_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          json_uri?: string | null
          name: string
          nft_mint?: string | null
          owner_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          json_uri?: string | null
          name?: string
          nft_mint?: string | null
          owner_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      domains_preorder: {
        Row: {
          created_at: string | null
          name: string
          paid_eur: number | null
          paid_jerr: number | null
          status: string | null
          tx_hash: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          name: string
          paid_eur?: number | null
          paid_jerr?: number | null
          status?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          name?: string
          paid_eur?: number | null
          paid_jerr?: number | null
          status?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      exchange_orders: {
        Row: {
          amount: number
          created_at: string | null
          expires_at: string | null
          fee_amount: number | null
          filled_amount: number | null
          id: string
          order_status: string
          order_type: string
          price: number
          trading_pair_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          expires_at?: string | null
          fee_amount?: number | null
          filled_amount?: number | null
          id?: string
          order_status?: string
          order_type: string
          price: number
          trading_pair_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          expires_at?: string | null
          fee_amount?: number | null
          filled_amount?: number | null
          id?: string
          order_status?: string
          order_type?: string
          price?: number
          trading_pair_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exchange_orders_trading_pair_id_fkey"
            columns: ["trading_pair_id"]
            isOneToOne: false
            referencedRelation: "trading_pairs"
            referencedColumns: ["id"]
          },
        ]
      }
      immo_assets: {
        Row: {
          address: string
          bathrooms: number | null
          bedrooms: number | null
          category_extra: Json | null
          category_id: string | null
          city: string
          construction_year: number | null
          country: string | null
          created_at: string | null
          description: string | null
          dividend_yield: number | null
          documents: string[] | null
          energy_rating: string | null
          id: string
          is_published: boolean | null
          is_tokenized: boolean | null
          latitude: number | null
          longitude: number | null
          owner_id: string | null
          photos: string[] | null
          postal_code: string | null
          price_total: number
          rental_income: number | null
          rooms: number | null
          status: string | null
          surface_m2: number | null
          title: string
          token_price: number | null
          token_supply: number | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          address: string
          bathrooms?: number | null
          bedrooms?: number | null
          category_extra?: Json | null
          category_id?: string | null
          city: string
          construction_year?: number | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          dividend_yield?: number | null
          documents?: string[] | null
          energy_rating?: string | null
          id?: string
          is_published?: boolean | null
          is_tokenized?: boolean | null
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          photos?: string[] | null
          postal_code?: string | null
          price_total: number
          rental_income?: number | null
          rooms?: number | null
          status?: string | null
          surface_m2?: number | null
          title: string
          token_price?: number | null
          token_supply?: number | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          address?: string
          bathrooms?: number | null
          bedrooms?: number | null
          category_extra?: Json | null
          category_id?: string | null
          city?: string
          construction_year?: number | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          dividend_yield?: number | null
          documents?: string[] | null
          energy_rating?: string | null
          id?: string
          is_published?: boolean | null
          is_tokenized?: boolean | null
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          photos?: string[] | null
          postal_code?: string | null
          price_total?: number
          rental_income?: number | null
          rooms?: number | null
          status?: string | null
          surface_m2?: number | null
          title?: string
          token_price?: number | null
          token_supply?: number | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "immo_assets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "immo_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      immo_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon: string
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      immo_watchlist: {
        Row: {
          asset_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "immo_watchlist_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "immo_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      jerrcoin_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          processed_at: string | null
          source_transaction_id: string | null
          status: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          source_transaction_id?: string | null
          status?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          source_transaction_id?: string | null
          status?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          interview_date: string | null
          notes: string | null
          offer_id: string | null
          recruiter_notes: string | null
          resume_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          interview_date?: string | null
          notes?: string | null
          offer_id?: string | null
          recruiter_notes?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          interview_date?: string | null
          notes?: string | null
          offer_id?: string | null
          recruiter_notes?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "job_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      job_companies: {
        Row: {
          admin_id: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          followers_count: number | null
          founded_year: number | null
          id: string
          industry: string | null
          is_verified: boolean | null
          location: string | null
          logo_url: string | null
          name: string
          size_range: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          admin_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          followers_count?: number | null
          founded_year?: number | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name: string
          size_range?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          admin_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          followers_count?: number | null
          founded_year?: number | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string
          size_range?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_companies_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_connections: {
        Row: {
          addressee_id: string | null
          created_at: string | null
          id: string
          message: string | null
          requester_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          addressee_id?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          requester_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          addressee_id?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          requester_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_connections_addressee_id_fkey"
            columns: ["addressee_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_educations: {
        Row: {
          created_at: string | null
          degree: string
          description: string | null
          end_date: string | null
          field_of_study: string | null
          id: string
          profile_id: string | null
          school_name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          degree: string
          description?: string | null
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          profile_id?: string | null
          school_name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          degree?: string
          description?: string | null
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          profile_id?: string | null
          school_name?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_educations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_experiences: {
        Row: {
          company_name: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          location: string | null
          position: string
          profile_id: string | null
          start_date: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          position: string
          profile_id?: string | null
          start_date: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          position?: string
          profile_id?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_experiences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          message_type: string | null
          recipient_id: string | null
          sender_id: string | null
          thread_id: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          thread_id: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_notifications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          related_id: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_offers: {
        Row: {
          applications_count: number | null
          benefits: string[] | null
          company_id: string | null
          created_at: string | null
          description: string
          employment_type: string | null
          experience_level: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          location: string | null
          recruiter_id: string | null
          requirements: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          skills_required: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
          work_mode: string | null
        }
        Insert: {
          applications_count?: number | null
          benefits?: string[] | null
          company_id?: string | null
          created_at?: string | null
          description: string
          employment_type?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          recruiter_id?: string | null
          requirements?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
          work_mode?: string | null
        }
        Update: {
          applications_count?: number | null
          benefits?: string[] | null
          company_id?: string | null
          created_at?: string | null
          description?: string
          employment_type?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          recruiter_id?: string | null
          requirements?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
          work_mode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_offers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "job_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offers_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_post_comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          post_id: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_post_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_post_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "job_post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_post_reactions: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          reaction_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_post_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_posts: {
        Row: {
          author_id: string | null
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          media_urls: string[] | null
          post_type: string | null
          shares_count: number | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          author_id?: string | null
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          media_urls?: string[] | null
          post_type?: string | null
          shares_count?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          author_id?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          media_urls?: string[] | null
          post_type?: string | null
          shares_count?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "job_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_profiles: {
        Row: {
          avatar_url: string | null
          cover_image_url: string | null
          created_at: string | null
          experience_years: number | null
          id: string
          industry: string | null
          is_open_to_work: boolean | null
          is_recruiter: boolean | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          skills: string[] | null
          summary: string | null
          title: string | null
          updated_at: string | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          industry?: string | null
          is_open_to_work?: boolean | null
          is_recruiter?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          industry?: string | null
          is_open_to_work?: boolean | null
          is_recruiter?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      knowledge_base: {
        Row: {
          category: string | null
          content: string
          content_type: string
          created_at: string | null
          embedding: string | null
          id: string
          is_public: boolean | null
          language: string | null
          metadata: Json | null
          tags: string[] | null
          title: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          content: string
          content_type: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          is_public?: boolean | null
          language?: string | null
          metadata?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          content_type?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          is_public?: boolean | null
          language?: string | null
          metadata?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          document_type: string
          file_name: string | null
          file_size: number | null
          file_url: string
          id: string
          kyc_verification_id: string | null
          mime_type: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          uploaded_at: string | null
        }
        Insert: {
          document_type: string
          file_name?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          kyc_verification_id?: string | null
          mime_type?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          uploaded_at?: string | null
        }
        Update: {
          document_type?: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          kyc_verification_id?: string | null
          mime_type?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_kyc_verification_id_fkey"
            columns: ["kyc_verification_id"]
            isOneToOne: false
            referencedRelation: "kyc_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_verifications: {
        Row: {
          address_verified: boolean | null
          annual_limit_eur: number | null
          created_at: string | null
          daily_limit_eur: number | null
          document_number: string | null
          document_type: string | null
          email_verified: boolean | null
          id: string
          identity_verified: boolean | null
          monthly_limit_eur: number | null
          phone_verified: boolean | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          verification_level: number | null
          verification_notes: string | null
          verified_at: string | null
        }
        Insert: {
          address_verified?: boolean | null
          annual_limit_eur?: number | null
          created_at?: string | null
          daily_limit_eur?: number | null
          document_number?: string | null
          document_type?: string | null
          email_verified?: boolean | null
          id?: string
          identity_verified?: boolean | null
          monthly_limit_eur?: number | null
          phone_verified?: boolean | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: number | null
          verification_notes?: string | null
          verified_at?: string | null
        }
        Update: {
          address_verified?: boolean | null
          annual_limit_eur?: number | null
          created_at?: string | null
          daily_limit_eur?: number | null
          document_number?: string | null
          document_type?: string | null
          email_verified?: boolean | null
          id?: string
          identity_verified?: boolean | null
          monthly_limit_eur?: number | null
          phone_verified?: boolean | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: number | null
          verification_notes?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      level_allocations: {
        Row: {
          allocated_at: string | null
          id: string
          is_cumulative: boolean | null
          jerrcoin_amount: number
          level_number: number
          user_id: string
        }
        Insert: {
          allocated_at?: string | null
          id?: string
          is_cumulative?: boolean | null
          jerrcoin_amount: number
          level_number: number
          user_id: string
        }
        Update: {
          allocated_at?: string | null
          id?: string
          is_cumulative?: boolean | null
          jerrcoin_amount?: number
          level_number?: number
          user_id?: string
        }
        Relationships: []
      }
      mlm_global_config: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          remaining_pool: number
          reward_pool: number
          total_supply: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          remaining_pool?: number
          reward_pool?: number
          total_supply?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          remaining_pool?: number
          reward_pool?: number
          total_supply?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      mlm_levels: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          level_number: number
          min_weak_leg_volume: number | null
          percentage: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level_number: number
          min_weak_leg_volume?: number | null
          percentage: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level_number?: number
          min_weak_leg_volume?: number | null
          percentage?: number
        }
        Relationships: []
      }
      mlm_notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          notification_type: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          notification_type: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          notification_type?: string
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mlm_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mlm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mlm_security_logs: {
        Row: {
          action_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          risk_score: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          risk_score?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          risk_score?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mlm_transactions: {
        Row: {
          amount: number
          calculation_details: Json | null
          id: string
          level_triggered: number | null
          processed_at: string | null
          source_user_id: string | null
          strong_leg_amount: number | null
          transaction_type: string
          user_id: string | null
          weak_leg_amount: number | null
        }
        Insert: {
          amount: number
          calculation_details?: Json | null
          id?: string
          level_triggered?: number | null
          processed_at?: string | null
          source_user_id?: string | null
          strong_leg_amount?: number | null
          transaction_type: string
          user_id?: string | null
          weak_leg_amount?: number | null
        }
        Update: {
          amount?: number
          calculation_details?: Json | null
          id?: string
          level_triggered?: number | null
          processed_at?: string | null
          source_user_id?: string | null
          strong_leg_amount?: number | null
          transaction_type?: string
          user_id?: string | null
          weak_leg_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mlm_transactions_source_user_id_fkey"
            columns: ["source_user_id"]
            isOneToOne: false
            referencedRelation: "mlm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlm_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mlm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mlm_tree_structure: {
        Row: {
          created_at: string | null
          id: string
          left_volume: number | null
          level_depth: number | null
          parent_id: string | null
          position: string | null
          right_volume: number | null
          strong_leg_volume: number | null
          updated_at: string | null
          user_id: string | null
          weak_leg_volume: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          left_volume?: number | null
          level_depth?: number | null
          parent_id?: string | null
          position?: string | null
          right_volume?: number | null
          strong_leg_volume?: number | null
          updated_at?: string | null
          user_id?: string | null
          weak_leg_volume?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          left_volume?: number | null
          level_depth?: number | null
          parent_id?: string | null
          position?: string | null
          right_volume?: number | null
          strong_leg_volume?: number | null
          updated_at?: string | null
          user_id?: string | null
          weak_leg_volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mlm_tree_structure_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "mlm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlm_tree_structure_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mlm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mlm_users: {
        Row: {
          direct_referrals_count: number | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          max_direct_referrals: number | null
          mlm_level: number | null
          placement_preference: string | null
          referral_code: string
          referrer_id: string | null
          total_earned: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          direct_referrals_count?: number | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          max_direct_referrals?: number | null
          mlm_level?: number | null
          placement_preference?: string | null
          referral_code: string
          referrer_id?: string | null
          total_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          direct_referrals_count?: number | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          max_direct_referrals?: number | null
          mlm_level?: number | null
          placement_preference?: string | null
          referral_code?: string
          referrer_id?: string | null
          total_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mlm_users_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "mlm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans_2080: {
        Row: {
          amount_locked: number
          amount_pool: number
          amount_total: number | null
          amount_trading: number
          created_at: string | null
          id: string
          pool_percentage: number
          start_date: string | null
          status: string | null
          token_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount_locked: number
          amount_pool: number
          amount_total?: number | null
          amount_trading: number
          created_at?: string | null
          id?: string
          pool_percentage: number
          start_date?: string | null
          status?: string | null
          token_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount_locked?: number
          amount_pool?: number
          amount_total?: number | null
          amount_trading?: number
          created_at?: string | null
          id?: string
          pool_percentage?: number
          start_date?: string | null
          status?: string | null
          token_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plans_2080_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      pool_payouts: {
        Row: {
          company_share: number
          gross_profit: number
          id: string
          paid_at: string | null
          plan_id: string | null
          trader_share: number
          user_share: number
        }
        Insert: {
          company_share: number
          gross_profit: number
          id?: string
          paid_at?: string | null
          plan_id?: string | null
          trader_share: number
          user_share: number
        }
        Update: {
          company_share?: number
          gross_profit?: number
          id?: string
          paid_at?: string | null
          plan_id?: string | null
          trader_share?: number
          user_share?: number
        }
        Relationships: [
          {
            foreignKeyName: "pool_payouts_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans_2080"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_media: {
        Row: {
          created_at: string | null
          id: string
          media_type: string
          media_url: string
          post_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          media_type: string
          media_url: string
          post_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          media_type?: string
          media_url?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          badge_earned_at: string | null
          bio: string | null
          birth_date: string | null
          cover_image_url: string | null
          created_at: string | null
          current_badge: string | null
          followers_count: number | null
          following_count: number | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          location: string | null
          posts_count: number | null
          updated_at: string | null
          username: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          badge_earned_at?: string | null
          bio?: string | null
          birth_date?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          current_badge?: string | null
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          location?: string | null
          posts_count?: number | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          badge_earned_at?: string | null
          bio?: string | null
          birth_date?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          current_badge?: string | null
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          posts_count?: number | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      progression_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          level_related: number | null
          message: string
          notification_type: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          level_related?: number | null
          message: string
          notification_type: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          level_related?: number | null
          message?: string
          notification_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      project_assets: {
        Row: {
          asset_metadata: Json | null
          asset_name: string
          asset_size_bytes: number | null
          asset_type: string
          asset_url: string
          cdn_url: string | null
          created_at: string | null
          id: string
          is_optimized: boolean | null
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          asset_metadata?: Json | null
          asset_name: string
          asset_size_bytes?: number | null
          asset_type: string
          asset_url: string
          cdn_url?: string | null
          created_at?: string | null
          id?: string
          is_optimized?: boolean | null
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          asset_metadata?: Json | null
          asset_name?: string
          asset_size_bytes?: number | null
          asset_type?: string
          asset_url?: string
          cdn_url?: string | null
          created_at?: string | null
          id?: string
          is_optimized?: boolean | null
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_builds: {
        Row: {
          build_artifacts: Json | null
          build_config: Json | null
          build_duration_seconds: number | null
          build_log: string | null
          build_number: number
          build_status: string | null
          build_type: string | null
          completed_at: string | null
          created_at: string | null
          deployment_url: string | null
          error_message: string | null
          id: string
          project_id: string | null
          started_at: string | null
          triggered_by: string | null
          updated_at: string | null
        }
        Insert: {
          build_artifacts?: Json | null
          build_config?: Json | null
          build_duration_seconds?: number | null
          build_log?: string | null
          build_number: number
          build_status?: string | null
          build_type?: string | null
          completed_at?: string | null
          created_at?: string | null
          deployment_url?: string | null
          error_message?: string | null
          id?: string
          project_id?: string | null
          started_at?: string | null
          triggered_by?: string | null
          updated_at?: string | null
        }
        Update: {
          build_artifacts?: Json | null
          build_config?: Json | null
          build_duration_seconds?: number | null
          build_log?: string | null
          build_number?: number
          build_status?: string | null
          build_type?: string | null
          completed_at?: string | null
          created_at?: string | null
          deployment_url?: string | null
          error_message?: string | null
          id?: string
          project_id?: string | null
          started_at?: string | null
          triggered_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_builds_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_components: {
        Row: {
          component_children: string[] | null
          component_id: string
          component_props: Json | null
          component_styles: Json | null
          component_type: string
          created_at: string | null
          id: string
          is_visible: boolean | null
          parent_id: string | null
          position_index: number | null
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          component_children?: string[] | null
          component_id: string
          component_props?: Json | null
          component_styles?: Json | null
          component_type: string
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          parent_id?: string | null
          position_index?: number | null
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          component_children?: string[] | null
          component_id?: string
          component_props?: Json | null
          component_styles?: Json | null
          component_type?: string
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          parent_id?: string | null
          position_index?: number | null
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_components_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          build_config: Json | null
          created_at: string | null
          deployment_config: Json | null
          description: string | null
          id: string
          is_public: boolean | null
          last_build_id: string | null
          last_deployed_at: string | null
          name: string
          preview_url: string | null
          production_url: string | null
          project_config: Json | null
          project_type: string | null
          repository_url: string | null
          status: string | null
          style_config: Json | null
          template_id: string | null
          ui_schema: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          build_config?: Json | null
          created_at?: string | null
          deployment_config?: Json | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          last_build_id?: string | null
          last_deployed_at?: string | null
          name: string
          preview_url?: string | null
          production_url?: string | null
          project_config?: Json | null
          project_type?: string | null
          repository_url?: string | null
          status?: string | null
          style_config?: Json | null
          template_id?: string | null
          ui_schema?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          build_config?: Json | null
          created_at?: string | null
          deployment_config?: Json | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          last_build_id?: string | null
          last_deployed_at?: string | null
          name?: string
          preview_url?: string | null
          production_url?: string | null
          project_config?: Json | null
          project_type?: string | null
          repository_url?: string | null
          status?: string | null
          style_config?: Json | null
          template_id?: string | null
          ui_schema?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      saga_chapters: {
        Row: {
          caption: string | null
          chapter_order: number
          created_at: string | null
          duration: number | null
          id: string
          media_type: string
          media_url: string
          saga_id: string
          title: string
        }
        Insert: {
          caption?: string | null
          chapter_order: number
          created_at?: string | null
          duration?: number | null
          id?: string
          media_type: string
          media_url: string
          saga_id: string
          title: string
        }
        Update: {
          caption?: string | null
          chapter_order?: number
          created_at?: string | null
          duration?: number | null
          id?: string
          media_type?: string
          media_url?: string
          saga_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "saga_chapters_saga_id_fkey"
            columns: ["saga_id"]
            isOneToOne: false
            referencedRelation: "sagas"
            referencedColumns: ["id"]
          },
        ]
      }
      sagas: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      smad_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      smad_favorites: {
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
            foreignKeyName: "smad_favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "smad_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      smad_listings: {
        Row: {
          category_id: string | null
          condition: string | null
          created_at: string
          currency_type: string | null
          description: string
          expires_at: string | null
          favorites_count: number | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          price_eur: number | null
          price_jerrcoin: number | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          category_id?: string | null
          condition?: string | null
          created_at?: string
          currency_type?: string | null
          description: string
          expires_at?: string | null
          favorites_count?: number | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          price_eur?: number | null
          price_jerrcoin?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          category_id?: string | null
          condition?: string | null
          created_at?: string
          currency_type?: string | null
          description?: string
          expires_at?: string | null
          favorites_count?: number | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          price_eur?: number | null
          price_jerrcoin?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_smad_listings_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smad_listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "smad_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      smad_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          listing_id: string
          message_type: string | null
          offer_amount: number | null
          offer_currency: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          listing_id: string
          message_type?: string | null
          offer_amount?: number | null
          offer_currency?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          listing_id?: string
          message_type?: string | null
          offer_amount?: number | null
          offer_currency?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "smad_messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "smad_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      smad_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          review_type: string
          reviewed_id: string
          reviewer_id: string
          transaction_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          review_type: string
          reviewed_id: string
          reviewer_id: string
          transaction_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          review_type?: string
          reviewed_id?: string
          reviewer_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "smad_reviews_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "smad_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      smad_transactions: {
        Row: {
          amount: number
          auto_release_at: string | null
          buyer_id: string
          created_at: string
          currency: string
          escrow_address: string | null
          exchange_rate: number | null
          gas_fees: number | null
          id: string
          listing_id: string
          payment_method: string | null
          seller_confirms_at: string | null
          seller_id: string
          status: string | null
          stripe_session_id: string | null
          transaction_hash: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          auto_release_at?: string | null
          buyer_id: string
          created_at?: string
          currency: string
          escrow_address?: string | null
          exchange_rate?: number | null
          gas_fees?: number | null
          id?: string
          listing_id: string
          payment_method?: string | null
          seller_confirms_at?: string | null
          seller_id: string
          status?: string | null
          stripe_session_id?: string | null
          transaction_hash?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          auto_release_at?: string | null
          buyer_id?: string
          created_at?: string
          currency?: string
          escrow_address?: string | null
          exchange_rate?: number | null
          gas_fees?: number | null
          id?: string
          listing_id?: string
          payment_method?: string | null
          seller_confirms_at?: string | null
          seller_id?: string
          status?: string | null
          stripe_session_id?: string | null
          transaction_hash?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "smad_transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "smad_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      smadtab: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          is_premium: boolean | null
          is_public: boolean | null
          name: string
          preview_url: string | null
          price_cents: number | null
          rating_average: number | null
          rating_count: number | null
          style_config: Json | null
          tags: string[] | null
          template_data: Json
          thumbnail_url: string | null
          ui_components: Json | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          is_public?: boolean | null
          name: string
          preview_url?: string | null
          price_cents?: number | null
          rating_average?: number | null
          rating_count?: number | null
          style_config?: Json | null
          tags?: string[] | null
          template_data?: Json
          thumbnail_url?: string | null
          ui_components?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          is_public?: boolean | null
          name?: string
          preview_url?: string | null
          price_cents?: number | null
          rating_average?: number | null
          rating_count?: number | null
          style_config?: Json | null
          tags?: string[] | null
          template_data?: Json
          thumbnail_url?: string | null
          ui_components?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      tokenization_requests: {
        Row: {
          asset_id: string | null
          blockchain_tx_hash: string | null
          contract_address: string | null
          created_at: string | null
          documents_verified: boolean | null
          id: string
          notary_valuation: number | null
          oracle_data: Json | null
          platform_valuation: number | null
          status: string | null
          step_current: number | null
          step_data: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          asset_id?: string | null
          blockchain_tx_hash?: string | null
          contract_address?: string | null
          created_at?: string | null
          documents_verified?: boolean | null
          id?: string
          notary_valuation?: number | null
          oracle_data?: Json | null
          platform_valuation?: number | null
          status?: string | null
          step_current?: number | null
          step_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          asset_id?: string | null
          blockchain_tx_hash?: string | null
          contract_address?: string | null
          created_at?: string | null
          documents_verified?: boolean | null
          id?: string
          notary_valuation?: number | null
          oracle_data?: Json | null
          platform_valuation?: number | null
          status?: string | null
          step_current?: number | null
          step_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tokenization_requests_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "immo_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          created_at: string | null
          decimals: number | null
          exchange_rate_to_eur: number | null
          id: string
          is_active: boolean | null
          mint_address: string | null
          name: string
          symbol: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decimals?: number | null
          exchange_rate_to_eur?: number | null
          id?: string
          is_active?: boolean | null
          mint_address?: string | null
          name: string
          symbol: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decimals?: number | null
          exchange_rate_to_eur?: number | null
          id?: string
          is_active?: boolean | null
          mint_address?: string | null
          name?: string
          symbol?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trading_pairs: {
        Row: {
          base_token_id: string | null
          created_at: string | null
          current_price: number
          id: string
          is_active: boolean | null
          price_change_24h: number | null
          quote_token_id: string | null
          symbol: string
          updated_at: string | null
          volume_24h: number | null
        }
        Insert: {
          base_token_id?: string | null
          created_at?: string | null
          current_price?: number
          id?: string
          is_active?: boolean | null
          price_change_24h?: number | null
          quote_token_id?: string | null
          symbol: string
          updated_at?: string | null
          volume_24h?: number | null
        }
        Update: {
          base_token_id?: string | null
          created_at?: string | null
          current_price?: number
          id?: string
          is_active?: boolean | null
          price_change_24h?: number | null
          quote_token_id?: string | null
          symbol?: string
          updated_at?: string | null
          volume_24h?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trading_pairs_base_token_id_fkey"
            columns: ["base_token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trading_pairs_quote_token_id_fkey"
            columns: ["quote_token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          exchange_rate: number | null
          external_transaction_id: string | null
          fee_amount: number | null
          from_amount: number | null
          from_token_id: string | null
          id: string
          notes: string | null
          reference: string | null
          status: string | null
          to_amount: number | null
          to_token_id: string | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          exchange_rate?: number | null
          external_transaction_id?: string | null
          fee_amount?: number | null
          from_amount?: number | null
          from_token_id?: string | null
          id?: string
          notes?: string | null
          reference?: string | null
          status?: string | null
          to_amount?: number | null
          to_token_id?: string | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          exchange_rate?: number | null
          external_transaction_id?: string | null
          fee_amount?: number | null
          from_amount?: number | null
          from_token_id?: string | null
          id?: string
          notes?: string | null
          reference?: string | null
          status?: string | null
          to_amount?: number | null
          to_token_id?: string | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_from_token_id_fkey"
            columns: ["from_token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_to_token_id_fkey"
            columns: ["to_token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      ui_blocks: {
        Row: {
          category: string
          component_code: string | null
          component_props: Json | null
          component_styles: Json | null
          component_type: string
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          name: string
          tags: string[] | null
          thumbnail_url: string | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category: string
          component_code?: string | null
          component_props?: Json | null
          component_styles?: Json | null
          component_type: string
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          name: string
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          component_code?: string | null
          component_props?: Json | null
          component_styles?: Json | null
          component_type?: string
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          name?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      user_balances: {
        Row: {
          amount: number
          balance_type: string
          created_at: string | null
          id: string
          last_transaction_id: string | null
          token_symbol: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number
          balance_type: string
          created_at?: string | null
          id?: string
          last_transaction_id?: string | null
          token_symbol: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          balance_type?: string
          created_at?: string | null
          id?: string
          last_transaction_id?: string | null
          token_symbol?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string | null
          following_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progression: {
        Row: {
          created_at: string | null
          current_level: number | null
          dao_missions_completed: number | null
          ecosystem_entry_date: string | null
          id: string
          total_events_participated: number | null
          total_interactions: number | null
          total_publications: number | null
          total_purchases: number | null
          updated_at: string | null
          user_id: string
          validated_referrals_count: number | null
        }
        Insert: {
          created_at?: string | null
          current_level?: number | null
          dao_missions_completed?: number | null
          ecosystem_entry_date?: string | null
          id?: string
          total_events_participated?: number | null
          total_interactions?: number | null
          total_publications?: number | null
          total_purchases?: number | null
          updated_at?: string | null
          user_id: string
          validated_referrals_count?: number | null
        }
        Update: {
          created_at?: string | null
          current_level?: number | null
          dao_missions_completed?: number | null
          ecosystem_entry_date?: string | null
          id?: string
          total_events_participated?: number | null
          total_interactions?: number | null
          total_publications?: number | null
          total_purchases?: number | null
          updated_at?: string | null
          user_id?: string
          validated_referrals_count?: number | null
        }
        Relationships: []
      }
      user_universe_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_count: number | null
          interaction_type: string
          last_interaction_at: string | null
          universe_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_count?: number | null
          interaction_type: string
          last_interaction_at?: string | null
          universe_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_count?: number | null
          interaction_type?: string
          last_interaction_at?: string | null
          universe_name?: string
          user_id?: string
        }
        Relationships: []
      }
      validated_referrals: {
        Row: {
          created_at: string | null
          id: string
          is_validated: boolean | null
          referral_code: string | null
          referred_id: string
          referrer_id: string
          validated_at: string | null
          validation_amount: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_validated?: boolean | null
          referral_code?: string | null
          referred_id: string
          referrer_id: string
          validated_at?: string | null
          validation_amount?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_validated?: boolean | null
          referral_code?: string | null
          referred_id?: string
          referrer_id?: string
          validated_at?: string | null
          validation_amount?: number
        }
        Relationships: []
      }
      videos: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          thumbnail_url: string | null
          title: string
          user_id: string
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          thumbnail_url?: string | null
          title: string
          user_id: string
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          thumbnail_url?: string | null
          title?: string
          user_id?: string
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          id: string
          locked: number | null
          token_id: string | null
          trading: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: string
          locked?: number | null
          token_id?: string | null
          trading?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: string
          locked?: number | null
          token_id?: string | null
          trading?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallets_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      calculate_user_level: {
        Args: { user_id_param: string }
        Returns: number
      }
      calculate_weak_leg_volume: {
        Args: { mlm_user_id: string }
        Returns: number
      }
      get_user_dashboard_bundle: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_user_transactions: {
        Args: { p_user_id: string }
        Returns: {
          amount: number
          calculation_details: Json
          id: string
          level_triggered: number
          processed_at: string
          source_user_id: string
          strong_leg_amount: number
          transaction_type: string
          user_id: string
          weak_leg_amount: number
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      increment_referral_count: {
        Args: { referrer_id: string }
        Returns: undefined
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      process_mlm_transaction: {
        Args: { p_amount: number; p_type: string; p_user_id: string }
        Returns: Json
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_user_level: {
        Args: { user_id_param: string }
        Returns: undefined
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
