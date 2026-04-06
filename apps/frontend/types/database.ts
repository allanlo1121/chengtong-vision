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
      admin_regions: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          full_name: string | null
          id: string
          is_disabled: boolean
          level: number
          name: string
          parent_code: string | null
          pinyin_code: string | null
          short_name: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          level: number
          name: string
          parent_code?: string | null
          pinyin_code?: string | null
          short_name?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          level?: number
          name?: string
          parent_code?: string | null
          pinyin_code?: string | null
          short_name?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_regions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "admin_regions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "admin_regions_parent_code_fkey"
            columns: ["parent_code"]
            isOneToOne: false
            referencedRelation: "admin_regions"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      countries: {
        Row: {
          alpha3_code: string | null
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          english_name: string | null
          id: string
          is_disabled: boolean
          name: string
          numeric_code: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          alpha3_code?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          english_name?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          numeric_code?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          alpha3_code?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          english_name?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          numeric_code?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "countries_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "countries_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      import_batches: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          failed_count: number | null
          finished_at: string | null
          id: string
          inserted_count: number | null
          skipped_count: number | null
          started_at: string | null
          status: string
          table_name: string
          total_count: number
          updated_at: string | null
          updated_by: string | null
          updated_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          failed_count?: number | null
          finished_at?: string | null
          id?: string
          inserted_count?: number | null
          skipped_count?: number | null
          started_at?: string | null
          status?: string
          table_name: string
          total_count: number
          updated_at?: string | null
          updated_by?: string | null
          updated_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          failed_count?: number | null
          finished_at?: string | null
          id?: string
          inserted_count?: number | null
          skipped_count?: number | null
          started_at?: string | null
          status?: string
          table_name?: string
          total_count?: number
          updated_at?: string | null
          updated_by?: string | null
          updated_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "import_batches_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      import_records: {
        Row: {
          batch_id: string | null
          created_at: string | null
          created_by: string | null
          data: Json | null
          deleted_at: string | null
          deleted_by: string | null
          external_version: number | null
          id: string
          message: string | null
          raw: Json | null
          status: string | null
          table_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          deleted_at?: string | null
          deleted_by?: string | null
          external_version?: number | null
          id?: string
          message?: string | null
          raw?: Json | null
          status?: string | null
          table_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          deleted_at?: string | null
          deleted_by?: string | null
          external_version?: number | null
          id?: string
          message?: string | null
          raw?: Json | null
          status?: string | null
          table_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "import_records_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      master_data: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          definition_id: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_disabled: boolean
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          definition_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          definition_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "master_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "master_data_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "master_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_data_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "v_master_options"
            referencedColumns: ["definition_id"]
          },
          {
            foreignKeyName: "master_data_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "master_data_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      master_definitions: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_disabled: boolean
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "master_definitions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "master_definitions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          business_id: string | null
          city_code: string | null
          code: string
          country_code: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          district_code: string | null
          external_id: string | null
          external_version: number | null
          full_name: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          level: number | null
          longitude: number | null
          name: string
          node_key: string
          org_category_id: string | null
          org_type_id: string
          parent_id: string | null
          path: unknown
          province_code: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          business_id?: string | null
          city_code?: string | null
          code: string
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          district_code?: string | null
          external_id?: string | null
          external_version?: number | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          level?: number | null
          longitude?: number | null
          name: string
          node_key: string
          org_category_id?: string | null
          org_type_id: string
          parent_id?: string | null
          path: unknown
          province_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string | null
          city_code?: string | null
          code?: string
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          district_code?: string | null
          external_id?: string | null
          external_version?: number | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          level?: number | null
          longitude?: number | null
          name?: string
          node_key?: string
          org_category_id?: string | null
          org_type_id?: string
          parent_id?: string | null
          path?: unknown
          province_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_master_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_city_code_fkey"
            columns: ["city_code"]
            isOneToOne: false
            referencedRelation: "admin_regions"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "organizations_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "organizations_district_code_fkey"
            columns: ["district_code"]
            isOneToOne: false
            referencedRelation: "admin_regions"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey"
            columns: ["org_category_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey"
            columns: ["org_category_id"]
            isOneToOne: false
            referencedRelation: "v_master_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey"
            columns: ["org_type_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey"
            columns: ["org_type_id"]
            isOneToOne: false
            referencedRelation: "v_master_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_tree_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_province_code_fkey"
            columns: ["province_code"]
            isOneToOne: false
            referencedRelation: "admin_regions"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          name: string
          org_node_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          name: string
          org_node_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          name?: string
          org_node_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "projects_org_node_id_fkey"
            columns: ["org_node_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_org_node_id_fkey"
            columns: ["org_node_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_org_node_id_fkey"
            columns: ["org_node_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_org_node_id_fkey"
            columns: ["org_node_id"]
            isOneToOne: false
            referencedRelation: "v_tree_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
      user_favorite_projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          project_id: string
          sort_order: number
          updated_at: string | null
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          project_id: string
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          project_id?: string
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "user_favorite_projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_user_favorite_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorite_projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
    }
    Views: {
      v_master_options: {
        Row: {
          code: string | null
          definition_code: string | null
          definition_id: string | null
          definition_name: string | null
          description: string | null
          id: string | null
          is_disabled: boolean | null
          name: string | null
        }
        Relationships: []
      }
      v_organizations_detail: {
        Row: {
          address: string | null
          business_name: string | null
          city_name: string | null
          code: string | null
          country_name: string | null
          created_at: string | null
          description: string | null
          district_name: string | null
          full_name: string | null
          id: string | null
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string | null
          org_category_name: string | null
          org_type_name: string | null
          parent_org_name: string | null
          province_name: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      v_organizations_list: {
        Row: {
          business_name: string | null
          city_name: string | null
          country_name: string | null
          created_at: string | null
          district_name: string | null
          id: string | null
          is_active: boolean | null
          level: number | null
          name: string | null
          org_category_name: string | null
          org_type_name: string | null
          parent_id: string | null
          parent_org_name: string | null
          path: unknown
          province_name: string | null
          sort_order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_tree_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      v_runtime_user: {
        Row: {
          employee_id: string | null
          name: string | null
          org_path: unknown
          organization_id: string | null
          permissions: string[] | null
          person_id: string | null
          roles: string[] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_tree_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      v_tree_nodes: {
        Row: {
          entity: string | null
          has_children: boolean | null
          id: string | null
          level: number | null
          name: string | null
          parent_id: string | null
          path: unknown
          sort_order: number | null
        }
        Insert: {
          entity?: never
          has_children?: never
          id?: string | null
          level?: never
          name?: string | null
          parent_id?: string | null
          path?: unknown
          sort_order?: number | null
        }
        Update: {
          entity?: never
          has_children?: never
          id?: string | null
          level?: never
          name?: string | null
          parent_id?: string | null
          path?: unknown
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organizations_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_tree_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      v_user_favorite_projects: {
        Row: {
          id: string | null
          name: string | null
        }
        Relationships: []
      }
      v_user_menu: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          group_name: string | null
          icon: string | null
          id: string | null
          is_disabled: boolean | null
          is_visible: boolean | null
          label: string | null
          level: number | null
          name: string | null
          parent_id: string | null
          path: string | null
          permission_code: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          group_name?: string | null
          icon?: string | null
          id?: string | null
          is_disabled?: boolean | null
          is_visible?: boolean | null
          label?: string | null
          level?: number | null
          name?: string | null
          parent_id?: string | null
          path?: string | null
          permission_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          group_name?: string | null
          icon?: string | null
          id?: string | null
          is_disabled?: boolean | null
          is_visible?: boolean | null
          label?: string | null
          level?: number | null
          name?: string | null
          parent_id?: string | null
          path?: string | null
          permission_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "menus_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_user_menu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menus_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["person_id"]
          },
        ]
      }
    }
    Functions: {
      bootstrap: { Args: { p_user_id: string }; Returns: undefined }
      fn_organizations_ancestors: {
        Args: { p_id: string }
        Returns: {
          id: string
          level: number
          name: string
        }[]
      }
      fn_organizations_children: {
        Args: { p_parent_id: string }
        Returns: {
          has_children: boolean
          id: string
          level: number
          name: string
          parent_id: string
          sort_order: number
        }[]
      }
      fn_organizations_roots: {
        Args: never
        Returns: {
          has_children: boolean
          id: string
          level: number
          name: string
        }[]
      }
      fn_organizations_subtree: {
        Args: { p_id: string }
        Returns: {
          id: string
          level: number
          name: string
          parent_id: string
        }[]
      }
      org_move_node: {
        Args: { p_id: string; p_new_parent: string }
        Returns: undefined
      }
      text2ltree: { Args: { "": string }; Returns: unknown }
      tree_context_nodes: {
        Args: { p_entity: string; p_node_id: string }
        Returns: {
          entity: string | null
          has_children: boolean | null
          id: string | null
          level: number | null
          name: string | null
          parent_id: string | null
          path: unknown
          sort_order: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "v_tree_nodes"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      tree_query_organizations: {
        Args: {
          p_include_children?: boolean
          p_limit?: number
          p_offset?: number
          p_parent_id?: string
          p_search?: string
        }
        Returns: {
          business_name: string | null
          city_name: string | null
          country_name: string | null
          created_at: string | null
          district_name: string | null
          id: string | null
          is_active: boolean | null
          level: number | null
          name: string | null
          org_category_name: string | null
          org_type_name: string | null
          parent_id: string | null
          parent_org_name: string | null
          path: unknown
          province_name: string | null
          sort_order: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "v_organizations_list"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  rbac: {
    Tables: {
      permissions: {
        Row: {
          action: string
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_disabled: boolean | null
          module: string
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          action: string
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          module: string
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          action?: string
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          module?: string
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      person_permissions: {
        Row: {
          id: string
          permission_id: string
          person_id: string
        }
        Insert: {
          id?: string
          permission_id: string
          person_id: string
        }
        Update: {
          id?: string
          permission_id?: string
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      post_permissions: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          permission_id: string
          post_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          permission_id: string
          post_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          permission_id?: string
          post_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          permission_id: string | null
          role_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          permission_id?: string | null
          role_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          permission_id?: string | null
          role_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_disabled: boolean | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          role_id: string
          updated_at: string | null
          updated_by: string | null
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          role_id: string
          updated_at?: string | null
          updated_by?: string | null
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          role_id?: string
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_user_permissions: {
        Row: {
          permission_code: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_permission: { Args: { p_code: string }; Returns: boolean }
      jwt_permissions: { Args: never; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  system: {
    Tables: {
      bootstrap_state: {
        Row: {
          completed: boolean
          executed_at: string | null
          id: string
          version: string
        }
        Insert: {
          completed?: boolean
          executed_at?: string | null
          id?: string
          version: string
        }
        Update: {
          completed?: boolean
          executed_at?: string | null
          id?: string
          version?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string | null
          finished_at: string | null
          id: string
          job_type: string
          payload: Json | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          job_type: string
          payload?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          job_type?: string
          payload?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      menus: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          group_name: string | null
          icon: string | null
          id: string
          is_disabled: boolean | null
          is_visible: boolean | null
          label: string
          level: number | null
          name: string
          parent_id: string | null
          path: string | null
          permission_code: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          group_name?: string | null
          icon?: string | null
          id?: string
          is_disabled?: boolean | null
          is_visible?: boolean | null
          label: string
          level?: number | null
          name: string
          parent_id?: string | null
          path?: string | null
          permission_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          group_name?: string | null
          icon?: string | null
          id?: string
          is_disabled?: boolean | null
          is_visible?: boolean | null
          label?: string
          level?: number | null
          name?: string
          parent_id?: string | null
          path?: string | null
          permission_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      versions: {
        Row: {
          deployed_at: string | null
          id: string
          version: string
        }
        Insert: {
          deployed_at?: string | null
          id?: string
          version: string
        }
        Update: {
          deployed_at?: string | null
          id?: string
          version?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      allowed_org_ids: { Args: never; Returns: string[] }
      bootstrap: { Args: { p_user_id: string }; Returns: undefined }
      current_org_id: { Args: never; Returns: string }
      current_person_id: { Args: never; Returns: string }
      is_super_admin: { Args: never; Returns: boolean }
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
  rbac: {
    Enums: {},
  },
  system: {
    Enums: {},
  },
} as const

