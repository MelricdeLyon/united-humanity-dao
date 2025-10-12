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
      abuse_flags: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          is_active: boolean | null
          rule_key: string
          score: number | null
          user_id: string
          window_end: string
          window_start: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          is_active?: boolean | null
          rule_key: string
          score?: number | null
          user_id: string
          window_end: string
          window_start: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          is_active?: boolean | null
          rule_key?: string
          score?: number | null
          user_id?: string
          window_end?: string
          window_start?: string
        }
        Relationships: []
      }
      acc_accounts: {
        Row: {
          account_type: string
          balance_credit: number | null
          balance_debit: number | null
          code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_type: string
          balance_credit?: number | null
          balance_debit?: number | null
          code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_type?: string
          balance_credit?: number | null
          balance_debit?: number | null
          code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acc_accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "acc_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_entries: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          entry_date: string
          id: string
          journal_id: string
          reference: string
          status: string | null
          total_credit: number
          total_debit: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entry_date?: string
          id?: string
          journal_id: string
          reference: string
          status?: string | null
          total_credit?: number
          total_debit?: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entry_date?: string
          id?: string
          journal_id?: string
          reference?: string
          status?: string | null
          total_credit?: number
          total_debit?: number
        }
        Relationships: [
          {
            foreignKeyName: "acc_entries_journal_id_fkey"
            columns: ["journal_id"]
            isOneToOne: false
            referencedRelation: "acc_journals"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_entry_lines: {
        Row: {
          account_id: string
          credit_amount: number | null
          debit_amount: number | null
          description: string | null
          entry_id: string
          id: string
          line_order: number | null
        }
        Insert: {
          account_id: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          entry_id: string
          id?: string
          line_order?: number | null
        }
        Update: {
          account_id?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          entry_id?: string
          id?: string
          line_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "acc_entry_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "acc_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acc_entry_lines_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "acc_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      acc_invoices: {
        Row: {
          created_at: string | null
          created_by: string | null
          customer_email: string | null
          customer_name: string
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          payment_terms: number | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          customer_email?: string | null
          customer_name: string
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string
          notes?: string | null
          payment_terms?: number | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          customer_email?: string | null
          customer_name?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          payment_terms?: number | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      acc_journals: {
        Row: {
          code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          journal_type: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          journal_type: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          journal_type?: string
          name?: string
        }
        Relationships: []
      }
      action_events: {
        Row: {
          action_key: string
          created_at: string | null
          hash_unique: string
          id: string
          is_processed: boolean | null
          metadata: Json | null
          occurred_at: string | null
          user_id: string
        }
        Insert: {
          action_key: string
          created_at?: string | null
          hash_unique: string
          id?: string
          is_processed?: boolean | null
          metadata?: Json | null
          occurred_at?: string | null
          user_id: string
        }
        Update: {
          action_key?: string
          created_at?: string | null
          hash_unique?: string
          id?: string
          is_processed?: boolean | null
          metadata?: Json | null
          occurred_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      actions_catalog: {
        Row: {
          action_key: string
          bundle_threshold: number
          created_at: string | null
          daily_cap: number
          id: string
          is_active: boolean | null
          jrc_award: number
          monthly_cap: number
          qualifiers: Json | null
          universe: string
          updated_at: string | null
          window_days: number
        }
        Insert: {
          action_key: string
          bundle_threshold?: number
          created_at?: string | null
          daily_cap?: number
          id?: string
          is_active?: boolean | null
          jrc_award?: number
          monthly_cap?: number
          qualifiers?: Json | null
          universe: string
          updated_at?: string | null
          window_days?: number
        }
        Update: {
          action_key?: string
          bundle_threshold?: number
          created_at?: string | null
          daily_cap?: number
          id?: string
          is_active?: boolean | null
          jrc_award?: number
          monthly_cap?: number
          qualifiers?: Json | null
          universe?: string
          updated_at?: string | null
          window_days?: number
        }
        Relationships: []
      }
      activity_feed: {
        Row: {
          activity_type: string
          audience: Database["public"]["Enums"]["activity_audience"]
          content: string | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          media_urls: string[] | null
          metadata: Json | null
          source_universe: Database["public"]["Enums"]["universe_type"]
          title: string
          user_id: string
        }
        Insert: {
          activity_type: string
          audience?: Database["public"]["Enums"]["activity_audience"]
          content?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          source_universe: Database["public"]["Enums"]["universe_type"]
          title: string
          user_id: string
        }
        Update: {
          activity_type?: string
          audience?: Database["public"]["Enums"]["activity_audience"]
          content?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          source_universe?: Database["public"]["Enums"]["universe_type"]
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      agent_decisions: {
        Row: {
          agent_name: string
          confidence_score: number | null
          created_at: string | null
          execution_time_ms: number | null
          id: string
          outcome_json: Json
          rationale: string | null
          run_id: string
          stage: string
        }
        Insert: {
          agent_name: string
          confidence_score?: number | null
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          outcome_json?: Json
          rationale?: string | null
          run_id: string
          stage: string
        }
        Update: {
          agent_name?: string
          confidence_score?: number | null
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          outcome_json?: Json
          rationale?: string | null
          run_id?: string
          stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_decisions_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "agent_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_runs: {
        Row: {
          brief_json: Json
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          estimated_duration_minutes: number | null
          id: string
          logs: Json | null
          progress_pct: number | null
          stage: string
          started_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          brief_json: Json
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          logs?: Json | null
          progress_pct?: number | null
          stage?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          brief_json?: Json
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          logs?: Json | null
          progress_pct?: number | null
          stage?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
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
      art_disputes: {
        Row: {
          created_at: string | null
          evidence_urls: string[] | null
          id: string
          opened_by: string | null
          order_id: string | null
          reason: string
          resolution: string | null
          resolved_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          evidence_urls?: string[] | null
          id?: string
          opened_by?: string | null
          order_id?: string | null
          reason: string
          resolution?: string | null
          resolved_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          evidence_urls?: string[] | null
          id?: string
          opened_by?: string | null
          order_id?: string | null
          reason?: string
          resolution?: string | null
          resolved_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "art_disputes_opened_by_fkey"
            columns: ["opened_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_disputes_opened_by_fkey"
            columns: ["opened_by"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_disputes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "art_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      art_memberships: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          pass_mint: string | null
          perks_json: Json | null
          profile_id: string | null
          tier: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          pass_mint?: string | null
          perks_json?: Json | null
          profile_id?: string | null
          tier: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          pass_mint?: string | null
          perks_json?: Json | null
          profile_id?: string | null
          tier?: string
        }
        Relationships: [
          {
            foreignKeyName: "art_memberships_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_memberships_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      art_orders: {
        Row: {
          amount_jrc: number
          artwork_id: string | null
          buyer_id: string | null
          completed_at: string | null
          created_at: string | null
          delivery_address: Json | null
          escrow_addr: string | null
          id: string
          listing_id: string | null
          seller_id: string | null
          status: Database["public"]["Enums"]["art_order_status"] | null
        }
        Insert: {
          amount_jrc: number
          artwork_id?: string | null
          buyer_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          delivery_address?: Json | null
          escrow_addr?: string | null
          id?: string
          listing_id?: string | null
          seller_id?: string | null
          status?: Database["public"]["Enums"]["art_order_status"] | null
        }
        Update: {
          amount_jrc?: number
          artwork_id?: string | null
          buyer_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          delivery_address?: Json | null
          escrow_addr?: string | null
          id?: string
          listing_id?: string | null
          seller_id?: string | null
          status?: Database["public"]["Enums"]["art_order_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "art_orders_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      art_wishlists: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          id: string
          profile_id: string | null
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "art_wishlists_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_wishlists_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_wishlists_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
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
      artists: {
        Row: {
          created_at: string | null
          display_name: string
          id: string
          profile_id: string | null
          socials: Json | null
          statement: string | null
          studio_id: string | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          id?: string
          profile_id?: string | null
          socials?: Json | null
          statement?: string | null
          studio_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          id?: string
          profile_id?: string | null
          socials?: Json | null
          statement?: string | null
          studio_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "artists_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      artwork_assets: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          hash: string | null
          id: string
          kind: string
          mime: string | null
          size_bytes: number | null
          url: string
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          hash?: string | null
          id?: string
          kind: string
          mime?: string | null
          size_bytes?: number | null
          url: string
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          hash?: string | null
          id?: string
          kind?: string
          mime?: string | null
          size_bytes?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "artwork_assets_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
        ]
      }
      artwork_comments: {
        Row: {
          artwork_id: string | null
          content: string
          created_at: string | null
          id: string
          profile_id: string | null
          rating: number | null
        }
        Insert: {
          artwork_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          profile_id?: string | null
          rating?: number | null
        }
        Update: {
          artwork_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          profile_id?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artwork_comments_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_comments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_comments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      artwork_likes: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          id: string
          profile_id: string | null
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artwork_likes_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      artwork_tips: {
        Row: {
          amount_jrc: number
          artwork_id: string | null
          created_at: string | null
          from_id: string | null
          id: string
          message: string | null
          to_id: string | null
        }
        Insert: {
          amount_jrc: number
          artwork_id?: string | null
          created_at?: string | null
          from_id?: string | null
          id?: string
          message?: string | null
          to_id?: string | null
        }
        Update: {
          amount_jrc?: number
          artwork_id?: string | null
          created_at?: string | null
          from_id?: string | null
          id?: string
          message?: string | null
          to_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artwork_tips_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_tips_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_tips_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_tips_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_tips_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      artworks: {
        Row: {
          artist_id: string | null
          care_notes: string | null
          condition: string | null
          created_at: string | null
          depth_cm: number | null
          description: string | null
          edition_remaining: number | null
          edition_size: number | null
          gallery_id: string | null
          gltf_url: string | null
          height_cm: number | null
          id: string
          iiif_manifest: string | null
          license: string | null
          likes_count: number | null
          materials: string | null
          medium: string | null
          movement: string | null
          nfc_uid: string | null
          preview_url: string | null
          price_jrc: number
          status: Database["public"]["Enums"]["artwork_status"] | null
          style: string | null
          tags: string[] | null
          title: string
          turntable_url: string | null
          type: Database["public"]["Enums"]["artwork_type"]
          updated_at: string | null
          views_count: number | null
          weight_kg: number | null
          width_cm: number | null
          year: number | null
        }
        Insert: {
          artist_id?: string | null
          care_notes?: string | null
          condition?: string | null
          created_at?: string | null
          depth_cm?: number | null
          description?: string | null
          edition_remaining?: number | null
          edition_size?: number | null
          gallery_id?: string | null
          gltf_url?: string | null
          height_cm?: number | null
          id?: string
          iiif_manifest?: string | null
          license?: string | null
          likes_count?: number | null
          materials?: string | null
          medium?: string | null
          movement?: string | null
          nfc_uid?: string | null
          preview_url?: string | null
          price_jrc?: number
          status?: Database["public"]["Enums"]["artwork_status"] | null
          style?: string | null
          tags?: string[] | null
          title: string
          turntable_url?: string | null
          type?: Database["public"]["Enums"]["artwork_type"]
          updated_at?: string | null
          views_count?: number | null
          weight_kg?: number | null
          width_cm?: number | null
          year?: number | null
        }
        Update: {
          artist_id?: string | null
          care_notes?: string | null
          condition?: string | null
          created_at?: string | null
          depth_cm?: number | null
          description?: string | null
          edition_remaining?: number | null
          edition_size?: number | null
          gallery_id?: string | null
          gltf_url?: string | null
          height_cm?: number | null
          id?: string
          iiif_manifest?: string | null
          license?: string | null
          likes_count?: number | null
          materials?: string | null
          medium?: string | null
          movement?: string | null
          nfc_uid?: string | null
          preview_url?: string | null
          price_jrc?: number
          status?: Database["public"]["Enums"]["artwork_status"] | null
          style?: string | null
          tags?: string[] | null
          title?: string
          turntable_url?: string | null
          type?: Database["public"]["Enums"]["artwork_type"]
          updated_at?: string | null
          views_count?: number | null
          weight_kg?: number | null
          width_cm?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artworks_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artworks_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          meta_json: Json | null
          team_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          meta_json?: Json | null
          team_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          meta_json?: Json | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      bids: {
        Row: {
          amount_jrc: number
          auto_bid: boolean | null
          bidder_id: string | null
          created_at: string | null
          id: string
          listing_id: string | null
        }
        Insert: {
          amount_jrc: number
          auto_bid?: boolean | null
          bidder_id?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
        }
        Update: {
          amount_jrc?: number
          auto_bid?: boolean | null
          bidder_id?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          amount_jrc: number
          created_at: string
          end_at: string | null
          fee_jrc: number | null
          id: string
          inhabitant_id: string
          item_id: string | null
          meta: Json | null
          pro_id: string
          start_at: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
        }
        Insert: {
          amount_jrc: number
          created_at?: string
          end_at?: string | null
          fee_jrc?: number | null
          id?: string
          inhabitant_id: string
          item_id?: string | null
          meta?: Json | null
          pro_id: string
          start_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Update: {
          amount_jrc?: number
          created_at?: string
          end_at?: string | null
          fee_jrc?: number | null
          id?: string
          inhabitant_id?: string
          item_id?: string | null
          meta?: Json | null
          pro_id?: string
          start_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      breathing_sessions: {
        Row: {
          completed: boolean | null
          created_at: string | null
          duration_seconds: number
          heart_rate_avg: number | null
          id: string
          protocol: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          duration_seconds: number
          heart_rate_avg?: number | null
          id?: string
          protocol: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          duration_seconds?: number
          heart_rate_avg?: number | null
          id?: string
          protocol?: string
          user_id?: string
        }
        Relationships: []
      }
      bundle_progress: {
        Row: {
          action_key: string
          count: number | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          last_event_at: string | null
          threshold: number
          updated_at: string | null
          user_id: string
          window_end: string
          window_start: string
        }
        Insert: {
          action_key: string
          count?: number | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          last_event_at?: string | null
          threshold: number
          updated_at?: string | null
          user_id: string
          window_end: string
          window_start: string
        }
        Update: {
          action_key?: string
          count?: number | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          last_event_at?: string | null
          threshold?: number
          updated_at?: string | null
          user_id?: string
          window_end?: string
          window_start?: string
        }
        Relationships: []
      }
      candidate_debates: {
        Row: {
          created_at: string
          debate_type: string
          description: string | null
          election_id: string
          id: string
          participants: string[] | null
          scheduled_date: string | null
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          debate_type: string
          description?: string | null
          election_id: string
          id?: string
          participants?: string[] | null
          scheduled_date?: string | null
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          debate_type?: string
          description?: string | null
          election_id?: string
          id?: string
          participants?: string[] | null
          scheduled_date?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_debates_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_petitions: {
        Row: {
          candidate_bio: string | null
          candidate_email: string | null
          candidate_name: string
          created_at: string
          current_signatures: number
          election_id: string
          id: string
          petition_reason: string
          petitioner_id: string
          required_signatures: number
          status: string
        }
        Insert: {
          candidate_bio?: string | null
          candidate_email?: string | null
          candidate_name: string
          created_at?: string
          current_signatures?: number
          election_id: string
          id?: string
          petition_reason: string
          petitioner_id: string
          required_signatures?: number
          status?: string
        }
        Update: {
          candidate_bio?: string | null
          candidate_email?: string | null
          candidate_name?: string
          created_at?: string
          current_signatures?: number
          election_id?: string
          id?: string
          petition_reason?: string
          petitioner_id?: string
          required_signatures?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_petitions_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          acceptance_status: string
          created_at: string
          election_id: string
          experience_summary: string | null
          id: string
          nomination_count: number
          person_bio: string | null
          person_email: string | null
          person_name: string
          presentation_text: string | null
          profile_image_url: string | null
          round_qualified: number
          updated_at: string
          vision_statement: string | null
        }
        Insert: {
          acceptance_status?: string
          created_at?: string
          election_id: string
          experience_summary?: string | null
          id?: string
          nomination_count?: number
          person_bio?: string | null
          person_email?: string | null
          person_name: string
          presentation_text?: string | null
          profile_image_url?: string | null
          round_qualified: number
          updated_at?: string
          vision_statement?: string | null
        }
        Update: {
          acceptance_status?: string
          created_at?: string
          election_id?: string
          experience_summary?: string | null
          id?: string
          nomination_count?: number
          person_bio?: string | null
          person_email?: string | null
          person_name?: string
          presentation_text?: string | null
          profile_image_url?: string | null
          round_qualified?: number
          updated_at?: string
          vision_statement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_items: {
        Row: {
          created_at: string
          data: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          kind: string
          name: string
          price_jrc: number
          pro_id: string
          stock: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          kind: string
          name: string
          price_jrc: number
          pro_id: string
          stock?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          kind?: string
          name?: string
          price_jrc?: number
          pro_id?: string
          stock?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_items_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      celebrity_tokens: {
        Row: {
          created_at: string | null
          id: string
          market_ref: Json | null
          supply: number | null
          symbol: string
          utilities: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          market_ref?: Json | null
          supply?: number | null
          symbol: string
          utilities?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          market_ref?: Json | null
          supply?: number | null
          symbol?: string
          utilities?: Json | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          artwork_id: string | null
          id: string
          issued_at: string | null
          nfc_uid: string | null
          owner_id: string | null
          revoked: boolean | null
          token_addr: string | null
          type: Database["public"]["Enums"]["certificate_type"]
        }
        Insert: {
          artwork_id?: string | null
          id?: string
          issued_at?: string | null
          nfc_uid?: string | null
          owner_id?: string | null
          revoked?: boolean | null
          token_addr?: string | null
          type?: Database["public"]["Enums"]["certificate_type"]
        }
        Update: {
          artwork_id?: string | null
          id?: string
          issued_at?: string | null
          nfc_uid?: string | null
          owner_id?: string | null
          revoked?: boolean | null
          token_addr?: string | null
          type?: Database["public"]["Enums"]["certificate_type"]
        }
        Relationships: [
          {
            foreignKeyName: "certificates_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participations: {
        Row: {
          challenge_id: string
          completed_at: string | null
          id: string
          joined_at: string | null
          progress_pct: number | null
          reward_claimed: boolean | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          id?: string
          joined_at?: string | null
          progress_pct?: number | null
          reward_claimed?: boolean | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          id?: string
          joined_at?: string | null
          progress_pct?: number | null
          reward_claimed?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participations_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "wellness_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      citizen_participation: {
        Row: {
          budget_requested: number | null
          citizen_id: string | null
          created_at: string
          execution_date: string | null
          id: string
          participation_type: string
          proposal_description: string | null
          proposal_title: string | null
          status: string | null
          territorial_entity_id: string
          updated_at: string
          votes_abstain: number | null
          votes_against: number | null
          votes_for: number | null
          voting_end_date: string | null
          voting_start_date: string | null
        }
        Insert: {
          budget_requested?: number | null
          citizen_id?: string | null
          created_at?: string
          execution_date?: string | null
          id?: string
          participation_type: string
          proposal_description?: string | null
          proposal_title?: string | null
          status?: string | null
          territorial_entity_id: string
          updated_at?: string
          votes_abstain?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_end_date?: string | null
          voting_start_date?: string | null
        }
        Update: {
          budget_requested?: number | null
          citizen_id?: string | null
          created_at?: string
          execution_date?: string | null
          id?: string
          participation_type?: string
          proposal_description?: string | null
          proposal_title?: string | null
          status?: string | null
          territorial_entity_id?: string
          updated_at?: string
          votes_abstain?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_end_date?: string | null
          voting_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citizen_participation_territorial_entity_id_fkey"
            columns: ["territorial_entity_id"]
            isOneToOne: false
            referencedRelation: "territorial_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      citizen_votes: {
        Row: {
          candidate_id: string
          created_at: string
          election_id: string
          id: string
          round_number: number
          voter_id: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          election_id: string
          id?: string
          round_number: number
          voter_id: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          election_id?: string
          id?: string
          round_number?: number
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "citizen_votes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citizen_votes_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      community_groups: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_private: boolean | null
          member_count: number | null
          name: string
          rules: string | null
          topic: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          member_count?: number | null
          name: string
          rules?: string | null
          topic: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          member_count?: number | null
          name?: string
          rules?: string | null
          topic?: string
        }
        Relationships: []
      }
      community_memberships: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          body_encrypted: string
          created_at: string | null
          group_id: string
          id: string
          is_anonymous: boolean | null
          likes_count: number | null
          replies_count: number | null
          title: string | null
          user_id: string
        }
        Insert: {
          body_encrypted: string
          created_at?: string | null
          group_id: string
          id?: string
          is_anonymous?: boolean | null
          likes_count?: number | null
          replies_count?: number | null
          title?: string | null
          user_id: string
        }
        Update: {
          body_encrypted?: string
          created_at?: string | null
          group_id?: string
          id?: string
          is_anonymous?: boolean | null
          likes_count?: number | null
          replies_count?: number | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_valid: boolean
          last_used_at: string | null
          name: string
          provider: string
          scope: string[] | null
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_valid?: boolean
          last_used_at?: string | null
          name: string
          provider: string
          scope?: string[] | null
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_valid?: boolean
          last_used_at?: string | null
          name?: string
          provider?: string
          scope?: string[] | null
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      cooking_recipes: {
        Row: {
          cook_time_minutes: number | null
          created_at: string
          creator_id: string
          cuisine_type: string | null
          description: string | null
          difficulty: string
          id: string
          ingredients: Json | null
          instructions: Json | null
          is_public: boolean | null
          likes_count: number | null
          nutrition_info: Json | null
          photos: string[] | null
          prep_time_minutes: number | null
          recipe_name: string
          servings: number | null
          tags: string[] | null
        }
        Insert: {
          cook_time_minutes?: number | null
          created_at?: string
          creator_id: string
          cuisine_type?: string | null
          description?: string | null
          difficulty: string
          id?: string
          ingredients?: Json | null
          instructions?: Json | null
          is_public?: boolean | null
          likes_count?: number | null
          nutrition_info?: Json | null
          photos?: string[] | null
          prep_time_minutes?: number | null
          recipe_name: string
          servings?: number | null
          tags?: string[] | null
        }
        Update: {
          cook_time_minutes?: number | null
          created_at?: string
          creator_id?: string
          cuisine_type?: string | null
          description?: string | null
          difficulty?: string
          id?: string
          ingredients?: Json | null
          instructions?: Json | null
          is_public?: boolean | null
          likes_count?: number | null
          nutrition_info?: Json | null
          photos?: string[] | null
          prep_time_minutes?: number | null
          recipe_name?: string
          servings?: number | null
          tags?: string[] | null
        }
        Relationships: []
      }
      council_members: {
        Row: {
          created_at: string
          department: string | null
          id: string
          is_active: boolean
          position: string
          salary_eur_annual: number | null
          term_end: string | null
          term_start: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: string
          is_active?: boolean
          position: string
          salary_eur_annual?: number | null
          term_end?: string | null
          term_start?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: string
          is_active?: boolean
          position?: string
          salary_eur_annual?: number | null
          term_end?: string | null
          term_start?: string
          user_id?: string | null
        }
        Relationships: []
      }
      credentials: {
        Row: {
          connection_id: string
          created_at: string
          encrypted_secret_json: Json
          expires_at: string | null
          id: string
          is_valid: boolean
          kind: Database["public"]["Enums"]["credential_kind"]
          rotated_at: string | null
        }
        Insert: {
          connection_id: string
          created_at?: string
          encrypted_secret_json: Json
          expires_at?: string | null
          id?: string
          is_valid?: boolean
          kind: Database["public"]["Enums"]["credential_kind"]
          rotated_at?: string | null
        }
        Update: {
          connection_id?: string
          created_at?: string
          encrypted_secret_json?: Json
          expires_at?: string | null
          id?: string
          is_valid?: boolean
          kind?: Database["public"]["Enums"]["credential_kind"]
          rotated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credentials_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "connections"
            referencedColumns: ["id"]
          },
        ]
      }
      credits: {
        Row: {
          billing_order: number | null
          character_name: string | null
          credit_type: string
          person_id: string
          title_id: string
        }
        Insert: {
          billing_order?: number | null
          character_name?: string | null
          credit_type: string
          person_id: string
          title_id: string
        }
        Update: {
          billing_order?: number | null
          character_name?: string | null
          credit_type?: string
          person_id?: string
          title_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "titles"
            referencedColumns: ["id"]
          },
        ]
      }
      curation_artworks: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          curation_id: string | null
          id: string
          order_index: number | null
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          curation_id?: string | null
          id?: string
          order_index?: number | null
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          curation_id?: string | null
          id?: string
          order_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "curation_artworks_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curation_artworks_curation_id_fkey"
            columns: ["curation_id"]
            isOneToOne: false
            referencedRelation: "curations"
            referencedColumns: ["id"]
          },
        ]
      }
      curations: {
        Row: {
          cover_url: string | null
          created_at: string | null
          curator_id: string | null
          description: string | null
          id: string
          is_public: boolean | null
          title: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          curator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          title: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          curator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "curations_curator_id_fkey"
            columns: ["curator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curations_curator_id_fkey"
            columns: ["curator_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_purchases: {
        Row: {
          avg_order_value: number | null
          created_at: string | null
          customer_id: string
          favorite_categories: string[] | null
          id: string
          last_purchase_at: string | null
          loyalty_points: number | null
          satisfaction_rating: number | null
          total_orders: number | null
          total_spent_eur: number | null
          total_spent_jrc: number | null
          updated_at: string | null
        }
        Insert: {
          avg_order_value?: number | null
          created_at?: string | null
          customer_id: string
          favorite_categories?: string[] | null
          id?: string
          last_purchase_at?: string | null
          loyalty_points?: number | null
          satisfaction_rating?: number | null
          total_orders?: number | null
          total_spent_eur?: number | null
          total_spent_jrc?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_order_value?: number | null
          created_at?: string | null
          customer_id?: string
          favorite_categories?: string[] | null
          id?: string
          last_purchase_at?: string | null
          loyalty_points?: number | null
          satisfaction_rating?: number | null
          total_orders?: number | null
          total_spent_eur?: number | null
          total_spent_jrc?: number | null
          updated_at?: string | null
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
      dao_members: {
        Row: {
          citizenship_nft_address: string | null
          id: string
          is_active: boolean
          joined_at: string
          last_activity_at: string
          reputation_score: number
          user_id: string | null
          voting_power: number
        }
        Insert: {
          citizenship_nft_address?: string | null
          id?: string
          is_active?: boolean
          joined_at?: string
          last_activity_at?: string
          reputation_score?: number
          user_id?: string | null
          voting_power?: number
        }
        Update: {
          citizenship_nft_address?: string | null
          id?: string
          is_active?: boolean
          joined_at?: string
          last_activity_at?: string
          reputation_score?: number
          user_id?: string | null
          voting_power?: number
        }
        Relationships: []
      }
      dao_proposals: {
        Row: {
          category: string
          created_at: string
          creator_id: string | null
          description: string
          execution_data: Json | null
          id: string
          quorum_required: number
          status: string
          title: string
          updated_at: string
          votes_against: number
          votes_for: number
          voting_ends_at: string
          voting_starts_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          creator_id?: string | null
          description: string
          execution_data?: Json | null
          id?: string
          quorum_required?: number
          status?: string
          title: string
          updated_at?: string
          votes_against?: number
          votes_for?: number
          voting_ends_at?: string
          voting_starts_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          creator_id?: string | null
          description?: string
          execution_data?: Json | null
          id?: string
          quorum_required?: number
          status?: string
          title?: string
          updated_at?: string
          votes_against?: number
          votes_for?: number
          voting_ends_at?: string
          voting_starts_at?: string
        }
        Relationships: []
      }
      dao_treasury: {
        Row: {
          created_at: string
          distributed_amount: number
          id: string
          last_updated: string
          status: string
          total_supply: number
        }
        Insert: {
          created_at?: string
          distributed_amount?: number
          id?: string
          last_updated?: string
          status?: string
          total_supply?: number
        }
        Update: {
          created_at?: string
          distributed_amount?: number
          id?: string
          last_updated?: string
          status?: string
          total_supply?: number
        }
        Relationships: []
      }
      dao_votes: {
        Row: {
          created_at: string
          id: string
          proposal_id: string | null
          transaction_signature: string | null
          vote_choice: boolean
          voter_id: string | null
          voting_power: number
        }
        Insert: {
          created_at?: string
          id?: string
          proposal_id?: string | null
          transaction_signature?: string | null
          vote_choice: boolean
          voter_id?: string | null
          voting_power?: number
        }
        Update: {
          created_at?: string
          id?: string
          proposal_id?: string | null
          transaction_signature?: string | null
          vote_choice?: boolean
          voter_id?: string | null
          voting_power?: number
        }
        Relationships: [
          {
            foreignKeyName: "dao_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "dao_proposals"
            referencedColumns: ["id"]
          },
        ]
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
      drop_artworks: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          drop_id: string | null
          id: string
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          drop_id?: string | null
          id?: string
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          drop_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drop_artworks_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drop_artworks_drop_id_fkey"
            columns: ["drop_id"]
            isOneToOne: false
            referencedRelation: "drops"
            referencedColumns: ["id"]
          },
        ]
      }
      drops: {
        Row: {
          allowlist_json: Json | null
          artist_id: string | null
          cover_url: string | null
          created_at: string | null
          description: string | null
          ends_at: string | null
          id: string
          max_per_wallet: number | null
          reveal_at: string | null
          starts_at: string
          title: string
        }
        Insert: {
          allowlist_json?: Json | null
          artist_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          max_per_wallet?: number | null
          reveal_at?: string | null
          starts_at: string
          title: string
        }
        Update: {
          allowlist_json?: Json | null
          artist_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          max_per_wallet?: number | null
          reveal_at?: string | null
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "drops_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      elections: {
        Row: {
          created_at: string
          current_round: number
          department: string | null
          description: string | null
          id: string
          max_candidates_round_2: number | null
          max_finalists_round_3: number | null
          min_nominations_for_round_2: number | null
          position: string
          round_1_end_date: string | null
          round_1_start_date: string | null
          round_2_end_date: string | null
          round_2_start_date: string | null
          round_3_end_date: string | null
          round_3_start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_round?: number
          department?: string | null
          description?: string | null
          id?: string
          max_candidates_round_2?: number | null
          max_finalists_round_3?: number | null
          min_nominations_for_round_2?: number | null
          position: string
          round_1_end_date?: string | null
          round_1_start_date?: string | null
          round_2_end_date?: string | null
          round_2_start_date?: string | null
          round_3_end_date?: string | null
          round_3_start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_round?: number
          department?: string | null
          description?: string | null
          id?: string
          max_candidates_round_2?: number | null
          max_finalists_round_3?: number | null
          min_nominations_for_round_2?: number | null
          position?: string
          round_1_end_date?: string | null
          round_1_start_date?: string | null
          round_2_end_date?: string | null
          round_2_start_date?: string | null
          round_3_end_date?: string | null
          round_3_start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      eligible_pool: {
        Row: {
          created_at: string
          email_protected: boolean | null
          email_visible: boolean | null
          id: string
          is_eligible: boolean
          nomination_count: number
          organization_type: string
          person_bio: string | null
          person_email: string | null
          person_name: string
          position_type: string
          reputation_score: number
          skills: Json | null
          updated_at: string
          validation_score: number
        }
        Insert: {
          created_at?: string
          email_protected?: boolean | null
          email_visible?: boolean | null
          id?: string
          is_eligible?: boolean
          nomination_count?: number
          organization_type: string
          person_bio?: string | null
          person_email?: string | null
          person_name: string
          position_type: string
          reputation_score?: number
          skills?: Json | null
          updated_at?: string
          validation_score?: number
        }
        Update: {
          created_at?: string
          email_protected?: boolean | null
          email_visible?: boolean | null
          id?: string
          is_eligible?: boolean
          nomination_count?: number
          organization_type?: string
          person_bio?: string | null
          person_email?: string | null
          person_name?: string
          position_type?: string
          reputation_score?: number
          skills?: Json | null
          updated_at?: string
          validation_score?: number
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
      exhibition_artworks: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          exhibition_id: string | null
          id: string
          position_json: Json | null
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          exhibition_id?: string | null
          id?: string
          position_json?: Json | null
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          exhibition_id?: string | null
          id?: string
          position_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "exhibition_artworks_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exhibition_artworks_exhibition_id_fkey"
            columns: ["exhibition_id"]
            isOneToOne: false
            referencedRelation: "exhibitions"
            referencedColumns: ["id"]
          },
        ]
      }
      exhibitions: {
        Row: {
          cover_url: string | null
          created_at: string | null
          curator_id: string | null
          description: string | null
          ends_at: string | null
          id: string
          is_public: boolean | null
          layout_json: Json | null
          starts_at: string | null
          title: string
          voice_chat: boolean | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          curator_id?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_public?: boolean | null
          layout_json?: Json | null
          starts_at?: string | null
          title: string
          voice_chat?: boolean | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          curator_id?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_public?: boolean | null
          layout_json?: Json | null
          starts_at?: string | null
          title?: string
          voice_chat?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "exhibitions_curator_id_fkey"
            columns: ["curator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exhibitions_curator_id_fkey"
            columns: ["curator_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      fashion_looks: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: string
          is_public: boolean | null
          items_ids: string[] | null
          likes_count: number | null
          name: string
          occasion: string | null
          photos: string[] | null
          season: string | null
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          items_ids?: string[] | null
          likes_count?: number | null
          name: string
          occasion?: string | null
          photos?: string[] | null
          season?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          items_ids?: string[] | null
          likes_count?: number | null
          name?: string
          occasion?: string | null
          photos?: string[] | null
          season?: string | null
        }
        Relationships: []
      }
      fashion_wardrobe: {
        Row: {
          brand: string | null
          category: string
          color: string | null
          created_at: string
          id: string
          item_name: string
          last_worn: string | null
          owner_id: string
          photos: string[] | null
          price_eur: number | null
          purchase_date: string | null
          size: string | null
          sustainability_score: number | null
          wear_count: number | null
        }
        Insert: {
          brand?: string | null
          category: string
          color?: string | null
          created_at?: string
          id?: string
          item_name: string
          last_worn?: string | null
          owner_id: string
          photos?: string[] | null
          price_eur?: number | null
          purchase_date?: string | null
          size?: string | null
          sustainability_score?: number | null
          wear_count?: number | null
        }
        Update: {
          brand?: string | null
          category?: string
          color?: string | null
          created_at?: string
          id?: string
          item_name?: string
          last_worn?: string | null
          owner_id?: string
          photos?: string[] | null
          price_eur?: number | null
          purchase_date?: string | null
          size?: string | null
          sustainability_score?: number | null
          wear_count?: number | null
        }
        Relationships: []
      }
      fitness_programs: {
        Row: {
          created_at: string
          difficulty: string
          duration_weeks: number
          exercises: Json | null
          goal: string
          id: string
          is_active: boolean | null
          program_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty: string
          duration_weeks: number
          exercises?: Json | null
          goal: string
          id?: string
          is_active?: boolean | null
          program_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          duration_weeks?: number
          exercises?: Json | null
          goal?: string
          id?: string
          is_active?: boolean | null
          program_name?: string
          user_id?: string
        }
        Relationships: []
      }
      galleries: {
        Row: {
          address: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          kyc_level: number | null
          name: string
          owner_id: string | null
          updated_at: string | null
          vat_number: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          kyc_level?: number | null
          name: string
          owner_id?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          kyc_level?: number | null
          name?: string
          owner_id?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "galleries_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "galleries_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
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
      inv_batches: {
        Row: {
          batch_number: string
          created_at: string | null
          expiry_date: string | null
          id: string
          item_id: string
          location_id: string
          quantity_on_hand: number | null
          quantity_reserved: number | null
          unit_cost: number | null
        }
        Insert: {
          batch_number: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          item_id: string
          location_id: string
          quantity_on_hand?: number | null
          quantity_reserved?: number | null
          unit_cost?: number | null
        }
        Update: {
          batch_number?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          item_id?: string
          location_id?: string
          quantity_on_hand?: number | null
          quantity_reserved?: number | null
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inv_batches_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inv_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inv_batches_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "inv_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      inv_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          reorder_level: number | null
          reorder_quantity: number | null
          sku: string
          unit_cost: number | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          reorder_level?: number | null
          reorder_quantity?: number | null
          sku: string
          unit_cost?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          reorder_level?: number | null
          reorder_quantity?: number | null
          sku?: string
          unit_cost?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inv_locations: {
        Row: {
          address: string | null
          code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          address?: string | null
          code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          address?: string | null
          code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      inv_moves: {
        Row: {
          created_at: string | null
          created_by: string | null
          from_location_id: string | null
          id: string
          item_id: string
          move_date: string | null
          move_type: string
          notes: string | null
          quantity: number
          reference: string | null
          to_location_id: string | null
          unit_cost: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          from_location_id?: string | null
          id?: string
          item_id: string
          move_date?: string | null
          move_type: string
          notes?: string | null
          quantity: number
          reference?: string | null
          to_location_id?: string | null
          unit_cost?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          from_location_id?: string | null
          id?: string
          item_id?: string
          move_date?: string | null
          move_type?: string
          notes?: string | null
          quantity?: number
          reference?: string | null
          to_location_id?: string | null
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inv_moves_from_location_id_fkey"
            columns: ["from_location_id"]
            isOneToOne: false
            referencedRelation: "inv_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inv_moves_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inv_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inv_moves_to_location_id_fkey"
            columns: ["to_location_id"]
            isOneToOne: false
            referencedRelation: "inv_locations"
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
      journal_entries: {
        Row: {
          body_encrypted: string
          created_at: string | null
          id: string
          sentiment: number | null
          title_encrypted: string | null
          topics: string[] | null
          user_id: string
        }
        Insert: {
          body_encrypted: string
          created_at?: string | null
          id?: string
          sentiment?: number | null
          title_encrypted?: string | null
          topics?: string[] | null
          user_id: string
        }
        Update: {
          body_encrypted?: string
          created_at?: string | null
          id?: string
          sentiment?: number | null
          title_encrypted?: string | null
          topics?: string[] | null
          user_id?: string
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
      listings: {
        Row: {
          artwork_id: string | null
          auction_type: Database["public"]["Enums"]["auction_type"] | null
          created_at: string | null
          deposit_jrc: number | null
          end_at: string | null
          id: string
          kind: Database["public"]["Enums"]["listing_kind"]
          price_jrc: number
          reserve_price_jrc: number | null
          seller_id: string | null
          start_at: string | null
          status: string | null
        }
        Insert: {
          artwork_id?: string | null
          auction_type?: Database["public"]["Enums"]["auction_type"] | null
          created_at?: string | null
          deposit_jrc?: number | null
          end_at?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["listing_kind"]
          price_jrc: number
          reserve_price_jrc?: number | null
          seller_id?: string | null
          start_at?: string | null
          status?: string | null
        }
        Update: {
          artwork_id?: string | null
          auction_type?: Database["public"]["Enums"]["auction_type"] | null
          created_at?: string | null
          deposit_jrc?: number | null
          end_at?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["listing_kind"]
          price_jrc?: number
          reserve_price_jrc?: number | null
          seller_id?: string | null
          start_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string
          estimated_cost_eur: number | null
          id: string
          meals: Json | null
          shopping_list: Json | null
          user_id: string
          week_start_date: string
        }
        Insert: {
          created_at?: string
          estimated_cost_eur?: number | null
          id?: string
          meals?: Json | null
          shopping_list?: Json | null
          user_id: string
          week_start_date: string
        }
        Update: {
          created_at?: string
          estimated_cost_eur?: number | null
          id?: string
          meals?: Json | null
          shopping_list?: Json | null
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
      meditation_sessions: {
        Row: {
          completed: boolean | null
          duration_minutes: number
          id: string
          mood_after: string | null
          mood_before: string | null
          notes: string | null
          session_date: string
          session_type: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          duration_minutes: number
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          session_date?: string
          session_type: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          duration_minutes?: number
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          session_date?: string
          session_type?: string
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
      mood_entries: {
        Row: {
          context_tags: string[] | null
          created_at: string | null
          emotions: string[] | null
          id: string
          note_encrypted: string | null
          score: number
          user_id: string
        }
        Insert: {
          context_tags?: string[] | null
          created_at?: string | null
          emotions?: string[] | null
          id?: string
          note_encrypted?: string | null
          score: number
          user_id: string
        }
        Update: {
          context_tags?: string[] | null
          created_at?: string | null
          emotions?: string[] | null
          id?: string
          note_encrypted?: string | null
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      mood_tracking: {
        Row: {
          created_at: string
          date: string
          energy_level: number | null
          gratitude_note: string | null
          id: string
          mood_score: number
          sleep_hours: number | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          energy_level?: number | null
          gratitude_note?: string | null
          id?: string
          mood_score: number
          sleep_hours?: number | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          energy_level?: number | null
          gratitude_note?: string | null
          id?: string
          mood_score?: number
          sleep_hours?: number | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
      movijerr_comments: {
        Row: {
          body: string
          created_at: string | null
          id: string
          likes: number | null
          title_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          likes?: number | null
          title_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          title_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movijerr_comments_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "movijerr_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      movijerr_plans: {
        Row: {
          ads_enabled: boolean
          code: string
          created_at: string | null
          downloads_enabled: boolean | null
          id: string
          max_devices: number | null
          name: string
          price_jrc: number
        }
        Insert: {
          ads_enabled?: boolean
          code: string
          created_at?: string | null
          downloads_enabled?: boolean | null
          id?: string
          max_devices?: number | null
          name: string
          price_jrc: number
        }
        Update: {
          ads_enabled?: boolean
          code?: string
          created_at?: string | null
          downloads_enabled?: boolean | null
          id?: string
          max_devices?: number | null
          name?: string
          price_jrc?: number
        }
        Relationships: []
      }
      movijerr_ratings: {
        Row: {
          created_at: string | null
          id: string
          stars: number
          title_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stars: number
          title_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stars?: number
          title_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movijerr_ratings_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "movijerr_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      movijerr_subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          plan_id: string | null
          renewed_at: string | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_id?: string | null
          renewed_at?: string | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_id?: string | null
          renewed_at?: string | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movijerr_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "movijerr_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      movijerr_titles: {
        Row: {
          age_rating: string | null
          backdrop_url: string | null
          created_at: string | null
          duration_minutes: number | null
          featured: boolean | null
          genres: string[] | null
          id: string
          poster_url: string | null
          release_year: number | null
          seasons: number | null
          synopsis: string | null
          title: string
          trailer_url: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          age_rating?: string | null
          backdrop_url?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          featured?: boolean | null
          genres?: string[] | null
          id?: string
          poster_url?: string | null
          release_year?: number | null
          seasons?: number | null
          synopsis?: string | null
          title: string
          trailer_url?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          age_rating?: string | null
          backdrop_url?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          featured?: boolean | null
          genres?: string[] | null
          id?: string
          poster_url?: string | null
          release_year?: number | null
          seasons?: number | null
          synopsis?: string | null
          title?: string
          trailer_url?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      movijerr_transactions: {
        Row: {
          amount_jrc: number
          created_at: string | null
          eur_quote: number | null
          id: string
          kind: string
          person_id: string | null
          title_id: string | null
          tx_ref: Json | null
          user_id: string
        }
        Insert: {
          amount_jrc: number
          created_at?: string | null
          eur_quote?: number | null
          id?: string
          kind: string
          person_id?: string | null
          title_id?: string | null
          tx_ref?: Json | null
          user_id: string
        }
        Update: {
          amount_jrc?: number
          created_at?: string | null
          eur_quote?: number | null
          id?: string
          kind?: string
          person_id?: string | null
          title_id?: string | null
          tx_ref?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movijerr_transactions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movijerr_transactions_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "titles"
            referencedColumns: ["id"]
          },
        ]
      }
      movijerr_watch_history: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          progress_minutes: number | null
          title_id: string
          user_id: string
          watched_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          progress_minutes?: number | null
          title_id: string
          user_id: string
          watched_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          progress_minutes?: number | null
          title_id?: string
          user_id?: string
          watched_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movijerr_watch_history_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "movijerr_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      movijerr_watchlist: {
        Row: {
          added_at: string | null
          id: string
          title_id: string
          user_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          title_id: string
          user_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          title_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movijerr_watchlist_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "movijerr_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsjerr_post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsjerr_post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "newsjerr_post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsjerr_post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "newsjerr_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      newsjerr_post_likes: {
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
            foreignKeyName: "newsjerr_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "newsjerr_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      newsjerr_posts: {
        Row: {
          category: string | null
          comments_count: number | null
          content_data: Json | null
          content_type: string
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          likes_count: number | null
          location: string | null
          media_url: string | null
          published_at: string | null
          shares_count: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          user_id: string
          views_count: number | null
        }
        Insert: {
          category?: string | null
          comments_count?: number | null
          content_data?: Json | null
          content_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          likes_count?: number | null
          location?: string | null
          media_url?: string | null
          published_at?: string | null
          shares_count?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
          views_count?: number | null
        }
        Update: {
          category?: string | null
          comments_count?: number | null
          content_data?: Json | null
          content_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          likes_count?: number | null
          location?: string | null
          media_url?: string | null
          published_at?: string | null
          shares_count?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
          views_count?: number | null
        }
        Relationships: []
      }
      nft_tokens: {
        Row: {
          artwork_id: string | null
          chain: string | null
          created_at: string | null
          edition_no: number | null
          id: string
          metadata_uri: string | null
          mint_addr: string | null
          owner_wallet: string | null
          royalty_bps: number | null
        }
        Insert: {
          artwork_id?: string | null
          chain?: string | null
          created_at?: string | null
          edition_no?: number | null
          id?: string
          metadata_uri?: string | null
          mint_addr?: string | null
          owner_wallet?: string | null
          royalty_bps?: number | null
        }
        Update: {
          artwork_id?: string | null
          chain?: string | null
          created_at?: string | null
          edition_no?: number | null
          id?: string
          metadata_uri?: string | null
          mint_addr?: string | null
          owner_wallet?: string | null
          royalty_bps?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_tokens_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
        ]
      }
      nomination_criteria: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          minimum_nominations: number
          organization_type: string
          position_type: string
          required_skills: Json | null
          validation_threshold: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          minimum_nominations?: number
          organization_type: string
          position_type: string
          required_skills?: Json | null
          validation_threshold?: number
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          minimum_nominations?: number
          organization_type?: string
          position_type?: string
          required_skills?: Json | null
          validation_threshold?: number
        }
        Relationships: []
      }
      nominations: {
        Row: {
          created_at: string
          election_id: string
          id: string
          justification: string
          nominated_person_bio: string | null
          nominated_person_email: string | null
          nominated_person_name: string
          nominator_id: string
          status: string
        }
        Insert: {
          created_at?: string
          election_id: string
          id?: string
          justification: string
          nominated_person_bio?: string | null
          nominated_person_email?: string | null
          nominated_person_name: string
          nominator_id: string
          status?: string
        }
        Update: {
          created_at?: string
          election_id?: string
          id?: string
          justification?: string
          nominated_person_bio?: string | null
          nominated_person_email?: string | null
          nominated_person_name?: string
          nominator_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "nominations_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_tracking: {
        Row: {
          calories_consumed: number | null
          carbs_g: number | null
          created_at: string
          date: string
          fat_g: number | null
          id: string
          meals: Json | null
          protein_g: number | null
          user_id: string
          water_liters: number | null
        }
        Insert: {
          calories_consumed?: number | null
          carbs_g?: number | null
          created_at?: string
          date?: string
          fat_g?: number | null
          id?: string
          meals?: Json | null
          protein_g?: number | null
          user_id: string
          water_liters?: number | null
        }
        Update: {
          calories_consumed?: number | null
          carbs_g?: number | null
          created_at?: string
          date?: string
          fat_g?: number | null
          id?: string
          meals?: Json | null
          protein_g?: number | null
          user_id?: string
          water_liters?: number | null
        }
        Relationships: []
      }
      offers: {
        Row: {
          amount_jrc: number
          artwork_id: string | null
          created_at: string | null
          expires_at: string | null
          from_id: string | null
          id: string
          message: string | null
          status: string | null
          to_id: string | null
        }
        Insert: {
          amount_jrc: number
          artwork_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          from_id?: string | null
          id?: string
          message?: string | null
          status?: string | null
          to_id?: string | null
        }
        Update: {
          amount_jrc?: number
          artwork_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          from_id?: string | null
          id?: string
          message?: string | null
          status?: string | null
          to_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      ohs_candidates: {
        Row: {
          acceptance_status: string
          created_at: string
          election_id: string
          experience_summary: string | null
          health_specialization: string[] | null
          id: string
          medical_credentials: string | null
          nomination_count: number
          person_bio: string | null
          person_email: string | null
          person_name: string
          profile_image_url: string | null
          round_qualified: number
          updated_at: string
          vision_statement: string | null
        }
        Insert: {
          acceptance_status?: string
          created_at?: string
          election_id: string
          experience_summary?: string | null
          health_specialization?: string[] | null
          id?: string
          medical_credentials?: string | null
          nomination_count?: number
          person_bio?: string | null
          person_email?: string | null
          person_name: string
          profile_image_url?: string | null
          round_qualified: number
          updated_at?: string
          vision_statement?: string | null
        }
        Update: {
          acceptance_status?: string
          created_at?: string
          election_id?: string
          experience_summary?: string | null
          health_specialization?: string[] | null
          id?: string
          medical_credentials?: string | null
          nomination_count?: number
          person_bio?: string | null
          person_email?: string | null
          person_name?: string
          profile_image_url?: string | null
          round_qualified?: number
          updated_at?: string
          vision_statement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ohs_candidates_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "ohs_elections"
            referencedColumns: ["id"]
          },
        ]
      }
      ohs_citizen_consultations: {
        Row: {
          background_information: string | null
          consultation_question: string
          consultation_title: string
          consultation_type: string
          created_at: string
          end_date: string
          id: string
          results_summary: Json | null
          start_date: string
          status: string
          target_audience: string
          total_participants: number | null
          updated_at: string
        }
        Insert: {
          background_information?: string | null
          consultation_question: string
          consultation_title: string
          consultation_type: string
          created_at?: string
          end_date: string
          id?: string
          results_summary?: Json | null
          start_date: string
          status?: string
          target_audience?: string
          total_participants?: number | null
          updated_at?: string
        }
        Update: {
          background_information?: string | null
          consultation_question?: string
          consultation_title?: string
          consultation_type?: string
          created_at?: string
          end_date?: string
          id?: string
          results_summary?: Json | null
          start_date?: string
          status?: string
          target_audience?: string
          total_participants?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ohs_consultation_responses: {
        Row: {
          consultation_id: string
          created_at: string
          id: string
          participant_expertise_level: string | null
          participant_id: string
          participant_location: string | null
          response_data: Json
        }
        Insert: {
          consultation_id: string
          created_at?: string
          id?: string
          participant_expertise_level?: string | null
          participant_id: string
          participant_location?: string | null
          response_data: Json
        }
        Update: {
          consultation_id?: string
          created_at?: string
          id?: string
          participant_expertise_level?: string | null
          participant_id?: string
          participant_location?: string | null
          response_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ohs_consultation_responses_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "ohs_citizen_consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      ohs_council_members: {
        Row: {
          created_at: string
          department: string | null
          election_id: string | null
          expertise_areas: string[] | null
          id: string
          is_active: boolean
          name: string
          position: string
          qualifications: string | null
          region: string | null
          salary_eur_annual: number | null
          term_end: string | null
          term_start: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          election_id?: string | null
          expertise_areas?: string[] | null
          id?: string
          is_active?: boolean
          name: string
          position: string
          qualifications?: string | null
          region?: string | null
          salary_eur_annual?: number | null
          term_end?: string | null
          term_start?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          election_id?: string | null
          expertise_areas?: string[] | null
          id?: string
          is_active?: boolean
          name?: string
          position?: string
          qualifications?: string | null
          region?: string | null
          salary_eur_annual?: number | null
          term_end?: string | null
          term_start?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ohs_elections: {
        Row: {
          created_at: string
          current_round: number
          description: string | null
          id: string
          position: string
          region: string | null
          round_1_end_date: string
          round_1_start_date: string
          round_2_end_date: string | null
          round_2_start_date: string | null
          round_3_end_date: string | null
          round_3_start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_round?: number
          description?: string | null
          id?: string
          position: string
          region?: string | null
          round_1_end_date: string
          round_1_start_date?: string
          round_2_end_date?: string | null
          round_2_start_date?: string | null
          round_3_end_date?: string | null
          round_3_start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_round?: number
          description?: string | null
          id?: string
          position?: string
          region?: string | null
          round_1_end_date?: string
          round_1_start_date?: string
          round_2_end_date?: string | null
          round_2_start_date?: string | null
          round_3_end_date?: string | null
          round_3_start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ohs_emergency_missions: {
        Row: {
          actual_end_date: string | null
          affected_region: string
          budget_allocated_usd: number | null
          created_at: string
          crisis_type: string
          daily_reports: Json | null
          deployed_personnel: string[] | null
          estimated_end_date: string | null
          id: string
          lessons_learned: string | null
          mission_leader_id: string | null
          mission_name: string
          mission_status: string
          severity_level: string
          start_date: string
          success_metrics: Json | null
          updated_at: string
        }
        Insert: {
          actual_end_date?: string | null
          affected_region: string
          budget_allocated_usd?: number | null
          created_at?: string
          crisis_type: string
          daily_reports?: Json | null
          deployed_personnel?: string[] | null
          estimated_end_date?: string | null
          id?: string
          lessons_learned?: string | null
          mission_leader_id?: string | null
          mission_name: string
          mission_status?: string
          severity_level: string
          start_date: string
          success_metrics?: Json | null
          updated_at?: string
        }
        Update: {
          actual_end_date?: string | null
          affected_region?: string
          budget_allocated_usd?: number | null
          created_at?: string
          crisis_type?: string
          daily_reports?: Json | null
          deployed_personnel?: string[] | null
          estimated_end_date?: string | null
          id?: string
          lessons_learned?: string | null
          mission_leader_id?: string | null
          mission_name?: string
          mission_status?: string
          severity_level?: string
          start_date?: string
          success_metrics?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      ohs_intervention_force: {
        Row: {
          availability_regions: string[] | null
          created_at: string
          current_status: string
          deployment_history: Json | null
          emergency_contact: string | null
          id: string
          languages: string[] | null
          medical_credentials: string
          member_email: string
          member_name: string
          security_clearance_level: string | null
          specialization: string
          updated_at: string
        }
        Insert: {
          availability_regions?: string[] | null
          created_at?: string
          current_status?: string
          deployment_history?: Json | null
          emergency_contact?: string | null
          id?: string
          languages?: string[] | null
          medical_credentials: string
          member_email: string
          member_name: string
          security_clearance_level?: string | null
          specialization: string
          updated_at?: string
        }
        Update: {
          availability_regions?: string[] | null
          created_at?: string
          current_status?: string
          deployment_history?: Json | null
          emergency_contact?: string | null
          id?: string
          languages?: string[] | null
          medical_credentials?: string
          member_email?: string
          member_name?: string
          security_clearance_level?: string | null
          specialization?: string
          updated_at?: string
        }
        Relationships: []
      }
      ohs_nominations: {
        Row: {
          created_at: string
          election_id: string
          id: string
          justification_text: string | null
          medical_credentials: string | null
          nominated_person_bio: string | null
          nominated_person_email: string | null
          nominated_person_name: string
          nominator_id: string
        }
        Insert: {
          created_at?: string
          election_id: string
          id?: string
          justification_text?: string | null
          medical_credentials?: string | null
          nominated_person_bio?: string | null
          nominated_person_email?: string | null
          nominated_person_name: string
          nominator_id: string
        }
        Update: {
          created_at?: string
          election_id?: string
          id?: string
          justification_text?: string | null
          medical_credentials?: string | null
          nominated_person_bio?: string | null
          nominated_person_email?: string | null
          nominated_person_name?: string
          nominator_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ohs_nominations_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "ohs_elections"
            referencedColumns: ["id"]
          },
        ]
      }
      ohs_proposal_votes: {
        Row: {
          created_at: string
          expertise_weight: number | null
          id: string
          justification: string | null
          proposal_id: string
          vote_type: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          expertise_weight?: number | null
          id?: string
          justification?: string | null
          proposal_id: string
          vote_type: string
          voter_id: string
        }
        Update: {
          created_at?: string
          expertise_weight?: number | null
          id?: string
          justification?: string | null
          proposal_id?: string
          vote_type?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ohs_proposal_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "ohs_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      ohs_proposals: {
        Row: {
          category: string
          created_at: string
          description: string
          estimated_budget_eur: number | null
          expected_health_impact: string | null
          health_priority_level: string
          id: string
          implementation_timeline: string | null
          proposed_by: string
          status: string
          supporting_evidence: string | null
          target_regions: string[] | null
          title: string
          updated_at: string
          votes_abstain: number | null
          votes_against: number | null
          votes_for: number | null
          voting_end_date: string | null
          voting_start_date: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          estimated_budget_eur?: number | null
          expected_health_impact?: string | null
          health_priority_level?: string
          id?: string
          implementation_timeline?: string | null
          proposed_by: string
          status?: string
          supporting_evidence?: string | null
          target_regions?: string[] | null
          title: string
          updated_at?: string
          votes_abstain?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_end_date?: string | null
          voting_start_date?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          estimated_budget_eur?: number | null
          expected_health_impact?: string | null
          health_priority_level?: string
          id?: string
          implementation_timeline?: string | null
          proposed_by?: string
          status?: string
          supporting_evidence?: string | null
          target_regions?: string[] | null
          title?: string
          updated_at?: string
          votes_abstain?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_end_date?: string | null
          voting_start_date?: string | null
        }
        Relationships: []
      }
      ohs_votes: {
        Row: {
          candidate_id: string
          created_at: string
          election_id: string
          id: string
          round_number: number
          voter_id: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          election_id: string
          id?: string
          round_number: number
          voter_id: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          election_id?: string
          id?: string
          round_number?: number
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ohs_votes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "ohs_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ohs_votes_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "ohs_elections"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount_jrc: number
          created_at: string
          fee_jrc: number | null
          id: string
          inhabitant_id: string
          lines: Json
          meta: Json | null
          pro_id: string
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
        }
        Insert: {
          amount_jrc: number
          created_at?: string
          fee_jrc?: number | null
          id?: string
          inhabitant_id: string
          lines?: Json
          meta?: Json | null
          pro_id: string
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Update: {
          amount_jrc?: number
          created_at?: string
          fee_jrc?: number | null
          id?: string
          inhabitant_id?: string
          lines?: Json
          meta?: Json | null
          pro_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      organizational_organs: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          multisig_signers: number | null
          multisig_threshold: number | null
          name: string
          organ_type: Database["public"]["Enums"]["organ_type"]
          smart_contract_address: string | null
          spend_limits: Json | null
          territorial_entity_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          multisig_signers?: number | null
          multisig_threshold?: number | null
          name: string
          organ_type: Database["public"]["Enums"]["organ_type"]
          smart_contract_address?: string | null
          spend_limits?: Json | null
          territorial_entity_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          multisig_signers?: number | null
          multisig_threshold?: number | null
          name?: string
          organ_type?: Database["public"]["Enums"]["organ_type"]
          smart_contract_address?: string | null
          spend_limits?: Json | null
          territorial_entity_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizational_organs_territorial_entity_id_fkey"
            columns: ["territorial_entity_id"]
            isOneToOne: false
            referencedRelation: "territorial_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          bio: string | null
          celebrity_token_id: string | null
          created_at: string | null
          display_name: string
          id: string
          joyjerr_profile_url: string | null
          photo_url: string | null
          role_tags: string[] | null
        }
        Insert: {
          bio?: string | null
          celebrity_token_id?: string | null
          created_at?: string | null
          display_name: string
          id?: string
          joyjerr_profile_url?: string | null
          photo_url?: string | null
          role_tags?: string[] | null
        }
        Update: {
          bio?: string | null
          celebrity_token_id?: string | null
          created_at?: string | null
          display_name?: string
          id?: string
          joyjerr_profile_url?: string | null
          photo_url?: string | null
          role_tags?: string[] | null
        }
        Relationships: []
      }
      perjr_changes: {
        Row: {
          amount_eur: number
          created_at: string
          id: string
          jrc_credited: number
          payment_intent_id: string | null
          quote_expires_at: string | null
          quote_id: string | null
          rate_eur_per_jrc: number
          status: string
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_eur: number
          created_at?: string
          id?: string
          jrc_credited: number
          payment_intent_id?: string | null
          quote_expires_at?: string | null
          quote_id?: string | null
          rate_eur_per_jrc: number
          status: string
          tier: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_eur?: number
          created_at?: string
          id?: string
          jrc_credited?: number
          payment_intent_id?: string | null
          quote_expires_at?: string | null
          quote_id?: string | null
          rate_eur_per_jrc?: number
          status?: string
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      perjr_rules: {
        Row: {
          base_rate_eur_per_jrc: number
          bronze_min_eur: number
          bronze_rate_eur_per_jrc: number
          created_at: string
          eligibility_birthyear_max: number
          gold_min_eur: number
          gold_rate_eur_per_jrc: number
          id: boolean
          quote_lock_minutes: number
          silver_min_eur: number
          silver_rate_eur_per_jrc: number
          updated_at: string
        }
        Insert: {
          base_rate_eur_per_jrc?: number
          bronze_min_eur?: number
          bronze_rate_eur_per_jrc?: number
          created_at?: string
          eligibility_birthyear_max?: number
          gold_min_eur?: number
          gold_rate_eur_per_jrc?: number
          id?: boolean
          quote_lock_minutes?: number
          silver_min_eur?: number
          silver_rate_eur_per_jrc?: number
          updated_at?: string
        }
        Update: {
          base_rate_eur_per_jrc?: number
          bronze_min_eur?: number
          bronze_rate_eur_per_jrc?: number
          created_at?: string
          eligibility_birthyear_max?: number
          gold_min_eur?: number
          gold_rate_eur_per_jrc?: number
          id?: boolean
          quote_lock_minutes?: number
          silver_min_eur?: number
          silver_rate_eur_per_jrc?: number
          updated_at?: string
        }
        Relationships: []
      }
      pet_care_records: {
        Row: {
          care_date: string
          care_type: string
          cost_eur: number | null
          created_at: string
          documents: string[] | null
          id: string
          next_appointment: string | null
          notes: string | null
          pet_id: string
          vet_name: string | null
        }
        Insert: {
          care_date: string
          care_type: string
          cost_eur?: number | null
          created_at?: string
          documents?: string[] | null
          id?: string
          next_appointment?: string | null
          notes?: string | null
          pet_id: string
          vet_name?: string | null
        }
        Update: {
          care_date?: string
          care_type?: string
          cost_eur?: number | null
          created_at?: string
          documents?: string[] | null
          id?: string
          next_appointment?: string | null
          notes?: string | null
          pet_id?: string
          vet_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_care_records_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_locations: {
        Row: {
          id: string
          is_safe_zone: boolean | null
          latitude: number
          location_name: string | null
          longitude: number
          pet_id: string
          tracked_at: string
        }
        Insert: {
          id?: string
          is_safe_zone?: boolean | null
          latitude: number
          location_name?: string | null
          longitude: number
          pet_id: string
          tracked_at?: string
        }
        Update: {
          id?: string
          is_safe_zone?: boolean | null
          latitude?: number
          location_name?: string | null
          longitude?: number
          pet_id?: string
          tracked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_locations_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_profiles: {
        Row: {
          birth_date: string | null
          breed: string | null
          created_at: string
          id: string
          medical_notes: string | null
          microchip_id: string | null
          name: string
          owner_id: string
          photos: string[] | null
          species: string
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          birth_date?: string | null
          breed?: string | null
          created_at?: string
          id?: string
          medical_notes?: string | null
          microchip_id?: string | null
          name: string
          owner_id: string
          photos?: string[] | null
          species: string
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          birth_date?: string | null
          breed?: string | null
          created_at?: string
          id?: string
          medical_notes?: string | null
          microchip_id?: string | null
          name?: string
          owner_id?: string
          photos?: string[] | null
          species?: string
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      petition_signatures: {
        Row: {
          created_at: string
          id: string
          petition_id: string
          signer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          petition_id: string
          signer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          petition_id?: string
          signer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "petition_signatures_petition_id_fkey"
            columns: ["petition_id"]
            isOneToOne: false
            referencedRelation: "candidate_petitions"
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
      printful_products: {
        Row: {
          base_price_eur: number
          category: string
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          name: string
          price_jrc: number
          printful_id: string
          printful_sync_at: string | null
          shipping_info: Json | null
          size_guide: Json | null
          sku: string
          subcategory: string | null
          tags: string[] | null
          updated_at: string | null
          variants: Json | null
        }
        Insert: {
          base_price_eur: number
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name: string
          price_jrc: number
          printful_id: string
          printful_sync_at?: string | null
          shipping_info?: Json | null
          size_guide?: Json | null
          sku: string
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string | null
          variants?: Json | null
        }
        Update: {
          base_price_eur?: number
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name?: string
          price_jrc?: number
          printful_id?: string
          printful_sync_at?: string | null
          shipping_info?: Json | null
          size_guide?: Json | null
          sku?: string
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string | null
          variants?: Json | null
        }
        Relationships: []
      }
      printful_webhooks: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          order_id: string | null
          payload: Json
          printful_order_id: string | null
          processed: boolean | null
          processed_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          order_id?: string | null
          payload: Json
          printful_order_id?: string | null
          processed?: boolean | null
          processed_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          order_id?: string | null
          payload?: Json
          printful_order_id?: string | null
          processed?: boolean | null
          processed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "printful_webhooks_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_documents: {
        Row: {
          expires_at: string | null
          id: string
          name: string
          pro_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          type: string
          uploaded_at: string
          url: string
        }
        Insert: {
          expires_at?: string | null
          id?: string
          name: string
          pro_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          type: string
          uploaded_at?: string
          url: string
        }
        Update: {
          expires_at?: string | null
          id?: string
          name?: string
          pro_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          type?: string
          uploaded_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "pro_documents_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          inhabitant_id: string
          pro_id: string
          rating: number
          tags: string[] | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          inhabitant_id: string
          pro_id: string
          rating: number
          tags?: string[] | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          inhabitant_id?: string
          pro_id?: string
          rating?: number
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "pro_reviews_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_staff: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          pro_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          pro_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          pro_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pro_staff_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_transactions: {
        Row: {
          amount_jrc: number
          fee_jrc: number | null
          id: string
          meta: Json | null
          occurred_at: string
          pro_id: string | null
          settled_at: string | null
          source_id: string | null
          source_type: string
          status: Database["public"]["Enums"]["transaction_status"]
          wallet_id: string
        }
        Insert: {
          amount_jrc: number
          fee_jrc?: number | null
          id?: string
          meta?: Json | null
          occurred_at?: string
          pro_id?: string | null
          settled_at?: string | null
          source_id?: string | null
          source_type: string
          status?: Database["public"]["Enums"]["transaction_status"]
          wallet_id: string
        }
        Update: {
          amount_jrc?: number
          fee_jrc?: number | null
          id?: string
          meta?: Json | null
          occurred_at?: string
          pro_id?: string | null
          settled_at?: string | null
          source_id?: string | null
          source_type?: string
          status?: Database["public"]["Enums"]["transaction_status"]
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pro_transactions_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pro_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
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
          privacy_level: string | null
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
          privacy_level?: string | null
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
          privacy_level?: string | null
          updated_at?: string | null
          username?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      program_progress: {
        Row: {
          adherence_pct: number | null
          completed_at: string | null
          created_at: string | null
          current_step: number | null
          id: string
          program_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          adherence_pct?: number | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          program_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          adherence_pct?: number | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          program_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_progress_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "wellness_programs"
            referencedColumns: ["id"]
          },
        ]
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
      pros: {
        Row: {
          certification_status: Database["public"]["Enums"]["certification_status"]
          company_name: string | null
          created_at: string
          id: string
          is_premium: boolean | null
          kyb_level: number
          score_fiabilite: number | null
          siret: string | null
          status: Database["public"]["Enums"]["pro_status"]
          tags: string[] | null
          type: Database["public"]["Enums"]["pro_type"]
          updated_at: string
          user_id: string
          wallet_id: string | null
          zones: string[] | null
        }
        Insert: {
          certification_status?: Database["public"]["Enums"]["certification_status"]
          company_name?: string | null
          created_at?: string
          id?: string
          is_premium?: boolean | null
          kyb_level?: number
          score_fiabilite?: number | null
          siret?: string | null
          status?: Database["public"]["Enums"]["pro_status"]
          tags?: string[] | null
          type: Database["public"]["Enums"]["pro_type"]
          updated_at?: string
          user_id: string
          wallet_id?: string | null
          zones?: string[] | null
        }
        Update: {
          certification_status?: Database["public"]["Enums"]["certification_status"]
          company_name?: string | null
          created_at?: string
          id?: string
          is_premium?: boolean | null
          kyb_level?: number
          score_fiabilite?: number | null
          siret?: string | null
          status?: Database["public"]["Enums"]["pro_status"]
          tags?: string[] | null
          type?: Database["public"]["Enums"]["pro_type"]
          updated_at?: string
          user_id?: string
          wallet_id?: string | null
          zones?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "pros_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      random_selections: {
        Row: {
          blockchain_hash: string | null
          id: string
          is_active: boolean
          organization_type: string
          performed_at: string
          performed_by: string | null
          position_type: string
          selected_person_id: string | null
          selection_criteria: Json | null
          selection_method: string
        }
        Insert: {
          blockchain_hash?: string | null
          id?: string
          is_active?: boolean
          organization_type: string
          performed_at?: string
          performed_by?: string | null
          position_type: string
          selected_person_id?: string | null
          selection_criteria?: Json | null
          selection_method?: string
        }
        Update: {
          blockchain_hash?: string | null
          id?: string
          is_active?: boolean
          organization_type?: string
          performed_at?: string
          performed_by?: string | null
          position_type?: string
          selected_person_id?: string | null
          selection_criteria?: Json | null
          selection_method?: string
        }
        Relationships: [
          {
            foreignKeyName: "random_selections_selected_person_id_fkey"
            columns: ["selected_person_id"]
            isOneToOne: false
            referencedRelation: "eligible_pool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "random_selections_selected_person_id_fkey"
            columns: ["selected_person_id"]
            isOneToOne: false
            referencedRelation: "eligible_pool_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      resident_nominations: {
        Row: {
          created_at: string
          id: string
          nominated_person_bio: string | null
          nominated_person_email: string | null
          nominated_person_name: string
          nomination_reason: string
          nominator_id: string
          organization_type: string
          position_type: string
          status: string
          supporting_evidence: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          nominated_person_bio?: string | null
          nominated_person_email?: string | null
          nominated_person_name: string
          nomination_reason: string
          nominator_id: string
          organization_type: string
          position_type: string
          status?: string
          supporting_evidence?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nominated_person_bio?: string | null
          nominated_person_email?: string | null
          nominated_person_name?: string
          nomination_reason?: string
          nominator_id?: string
          organization_type?: string
          position_type?: string
          status?: string
          supporting_evidence?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rewards_ledger: {
        Row: {
          action_key: string
          awarded_at: string | null
          bundle_id: string | null
          event_ids: string[] | null
          id: string
          jrc_amount: number
          metadata: Json | null
          transaction_hash: string | null
          universe: string
          user_id: string
        }
        Insert: {
          action_key: string
          awarded_at?: string | null
          bundle_id?: string | null
          event_ids?: string[] | null
          id?: string
          jrc_amount: number
          metadata?: Json | null
          transaction_hash?: string | null
          universe: string
          user_id: string
        }
        Update: {
          action_key?: string
          awarded_at?: string | null
          bundle_id?: string | null
          event_ids?: string[] | null
          id?: string
          jrc_amount?: number
          metadata?: Json | null
          transaction_hash?: string | null
          universe?: string
          user_id?: string
        }
        Relationships: []
      }
      run_steps: {
        Row: {
          duration_ms: number | null
          error_msg: string | null
          finished_at: string | null
          id: string
          input_json: Json | null
          name: string
          node_id: string
          output_json: Json | null
          run_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["step_status"]
          step_order: number
        }
        Insert: {
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          input_json?: Json | null
          name: string
          node_id: string
          output_json?: Json | null
          run_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["step_status"]
          step_order: number
        }
        Update: {
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          input_json?: Json | null
          name?: string
          node_id?: string
          output_json?: Json | null
          run_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["step_status"]
          step_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "run_steps_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
        ]
      }
      runs: {
        Row: {
          created_by: string | null
          duration_ms: number | null
          error_msg: string | null
          finished_at: string | null
          id: string
          started_at: string
          status: Database["public"]["Enums"]["run_status"]
          trace_id: string | null
          trigger_id: string | null
          trigger_payload_json: Json | null
          version_id: string
          workflow_id: string
        }
        Insert: {
          created_by?: string | null
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["run_status"]
          trace_id?: string | null
          trigger_id?: string | null
          trigger_payload_json?: Json | null
          version_id: string
          workflow_id: string
        }
        Update: {
          created_by?: string | null
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["run_status"]
          trace_id?: string | null
          trigger_id?: string | null
          trigger_payload_json?: Json | null
          version_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "runs_trigger_id_fkey"
            columns: ["trigger_id"]
            isOneToOne: false
            referencedRelation: "triggers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "runs_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "workflow_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
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
      shipments: {
        Row: {
          carrier: string | null
          conditions: Json | null
          created_at: string | null
          delivered_at: string | null
          delivery_proof_url: string | null
          id: string
          insured_value_jrc: number | null
          order_id: string | null
          status: string | null
          tracking: string | null
        }
        Insert: {
          carrier?: string | null
          conditions?: Json | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_proof_url?: string | null
          id?: string
          insured_value_jrc?: number | null
          order_id?: string | null
          status?: string | null
          tracking?: string | null
        }
        Update: {
          carrier?: string | null
          conditions?: Json | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_proof_url?: string | null
          id?: string
          insured_value_jrc?: number | null
          order_id?: string | null
          status?: string | null
          tracking?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "art_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_disputes: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          customer_id: string
          customer_notes: string | null
          description: string
          dispute_type: string
          evidence_urls: string[] | null
          id: string
          order_id: string
          priority: string | null
          resolution_amount: number | null
          resolution_type: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          title: string
          updated_at: string | null
          vendor_id: string | null
          vendor_notes: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          customer_id: string
          customer_notes?: string | null
          description: string
          dispute_type: string
          evidence_urls?: string[] | null
          id?: string
          order_id: string
          priority?: string | null
          resolution_amount?: number | null
          resolution_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          vendor_id?: string | null
          vendor_notes?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          customer_id?: string
          customer_notes?: string | null
          description?: string
          dispute_type?: string
          evidence_urls?: string[] | null
          id?: string
          order_id?: string
          priority?: string | null
          resolution_amount?: number | null
          resolution_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          vendor_id?: string | null
          vendor_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shop_disputes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_order_items: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          order_id: string
          printful_product_id: string | null
          product_id: string | null
          quantity: number
          sku: string | null
          total_price: number
          unit_price: number
          variant_info: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          order_id: string
          printful_product_id?: string | null
          product_id?: string | null
          quantity?: number
          sku?: string | null
          total_price: number
          unit_price: number
          variant_info?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          order_id?: string
          printful_product_id?: string | null
          product_id?: string | null
          quantity?: number
          sku?: string | null
          total_price?: number
          unit_price?: number
          variant_info?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "shop_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "printful_products"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_orders: {
        Row: {
          billing_address: Json | null
          commission_amount: number | null
          commission_rate: number | null
          created_at: string | null
          currency: string | null
          customer_id: string
          delivered_at: string | null
          id: string
          metadata: Json | null
          order_items: Json
          order_number: string
          payment_method: string | null
          printful_order_id: string | null
          shipped_at: string | null
          shipping_address: Json
          shipping_amount: number | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string | null
          currency?: string | null
          customer_id: string
          delivered_at?: string | null
          id?: string
          metadata?: Json | null
          order_items?: Json
          order_number: string
          payment_method?: string | null
          printful_order_id?: string | null
          shipped_at?: string | null
          shipping_address: Json
          shipping_amount?: number | null
          status?: string | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string
          delivered_at?: string | null
          id?: string
          metadata?: Json | null
          order_items?: Json
          order_number?: string
          payment_method?: string | null
          printful_order_id?: string | null
          shipped_at?: string | null
          shipping_address?: Json
          shipping_amount?: number | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: []
      }
      shop_returns: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          created_at: string | null
          customer_id: string
          customer_notes: string | null
          id: string
          order_id: string
          processed_at: string | null
          reason: string
          received_at: string | null
          refund_amount: number | null
          refunded_at: string | null
          restocking_fee: number | null
          return_address: Json | null
          return_items: Json
          return_label_url: string | null
          return_number: string
          shipped_at: string | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          created_at?: string | null
          customer_id: string
          customer_notes?: string | null
          id?: string
          order_id: string
          processed_at?: string | null
          reason: string
          received_at?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          restocking_fee?: number | null
          return_address?: Json | null
          return_items?: Json
          return_label_url?: string | null
          return_number: string
          shipped_at?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          created_at?: string | null
          customer_id?: string
          customer_notes?: string | null
          id?: string
          order_id?: string
          processed_at?: string | null
          reason?: string
          received_at?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          restocking_fee?: number | null
          return_address?: Json | null
          return_items?: Json
          return_label_url?: string | null
          return_number?: string
          shipped_at?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shop_returns_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_content: {
        Row: {
          audio_url: string
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_premium: boolean | null
          tags: string[] | null
          title: string
          type: string | null
        }
        Insert: {
          audio_url: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_premium?: boolean | null
          tags?: string[] | null
          title: string
          type?: string | null
        }
        Update: {
          audio_url?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_premium?: boolean | null
          tags?: string[] | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      sleep_sessions: {
        Row: {
          content_id: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          rating: number | null
          session_date: string | null
          sleep_quality: number | null
          user_id: string
        }
        Insert: {
          content_id?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          rating?: number | null
          session_date?: string | null
          sleep_quality?: number | null
          user_id: string
        }
        Update: {
          content_id?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          rating?: number | null
          session_date?: string | null
          sleep_quality?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_sessions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "sleep_content"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "fk_smad_listings_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
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
      smart_contracts_registry: {
        Row: {
          contract_abi: Json | null
          contract_address: string
          contract_type: string
          deployment_date: string
          description: string | null
          id: string
          is_active: boolean
          territorial_entity_id: string
          version: string | null
        }
        Insert: {
          contract_abi?: Json | null
          contract_address: string
          contract_type: string
          deployment_date?: string
          description?: string | null
          id?: string
          is_active?: boolean
          territorial_entity_id: string
          version?: string | null
        }
        Update: {
          contract_abi?: Json | null
          contract_address?: string
          contract_type?: string
          deployment_date?: string
          description?: string | null
          id?: string
          is_active?: boolean
          territorial_entity_id?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smart_contracts_registry_territorial_entity_id_fkey"
            columns: ["territorial_entity_id"]
            isOneToOne: false
            referencedRelation: "territorial_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      stress_assessments: {
        Row: {
          assessment_date: string | null
          coping_strategies: string[] | null
          factors: string[] | null
          id: string
          score: number | null
          user_id: string
        }
        Insert: {
          assessment_date?: string | null
          coping_strategies?: string[] | null
          factors?: string[] | null
          id?: string
          score?: number | null
          user_id: string
        }
        Update: {
          assessment_date?: string | null
          coping_strategies?: string[] | null
          factors?: string[] | null
          id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["workflow_role"]
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workflow_role"]
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workflow_role"]
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string
          created_at: string | null
          creator_id: string | null
          default_graph_json: Json | null
          description: string | null
          icon: string | null
          id: string
          is_featured: boolean | null
          is_premium: boolean | null
          is_public: boolean | null
          name: string
          preview_md: string | null
          preview_url: string | null
          price_cents: number | null
          rating_average: number | null
          rating_count: number | null
          required_providers: string[] | null
          style_config: Json | null
          summary: string | null
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
          default_graph_json?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          is_public?: boolean | null
          name: string
          preview_md?: string | null
          preview_url?: string | null
          price_cents?: number | null
          rating_average?: number | null
          rating_count?: number | null
          required_providers?: string[] | null
          style_config?: Json | null
          summary?: string | null
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
          default_graph_json?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          is_public?: boolean | null
          name?: string
          preview_md?: string | null
          preview_url?: string | null
          price_cents?: number | null
          rating_average?: number | null
          rating_count?: number | null
          required_providers?: string[] | null
          style_config?: Json | null
          summary?: string | null
          tags?: string[] | null
          template_data?: Json
          thumbnail_url?: string | null
          ui_components?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      territorial_budgets: {
        Row: {
          allocated_amount: number
          budget_category: string | null
          budget_year: number
          committed_amount: number | null
          created_at: string
          id: string
          is_participatory: boolean | null
          organ_type: Database["public"]["Enums"]["organ_type"]
          smart_contract_address: string | null
          spent_amount: number | null
          territorial_entity_id: string
          updated_at: string
        }
        Insert: {
          allocated_amount: number
          budget_category?: string | null
          budget_year: number
          committed_amount?: number | null
          created_at?: string
          id?: string
          is_participatory?: boolean | null
          organ_type: Database["public"]["Enums"]["organ_type"]
          smart_contract_address?: string | null
          spent_amount?: number | null
          territorial_entity_id: string
          updated_at?: string
        }
        Update: {
          allocated_amount?: number
          budget_category?: string | null
          budget_year?: number
          committed_amount?: number | null
          created_at?: string
          id?: string
          is_participatory?: boolean | null
          organ_type?: Database["public"]["Enums"]["organ_type"]
          smart_contract_address?: string | null
          spent_amount?: number | null
          territorial_entity_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "territorial_budgets_territorial_entity_id_fkey"
            columns: ["territorial_entity_id"]
            isOneToOne: false
            referencedRelation: "territorial_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      territorial_entities: {
        Row: {
          address: string | null
          budget_annual: number | null
          coordinates: Json | null
          created_at: string
          id: string
          is_active: boolean
          level: Database["public"]["Enums"]["territorial_level"]
          name: string
          parent_id: string | null
          population: number | null
          postal_code: string | null
          region: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          budget_annual?: number | null
          coordinates?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          level: Database["public"]["Enums"]["territorial_level"]
          name: string
          parent_id?: string | null
          population?: number | null
          postal_code?: string | null
          region?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          budget_annual?: number | null
          coordinates?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          level?: Database["public"]["Enums"]["territorial_level"]
          name?: string
          parent_id?: string | null
          population?: number | null
          postal_code?: string | null
          region?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "territorial_entities_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "territorial_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      territorial_kpis: {
        Row: {
          created_at: string
          id: string
          kpi_category: string
          kpi_name: string
          kpi_target: number | null
          kpi_value: number | null
          measurement_date: string
          metadata: Json | null
          organ_id: string | null
          territorial_entity_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kpi_category: string
          kpi_name: string
          kpi_target?: number | null
          kpi_value?: number | null
          measurement_date?: string
          metadata?: Json | null
          organ_id?: string | null
          territorial_entity_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kpi_category?: string
          kpi_name?: string
          kpi_target?: number | null
          kpi_value?: number | null
          measurement_date?: string
          metadata?: Json | null
          organ_id?: string | null
          territorial_entity_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "territorial_kpis_organ_id_fkey"
            columns: ["organ_id"]
            isOneToOne: false
            referencedRelation: "organizational_organs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "territorial_kpis_territorial_entity_id_fkey"
            columns: ["territorial_entity_id"]
            isOneToOne: false
            referencedRelation: "territorial_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      territorial_positions: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          is_revocable: boolean
          kpis: Json | null
          mandate_end: string | null
          mandate_start: string | null
          organ_id: string
          portfolio_areas: string[] | null
          position_type: Database["public"]["Enums"]["position_type"]
          salary_annual_eur: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          is_revocable?: boolean
          kpis?: Json | null
          mandate_end?: string | null
          mandate_start?: string | null
          organ_id: string
          portfolio_areas?: string[] | null
          position_type: Database["public"]["Enums"]["position_type"]
          salary_annual_eur?: number | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          is_revocable?: boolean
          kpis?: Json | null
          mandate_end?: string | null
          mandate_start?: string | null
          organ_id?: string
          portfolio_areas?: string[] | null
          position_type?: Database["public"]["Enums"]["position_type"]
          salary_annual_eur?: number | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "territorial_positions_organ_id_fkey"
            columns: ["organ_id"]
            isOneToOne: false
            referencedRelation: "organizational_organs"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_revisions: {
        Row: {
          created_at: string
          created_by: string | null
          diff: Json
          id: string
          snapshot_url: string | null
          theme_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          diff: Json
          id?: string
          snapshot_url?: string | null
          theme_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          diff?: Json
          id?: string
          snapshot_url?: string | null
          theme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_revisions_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          accessibility: Json
          author_id: string | null
          background: Json
          created_at: string
          header_style: Json
          icon_style: Json
          id: string
          is_published: boolean
          layout: Json
          name: string
          scope: Database["public"]["Enums"]["theme_scope"]
          slug: string
          tokens: Json
          updated_at: string
        }
        Insert: {
          accessibility?: Json
          author_id?: string | null
          background?: Json
          created_at?: string
          header_style?: Json
          icon_style?: Json
          id?: string
          is_published?: boolean
          layout?: Json
          name: string
          scope?: Database["public"]["Enums"]["theme_scope"]
          slug: string
          tokens?: Json
          updated_at?: string
        }
        Update: {
          accessibility?: Json
          author_id?: string | null
          background?: Json
          created_at?: string
          header_style?: Json
          icon_style?: Json
          id?: string
          is_published?: boolean
          layout?: Json
          name?: string
          scope?: Database["public"]["Enums"]["theme_scope"]
          slug?: string
          tokens?: Json
          updated_at?: string
        }
        Relationships: []
      }
      therapists: {
        Row: {
          availability: Json | null
          bio: string | null
          certification_urls: string[] | null
          created_at: string | null
          id: string
          is_verified: boolean | null
          languages: string[] | null
          price_eur: number | null
          price_jrc: number | null
          rating: number | null
          rating_count: number | null
          specialties: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          certification_urls?: string[] | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          languages?: string[] | null
          price_eur?: number | null
          price_jrc?: number | null
          rating?: number | null
          rating_count?: number | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          certification_urls?: string[] | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          languages?: string[] | null
          price_eur?: number | null
          price_jrc?: number | null
          rating?: number | null
          rating_count?: number | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      therapy_appointments: {
        Row: {
          created_at: string | null
          ends_at: string
          id: string
          meeting_room_id: string | null
          notes_encrypted: string | null
          payment_amount: number | null
          payment_currency: string | null
          payment_status: string | null
          starts_at: string
          status: string | null
          therapist_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          ends_at: string
          id?: string
          meeting_room_id?: string | null
          notes_encrypted?: string | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_status?: string | null
          starts_at: string
          status?: string | null
          therapist_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          ends_at?: string
          id?: string
          meeting_room_id?: string | null
          notes_encrypted?: string | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_status?: string | null
          starts_at?: string
          status?: string | null
          therapist_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_appointments_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      titles: {
        Row: {
          age_rating: string | null
          availability: Json | null
          backdrop_url: string | null
          countries: string[] | null
          created_at: string | null
          duration_minutes: number | null
          episodes: number | null
          genres: string[] | null
          id: string
          languages: string[] | null
          poster_url: string | null
          release_year: number | null
          seasons: number | null
          synopsis: string | null
          title: string
          trailer_url: string | null
          type: string
        }
        Insert: {
          age_rating?: string | null
          availability?: Json | null
          backdrop_url?: string | null
          countries?: string[] | null
          created_at?: string | null
          duration_minutes?: number | null
          episodes?: number | null
          genres?: string[] | null
          id?: string
          languages?: string[] | null
          poster_url?: string | null
          release_year?: number | null
          seasons?: number | null
          synopsis?: string | null
          title: string
          trailer_url?: string | null
          type: string
        }
        Update: {
          age_rating?: string | null
          availability?: Json | null
          backdrop_url?: string | null
          countries?: string[] | null
          created_at?: string | null
          duration_minutes?: number | null
          episodes?: number | null
          genres?: string[] | null
          id?: string
          languages?: string[] | null
          poster_url?: string | null
          release_year?: number | null
          seasons?: number | null
          synopsis?: string | null
          title?: string
          trailer_url?: string | null
          type?: string
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
      treasury_vaults: {
        Row: {
          allocation_amount: number
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          spent_amount: number
          updated_at: string
          vault_type: string
        }
        Insert: {
          allocation_amount: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          spent_amount?: number
          updated_at?: string
          vault_type: string
        }
        Update: {
          allocation_amount?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          spent_amount?: number
          updated_at?: string
          vault_type?: string
        }
        Relationships: []
      }
      triggers: {
        Row: {
          config_json: Json
          created_at: string
          enabled: boolean
          id: string
          type: Database["public"]["Enums"]["trigger_type"]
          updated_at: string
          workflow_id: string
        }
        Insert: {
          config_json?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          type: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string
          workflow_id: string
        }
        Update: {
          config_json?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          type?: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "triggers_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
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
      universe_icon_overrides: {
        Row: {
          created_at: string
          id: string
          overrides: Json | null
          rank: Database["public"]["Enums"]["icon_rank"]
          theme_id: string
          universe_key: string
        }
        Insert: {
          created_at?: string
          id?: string
          overrides?: Json | null
          rank: Database["public"]["Enums"]["icon_rank"]
          theme_id: string
          universe_key: string
        }
        Update: {
          created_at?: string
          id?: string
          overrides?: Json | null
          rank?: Database["public"]["Enums"]["icon_rank"]
          theme_id?: string
          universe_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "universe_icon_overrides_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          awarded_at: string | null
          badge_description: string | null
          badge_key: string
          badge_name: string
          icon_url: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          user_id: string
        }
        Insert: {
          awarded_at?: string | null
          badge_description?: string | null
          badge_key: string
          badge_name: string
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          user_id: string
        }
        Update: {
          awarded_at?: string | null
          badge_description?: string | null
          badge_key?: string
          badge_name?: string
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          user_id?: string
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
      user_caps: {
        Row: {
          day_used: number | null
          id: string
          last_day: string | null
          last_month: number | null
          last_quarter: number | null
          last_year: number | null
          month_used: number | null
          quarter_used: number | null
          updated_at: string | null
          user_id: string
          year_used: number | null
        }
        Insert: {
          day_used?: number | null
          id?: string
          last_day?: string | null
          last_month?: number | null
          last_quarter?: number | null
          last_year?: number | null
          month_used?: number | null
          quarter_used?: number | null
          updated_at?: string | null
          user_id: string
          year_used?: number | null
        }
        Update: {
          day_used?: number | null
          id?: string
          last_day?: string | null
          last_month?: number | null
          last_quarter?: number | null
          last_year?: number | null
          month_used?: number | null
          quarter_used?: number | null
          updated_at?: string | null
          user_id?: string
          year_used?: number | null
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
            foreignKeyName: "user_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      user_goals: {
        Row: {
          category: string | null
          created_at: string | null
          current_value: number | null
          description: string | null
          id: string
          is_completed: boolean | null
          target_date: string | null
          target_value: number | null
          title: string
          unit: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          current_value?: number | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          target_date?: string | null
          target_value?: number | null
          title: string
          unit?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          current_value?: number | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          target_date?: string | null
          target_value?: number | null
          title?: string
          unit?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_levels: {
        Row: {
          awarded_at: string | null
          current_level: number | null
          id: string
          level_progress: number | null
          next_level_threshold: number | null
          total_jrc_earned: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          awarded_at?: string | null
          current_level?: number | null
          id?: string
          level_progress?: number | null
          next_level_threshold?: number | null
          total_jrc_earned?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          awarded_at?: string | null
          current_level?: number | null
          id?: string
          level_progress?: number | null
          next_level_threshold?: number | null
          total_jrc_earned?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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
      user_roles: {
        Row: {
          expires_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_theme_settings: {
        Row: {
          active_theme_id: string | null
          created_at: string
          high_contrast: boolean | null
          reduce_motion: boolean | null
          schedule: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_theme_id?: string | null
          created_at?: string
          high_contrast?: boolean | null
          reduce_motion?: boolean | null
          schedule?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_theme_id?: string | null
          created_at?: string
          high_contrast?: boolean | null
          reduce_motion?: boolean | null
          schedule?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_theme_settings_active_theme_id_fkey"
            columns: ["active_theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
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
      user_universe_preferences: {
        Row: {
          created_at: string
          id: string
          is_muted: boolean
          muted_activity_types: string[] | null
          notification_enabled: boolean
          priority_level: number
          universe: Database["public"]["Enums"]["universe_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_muted?: boolean
          muted_activity_types?: string[] | null
          notification_enabled?: boolean
          priority_level?: number
          universe: Database["public"]["Enums"]["universe_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_muted?: boolean
          muted_activity_types?: string[] | null
          notification_enabled?: boolean
          priority_level?: number
          universe?: Database["public"]["Enums"]["universe_type"]
          updated_at?: string
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
      vendor_metrics: {
        Row: {
          avg_order_value: number | null
          commission_total: number | null
          conversion_rate: number | null
          created_at: string | null
          customer_satisfaction: number | null
          date: string
          disputes_count: number | null
          id: string
          metadata: Json | null
          orders_count: number | null
          products_sold: number | null
          returns_count: number | null
          sales_eur: number | null
          sales_jrc: number | null
          vendor_id: string
        }
        Insert: {
          avg_order_value?: number | null
          commission_total?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          customer_satisfaction?: number | null
          date: string
          disputes_count?: number | null
          id?: string
          metadata?: Json | null
          orders_count?: number | null
          products_sold?: number | null
          returns_count?: number | null
          sales_eur?: number | null
          sales_jrc?: number | null
          vendor_id: string
        }
        Update: {
          avg_order_value?: number | null
          commission_total?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          customer_satisfaction?: number | null
          date?: string
          disputes_count?: number | null
          id?: string
          metadata?: Json | null
          orders_count?: number | null
          products_sold?: number | null
          returns_count?: number | null
          sales_eur?: number | null
          sales_jrc?: number | null
          vendor_id?: string
        }
        Relationships: []
      }
      video_favorites: {
        Row: {
          channel_name: string | null
          created_at: string
          id: string
          user_id: string
          video_id: string
          video_thumbnail: string | null
          video_title: string
        }
        Insert: {
          channel_name?: string | null
          created_at?: string
          id?: string
          user_id: string
          video_id: string
          video_thumbnail?: string | null
          video_title: string
        }
        Update: {
          channel_name?: string | null
          created_at?: string
          id?: string
          user_id?: string
          video_id?: string
          video_thumbnail?: string | null
          video_title?: string
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
          owner_id: string | null
          owner_type: string | null
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
          owner_id?: string | null
          owner_type?: string | null
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
          owner_id?: string | null
          owner_type?: string | null
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
      wellness_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          is_active: boolean | null
          payload_json: Json | null
          schedule_cron: string | null
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          payload_json?: Json | null
          schedule_cron?: string | null
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          payload_json?: Json | null
          schedule_cron?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wellness_challenges: {
        Row: {
          created_at: string | null
          description: string | null
          duration_days: number | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          participant_count: number | null
          reward_jrc: number | null
          starts_at: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          participant_count?: number | null
          reward_jrc?: number | null
          starts_at?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          participant_count?: number | null
          reward_jrc?: number | null
          starts_at?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      wellness_programs: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: number | null
          duration_days: number | null
          id: string
          steps_json: Json | null
          theme: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_days?: number | null
          id?: string
          steps_json?: Json | null
          theme: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_days?: number | null
          id?: string
          steps_json?: Json | null
          theme?: string
          title?: string
        }
        Relationships: []
      }
      workflow_audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          meta_json: Json | null
          team_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          meta_json?: Json | null
          team_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          meta_json?: Json | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_audit_logs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "workflow_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_connections: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_valid: boolean
          last_used_at: string | null
          name: string
          provider: string
          scope: string[] | null
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_valid?: boolean
          last_used_at?: string | null
          name: string
          provider: string
          scope?: string[] | null
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_valid?: boolean
          last_used_at?: string | null
          name?: string
          provider?: string
          scope?: string[] | null
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_connections_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "workflow_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_credentials: {
        Row: {
          connection_id: string
          created_at: string
          encrypted_secret_json: Json
          expires_at: string | null
          id: string
          is_valid: boolean
          kind: Database["public"]["Enums"]["credential_kind"]
          rotated_at: string | null
        }
        Insert: {
          connection_id: string
          created_at?: string
          encrypted_secret_json: Json
          expires_at?: string | null
          id?: string
          is_valid?: boolean
          kind: Database["public"]["Enums"]["credential_kind"]
          rotated_at?: string | null
        }
        Update: {
          connection_id?: string
          created_at?: string
          encrypted_secret_json?: Json
          expires_at?: string | null
          id?: string
          is_valid?: boolean
          kind?: Database["public"]["Enums"]["credential_kind"]
          rotated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_credentials_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "workflow_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_run_steps: {
        Row: {
          duration_ms: number | null
          error_msg: string | null
          finished_at: string | null
          id: string
          input_json: Json | null
          name: string
          node_id: string
          output_json: Json | null
          run_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["step_status"]
          step_order: number
        }
        Insert: {
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          input_json?: Json | null
          name: string
          node_id: string
          output_json?: Json | null
          run_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["step_status"]
          step_order: number
        }
        Update: {
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          input_json?: Json | null
          name?: string
          node_id?: string
          output_json?: Json | null
          run_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["step_status"]
          step_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_run_steps_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "workflow_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_runs: {
        Row: {
          created_by: string | null
          duration_ms: number | null
          error_msg: string | null
          finished_at: string | null
          id: string
          started_at: string
          status: Database["public"]["Enums"]["run_status"]
          trace_id: string | null
          trigger_id: string | null
          trigger_payload_json: Json | null
          version_id: string
          workflow_id: string
        }
        Insert: {
          created_by?: string | null
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["run_status"]
          trace_id?: string | null
          trigger_id?: string | null
          trigger_payload_json?: Json | null
          version_id: string
          workflow_id: string
        }
        Update: {
          created_by?: string | null
          duration_ms?: number | null
          error_msg?: string | null
          finished_at?: string | null
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["run_status"]
          trace_id?: string | null
          trigger_id?: string | null
          trigger_payload_json?: Json | null
          version_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_runs_trigger_id_fkey"
            columns: ["trigger_id"]
            isOneToOne: false
            referencedRelation: "workflow_triggers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_runs_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "workflow_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_settings: {
        Row: {
          api_keys: string[] | null
          created_at: string
          data_retention_days: number
          default_retry_policy_json: Json | null
          max_concurrency: number
          notif_channels_json: Json | null
          team_id: string
          timezone: string
          updated_at: string
        }
        Insert: {
          api_keys?: string[] | null
          created_at?: string
          data_retention_days?: number
          default_retry_policy_json?: Json | null
          max_concurrency?: number
          notif_channels_json?: Json | null
          team_id: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          api_keys?: string[] | null
          created_at?: string
          data_retention_days?: number
          default_retry_policy_json?: Json | null
          max_concurrency?: number
          notif_channels_json?: Json | null
          team_id?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_settings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "workflow_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_team_members: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["workflow_role"]
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workflow_role"]
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workflow_role"]
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "workflow_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_teams: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_templates: {
        Row: {
          category: Database["public"]["Enums"]["workflow_template_category"]
          created_at: string
          default_graph_json: Json
          icon: string | null
          id: string
          is_featured: boolean
          name: string
          preview_md: string | null
          required_providers: string[] | null
          summary: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["workflow_template_category"]
          created_at?: string
          default_graph_json?: Json
          icon?: string | null
          id?: string
          is_featured?: boolean
          name: string
          preview_md?: string | null
          required_providers?: string[] | null
          summary: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["workflow_template_category"]
          created_at?: string
          default_graph_json?: Json
          icon?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          preview_md?: string | null
          required_providers?: string[] | null
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_triggers: {
        Row: {
          config_json: Json
          created_at: string
          enabled: boolean
          id: string
          type: Database["public"]["Enums"]["trigger_type"]
          updated_at: string
          workflow_id: string
        }
        Insert: {
          config_json?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          type: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string
          workflow_id: string
        }
        Update: {
          config_json?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          type?: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_triggers_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_versions: {
        Row: {
          changelog: string | null
          created_at: string
          graph_json: Json
          id: string
          is_active: boolean
          version: number
          workflow_id: string
        }
        Insert: {
          changelog?: string | null
          created_at?: string
          graph_json?: Json
          id?: string
          is_active?: boolean
          version: number
          workflow_id: string
        }
        Update: {
          changelog?: string | null
          created_at?: string
          graph_json?: Json
          id?: string
          is_active?: boolean
          version?: number
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_versions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["workflow_status"]
          tags: string[] | null
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["workflow_status"]
          tags?: string[] | null
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["workflow_status"]
          tags?: string[] | null
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "workflow_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_sessions: {
        Row: {
          calories_burned: number | null
          completed: boolean | null
          duration_minutes: number | null
          exercises_completed: Json | null
          id: string
          notes: string | null
          program_id: string | null
          user_id: string
          workout_date: string
          workout_name: string
        }
        Insert: {
          calories_burned?: number | null
          completed?: boolean | null
          duration_minutes?: number | null
          exercises_completed?: Json | null
          id?: string
          notes?: string | null
          program_id?: string | null
          user_id: string
          workout_date?: string
          workout_name: string
        }
        Update: {
          calories_burned?: number | null
          completed?: boolean | null
          duration_minutes?: number | null
          exercises_completed?: Json | null
          id?: string
          notes?: string | null
          program_id?: string | null
          user_id?: string
          workout_date?: string
          workout_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "fitness_programs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      eligible_pool_safe: {
        Row: {
          created_at: string | null
          email_protected: boolean | null
          email_visible: boolean | null
          id: string | null
          is_eligible: boolean | null
          nomination_count: number | null
          organization_type: string | null
          person_bio: string | null
          person_name: string | null
          position_type: string | null
          reputation_score: number | null
          skills: Json | null
          updated_at: string | null
          validation_score: number | null
        }
        Insert: {
          created_at?: string | null
          email_protected?: boolean | null
          email_visible?: boolean | null
          id?: string | null
          is_eligible?: boolean | null
          nomination_count?: number | null
          organization_type?: string | null
          person_bio?: string | null
          person_name?: string | null
          position_type?: string | null
          reputation_score?: number | null
          skills?: Json | null
          updated_at?: string | null
          validation_score?: number | null
        }
        Update: {
          created_at?: string | null
          email_protected?: boolean | null
          email_visible?: boolean | null
          id?: string | null
          is_eligible?: boolean | null
          nomination_count?: number | null
          organization_type?: string | null
          person_bio?: string | null
          person_name?: string | null
          position_type?: string | null
          reputation_score?: number | null
          skills?: Json | null
          updated_at?: string | null
          validation_score?: number | null
        }
        Relationships: []
      }
      profiles_public: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cover_image_url: string | null
          created_at: string | null
          current_badge: string | null
          followers_count: number | null
          following_count: number | null
          id: string | null
          is_verified: boolean | null
          posts_count: number | null
          privacy_level: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          current_badge?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string | null
          is_verified?: boolean | null
          posts_count?: number | null
          privacy_level?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          current_badge?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string | null
          is_verified?: boolean | null
          posts_count?: number | null
          privacy_level?: string | null
          username?: string | null
        }
        Relationships: []
      }
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
      ensure_mlm_user_exists: {
        Args: { target_user_id: string }
        Returns: {
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
      }
      generate_event_hash: {
        Args: {
          p_action_key: string
          p_metadata: Json
          p_occurred_at: string
          p_user_id: string
        }
        Returns: string
      }
      get_my_full_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_url: string
          badge_earned_at: string
          bio: string
          birth_date: string
          cover_image_url: string
          created_at: string
          current_badge: string
          followers_count: number
          following_count: number
          full_name: string
          id: string
          is_verified: boolean
          location: string
          posts_count: number
          privacy_level: string
          updated_at: string
          username: string
          website_url: string
        }[]
      }
      get_public_profile: {
        Args: { target_user_id: string }
        Returns: {
          avatar_url: string
          bio: string
          cover_image_url: string
          current_badge: string
          followers_count: number
          following_count: number
          id: string
          is_verified: boolean
          posts_count: number
          privacy_level: string
          username: string
        }[]
      }
      get_team_role: {
        Args: { _team_id: string; _user_id: string }
        Returns: Database["public"]["Enums"]["workflow_role"]
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
      get_workflow_team_role: {
        Args: { _team_id: string; _user_id: string }
        Returns: Database["public"]["Enums"]["workflow_role"]
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_team_access: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      has_team_role: {
        Args: {
          _role: Database["public"]["Enums"]["workflow_role"]
          _team_id: string
          _user_id: string
        }
        Returns: boolean
      }
      has_workflow_team_access: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      has_workflow_team_role: {
        Args: {
          _role: Database["public"]["Enums"]["workflow_role"]
          _team_id: string
          _user_id: string
        }
        Returns: boolean
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
      post_invoice: {
        Args: { invoice_id: string }
        Returns: boolean
      }
      process_mlm_transaction: {
        Args: { p_amount: number; p_type: string; p_user_id: string }
        Returns: Json
      }
      reserve_inventory: {
        Args: { item_id: string; location_id: string; quantity: number }
        Returns: boolean
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
      activity_audience: "public" | "friends" | "private"
      app_role:
        | "user"
        | "moderator"
        | "admin"
        | "council_member"
        | "election_manager"
        | "super_admin"
        | "pro"
        | "pro_staff"
        | "certifier"
        | "support"
        | "auditor"
        | "habitant"
      art_order_status:
        | "escrow"
        | "shipped"
        | "delivered"
        | "released"
        | "refunded"
        | "disputed"
      artwork_status: "draft" | "listed" | "sold" | "archived"
      artwork_type: "nft" | "physical" | "hybrid"
      auction_type: "english" | "dutch" | "sealed"
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      certificate_type: "coa" | "soulbound" | "paper_linked"
      certification_status:
        | "not_started"
        | "submitted"
        | "in_review"
        | "validated"
        | "rejected"
      credential_kind: "api_key" | "oauth2" | "database" | "webhook_secret"
      icon_rank: "XL" | "M" | "S"
      listing_kind: "buy_now" | "auction" | "offer_only" | "rental"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "delivered"
        | "cancelled"
        | "refunded"
      organ_type:
        | "executive"
        | "council"
        | "mediation_arbitrage"
        | "administration"
        | "treasury_finances"
        | "compliance_security"
        | "digital_data"
        | "thematic_services"
        | "participation"
        | "audit_ethics"
      position_type:
        | "maire_jerr"
        | "adjoint_finances"
        | "adjoint_numerique"
        | "adjoint_sante_ohs"
        | "adjoint_environnement_osp"
        | "adjoint_economie_opa"
        | "adjoint_culture_education"
        | "adjoint_urbanisme_mobilite"
        | "adjoint_inclusion_social"
        | "adjoint_conformite_securite"
        | "adjoint_crise_resilience"
        | "conseiller"
        | "agent"
        | "mediateur"
        | "arbitre"
      pro_status: "pending" | "active" | "suspended" | "rejected"
      pro_type:
        | "driver"
        | "doctor"
        | "merchant"
        | "service"
        | "restaurant"
        | "educator"
      run_status: "pending" | "running" | "success" | "failed" | "canceled"
      step_status:
        | "pending"
        | "running"
        | "success"
        | "failed"
        | "skipped"
        | "canceled"
      template_category:
        | "communication"
        | "integration"
        | "productivity"
        | "reporting"
        | "monitoring"
        | "automation"
      territorial_level: "commune" | "interco" | "region"
      theme_scope: "system" | "community" | "user"
      transaction_status:
        | "pending"
        | "processing"
        | "settled"
        | "failed"
        | "refunded"
      trigger_type: "http" | "cron" | "event"
      universe_type:
        | "joyjerr"
        | "sagajerr"
        | "capijerr"
        | "shopjerr"
        | "appjerr"
        | "newsjerr"
        | "evenjerr"
        | "cloudjerr"
        | "jobjerr"
        | "teachjerr"
        | "fundingjerr"
        | "smadjerr"
        | "vagojerr"
        | "doctojerr"
        | "starjerr"
        | "immojerr"
        | "domjerr"
        | "avojerr"
        | "assujerr"
        | "piojerr"
        | "fitjerr"
        | "perjerr"
        | "territorial"
        | "ohs"
        | "perjr"
      workflow_role: "owner" | "editor" | "viewer"
      workflow_status: "enabled" | "disabled"
      workflow_template_category:
        | "communication"
        | "integration"
        | "productivity"
        | "reporting"
        | "monitoring"
        | "automation"
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
    Enums: {
      activity_audience: ["public", "friends", "private"],
      app_role: [
        "user",
        "moderator",
        "admin",
        "council_member",
        "election_manager",
        "super_admin",
        "pro",
        "pro_staff",
        "certifier",
        "support",
        "auditor",
        "habitant",
      ],
      art_order_status: [
        "escrow",
        "shipped",
        "delivered",
        "released",
        "refunded",
        "disputed",
      ],
      artwork_status: ["draft", "listed", "sold", "archived"],
      artwork_type: ["nft", "physical", "hybrid"],
      auction_type: ["english", "dutch", "sealed"],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      certificate_type: ["coa", "soulbound", "paper_linked"],
      certification_status: [
        "not_started",
        "submitted",
        "in_review",
        "validated",
        "rejected",
      ],
      credential_kind: ["api_key", "oauth2", "database", "webhook_secret"],
      icon_rank: ["XL", "M", "S"],
      listing_kind: ["buy_now", "auction", "offer_only", "rental"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "delivered",
        "cancelled",
        "refunded",
      ],
      organ_type: [
        "executive",
        "council",
        "mediation_arbitrage",
        "administration",
        "treasury_finances",
        "compliance_security",
        "digital_data",
        "thematic_services",
        "participation",
        "audit_ethics",
      ],
      position_type: [
        "maire_jerr",
        "adjoint_finances",
        "adjoint_numerique",
        "adjoint_sante_ohs",
        "adjoint_environnement_osp",
        "adjoint_economie_opa",
        "adjoint_culture_education",
        "adjoint_urbanisme_mobilite",
        "adjoint_inclusion_social",
        "adjoint_conformite_securite",
        "adjoint_crise_resilience",
        "conseiller",
        "agent",
        "mediateur",
        "arbitre",
      ],
      pro_status: ["pending", "active", "suspended", "rejected"],
      pro_type: [
        "driver",
        "doctor",
        "merchant",
        "service",
        "restaurant",
        "educator",
      ],
      run_status: ["pending", "running", "success", "failed", "canceled"],
      step_status: [
        "pending",
        "running",
        "success",
        "failed",
        "skipped",
        "canceled",
      ],
      template_category: [
        "communication",
        "integration",
        "productivity",
        "reporting",
        "monitoring",
        "automation",
      ],
      territorial_level: ["commune", "interco", "region"],
      theme_scope: ["system", "community", "user"],
      transaction_status: [
        "pending",
        "processing",
        "settled",
        "failed",
        "refunded",
      ],
      trigger_type: ["http", "cron", "event"],
      universe_type: [
        "joyjerr",
        "sagajerr",
        "capijerr",
        "shopjerr",
        "appjerr",
        "newsjerr",
        "evenjerr",
        "cloudjerr",
        "jobjerr",
        "teachjerr",
        "fundingjerr",
        "smadjerr",
        "vagojerr",
        "doctojerr",
        "starjerr",
        "immojerr",
        "domjerr",
        "avojerr",
        "assujerr",
        "piojerr",
        "fitjerr",
        "perjerr",
        "territorial",
        "ohs",
        "perjr",
      ],
      workflow_role: ["owner", "editor", "viewer"],
      workflow_status: ["enabled", "disabled"],
      workflow_template_category: [
        "communication",
        "integration",
        "productivity",
        "reporting",
        "monitoring",
        "automation",
      ],
    },
  },
} as const
