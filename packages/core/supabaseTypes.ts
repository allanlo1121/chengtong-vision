export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      alarm_default_roles: {
        Row: {
          alarm_type: string;
          description: string | null;
          id: string;
          is_enabled: boolean | null;
          job_title_code: string;
        };
        Insert: {
          alarm_type: string;
          description?: string | null;
          id?: string;
          is_enabled?: boolean | null;
          job_title_code: string;
        };
        Update: {
          alarm_type?: string;
          description?: string | null;
          id?: string;
          is_enabled?: boolean | null;
          job_title_code?: string;
        };
        Relationships: [];
      };
      alarm_global_notification: {
        Row: {
          alarm_type: string;
          created_at: string | null;
          description: string | null;
          employee_id: string;
          id: string;
          is_enabled: boolean | null;
          role_code: string | null;
        };
        Insert: {
          alarm_type: string;
          created_at?: string | null;
          description?: string | null;
          employee_id: string;
          id?: string;
          is_enabled?: boolean | null;
          role_code?: string | null;
        };
        Update: {
          alarm_type?: string;
          created_at?: string | null;
          description?: string | null;
          employee_id?: string;
          id?: string;
          is_enabled?: boolean | null;
          role_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "alarm_global_notification_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_global_notification_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      alarm_notification_special: {
        Row: {
          alarm_type: string;
          created_at: string | null;
          employee_id: string;
          id: string;
          note: string | null;
          project_id: string | null;
          tbm_id: string | null;
          tunnel_id: string | null;
        };
        Insert: {
          alarm_type: string;
          created_at?: string | null;
          employee_id: string;
          id?: string;
          note?: string | null;
          project_id?: string | null;
          tbm_id?: string | null;
          tunnel_id?: string | null;
        };
        Update: {
          alarm_type?: string;
          created_at?: string | null;
          employee_id?: string;
          id?: string;
          note?: string | null;
          project_id?: string | null;
          tbm_id?: string | null;
          tunnel_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "alarm_notification_special_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_special_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "alarm_notification_special_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_special_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "alarm_notification_special_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_special_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_special_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["tunnel_id"];
          },
        ];
      };
      employee_positional_titles: {
        Row: {
          assigned_at: string;
          created_at: string | null;
          employee_id: string;
          id: string;
          is_current: boolean | null;
          is_primary: boolean | null;
          job_title_id: string;
          revoked_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          assigned_at?: string;
          created_at?: string | null;
          employee_id: string;
          id?: string;
          is_current?: boolean | null;
          is_primary?: boolean | null;
          job_title_id: string;
          revoked_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          assigned_at?: string;
          created_at?: string | null;
          employee_id?: string;
          id?: string;
          is_current?: boolean | null;
          is_primary?: boolean | null;
          job_title_id?: string;
          revoked_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_positional_titles_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positional_titles_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_positional_titles_job_title_id_fkey";
            columns: ["job_title_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      employee_roles: {
        Row: {
          created_at: string;
          created_by: string | null;
          employee_id: string;
          id: string;
          role_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          employee_id: string;
          id?: string;
          role_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          employee_id?: string;
          id?: string;
          role_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "employee_roles_employee_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_roles_employee_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_roles_role_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      employees: {
        Row: {
          auth_user_id: string | null;
          avatar_url: string | null;
          birthdate: string | null;
          code: string;
          company_id: string | null;
          created_at: string | null;
          created_by: string | null;
          department_id: string | null;
          email: string | null;
          emp_type_id: string | null;
          external_global_id: string | null;
          external_source_id: string | null;
          full_org_path: string | null;
          gender_id: string | null;
          id: string;
          id_card_number: string | null;
          is_active: boolean | null;
          is_deleted: boolean | null;
          name: string;
          notes: string | null;
          phone_number: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          auth_user_id?: string | null;
          avatar_url?: string | null;
          birthdate?: string | null;
          code: string;
          company_id?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          email?: string | null;
          emp_type_id?: string | null;
          external_global_id?: string | null;
          external_source_id?: string | null;
          full_org_path?: string | null;
          gender_id?: string | null;
          id?: string;
          id_card_number?: string | null;
          is_active?: boolean | null;
          is_deleted?: boolean | null;
          name: string;
          notes?: string | null;
          phone_number?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          auth_user_id?: string | null;
          avatar_url?: string | null;
          birthdate?: string | null;
          code?: string;
          company_id?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          email?: string | null;
          emp_type_id?: string | null;
          external_global_id?: string | null;
          external_source_id?: string | null;
          full_org_path?: string | null;
          gender_id?: string | null;
          id?: string;
          id_card_number?: string | null;
          is_active?: boolean | null;
          is_deleted?: boolean | null;
          name?: string;
          notes?: string | null;
          phone_number?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_emp_type_id_fkey";
            columns: ["emp_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_gender_id_fkey";
            columns: ["gender_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      master_data: {
        Row: {
          code: string;
          create_at: string | null;
          definition_id: string;
          description: string | null;
          external_global_id: string | null;
          id: string;
          is_disabled: boolean | null;
          is_system: boolean | null;
          name: string;
          parent_id: string | null;
          sort_order: number | null;
          update_at: string | null;
          value: string;
        };
        Insert: {
          code: string;
          create_at?: string | null;
          definition_id: string;
          description?: string | null;
          external_global_id?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_system?: boolean | null;
          name: string;
          parent_id?: string | null;
          sort_order?: number | null;
          update_at?: string | null;
          value: string;
        };
        Update: {
          code?: string;
          create_at?: string | null;
          definition_id?: string;
          description?: string | null;
          external_global_id?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_system?: boolean | null;
          name?: string;
          parent_id?: string | null;
          sort_order?: number | null;
          update_at?: string | null;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "master_data_definition_id_fkey";
            columns: ["definition_id"];
            isOneToOne: false;
            referencedRelation: "master_definitions";
            referencedColumns: ["id"];
          },
        ];
      };
      master_definitions: {
        Row: {
          code: string;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          display_path: string | null;
          external_global_id: string;
          hier_level: number | null;
          id: string;
          is_disabled: boolean | null;
          is_leaf: boolean | null;
          name: string;
          parent_id: string | null;
          parent_ids: string[] | null;
          path: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          display_path?: string | null;
          external_global_id: string;
          hier_level?: number | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          name: string;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          path?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          display_path?: string | null;
          external_global_id?: string;
          hier_level?: number | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          name?: string;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          path?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "master_definitions_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "master_definitions";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          code: string | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          display_path: string | null;
          external_global_id: string | null;
          external_source_id: string | null;
          fullname: string | null;
          id: string;
          is_disabled: boolean | null;
          is_leaf: boolean | null;
          is_virtual: boolean | null;
          level: number | null;
          name: string;
          org_type_id: string | null;
          parent_id: string | null;
          parent_ids: string[] | null;
          region_id: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          display_path?: string | null;
          external_global_id?: string | null;
          external_source_id?: string | null;
          fullname?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          is_virtual?: boolean | null;
          level?: number | null;
          name: string;
          org_type_id?: string | null;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          region_id?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          display_path?: string | null;
          external_global_id?: string | null;
          external_source_id?: string | null;
          fullname?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          is_virtual?: boolean | null;
          level?: number | null;
          name?: string;
          org_type_id?: string | null;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          region_id?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      project_catalog_std: {
        Row: {
          attributes: Json | null;
          code: string;
          created_at: string | null;
          created_by: string | null;
          external_source_id: string | null;
          id: string;
          is_disabled: boolean | null;
          is_leaf: boolean | null;
          major_type_id: string | null;
          name: string;
          parent_id: string | null;
          project_catalog_type_id: string | null;
          project_type_id: string | null;
          qty_unit: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          attributes?: Json | null;
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          external_source_id?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          major_type_id?: string | null;
          name: string;
          parent_id?: string | null;
          project_catalog_type_id?: string | null;
          project_type_id?: string | null;
          qty_unit?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          attributes?: Json | null;
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          external_source_id?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          major_type_id?: string | null;
          name?: string;
          parent_id?: string | null;
          project_catalog_type_id?: string | null;
          project_type_id?: string | null;
          qty_unit?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey";
            columns: ["major_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalog_std_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "project_catalog_std";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey";
            columns: ["project_catalog_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      project_catalogs: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          engineering_qty: number | null;
          external_global_id: string | null;
          external_source_id: string;
          id: string;
          name: string;
          parent_id: string | null;
          parent_ids: string[] | null;
          project_catalog_std_id: string | null;
          project_id: string;
          remarks: string | null;
          short_name: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          engineering_qty?: number | null;
          external_global_id?: string | null;
          external_source_id: string;
          id?: string;
          name: string;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          project_catalog_std_id?: string | null;
          project_id: string;
          remarks?: string | null;
          short_name?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          engineering_qty?: number | null;
          external_global_id?: string | null;
          external_source_id?: string;
          id?: string;
          name?: string;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          project_catalog_std_id?: string | null;
          project_id?: string;
          remarks?: string | null;
          short_name?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_catalogs_project_catalog_std_id_fkey";
            columns: ["project_catalog_std_id"];
            isOneToOne: false;
            referencedRelation: "project_catalog_std";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["project_id"];
          },
        ];
      };
      project_leader_history: {
        Row: {
          created_at: string | null;
          employee_id: string;
          id: string;
          leader_role_id: string;
          project_id: string;
          updated_at: string | null;
          valid_from: string | null;
          valid_to: string | null;
        };
        Insert: {
          created_at?: string | null;
          employee_id: string;
          id?: string;
          leader_role_id: string;
          project_id: string;
          updated_at?: string | null;
          valid_from?: string | null;
          valid_to?: string | null;
        };
        Update: {
          created_at?: string | null;
          employee_id?: string;
          id?: string;
          leader_role_id?: string;
          project_id?: string;
          updated_at?: string | null;
          valid_from?: string | null;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_leader_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_leader_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_leader_history_leader_role_id_fkey";
            columns: ["leader_role_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_leader_history_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_leader_history_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["project_id"];
          },
        ];
      };
      projects: {
        Row: {
          actual_end_date: string | null;
          actual_start_date: string | null;
          address: string | null;
          city_id: string | null;
          code: string;
          commsissioning_date: string | null;
          country_id: string | null;
          created_at: string;
          created_by: string | null;
          district_id: string | null;
          external_global_id: string;
          external_source_id: string | null;
          fullname: string | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string;
          organization_id: string | null;
          plan_end_date: string | null;
          plan_start_date: string | null;
          progress_status_id: string | null;
          project_attention_level_id: string | null;
          project_control_level_id: string | null;
          project_key_points: string | null;
          project_management_mode_id: string | null;
          project_overview: string | null;
          project_risk_level_id: string | null;
          project_scope: string | null;
          project_status_id: string | null;
          project_type_id: string | null;
          province_id: string | null;
          region_id: string | null;
          sub_project_type_id: string | null;
          subproject_attention_level_id: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          actual_end_date?: string | null;
          actual_start_date?: string | null;
          address?: string | null;
          city_id?: string | null;
          code: string;
          commsissioning_date?: string | null;
          country_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          district_id?: string | null;
          external_global_id: string;
          external_source_id?: string | null;
          fullname?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          organization_id?: string | null;
          plan_end_date?: string | null;
          plan_start_date?: string | null;
          progress_status_id?: string | null;
          project_attention_level_id?: string | null;
          project_control_level_id?: string | null;
          project_key_points?: string | null;
          project_management_mode_id?: string | null;
          project_overview?: string | null;
          project_risk_level_id?: string | null;
          project_scope?: string | null;
          project_status_id?: string | null;
          project_type_id?: string | null;
          province_id?: string | null;
          region_id?: string | null;
          sub_project_type_id?: string | null;
          subproject_attention_level_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          actual_end_date?: string | null;
          actual_start_date?: string | null;
          address?: string | null;
          city_id?: string | null;
          code?: string;
          commsissioning_date?: string | null;
          country_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          district_id?: string | null;
          external_global_id?: string;
          external_source_id?: string | null;
          fullname?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          organization_id?: string | null;
          plan_end_date?: string | null;
          plan_start_date?: string | null;
          progress_status_id?: string | null;
          project_attention_level_id?: string | null;
          project_control_level_id?: string | null;
          project_key_points?: string | null;
          project_management_mode_id?: string | null;
          project_overview?: string | null;
          project_risk_level_id?: string | null;
          project_scope?: string | null;
          project_status_id?: string | null;
          project_type_id?: string | null;
          province_id?: string | null;
          region_id?: string | null;
          sub_project_type_id?: string | null;
          subproject_attention_level_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_district_id_fkey";
            columns: ["district_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_progress_status_id_fkey";
            columns: ["progress_status_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_province_id_fkey";
            columns: ["province_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_sub_project_type_id_fkey";
            columns: ["sub_project_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_subproject_attention_level_id_fkey";
            columns: ["subproject_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          code: string;
          created_at: string;
          id: string;
          is_active: boolean;
          name: string;
          permissions: Json;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          name: string;
          permissions: Json;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          name?: string;
          permissions?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      tbm_active_connectivity_state: {
        Row: {
          source: string;
          status: boolean;
          tbm_id: string;
          updated_at: string;
        };
        Insert: {
          source?: string;
          status: boolean;
          tbm_id: string;
          updated_at?: string;
        };
        Update: {
          source?: string;
          status?: boolean;
          tbm_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_active_connectivity_state_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: true;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_active_ring_state: {
        Row: {
          last_ring: number;
          tbm_id: string;
          updated_at: string;
        };
        Insert: {
          last_ring: number;
          tbm_id: string;
          updated_at?: string;
        };
        Update: {
          last_ring?: number;
          tbm_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_active_ring_state_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: true;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_active_static_events: {
        Row: {
          data_quality: number | null;
          id: string;
          param_code: string;
          recorded_at: string;
          rule: Json | null;
          severity: number;
          tbm_id: string;
          trend: string | null;
          value: number | null;
        };
        Insert: {
          data_quality?: number | null;
          id?: string;
          param_code: string;
          recorded_at?: string;
          rule?: Json | null;
          severity?: number;
          tbm_id: string;
          trend?: string | null;
          value?: number | null;
        };
        Update: {
          data_quality?: number | null;
          id?: string;
          param_code?: string;
          recorded_at?: string;
          rule?: Json | null;
          severity?: number;
          tbm_id?: string;
          trend?: string | null;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_active_static_events_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_assignment_history: {
        Row: {
          created_at: string;
          created_by: string | null;
          end_at: string | null;
          id: string;
          operation_status: string;
          start_at: string;
          tbm_id: string;
          tunnel_id: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          end_at?: string | null;
          id?: string;
          operation_status: string;
          start_at?: string;
          tbm_id: string;
          tunnel_id: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          end_at?: string | null;
          id?: string;
          operation_status?: string;
          start_at?: string;
          tbm_id?: string;
          tunnel_id?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_assignment_history_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["auth_user_id"];
          },
          {
            foreignKeyName: "tbm_assignment_history_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_assignment_history_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_assignment_history_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["tunnel_id"];
          },
          {
            foreignKeyName: "tbm_assignment_history_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["auth_user_id"];
          },
        ];
      };
      tbm_assignments: {
        Row: {
          created_at: string;
          created_by: string | null;
          end_at: string | null;
          id: string;
          operation_status: string;
          start_at: string;
          tbm_id: string;
          tunnel_id: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          end_at?: string | null;
          id?: string;
          operation_status: string;
          start_at?: string;
          tbm_id: string;
          tunnel_id: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          end_at?: string | null;
          id?: string;
          operation_status?: string;
          start_at?: string;
          tbm_id?: string;
          tunnel_id?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_assignments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["auth_user_id"];
          },
          {
            foreignKeyName: "tbm_assignments_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: true;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_assignments_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_assignments_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["tunnel_id"];
          },
          {
            foreignKeyName: "tbm_assignments_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_current_employee";
            referencedColumns: ["auth_user_id"];
          },
        ];
      };
      tbm_connectivity_snapshots: {
        Row: {
          created_at: string;
          end_at: string | null;
          id: string;
          last_ring: number | null;
          source: string;
          start_at: string;
          status: boolean;
          tbm_id: string;
        };
        Insert: {
          created_at?: string;
          end_at?: string | null;
          id?: string;
          last_ring?: number | null;
          source?: string;
          start_at?: string;
          status: boolean;
          tbm_id: string;
        };
        Update: {
          created_at?: string;
          end_at?: string | null;
          id?: string;
          last_ring?: number | null;
          source?: string;
          start_at?: string;
          status?: boolean;
          tbm_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_connectivity_snapshots_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_parameter_group_items: {
        Row: {
          created_at: string | null;
          group_code: string;
          id: number;
          member_code: string;
          sort_order: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          group_code: string;
          id?: never;
          member_code: string;
          sort_order?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          group_code?: string;
          id?: never;
          member_code?: string;
          sort_order?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_parameter_group_items_group_code_fkey";
            columns: ["group_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "tbm_parameter_group_items_member_code_fkey";
            columns: ["member_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
        ];
      };
      tbm_parameter_group_items_per_tbm: {
        Row: {
          created_at: string | null;
          group_code: string;
          id: number;
          member_code: string;
          sort_order: number | null;
          tbm_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          group_code: string;
          id?: never;
          member_code: string;
          sort_order?: number | null;
          tbm_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          group_code?: string;
          id?: never;
          member_code?: string;
          sort_order?: number | null;
          tbm_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_parameter_group_items_per_tbm_group_code_fkey";
            columns: ["group_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "tbm_parameter_group_items_per_tbm_member_code_fkey";
            columns: ["member_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "tbm_parameter_group_items_per_tbm_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_ring_events: {
        Row: {
          create_at: string;
          diff: number | null;
          end_at: string | null;
          event_type: string;
          from_ring: number | null;
          id: string;
          start_at: string;
          tbm_id: string;
          to_ring: number | null;
        };
        Insert: {
          create_at?: string;
          diff?: number | null;
          end_at?: string | null;
          event_type: string;
          from_ring?: number | null;
          id?: string;
          start_at?: string;
          tbm_id: string;
          to_ring?: number | null;
        };
        Update: {
          create_at?: string;
          diff?: number | null;
          end_at?: string | null;
          event_type?: string;
          from_ring?: number | null;
          id?: string;
          start_at?: string;
          tbm_id?: string;
          to_ring?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_ring_events_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_runtime_parameters: {
        Row: {
          code: string;
          created_at: string;
          created_by: string | null;
          digits: number | null;
          false_label: string | null;
          is_alarm: boolean | null;
          is_deleted: boolean | null;
          is_group: boolean | null;
          is_virtual: boolean | null;
          name: string;
          remark: string | null;
          sort_order: number | null;
          subsystem_code: string | null;
          true_label: string | null;
          unit: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          created_by?: string | null;
          digits?: number | null;
          false_label?: string | null;
          is_alarm?: boolean | null;
          is_deleted?: boolean | null;
          is_group?: boolean | null;
          is_virtual?: boolean | null;
          name: string;
          remark?: string | null;
          sort_order?: number | null;
          subsystem_code?: string | null;
          true_label?: string | null;
          unit?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          created_by?: string | null;
          digits?: number | null;
          false_label?: string | null;
          is_alarm?: boolean | null;
          is_deleted?: boolean | null;
          is_group?: boolean | null;
          is_virtual?: boolean | null;
          name?: string;
          remark?: string | null;
          sort_order?: number | null;
          subsystem_code?: string | null;
          true_label?: string | null;
          unit?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_runtime_parameters_subsystem_code_fkey";
            columns: ["subsystem_code"];
            isOneToOne: false;
            referencedRelation: "tbm_subsystems";
            referencedColumns: ["code"];
          },
        ];
      };
      tbm_static_operational_events: {
        Row: {
          action: string | null;
          created_at: string | null;
          data_quality: number | null;
          id: string;
          occurred_at: string;
          old_severity: number | null;
          param_code: string;
          payload: Json | null;
          rule: Json | null;
          severity: number;
          tbm_id: string;
          trend: string | null;
        };
        Insert: {
          action?: string | null;
          created_at?: string | null;
          data_quality?: number | null;
          id?: string;
          occurred_at?: string;
          old_severity?: number | null;
          param_code: string;
          payload?: Json | null;
          rule?: Json | null;
          severity: number;
          tbm_id: string;
          trend?: string | null;
        };
        Update: {
          action?: string | null;
          created_at?: string | null;
          data_quality?: number | null;
          id?: string;
          occurred_at?: string;
          old_severity?: number | null;
          param_code?: string;
          payload?: Json | null;
          rule?: Json | null;
          severity?: number;
          tbm_id?: string;
          trend?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_static_operational_events_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_subsystems: {
        Row: {
          code: string;
          created_at: string;
          created_by: string | null;
          name: string;
          remark: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          created_by?: string | null;
          name: string;
          remark?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          created_by?: string | null;
          name?: string;
          remark?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      tbm_threshold_rules: {
        Row: {
          compute_strategy: string | null;
          created_at: string | null;
          expression: string | null;
          high: number | null;
          id: string;
          is_active: boolean | null;
          is_alarm: boolean;
          level: number;
          low: number | null;
          param_code: string;
          rule_type: string;
          severity_strategy: string | null;
          sort_order: number | null;
          updated_at: string | null;
          use_absolute: boolean | null;
          window_ms: number;
        };
        Insert: {
          compute_strategy?: string | null;
          created_at?: string | null;
          expression?: string | null;
          high?: number | null;
          id?: string;
          is_active?: boolean | null;
          is_alarm?: boolean;
          level: number;
          low?: number | null;
          param_code: string;
          rule_type?: string;
          severity_strategy?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          use_absolute?: boolean | null;
          window_ms?: number;
        };
        Update: {
          compute_strategy?: string | null;
          created_at?: string | null;
          expression?: string | null;
          high?: number | null;
          id?: string;
          is_active?: boolean | null;
          is_alarm?: boolean;
          level?: number;
          low?: number | null;
          param_code?: string;
          rule_type?: string;
          severity_strategy?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          use_absolute?: boolean | null;
          window_ms?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_threshold_rules_param_code_fkey";
            columns: ["param_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
        ];
      };
      tbm_threshold_rules_per_tbm: {
        Row: {
          created_at: string | null;
          expression: string | null;
          high: number | null;
          id: string;
          is_active: boolean | null;
          level: number;
          low: number | null;
          param_code: string;
          rule_type: string;
          sort_order: number | null;
          tbm_id: string;
          updated_at: string | null;
          use_absolute: boolean | null;
          window_ms: number;
        };
        Insert: {
          created_at?: string | null;
          expression?: string | null;
          high?: number | null;
          id?: string;
          is_active?: boolean | null;
          level: number;
          low?: number | null;
          param_code: string;
          rule_type?: string;
          sort_order?: number | null;
          tbm_id: string;
          updated_at?: string | null;
          use_absolute?: boolean | null;
          window_ms?: number;
        };
        Update: {
          created_at?: string | null;
          expression?: string | null;
          high?: number | null;
          id?: string;
          is_active?: boolean | null;
          level?: number;
          low?: number | null;
          param_code?: string;
          rule_type?: string;
          sort_order?: number | null;
          tbm_id?: string;
          updated_at?: string | null;
          use_absolute?: boolean | null;
          window_ms?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_threshold_rules_per_tbm_param_code_fkey";
            columns: ["param_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "tbm_threshold_rules_per_tbm_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbms: {
        Row: {
          code: string;
          id: string;
          manager_code: string | null;
          name: string;
        };
        Insert: {
          code: string;
          id: string;
          manager_code?: string | null;
          name: string;
        };
        Update: {
          code?: string;
          id?: string;
          manager_code?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      tunnels: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          end_chainage: number | null;
          end_stake: number | null;
          geology: Json | null;
          gps: Json | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string;
          prefix: string | null;
          project_catalog_id: string | null;
          project_id: string;
          remarks: string | null;
          start_chainage: number | null;
          start_stake: number | null;
          status_id: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          end_chainage?: number | null;
          end_stake?: number | null;
          geology?: Json | null;
          gps?: Json | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          prefix?: string | null;
          project_catalog_id?: string | null;
          project_id: string;
          remarks?: string | null;
          start_chainage?: number | null;
          start_stake?: number | null;
          status_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          end_chainage?: number | null;
          end_stake?: number | null;
          geology?: Json | null;
          gps?: Json | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          prefix?: string | null;
          project_catalog_id?: string | null;
          project_id?: string;
          remarks?: string | null;
          start_chainage?: number | null;
          start_stake?: number | null;
          status_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tunnels_project_catalog_id_fkey";
            columns: ["project_catalog_id"];
            isOneToOne: false;
            referencedRelation: "project_catalogs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tunnels_project_catalog_id_fkey";
            columns: ["project_catalog_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["catalog_id"];
          },
          {
            foreignKeyName: "tunnels_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tunnels_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "tunnels_status_id_fkey";
            columns: ["status_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      v_current_employee: {
        Row: {
          auth_user_id: string | null;
          avatar_url: string | null;
          code: string | null;
          company_id: string | null;
          department_id: string | null;
          employee_id: string | null;
          name: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      v_tbm_assignments_overview: {
        Row: {
          assignment_id: string | null;
          catalog_id: string | null;
          catalog_name: string | null;
          end_chainage: number | null;
          end_stake: number | null;
          geology: Json | null;
          latitude: number | null;
          leaders: Json | null;
          longitude: number | null;
          prefix: string | null;
          project_id: string | null;
          project_name: string | null;
          project_short_name: string | null;
          section_id: string | null;
          section_name: string | null;
          start_chainage: number | null;
          start_stake: number | null;
          status_id: string | null;
          tbm_code: string | null;
          tbm_id: string | null;
          tbm_name: string | null;
          tbm_operation_status: string | null;
          tunnel_id: string | null;
          tunnel_name: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_assignments_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: true;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tunnels_status_id_fkey";
            columns: ["status_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
