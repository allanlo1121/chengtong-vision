export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
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
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
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
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
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
      alarm_notification_targets: {
        Row: {
          added_type: string;
          alarm_type: string;
          created_at: string | null;
          employee_id: string;
          id: string;
          project_id: string | null;
          tbm_id: string | null;
          tunnel_id: string | null;
        };
        Insert: {
          added_type: string;
          alarm_type: string;
          created_at?: string | null;
          employee_id: string;
          id?: string;
          project_id?: string | null;
          tbm_id?: string | null;
          tunnel_id?: string | null;
        };
        Update: {
          added_type?: string;
          alarm_type?: string;
          created_at?: string | null;
          employee_id?: string;
          id?: string;
          project_id?: string | null;
          tbm_id?: string | null;
          tunnel_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "alarm_notification_targets_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_targets_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_targets_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_targets_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "alarm_notification_targets_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_targets_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alarm_notification_targets_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["tunnel_id"];
          },
        ];
      };
      alarm_severity_levels: {
        Row: {
          id: number;
          label: string | null;
          name: string;
          notify_channels: string[];
          resend_interval_ms: number;
        };
        Insert: {
          id: number;
          label?: string | null;
          name: string;
          notify_channels?: string[];
          resend_interval_ms?: number;
        };
        Update: {
          id?: number;
          label?: string | null;
          name?: string;
          notify_channels?: string[];
          resend_interval_ms?: number;
        };
        Relationships: [];
      };
      allowance_standard: {
        Row: {
          allowance_type: string;
          amount: number;
          condition: string | null;
          created_at: string | null;
          description: string | null;
          id: number;
          level: string | null;
        };
        Insert: {
          allowance_type: string;
          amount: number;
          condition?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          level?: string | null;
        };
        Update: {
          allowance_type?: string;
          amount?: number;
          condition?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          level?: string | null;
        };
        Relationships: [];
      };
      attendance_record: {
        Row: {
          attendance_date: string;
          attendance_type: string | null;
          created_at: string | null;
          employee_id: number;
          id: number;
          remarks: string | null;
          status: Database["public"]["Enums"]["attendance_status"];
        };
        Insert: {
          attendance_date: string;
          attendance_type?: string | null;
          created_at?: string | null;
          employee_id: number;
          id?: number;
          remarks?: string | null;
          status?: Database["public"]["Enums"]["attendance_status"];
        };
        Update: {
          attendance_date?: string;
          attendance_type?: string | null;
          created_at?: string | null;
          employee_id?: number;
          id?: number;
          remarks?: string | null;
          status?: Database["public"]["Enums"]["attendance_status"];
        };
        Relationships: [];
      };
      departments: {
        Row: {
          code: string | null;
          created_at: string;
          id: string;
          name: string;
          order_index: number;
          parent_id: string | null;
          updated_at: string;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          order_index?: number;
          parent_id?: string | null;
          updated_at?: string;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          order_index?: number;
          parent_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "departments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
        ];
      };
      device_status: {
        Row: {
          id: string;
          is_online: boolean | null;
          last_seen: string | null;
          tbmcode: string;
        };
        Insert: {
          id?: string;
          is_online?: boolean | null;
          last_seen?: string | null;
          tbmcode: string;
        };
        Update: {
          id?: string;
          is_online?: boolean | null;
          last_seen?: string | null;
          tbmcode?: string;
        };
        Relationships: [];
      };
      device_status_logs: {
        Row: {
          id: string;
          is_online: boolean | null;
          tbmcode: string;
          timestamp: string | null;
        };
        Insert: {
          id?: string;
          is_online?: boolean | null;
          tbmcode: string;
          timestamp?: string | null;
        };
        Update: {
          id?: string;
          is_online?: boolean | null;
          tbmcode?: string;
          timestamp?: string | null;
        };
        Relationships: [];
      };
      dictionary_categories: {
        Row: {
          code: string;
          color: string | null;
          created_at: string | null;
          description: string | null;
          icon: string | null;
          id: string;
          is_disabled: boolean | null;
          name: string;
          parent_id: string | null;
          sequence: number | null;
          updated_at: string | null;
        };
        Insert: {
          code: string;
          color?: string | null;
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          name: string;
          parent_id?: string | null;
          sequence?: number | null;
          updated_at?: string | null;
        };
        Update: {
          code?: string;
          color?: string | null;
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          name?: string;
          parent_id?: string | null;
          sequence?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "dictionary_categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "dictionary_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      employee_history: {
        Row: {
          business_state: string | null;
          change_reason: string | null;
          created_at: string | null;
          created_by: string | null;
          department_id: string | null;
          edu_level_id: string | null;
          employee_id: string;
          end_at: string | null;
          id: string;
          job_title_id: string | null;
          organization_id: string | null;
          prof_title_id: string | null;
          start_at: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          business_state?: string | null;
          change_reason?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          edu_level_id?: string | null;
          employee_id: string;
          end_at?: string | null;
          id?: string;
          job_title_id?: string | null;
          organization_id?: string | null;
          prof_title_id?: string | null;
          start_at?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          business_state?: string | null;
          change_reason?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          edu_level_id?: string | null;
          employee_id?: string;
          end_at?: string | null;
          id?: string;
          job_title_id?: string | null;
          organization_id?: string | null;
          prof_title_id?: string | null;
          start_at?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
        ];
      };
      employee_position_history: {
        Row: {
          change_reason: string | null;
          created_at: string | null;
          created_by: string | null;
          department_id: string | null;
          employee_id: string;
          end_at: string | null;
          id: string;
          job_title_id: string | null;
          organization_id: string | null;
          start_at: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          change_reason?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          employee_id: string;
          end_at?: string | null;
          id?: string;
          job_title_id?: string | null;
          organization_id?: string | null;
          start_at?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          change_reason?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          employee_id?: string;
          end_at?: string | null;
          id?: string;
          job_title_id?: string | null;
          organization_id?: string | null;
          start_at?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_position_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_job_title_id_fkey";
            columns: ["job_title_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
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
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
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
      employee_positions: {
        Row: {
          acting_note: string | null;
          acting_role: Database["public"]["Enums"]["acting_role_enum"] | null;
          created_at: string | null;
          created_by: string | null;
          department_id: string | null;
          employee_id: string;
          id: string;
          is_primary: boolean | null;
          job_title_id: string;
          updated_at: string | null;
          updated_by: string | null;
          valid_from: string | null;
          valid_to: string | null;
        };
        Insert: {
          acting_note?: string | null;
          acting_role?: Database["public"]["Enums"]["acting_role_enum"] | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          employee_id: string;
          id?: string;
          is_primary?: boolean | null;
          job_title_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string | null;
          valid_to?: string | null;
        };
        Update: {
          acting_note?: string | null;
          acting_role?: Database["public"]["Enums"]["acting_role_enum"] | null;
          created_at?: string | null;
          created_by?: string | null;
          department_id?: string | null;
          employee_id?: string;
          id?: string;
          is_primary?: boolean | null;
          job_title_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string | null;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_positions_department_id_fkey1";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positions_department_id_fkey1";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positions_department_id_fkey1";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positions_employee_id_fkey1";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positions_employee_id_fkey1";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
        ];
      };
      employee_salary: {
        Row: {
          board_money: number;
          company_corporate_annuity: number;
          company_housing_fund: number;
          company_maternity_insurance: number;
          company_medical: number;
          company_pension: number;
          company_unemployment_insurance: number;
          company_work_injury_insurance: number;
          created_at: string | null;
          employee_id: number;
          experience_salary: number;
          health_fee: number;
          high_temperature_subsidy: number;
          id: number;
          major_medical_insurance_fee: number;
          milestone_bonus: number;
          other_allowance: number;
          other_bonus: number;
          other_expenses: number;
          outsourcing_service_fee: number;
          overtime_salary: number;
          performance_bonus: number;
          personal_corporate_annuity: number;
          personal_housing_fund: number;
          personal_income_tax: number;
          personal_medical: number;
          personal_pension: number;
          personal_unemployment_insurance: number;
          position_salary: number;
          professional_qualification_allowance: number;
          salary_month: string;
          social_security_late_fee: number;
          technical_allowance: number;
          young_talent_allowance: number;
        };
        Insert: {
          board_money?: number;
          company_corporate_annuity?: number;
          company_housing_fund?: number;
          company_maternity_insurance?: number;
          company_medical?: number;
          company_pension?: number;
          company_unemployment_insurance?: number;
          company_work_injury_insurance?: number;
          created_at?: string | null;
          employee_id: number;
          experience_salary?: number;
          health_fee?: number;
          high_temperature_subsidy?: number;
          id?: number;
          major_medical_insurance_fee?: number;
          milestone_bonus?: number;
          other_allowance?: number;
          other_bonus?: number;
          other_expenses?: number;
          outsourcing_service_fee?: number;
          overtime_salary?: number;
          performance_bonus?: number;
          personal_corporate_annuity?: number;
          personal_housing_fund?: number;
          personal_income_tax?: number;
          personal_medical?: number;
          personal_pension?: number;
          personal_unemployment_insurance?: number;
          position_salary?: number;
          professional_qualification_allowance?: number;
          salary_month: string;
          social_security_late_fee?: number;
          technical_allowance?: number;
          young_talent_allowance?: number;
        };
        Update: {
          board_money?: number;
          company_corporate_annuity?: number;
          company_housing_fund?: number;
          company_maternity_insurance?: number;
          company_medical?: number;
          company_pension?: number;
          company_unemployment_insurance?: number;
          company_work_injury_insurance?: number;
          created_at?: string | null;
          employee_id?: number;
          experience_salary?: number;
          health_fee?: number;
          high_temperature_subsidy?: number;
          id?: number;
          major_medical_insurance_fee?: number;
          milestone_bonus?: number;
          other_allowance?: number;
          other_bonus?: number;
          other_expenses?: number;
          outsourcing_service_fee?: number;
          overtime_salary?: number;
          performance_bonus?: number;
          personal_corporate_annuity?: number;
          personal_housing_fund?: number;
          personal_income_tax?: number;
          personal_medical?: number;
          personal_pension?: number;
          personal_unemployment_insurance?: number;
          position_salary?: number;
          professional_qualification_allowance?: number;
          salary_month?: string;
          social_security_late_fee?: number;
          technical_allowance?: number;
          young_talent_allowance?: number;
        };
        Relationships: [];
      };
      employees: {
        Row: {
          birthdate: string | null;
          code: string;
          created_at: string | null;
          created_by: string | null;
          email: string | null;
          emp_type_id: string | null;
          employment_status: string | null;
          external_source_id: string | null;
          full_org_path: string | null;
          gender_id: string | null;
          guid: string | null;
          id: string;
          id_card_number: string | null;
          is_active: boolean | null;
          is_deleted: boolean | null;
          name: string;
          notes: string | null;
          phone_number: string | null;
          sort_order: number;
          updated_at: string | null;
          updated_by: string | null;
          version_no: number | null;
        };
        Insert: {
          birthdate?: string | null;
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          email?: string | null;
          emp_type_id?: string | null;
          employment_status?: string | null;
          external_source_id?: string | null;
          full_org_path?: string | null;
          gender_id?: string | null;
          guid?: string | null;
          id?: string;
          id_card_number?: string | null;
          is_active?: boolean | null;
          is_deleted?: boolean | null;
          name: string;
          notes?: string | null;
          phone_number?: string | null;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
          version_no?: number | null;
        };
        Update: {
          birthdate?: string | null;
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          email?: string | null;
          emp_type_id?: string | null;
          employment_status?: string | null;
          external_source_id?: string | null;
          full_org_path?: string | null;
          gender_id?: string | null;
          guid?: string | null;
          id?: string;
          id_card_number?: string | null;
          is_active?: boolean | null;
          is_deleted?: boolean | null;
          name?: string;
          notes?: string | null;
          phone_number?: string | null;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
          version_no?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "employees_emp_type_id_fkey";
            columns: ["emp_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "gender_id_fkey";
            columns: ["gender_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      employers: {
        Row: {
          company_description: string | null;
          company_name: string;
          contact_person: string | null;
          contact_phone: string | null;
          id: number;
          short_name: string | null;
        };
        Insert: {
          company_description?: string | null;
          company_name: string;
          contact_person?: string | null;
          contact_phone?: string | null;
          id?: never;
          short_name?: string | null;
        };
        Update: {
          company_description?: string | null;
          company_name?: string;
          contact_person?: string | null;
          contact_phone?: string | null;
          id?: never;
          short_name?: string | null;
        };
        Relationships: [];
      };
      employment_type: {
        Row: {
          employment_type_description: string | null;
          employment_type_name: string;
          id: number;
        };
        Insert: {
          employment_type_description?: string | null;
          employment_type_name: string;
          id?: never;
        };
        Update: {
          employment_type_description?: string | null;
          employment_type_name?: string;
          id?: never;
        };
        Relationships: [];
      };
      external_orgs: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          org_type: Database["public"]["Enums"]["project_org_role_enum"];
          short_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          org_type: Database["public"]["Enums"]["project_org_role_enum"];
          short_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          org_type?: Database["public"]["Enums"]["project_org_role_enum"];
          short_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      external_units: {
        Row: {
          address: string | null;
          code: string;
          contact: string | null;
          created_at: string;
          created_by: string | null;
          external_global_id: string;
          id: string;
          name: string;
          short_name: string | null;
          unit_type_id: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          address?: string | null;
          code: string;
          contact?: string | null;
          created_at?: string;
          created_by?: string | null;
          external_global_id: string;
          id?: string;
          name: string;
          short_name?: string | null;
          unit_type_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          address?: string | null;
          code?: string;
          contact?: string | null;
          created_at?: string;
          created_by?: string | null;
          external_global_id?: string;
          id?: string;
          name?: string;
          short_name?: string | null;
          unit_type_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "external_units_unit_type_id_fkey";
            columns: ["unit_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      hr_employee_positions: {
        Row: {
          department_id: string;
          employee_id: string;
          id: number;
          is_leader: boolean;
          is_primary: boolean;
          position_id: number;
          remark: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          department_id: string;
          employee_id: string;
          id?: number;
          is_leader?: boolean;
          is_primary?: boolean;
          position_id: number;
          remark?: string | null;
          valid_from: string;
          valid_to?: string | null;
        };
        Update: {
          department_id?: string;
          employee_id?: string;
          id?: number;
          is_leader?: boolean;
          is_primary?: boolean;
          position_id?: number;
          remark?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_positions_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positions_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "hr_employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_positions_position_id_fkey";
            columns: ["position_id"];
            isOneToOne: false;
            referencedRelation: "positions";
            referencedColumns: ["id"];
          },
        ];
      };
      hr_employees: {
        Row: {
          age: number | null;
          birth_date: string | null;
          email: string | null;
          gender: Database["public"]["Enums"]["gender_enum"] | null;
          id: string;
          id_card_number: string | null;
          is_active: boolean;
          is_disabled: boolean;
          name: string;
          notes: string | null;
          phone_number: string;
        };
        Insert: {
          age?: number | null;
          birth_date?: string | null;
          email?: string | null;
          gender?: Database["public"]["Enums"]["gender_enum"] | null;
          id?: string;
          id_card_number?: string | null;
          is_active?: boolean;
          is_disabled?: boolean;
          name: string;
          notes?: string | null;
          phone_number: string;
        };
        Update: {
          age?: number | null;
          birth_date?: string | null;
          email?: string | null;
          gender?: Database["public"]["Enums"]["gender_enum"] | null;
          id?: string;
          id_card_number?: string | null;
          is_active?: boolean;
          is_disabled?: boolean;
          name?: string;
          notes?: string | null;
          phone_number?: string;
        };
        Relationships: [];
      };
      log_tbm_change: {
        Row: {
          changed_at: string | null;
          current_tbm_id: string | null;
          id: string;
          previous_tbm_id: string | null;
          source_id: string;
          source_type: string;
        };
        Insert: {
          changed_at?: string | null;
          current_tbm_id?: string | null;
          id?: string;
          previous_tbm_id?: string | null;
          source_id: string;
          source_type: string;
        };
        Update: {
          changed_at?: string | null;
          current_tbm_id?: string | null;
          id?: string;
          previous_tbm_id?: string | null;
          source_id?: string;
          source_type?: string;
        };
        Relationships: [];
      };
      master_data: {
        Row: {
          code: string | null;
          created_at: string | null;
          created_by: string | null;
          definition_id: string;
          description: string | null;
          external_global_id: string | null;
          id: string;
          is_disabled: boolean | null;
          is_system: boolean | null;
          name: string;
          parent_id: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
          value: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          definition_id: string;
          description?: string | null;
          external_global_id?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_system?: boolean | null;
          name: string;
          parent_id?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          definition_id?: string;
          description?: string | null;
          external_global_id?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_system?: boolean | null;
          name?: string;
          parent_id?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "master_data_definition_id_fkey";
            columns: ["definition_id"];
            isOneToOne: false;
            referencedRelation: "master_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "master_data_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
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
          is_leaf: boolean;
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
          is_leaf?: boolean;
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
          is_leaf?: boolean;
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
      menu_locales: {
        Row: {
          id: string;
          locale: string;
          menu_id: string;
          title: string;
        };
        Insert: {
          id?: string;
          locale: string;
          menu_id: string;
          title: string;
        };
        Update: {
          id?: string;
          locale?: string;
          menu_id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "menu_locales_menu_id_fkey";
            columns: ["menu_id"];
            isOneToOne: false;
            referencedRelation: "menus";
            referencedColumns: ["id"];
          },
        ];
      };
      menus: {
        Row: {
          created_at: string;
          icon: string | null;
          id: string;
          is_disabled: boolean;
          is_external: boolean;
          meta: Json | null;
          min_role_level: number | null;
          name: string;
          parent_id: string | null;
          parent_ids: string[] | null;
          path: string;
          sort_order: number;
          target: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          is_disabled?: boolean;
          is_external?: boolean;
          meta?: Json | null;
          min_role_level?: number | null;
          name: string;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          path: string;
          sort_order?: number;
          target: string;
          type?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          is_disabled?: boolean;
          is_external?: boolean;
          meta?: Json | null;
          min_role_level?: number | null;
          name?: string;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          path?: string;
          sort_order?: number;
          target?: string;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "menus_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "menus";
            referencedColumns: ["id"];
          },
        ];
      };
      mqtt_user: {
        Row: {
          is_superuser: boolean | null;
          password_hash: string;
          salt: string;
          tbm_id: string | null;
          username: string;
        };
        Insert: {
          is_superuser?: boolean | null;
          password_hash: string;
          salt: string;
          tbm_id?: string | null;
          username: string;
        };
        Update: {
          is_superuser?: boolean | null;
          password_hash?: string;
          salt?: string;
          tbm_id?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mqtt_user_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      org_master_data: {
        Row: {
          additional: string | null;
          code: string | null;
          create_at: string | null;
          create_by: string | null;
          definition_id: string | null;
          description: string | null;
          guid: string | null;
          id: string;
          is_disabled: boolean | null;
          is_encrypted: boolean | null;
          is_reconciled: boolean | null;
          is_system: boolean | null;
          parent_id: string | null;
          provision_at: string | null;
          provision_status: string | null;
          reconcile_at: string | null;
          sequence: number | null;
          tag: string | null;
          update_at: string | null;
          update_by: string | null;
          value: string;
          zz_children: string[] | null;
          zz_display_path: string | null;
          zz_is_leaf: boolean | null;
          zz_level: number | null;
          zz_level1_id: string | null;
          zz_level2_id: string | null;
          zz_level3_id: string | null;
          zz_level4_id: string | null;
          zz_level5_id: string | null;
          zz_level6_id: string | null;
          zz_level7_id: string | null;
          zz_level8_id: string | null;
          zz_level9_id: string | null;
          zz_parent_ids: string[] | null;
          zz_process_status: string | null;
        };
        Insert: {
          additional?: string | null;
          code?: string | null;
          create_at?: string | null;
          create_by?: string | null;
          definition_id?: string | null;
          description?: string | null;
          guid?: string | null;
          id: string;
          is_disabled?: boolean | null;
          is_encrypted?: boolean | null;
          is_reconciled?: boolean | null;
          is_system?: boolean | null;
          parent_id?: string | null;
          provision_at?: string | null;
          provision_status?: string | null;
          reconcile_at?: string | null;
          sequence?: number | null;
          tag?: string | null;
          update_at?: string | null;
          update_by?: string | null;
          value: string;
          zz_children?: string[] | null;
          zz_display_path?: string | null;
          zz_is_leaf?: boolean | null;
          zz_level?: number | null;
          zz_level1_id?: string | null;
          zz_level2_id?: string | null;
          zz_level3_id?: string | null;
          zz_level4_id?: string | null;
          zz_level5_id?: string | null;
          zz_level6_id?: string | null;
          zz_level7_id?: string | null;
          zz_level8_id?: string | null;
          zz_level9_id?: string | null;
          zz_parent_ids?: string[] | null;
          zz_process_status?: string | null;
        };
        Update: {
          additional?: string | null;
          code?: string | null;
          create_at?: string | null;
          create_by?: string | null;
          definition_id?: string | null;
          description?: string | null;
          guid?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_encrypted?: boolean | null;
          is_reconciled?: boolean | null;
          is_system?: boolean | null;
          parent_id?: string | null;
          provision_at?: string | null;
          provision_status?: string | null;
          reconcile_at?: string | null;
          sequence?: number | null;
          tag?: string | null;
          update_at?: string | null;
          update_by?: string | null;
          value?: string;
          zz_children?: string[] | null;
          zz_display_path?: string | null;
          zz_is_leaf?: boolean | null;
          zz_level?: number | null;
          zz_level1_id?: string | null;
          zz_level2_id?: string | null;
          zz_level3_id?: string | null;
          zz_level4_id?: string | null;
          zz_level5_id?: string | null;
          zz_level6_id?: string | null;
          zz_level7_id?: string | null;
          zz_level8_id?: string | null;
          zz_level9_id?: string | null;
          zz_parent_ids?: string[] | null;
          zz_process_status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_definition";
            columns: ["definition_id"];
            isOneToOne: false;
            referencedRelation: "org_master_definitions";
            referencedColumns: ["id"];
          },
        ];
      };
      org_master_definitions: {
        Row: {
          code: string | null;
          create_at: string | null;
          create_by: string | null;
          description: string | null;
          id: string;
          is_disabled: boolean | null;
          name: string;
          sequence: number | null;
          update_at: string | null;
          update_by: string | null;
        };
        Insert: {
          code?: string | null;
          create_at?: string | null;
          create_by?: string | null;
          description?: string | null;
          id: string;
          is_disabled?: boolean | null;
          name: string;
          sequence?: number | null;
          update_at?: string | null;
          update_by?: string | null;
        };
        Update: {
          code?: string | null;
          create_at?: string | null;
          create_by?: string | null;
          description?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          name?: string;
          sequence?: number | null;
          update_at?: string | null;
          update_by?: string | null;
        };
        Relationships: [];
      };
      org_unit_types: {
        Row: {
          code: string;
          name_cn: string;
          sort_order: number;
        };
        Insert: {
          code: string;
          name_cn: string;
          sort_order?: number;
        };
        Update: {
          code?: string;
          name_cn?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      organization_leader_history: {
        Row: {
          created_at: string | null;
          employee_id: string;
          id: string;
          leader_role_id: string;
          organization_id: string;
          updated_at: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          created_at?: string | null;
          employee_id: string;
          id?: string;
          leader_role_id: string;
          organization_id: string;
          updated_at?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Update: {
          created_at?: string | null;
          employee_id?: string;
          id?: string;
          leader_role_id?: string;
          organization_id?: string;
          updated_at?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organization_leader_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_leader_history_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_leader_history_leader_role_id_fkey";
            columns: ["leader_role_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_leader_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_leader_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_leader_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          category_id: string | null;
          code: string | null;
          country_id: string | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          display_path: string | null;
          external_id: string | null;
          fullname: string | null;
          guid: string | null;
          id: string;
          is_disabled: boolean | null;
          is_leaf: boolean | null;
          is_virtual: boolean | null;
          level: number | null;
          name: string;
          org_type_id: string | null;
          parent_id: string | null;
          parent_ids: string[] | null;
          process_status: string | null;
          region_id: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          category_id?: string | null;
          code?: string | null;
          country_id?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          display_path?: string | null;
          external_id?: string | null;
          fullname?: string | null;
          guid?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          is_virtual?: boolean | null;
          level?: number | null;
          name: string;
          org_type_id?: string | null;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          process_status?: string | null;
          region_id?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          category_id?: string | null;
          code?: string | null;
          country_id?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          display_path?: string | null;
          external_id?: string | null;
          fullname?: string | null;
          guid?: string | null;
          id?: string;
          is_disabled?: boolean | null;
          is_leaf?: boolean | null;
          is_virtual?: boolean | null;
          level?: number | null;
          name?: string;
          org_type_id?: string | null;
          parent_id?: string | null;
          parent_ids?: string[] | null;
          process_status?: string | null;
          region_id?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
        ];
      };
      owner_organizations: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          short_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          short_name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          short_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      owners: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      positions: {
        Row: {
          base_sort: number;
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          updated_at: string;
        };
        Insert: {
          base_sort: number;
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
          updated_at?: string;
        };
        Update: {
          base_sort?: number;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      producers: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      project_catalog_std: {
        Row: {
          attributes: Json | null;
          code: string;
          created_at: string | null;
          created_by: string | null;
          external_source_id: string;
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
          external_source_id: string;
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
          external_source_id?: string;
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
            foreignKeyName: "project_catalogs_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "project_catalogs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalogs_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["catalog_id"];
          },
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
      project_contracts: {
        Row: {
          contract_amount: number | null;
          contract_code: string | null;
          contract_end_date: string;
          contract_name: string | null;
          contract_start_date: string;
          contract_type: Database["public"]["Enums"]["contract_type_enum"];
          created_at: string;
          id: string;
          is_active: boolean;
          project_id: string;
          remark: string | null;
          updated_at: string;
          version: number;
        };
        Insert: {
          contract_amount?: number | null;
          contract_code?: string | null;
          contract_end_date: string;
          contract_name?: string | null;
          contract_start_date: string;
          contract_type: Database["public"]["Enums"]["contract_type_enum"];
          created_at?: string;
          id?: string;
          is_active?: boolean;
          project_id: string;
          remark?: string | null;
          updated_at?: string;
          version?: number;
        };
        Update: {
          contract_amount?: number | null;
          contract_code?: string | null;
          contract_end_date?: string;
          contract_name?: string | null;
          contract_start_date?: string;
          contract_type?: Database["public"]["Enums"]["contract_type_enum"];
          created_at?: string;
          id?: string;
          is_active?: boolean;
          project_id?: string;
          remark?: string | null;
          updated_at?: string;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project_master";
            referencedColumns: ["id"];
          },
        ];
      };
      project_department_relations: {
        Row: {
          created_at: string;
          department_id: string;
          end_date: string | null;
          id: string;
          is_active: boolean;
          project_id: string;
          start_date: string;
        };
        Insert: {
          created_at?: string;
          department_id: string;
          end_date?: string | null;
          id?: string;
          is_active?: boolean;
          project_id: string;
          start_date?: string;
        };
        Update: {
          created_at?: string;
          department_id?: string;
          end_date?: string | null;
          id?: string;
          is_active?: boolean;
          project_id?: string;
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_department_relations_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_department_relations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project_master";
            referencedColumns: ["id"];
          },
        ];
      };
      project_id_map: {
        Row: {
          new_id: string | null;
          old_id: number;
        };
        Insert: {
          new_id?: string | null;
          old_id: number;
        };
        Update: {
          new_id?: string | null;
          old_id?: number;
        };
        Relationships: [];
      };
      project_leader_history: {
        Row: {
          created_at: string | null;
          employee_id: string;
          id: string;
          leader_role_id: string;
          project_id: string;
          updated_at: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          created_at?: string | null;
          employee_id: string;
          id?: string;
          leader_role_id: string;
          project_id: string;
          updated_at?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Update: {
          created_at?: string | null;
          employee_id?: string;
          id?: string;
          leader_role_id?: string;
          project_id?: string;
          updated_at?: string | null;
          valid_from?: string;
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
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_leader_history_leader_role_id_fkey";
            columns: ["leader_role_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      project_level_history: {
        Row: {
          created_at: string;
          end_date: string | null;
          id: number;
          level: Database["public"]["Enums"]["project_level_enum"];
          note: string | null;
          project_id: string;
          start_date: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          id?: number;
          level: Database["public"]["Enums"]["project_level_enum"];
          note?: string | null;
          project_id: string;
          start_date: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          id?: number;
          level?: Database["public"]["Enums"]["project_level_enum"];
          note?: string | null;
          project_id?: string;
          start_date?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_master: {
        Row: {
          address_name: string | null;
          created_at: string;
          current_status: Database["public"]["Enums"]["project_status_enum"];
          id: string;
          management_mode: Database["public"]["Enums"]["management_mode_enum"];
          name: string;
          project_type: Database["public"]["Enums"]["project_type_enum"];
          region_id: number | null;
          short_name: string | null;
          updated_at: string;
          zz_children: string[] | null;
          zz_level6_id: string | null;
          zz_level7_id: string | null;
          zz_level8_id: string | null;
          zz_level9_id: string | null;
        };
        Insert: {
          address_name?: string | null;
          created_at?: string;
          current_status?: Database["public"]["Enums"]["project_status_enum"];
          id?: string;
          management_mode?: Database["public"]["Enums"]["management_mode_enum"];
          name: string;
          project_type?: Database["public"]["Enums"]["project_type_enum"];
          region_id?: number | null;
          short_name?: string | null;
          updated_at?: string;
          zz_children?: string[] | null;
          zz_level6_id?: string | null;
          zz_level7_id?: string | null;
          zz_level8_id?: string | null;
          zz_level9_id?: string | null;
        };
        Update: {
          address_name?: string | null;
          created_at?: string;
          current_status?: Database["public"]["Enums"]["project_status_enum"];
          id?: string;
          management_mode?: Database["public"]["Enums"]["management_mode_enum"];
          name?: string;
          project_type?: Database["public"]["Enums"]["project_type_enum"];
          region_id?: number | null;
          short_name?: string | null;
          updated_at?: string;
          zz_children?: string[] | null;
          zz_level6_id?: string | null;
          zz_level7_id?: string | null;
          zz_level8_id?: string | null;
          zz_level9_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "regions";
            referencedColumns: ["id"];
          },
        ];
      };
      project_organizations: {
        Row: {
          contract_no: string | null;
          created_at: string;
          effective_date: string | null;
          expired_date: string | null;
          id: number;
          note: string | null;
          organization_id: number;
          project_id: string;
          rank: number;
          role: Database["public"]["Enums"]["org_role_enum"];
          share_ratio: number | null;
          updated_at: string;
        };
        Insert: {
          contract_no?: string | null;
          created_at?: string;
          effective_date?: string | null;
          expired_date?: string | null;
          id?: number;
          note?: string | null;
          organization_id: number;
          project_id: string;
          rank?: number;
          role: Database["public"]["Enums"]["org_role_enum"];
          share_ratio?: number | null;
          updated_at?: string;
        };
        Update: {
          contract_no?: string | null;
          created_at?: string;
          effective_date?: string | null;
          expired_date?: string | null;
          id?: number;
          note?: string | null;
          organization_id?: number;
          project_id?: string;
          rank?: number;
          role?: Database["public"]["Enums"]["org_role_enum"];
          share_ratio?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_organizations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "owner_organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      project_orgs: {
        Row: {
          created_at: string;
          id: number;
          org_id: string;
          project_id: string;
          remark: string | null;
          role: Database["public"]["Enums"]["project_org_role_enum"];
        };
        Insert: {
          created_at?: string;
          id?: number;
          org_id: string;
          project_id: string;
          remark?: string | null;
          role: Database["public"]["Enums"]["project_org_role_enum"];
        };
        Update: {
          created_at?: string;
          id?: number;
          org_id?: string;
          project_id?: string;
          remark?: string | null;
          role?: Database["public"]["Enums"]["project_org_role_enum"];
        };
        Relationships: [
          {
            foreignKeyName: "project_orgs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "external_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_orgs_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project_master";
            referencedColumns: ["id"];
          },
        ];
      };
      project_status_history: {
        Row: {
          changed_at: string;
          changed_by: string | null;
          id: string;
          note: string | null;
          project_id: string;
          status: Database["public"]["Enums"]["project_status_enum"];
        };
        Insert: {
          changed_at?: string;
          changed_by?: string | null;
          id?: string;
          note?: string | null;
          project_id: string;
          status: Database["public"]["Enums"]["project_status_enum"];
        };
        Update: {
          changed_at?: string;
          changed_by?: string | null;
          id?: string;
          note?: string | null;
          project_id?: string;
          status?: Database["public"]["Enums"]["project_status_enum"];
        };
        Relationships: [
          {
            foreignKeyName: "project_status_history_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project_master";
            referencedColumns: ["id"];
          },
        ];
      };
      project_units: {
        Row: {
          category_id: string;
          created_at: string | null;
          id: string;
          name: string;
          order_index: number | null;
          project_id: string;
          remarks: string | null;
          short_name: string | null;
        };
        Insert: {
          category_id: string;
          created_at?: string | null;
          id?: string;
          name: string;
          order_index?: number | null;
          project_id: string;
          remarks?: string | null;
          short_name?: string | null;
        };
        Update: {
          category_id?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          order_index?: number | null;
          project_id?: string;
          remarks?: string | null;
          short_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "unit_categories";
            referencedColumns: ["id"];
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
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
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
            foreignKeyName: "projects_region_id_fkey1";
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
      regions: {
        Row: {
          created_at: string | null;
          id: number;
          manager_id: number | null;
          name: string;
          provinces: string[] | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          manager_id?: number | null;
          name?: string;
          provinces?: string[] | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          manager_id?: number | null;
          name?: string;
          provinces?: string[] | null;
        };
        Relationships: [];
      };
      role_menus: {
        Row: {
          menu_id: string;
          role_id: string;
        };
        Insert: {
          menu_id: string;
          role_id: string;
        };
        Update: {
          menu_id?: string;
          role_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "role_menus_menu_id_fkey";
            columns: ["menu_id"];
            isOneToOne: false;
            referencedRelation: "menus";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "role_menus_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          code: string;
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          level: number;
          name: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          level?: number;
          name: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          level?: number;
          name?: string;
        };
        Relationships: [];
      };
      salary_base: {
        Row: {
          created_at: string | null;
          effective_date: string;
          experience_salary: number;
          health_fee: number;
          id: number;
          is_current: boolean;
          other_allowance: number;
          position_salary: number;
          technical_allowance: number;
        };
        Insert: {
          created_at?: string | null;
          effective_date: string;
          experience_salary?: number;
          health_fee?: number;
          id?: number;
          is_current?: boolean;
          other_allowance?: number;
          position_salary?: number;
          technical_allowance?: number;
        };
        Update: {
          created_at?: string | null;
          effective_date?: string;
          experience_salary?: number;
          health_fee?: number;
          id?: number;
          is_current?: boolean;
          other_allowance?: number;
          position_salary?: number;
          technical_allowance?: number;
        };
        Relationships: [];
      };
      sub_projects: {
        Row: {
          area_name: string | null;
          areacode: string | null;
          build_name: string | null;
          builder: number | null;
          create_by: number;
          create_time: string | null;
          direction: boolean | null;
          end_date: string | null;
          hover: boolean | null;
          id: number;
          lat: number | null;
          lng: number | null;
          loc: string | null;
          mshift: boolean | null;
          name: string;
          op_num_end: number | null;
          op_num_start: number | null;
          owner_name: string | null;
          project_id: number;
          remark: string | null;
          ring_end: number | null;
          ring_start: number | null;
          risk_dis: number | null;
          short_name: string | null;
          start_date: string | null;
          status: Database["public"]["Enums"]["project_status_enum"];
          twins: boolean | null;
          update_by: number | null;
          update_time: string | null;
          wtype: string | null;
        };
        Insert: {
          area_name?: string | null;
          areacode?: string | null;
          build_name?: string | null;
          builder?: number | null;
          create_by: number;
          create_time?: string | null;
          direction?: boolean | null;
          end_date?: string | null;
          hover?: boolean | null;
          id?: number;
          lat?: number | null;
          lng?: number | null;
          loc?: string | null;
          mshift?: boolean | null;
          name: string;
          op_num_end?: number | null;
          op_num_start?: number | null;
          owner_name?: string | null;
          project_id: number;
          remark?: string | null;
          ring_end?: number | null;
          ring_start?: number | null;
          risk_dis?: number | null;
          short_name?: string | null;
          start_date?: string | null;
          status: Database["public"]["Enums"]["project_status_enum"];
          twins?: boolean | null;
          update_by?: number | null;
          update_time?: string | null;
          wtype?: string | null;
        };
        Update: {
          area_name?: string | null;
          areacode?: string | null;
          build_name?: string | null;
          builder?: number | null;
          create_by?: number;
          create_time?: string | null;
          direction?: boolean | null;
          end_date?: string | null;
          hover?: boolean | null;
          id?: number;
          lat?: number | null;
          lng?: number | null;
          loc?: string | null;
          mshift?: boolean | null;
          name?: string;
          op_num_end?: number | null;
          op_num_start?: number | null;
          owner_name?: string | null;
          project_id?: number;
          remark?: string | null;
          ring_end?: number | null;
          ring_start?: number | null;
          risk_dis?: number | null;
          short_name?: string | null;
          start_date?: string | null;
          status?: Database["public"]["Enums"]["project_status_enum"];
          twins?: boolean | null;
          update_by?: number | null;
          update_time?: string | null;
          wtype?: string | null;
        };
        Relationships: [];
      };
      subprojects: {
        Row: {
          id: string;
          mshift: boolean | null;
          name: string;
          op_num_end: number | null;
          op_num_start: number | null;
          plan_end_date: string | null;
          plan_start_date: string | null;
          project_id: string;
          remark: string | null;
          ring_end: number | null;
          ring_start: number | null;
          short_name: string | null;
          status: Database["public"]["Enums"]["project_status_enum"] | null;
          twins: boolean | null;
          wtype: string | null;
        };
        Insert: {
          id?: string;
          mshift?: boolean | null;
          name: string;
          op_num_end?: number | null;
          op_num_start?: number | null;
          plan_end_date?: string | null;
          plan_start_date?: string | null;
          project_id: string;
          remark?: string | null;
          ring_end?: number | null;
          ring_start?: number | null;
          short_name?: string | null;
          status?: Database["public"]["Enums"]["project_status_enum"] | null;
          twins?: boolean | null;
          wtype?: string | null;
        };
        Update: {
          id?: string;
          mshift?: boolean | null;
          name?: string;
          op_num_end?: number | null;
          op_num_start?: number | null;
          plan_end_date?: string | null;
          plan_start_date?: string | null;
          project_id?: string;
          remark?: string | null;
          ring_end?: number | null;
          ring_start?: number | null;
          short_name?: string | null;
          status?: Database["public"]["Enums"]["project_status_enum"] | null;
          twins?: boolean | null;
          wtype?: string | null;
        };
        Relationships: [];
      };
      tbm_active_operational_events: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          id: string;
          message: string | null;
          notified_channels: Json | null;
          notified_users: Json | null;
          occurred_at: string | null;
          param_code: string;
          parameters: Json | null;
          payload: Json | null;
          ring_no: number | null;
          severity_id: number | null;
          tbm_id: string;
          updated_at: string | null;
          updated_by: string | null;
          value: number | null;
          window_ms: number;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          message?: string | null;
          notified_channels?: Json | null;
          notified_users?: Json | null;
          occurred_at?: string | null;
          param_code: string;
          parameters?: Json | null;
          payload?: Json | null;
          ring_no?: number | null;
          severity_id?: number | null;
          tbm_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: number | null;
          window_ms?: number;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          message?: string | null;
          notified_channels?: Json | null;
          notified_users?: Json | null;
          occurred_at?: string | null;
          param_code?: string;
          parameters?: Json | null;
          payload?: Json | null;
          ring_no?: number | null;
          severity_id?: number | null;
          tbm_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: number | null;
          window_ms?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_active_event_severity";
            columns: ["severity_id"];
            isOneToOne: false;
            referencedRelation: "alarm_severity_levels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_active_operational_events_tbm_id_fkey";
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
        ];
      };
      tbm_connectivity_snapshots: {
        Row: {
          heartbeat_status: string;
          heartbeat_status_change_at: string | null;
          last_heartbeat_at: string | null;
          last_heartbeat_payload: Json | null;
          last_heartbeat_status: string;
          last_plc_status: string;
          last_realdata_at: string | null;
          last_realdata_payload: Json | null;
          last_ring: number | null;
          plc_status: string;
          plc_status_change_at: string | null;
          tbm_id: string;
          updated_at: string;
        };
        Insert: {
          heartbeat_status?: string;
          heartbeat_status_change_at?: string | null;
          last_heartbeat_at?: string | null;
          last_heartbeat_payload?: Json | null;
          last_heartbeat_status?: string;
          last_plc_status?: string;
          last_realdata_at?: string | null;
          last_realdata_payload?: Json | null;
          last_ring?: number | null;
          plc_status?: string;
          plc_status_change_at?: string | null;
          tbm_id: string;
          updated_at?: string;
        };
        Update: {
          heartbeat_status?: string;
          heartbeat_status_change_at?: string | null;
          last_heartbeat_at?: string | null;
          last_heartbeat_payload?: Json | null;
          last_heartbeat_status?: string;
          last_plc_status?: string;
          last_realdata_at?: string | null;
          last_realdata_payload?: Json | null;
          last_ring?: number | null;
          plc_status?: string;
          plc_status_change_at?: string | null;
          tbm_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_connectivity_snapshots_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: true;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_data: {
        Row: {
          data: Json;
          id: string;
          ring: number | null;
          status: string | null;
          tbmcode: string;
          timestamp: string;
        };
        Insert: {
          data: Json;
          id: string;
          ring?: number | null;
          status?: string | null;
          tbmcode: string;
          timestamp: string;
        };
        Update: {
          data?: Json;
          id?: string;
          ring?: number | null;
          status?: string | null;
          tbmcode?: string;
          timestamp?: string;
        };
        Relationships: [];
      };
      tbm_delta_threshold_overrides: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          delta_critical_abs: number | null;
          delta_warning_abs: number | null;
          id: number;
          is_active: boolean | null;
          param_id: number;
          tbm_id: string;
          updated_at: string | null;
          updated_by: string | null;
          window_ms: number | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          delta_critical_abs?: number | null;
          delta_warning_abs?: number | null;
          id?: number;
          is_active?: boolean | null;
          param_id: number;
          tbm_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
          window_ms?: number | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          delta_critical_abs?: number | null;
          delta_warning_abs?: number | null;
          id?: number;
          is_active?: boolean | null;
          param_id?: number;
          tbm_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
          window_ms?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_delta_threshold_overrides_param_id_fkey";
            columns: ["param_id"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_delta_threshold_overrides_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_event_notifications: {
        Row: {
          alarm_type: string;
          channel: string;
          created_at: string | null;
          created_by: string | null;
          employee_id: string | null;
          employee_name: string | null;
          employee_phone: string | null;
          error_message: string | null;
          event_id: string;
          id: string;
          param_code: string;
          sent_at: string;
          severity: string;
          success: boolean | null;
          tbm_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          alarm_type: string;
          channel: string;
          created_at?: string | null;
          created_by?: string | null;
          employee_id?: string | null;
          employee_name?: string | null;
          employee_phone?: string | null;
          error_message?: string | null;
          event_id: string;
          id?: string;
          param_code: string;
          sent_at?: string;
          severity: string;
          success?: boolean | null;
          tbm_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          alarm_type?: string;
          channel?: string;
          created_at?: string | null;
          created_by?: string | null;
          employee_id?: string | null;
          employee_name?: string | null;
          employee_phone?: string | null;
          error_message?: string | null;
          event_id?: string;
          id?: string;
          param_code?: string;
          sent_at?: string;
          severity?: string;
          success?: boolean | null;
          tbm_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_event_notifications_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_event_notifications_employee_id_fkey";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employees_with_positions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_event_notifications_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_heartbeat_history: {
        Row: {
          created_at: string;
          end_at: string | null;
          id: string;
          snapshot: Json | null;
          start_at: string;
          status: string;
          tbm_id: string;
        };
        Insert: {
          created_at?: string;
          end_at?: string | null;
          id?: string;
          snapshot?: Json | null;
          start_at?: string;
          status: string;
          tbm_id: string;
        };
        Update: {
          created_at?: string;
          end_at?: string | null;
          id?: string;
          snapshot?: Json | null;
          start_at?: string;
          status?: string;
          tbm_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_heartbeat_history_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_infos: {
        Row: {
          alarm_time_limit: number | null;
          boot_support: number | null;
          code: string;
          ctbm_code: string | null;
          cutter_open: number | null;
          cutter_speed: number | null;
          cutter_torque: number | null;
          device_len: number | null;
          device_power: number | null;
          device_weight: number | null;
          diameter: number;
          driver: string | null;
          driver_type: Database["public"]["Enums"]["driver_type"] | null;
          earth_pressure_bar_num: number | null;
          fp_power: number | null;
          frequency: number | null;
          geo: string | null;
          gf_ids: number | null;
          hinge: number | null;
          id: number;
          is_active: boolean | null;
          le_belt_speed: number | null;
          main_belt_speed: number | null;
          motor_num: number | null;
          name: string;
          owner: number | null;
          owner_name: string | null;
          particle_size: number | null;
          plc_file_ids: string | null;
          producer: string | null;
          producer_name: string | null;
          production_date: string | null;
          rated_thrust: number | null;
          remark: string | null;
          screw_power: number | null;
          screw_torque: number | null;
          segment_outer: number | null;
          segment_param: string | null;
          source: boolean | null;
          tbm_model: string | null;
          tbm_type: number | null;
          thrust_group_num: number | null;
          use_date: number | null;
          worth: number | null;
        };
        Insert: {
          alarm_time_limit?: number | null;
          boot_support?: number | null;
          code: string;
          ctbm_code?: string | null;
          cutter_open?: number | null;
          cutter_speed?: number | null;
          cutter_torque?: number | null;
          device_len?: number | null;
          device_power?: number | null;
          device_weight?: number | null;
          diameter: number;
          driver?: string | null;
          driver_type?: Database["public"]["Enums"]["driver_type"] | null;
          earth_pressure_bar_num?: number | null;
          fp_power?: number | null;
          frequency?: number | null;
          geo?: string | null;
          gf_ids?: number | null;
          hinge?: number | null;
          id?: number;
          is_active?: boolean | null;
          le_belt_speed?: number | null;
          main_belt_speed?: number | null;
          motor_num?: number | null;
          name: string;
          owner?: number | null;
          owner_name?: string | null;
          particle_size?: number | null;
          plc_file_ids?: string | null;
          producer?: string | null;
          producer_name?: string | null;
          production_date?: string | null;
          rated_thrust?: number | null;
          remark?: string | null;
          screw_power?: number | null;
          screw_torque?: number | null;
          segment_outer?: number | null;
          segment_param?: string | null;
          source?: boolean | null;
          tbm_model?: string | null;
          tbm_type?: number | null;
          thrust_group_num?: number | null;
          use_date?: number | null;
          worth?: number | null;
        };
        Update: {
          alarm_time_limit?: number | null;
          boot_support?: number | null;
          code?: string;
          ctbm_code?: string | null;
          cutter_open?: number | null;
          cutter_speed?: number | null;
          cutter_torque?: number | null;
          device_len?: number | null;
          device_power?: number | null;
          device_weight?: number | null;
          diameter?: number;
          driver?: string | null;
          driver_type?: Database["public"]["Enums"]["driver_type"] | null;
          earth_pressure_bar_num?: number | null;
          fp_power?: number | null;
          frequency?: number | null;
          geo?: string | null;
          gf_ids?: number | null;
          hinge?: number | null;
          id?: number;
          is_active?: boolean | null;
          le_belt_speed?: number | null;
          main_belt_speed?: number | null;
          motor_num?: number | null;
          name?: string;
          owner?: number | null;
          owner_name?: string | null;
          particle_size?: number | null;
          plc_file_ids?: string | null;
          producer?: string | null;
          producer_name?: string | null;
          production_date?: string | null;
          rated_thrust?: number | null;
          remark?: string | null;
          screw_power?: number | null;
          screw_torque?: number | null;
          segment_outer?: number | null;
          segment_param?: string | null;
          source?: boolean | null;
          tbm_model?: string | null;
          tbm_type?: number | null;
          thrust_group_num?: number | null;
          use_date?: number | null;
          worth?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_tbm_type";
            columns: ["tbm_type"];
            isOneToOne: false;
            referencedRelation: "tbm_types";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_logs: {
        Row: {
          changed_at: string | null;
          changed_by: string | null;
          id: string;
          remark: string | null;
          tbm_id: string | null;
          tunnel_id: string | null;
        };
        Insert: {
          changed_at?: string | null;
          changed_by?: string | null;
          id?: string;
          remark?: string | null;
          tbm_id?: string | null;
          tunnel_id?: string | null;
        };
        Update: {
          changed_at?: string | null;
          changed_by?: string | null;
          id?: string;
          remark?: string | null;
          tbm_id?: string | null;
          tunnel_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_logs_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_operational_events: {
        Row: {
          action: string | null;
          created_at: string | null;
          created_by: string | null;
          event_id: string;
          id: string;
          message: string | null;
          notified_channels: Json | null;
          notified_users: Json | null;
          occurred_at: string;
          param_code: string;
          parameters: Json | null;
          payload: Json | null;
          ring_no: number | null;
          severity_id: number | null;
          tbm_id: string;
          updated_at: string | null;
          updated_by: string | null;
          value: number | null;
          window_ms: number;
        };
        Insert: {
          action?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          event_id: string;
          id?: string;
          message?: string | null;
          notified_channels?: Json | null;
          notified_users?: Json | null;
          occurred_at: string;
          param_code: string;
          parameters?: Json | null;
          payload?: Json | null;
          ring_no?: number | null;
          severity_id?: number | null;
          tbm_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: number | null;
          window_ms?: number;
        };
        Update: {
          action?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          event_id?: string;
          id?: string;
          message?: string | null;
          notified_channels?: Json | null;
          notified_users?: Json | null;
          occurred_at?: string;
          param_code?: string;
          parameters?: Json | null;
          payload?: Json | null;
          ring_no?: number | null;
          severity_id?: number | null;
          tbm_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: number | null;
          window_ms?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_tbm_event_severity";
            columns: ["severity_id"];
            isOneToOne: false;
            referencedRelation: "alarm_severity_levels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_operational_events_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_parameter_delta_thresholds: {
        Row: {
          delta_critical_abs: number | null;
          delta_warning_abs: number | null;
          id: number;
          is_active: boolean;
          param_id: number;
          updated_at: string;
          updated_by: string | null;
          window_ms: number;
        };
        Insert: {
          delta_critical_abs?: number | null;
          delta_warning_abs?: number | null;
          id?: number;
          is_active?: boolean;
          param_id: number;
          updated_at?: string;
          updated_by?: string | null;
          window_ms?: number;
        };
        Update: {
          delta_critical_abs?: number | null;
          delta_warning_abs?: number | null;
          id?: number;
          is_active?: boolean;
          param_id?: number;
          updated_at?: string;
          updated_by?: string | null;
          window_ms?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_delta_thresholds_param";
            columns: ["param_id"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_parameter_excludes: {
        Row: {
          created_at: string | null;
          id: number;
          parameter_code: string;
          reason: string | null;
          tbm_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          parameter_code: string;
          reason?: string | null;
          tbm_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          parameter_code?: string;
          reason?: string | null;
          tbm_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_parameter_excludes_parameter_code_fkey";
            columns: ["parameter_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "tbm_parameter_excludes_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_parameter_thresholds: {
        Row: {
          alert_lower: number | null;
          alert_lower_lower: number | null;
          alert_upper: number | null;
          alert_upper_upper: number | null;
          baseline_lower: number | null;
          baseline_upper: number | null;
          id: number;
          is_active: boolean;
          param_id: number;
          updated_at: string | null;
          updated_by: string | null;
          use_absolute: boolean | null;
        };
        Insert: {
          alert_lower?: number | null;
          alert_lower_lower?: number | null;
          alert_upper?: number | null;
          alert_upper_upper?: number | null;
          baseline_lower?: number | null;
          baseline_upper?: number | null;
          id?: number;
          is_active?: boolean;
          param_id: number;
          updated_at?: string | null;
          updated_by?: string | null;
          use_absolute?: boolean | null;
        };
        Update: {
          alert_lower?: number | null;
          alert_lower_lower?: number | null;
          alert_upper?: number | null;
          alert_upper_upper?: number | null;
          baseline_lower?: number | null;
          baseline_upper?: number | null;
          id?: number;
          is_active?: boolean;
          param_id?: number;
          updated_at?: string | null;
          updated_by?: string | null;
          use_absolute?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_thresholds_param";
            columns: ["param_id"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_plc_history: {
        Row: {
          created_at: string;
          end_at: string | null;
          id: string;
          snapshot: Json | null;
          start_at: string;
          status: string;
          tbm_id: string;
        };
        Insert: {
          created_at?: string;
          end_at?: string | null;
          id?: string;
          snapshot?: Json | null;
          start_at?: string;
          status: string;
          tbm_id: string;
        };
        Update: {
          created_at?: string;
          end_at?: string | null;
          id?: string;
          snapshot?: Json | null;
          start_at?: string;
          status?: string;
          tbm_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_plc_history_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_realdata: {
        Row: {
          b000000001: boolean | null;
          b000000002: boolean | null;
          id: string;
          recorded_at: string;
          s010102004: number | null;
          s010103006: number | null;
          s010109001: number | null;
          s020901001: number | null;
          s020901002: number | null;
          s020901003: number | null;
          s020901004: number | null;
          s020901005: number | null;
          s020901006: number | null;
          s050001001: number | null;
          s050001019: number | null;
          s050001020: number | null;
          s050001021: number | null;
          s050001022: number | null;
          s050001023: number | null;
          s050001024: number | null;
          s050006005: number | null;
          s050006006: number | null;
          s050006007: number | null;
          s050006008: number | null;
          s050006009: number | null;
          s050006010: number | null;
          s050009003: number | null;
          s050109001: number | null;
          s100100005: number | null;
          s100100006: number | null;
          s100100007: number | null;
          s100100008: number | null;
          s100111009: number | null;
          s100111010: number | null;
          s100111011: number | null;
          s100111012: number | null;
          s100206003: number | null;
          s100206004: number | null;
          s100206006: number | null;
          s100206007: number | null;
          s100206009: number | null;
          s100206010: number | null;
          tbm_id: string;
          tunnel_id: string;
        };
        Insert: {
          b000000001?: boolean | null;
          b000000002?: boolean | null;
          id?: string;
          recorded_at: string;
          s010102004?: number | null;
          s010103006?: number | null;
          s010109001?: number | null;
          s020901001?: number | null;
          s020901002?: number | null;
          s020901003?: number | null;
          s020901004?: number | null;
          s020901005?: number | null;
          s020901006?: number | null;
          s050001001?: number | null;
          s050001019?: number | null;
          s050001020?: number | null;
          s050001021?: number | null;
          s050001022?: number | null;
          s050001023?: number | null;
          s050001024?: number | null;
          s050006005?: number | null;
          s050006006?: number | null;
          s050006007?: number | null;
          s050006008?: number | null;
          s050006009?: number | null;
          s050006010?: number | null;
          s050009003?: number | null;
          s050109001?: number | null;
          s100100005?: number | null;
          s100100006?: number | null;
          s100100007?: number | null;
          s100100008?: number | null;
          s100111009?: number | null;
          s100111010?: number | null;
          s100111011?: number | null;
          s100111012?: number | null;
          s100206003?: number | null;
          s100206004?: number | null;
          s100206006?: number | null;
          s100206007?: number | null;
          s100206009?: number | null;
          s100206010?: number | null;
          tbm_id: string;
          tunnel_id: string;
        };
        Update: {
          b000000001?: boolean | null;
          b000000002?: boolean | null;
          id?: string;
          recorded_at?: string;
          s010102004?: number | null;
          s010103006?: number | null;
          s010109001?: number | null;
          s020901001?: number | null;
          s020901002?: number | null;
          s020901003?: number | null;
          s020901004?: number | null;
          s020901005?: number | null;
          s020901006?: number | null;
          s050001001?: number | null;
          s050001019?: number | null;
          s050001020?: number | null;
          s050001021?: number | null;
          s050001022?: number | null;
          s050001023?: number | null;
          s050001024?: number | null;
          s050006005?: number | null;
          s050006006?: number | null;
          s050006007?: number | null;
          s050006008?: number | null;
          s050006009?: number | null;
          s050006010?: number | null;
          s050009003?: number | null;
          s050109001?: number | null;
          s100100005?: number | null;
          s100100006?: number | null;
          s100100007?: number | null;
          s100100008?: number | null;
          s100111009?: number | null;
          s100111010?: number | null;
          s100111011?: number | null;
          s100111012?: number | null;
          s100206003?: number | null;
          s100206004?: number | null;
          s100206006?: number | null;
          s100206007?: number | null;
          s100206009?: number | null;
          s100206010?: number | null;
          tbm_id?: string;
          tunnel_id?: string;
        };
        Relationships: [];
      };
      tbm_ring_phases: {
        Row: {
          created_at: string | null;
          duration_seconds: number | null;
          end_time: string;
          id: string;
          phase: string;
          ring: number;
          start_time: string;
          tbm_id: string;
          tunnel_id: string;
        };
        Insert: {
          created_at?: string | null;
          duration_seconds?: number | null;
          end_time: string;
          id?: string;
          phase: string;
          ring: number;
          start_time: string;
          tbm_id: string;
          tunnel_id: string;
        };
        Update: {
          created_at?: string | null;
          duration_seconds?: number | null;
          end_time?: string;
          id?: string;
          phase?: string;
          ring?: number;
          start_time?: string;
          tbm_id?: string;
          tunnel_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_ring_phases_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_ring_phases_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnel_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_runtime_parameters: {
        Row: {
          alarm: boolean | null;
          block_code: string | null;
          code: string;
          create_time: string | null;
          delete_flag: boolean;
          digits: number | null;
          group_code: string | null;
          group_name: string | null;
          id: number;
          is_virtual: boolean | null;
          name: string;
          remark: string | null;
          sub_system: string;
          subsystem_id: number;
          ttm1: boolean;
          ttm2: boolean;
          ttm3: boolean;
          ttm4: boolean;
          ttm5: boolean;
          unit: string;
          update_time: string | null;
        };
        Insert: {
          alarm?: boolean | null;
          block_code?: string | null;
          code: string;
          create_time?: string | null;
          delete_flag?: boolean;
          digits?: number | null;
          group_code?: string | null;
          group_name?: string | null;
          id?: number;
          is_virtual?: boolean | null;
          name: string;
          remark?: string | null;
          sub_system: string;
          subsystem_id: number;
          ttm1?: boolean;
          ttm2?: boolean;
          ttm3?: boolean;
          ttm4?: boolean;
          ttm5?: boolean;
          unit: string;
          update_time?: string | null;
        };
        Update: {
          alarm?: boolean | null;
          block_code?: string | null;
          code?: string;
          create_time?: string | null;
          delete_flag?: boolean;
          digits?: number | null;
          group_code?: string | null;
          group_name?: string | null;
          id?: number;
          is_virtual?: boolean | null;
          name?: string;
          remark?: string | null;
          sub_system?: string;
          subsystem_id?: number;
          ttm1?: boolean;
          ttm2?: boolean;
          ttm3?: boolean;
          ttm4?: boolean;
          ttm5?: boolean;
          unit?: string;
          update_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_runtime_parameters_subsystem_id_fkey";
            columns: ["subsystem_id"];
            isOneToOne: false;
            referencedRelation: "tbm_subsystems";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_status_history: {
        Row: {
          created_at: string | null;
          end_at: string | null;
          id: string;
          start_at: string;
          status: string;
          tbm_id: string;
          tunnel_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          end_at?: string | null;
          id?: string;
          start_at?: string;
          status: string;
          tbm_id: string;
          tunnel_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          end_at?: string | null;
          id?: string;
          start_at?: string;
          status?: string;
          tbm_id?: string;
          tunnel_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_status_history_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_status_history_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnel_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_statuses: {
        Row: {
          current_ring_no: number | null;
          id: string;
          status: string;
          tbm_id: string;
          tunnel_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          current_ring_no?: number | null;
          id?: string;
          status: string;
          tbm_id: string;
          tunnel_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          current_ring_no?: number | null;
          id?: string;
          status?: string;
          tbm_id?: string;
          tunnel_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_statuses_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: true;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_statuses_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnel_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_subproject_history: {
        Row: {
          end_date: string | null;
          id: string;
          start_date: string;
          subproject_id: string;
          tbm_id: string;
        };
        Insert: {
          end_date?: string | null;
          id?: string;
          start_date: string;
          subproject_id: string;
          tbm_id: string;
        };
        Update: {
          end_date?: string | null;
          id?: string;
          start_date?: string;
          subproject_id?: string;
          tbm_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_subproject_history_subproject_id_fkey";
            columns: ["subproject_id"];
            isOneToOne: false;
            referencedRelation: "subprojects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_subproject_history_tbm_id_fkey";
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
          create_time: string | null;
          id: number;
          name: string;
          remark: string | null;
          ttm1: boolean | null;
          ttm2: boolean | null;
          ttm3: boolean | null;
          ttm4: boolean | null;
          ttm5: boolean | null;
          update_time: string | null;
        };
        Insert: {
          code: string;
          create_time?: string | null;
          id?: number;
          name: string;
          remark?: string | null;
          ttm1?: boolean | null;
          ttm2?: boolean | null;
          ttm3?: boolean | null;
          ttm4?: boolean | null;
          ttm5?: boolean | null;
          update_time?: string | null;
        };
        Update: {
          code?: string;
          create_time?: string | null;
          id?: number;
          name?: string;
          remark?: string | null;
          ttm1?: boolean | null;
          ttm2?: boolean | null;
          ttm3?: boolean | null;
          ttm4?: boolean | null;
          ttm5?: boolean | null;
          update_time?: string | null;
        };
        Relationships: [];
      };
      tbm_threshold_overrides: {
        Row: {
          alert_lower: number | null;
          alert_lower_lower: number | null;
          alert_upper: number | null;
          alert_upper_upper: number | null;
          baseline_lower: number | null;
          baseline_upper: number | null;
          created_at: string | null;
          created_by: string | null;
          id: number;
          is_active: boolean | null;
          param_id: number;
          tbm_id: string;
          updated_at: string | null;
          updated_by: string | null;
          use_absolute: boolean | null;
        };
        Insert: {
          alert_lower?: number | null;
          alert_lower_lower?: number | null;
          alert_upper?: number | null;
          alert_upper_upper?: number | null;
          baseline_lower?: number | null;
          baseline_upper?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: number;
          is_active?: boolean | null;
          param_id: number;
          tbm_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
          use_absolute?: boolean | null;
        };
        Update: {
          alert_lower?: number | null;
          alert_lower_lower?: number | null;
          alert_upper?: number | null;
          alert_upper_upper?: number | null;
          baseline_lower?: number | null;
          baseline_upper?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: number;
          is_active?: boolean | null;
          param_id?: number;
          tbm_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
          use_absolute?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_threshold_overrides_param_id_fkey";
            columns: ["param_id"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_threshold_overrides_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_types: {
        Row: {
          code: string;
          id: number;
          name: string;
          remark: string | null;
        };
        Insert: {
          code: string;
          id?: number;
          name: string;
          remark?: string | null;
        };
        Update: {
          code?: string;
          id?: number;
          name?: string;
          remark?: string | null;
        };
        Relationships: [];
      };
      tbm_usage_history: {
        Row: {
          description: string | null;
          end_date: string | null;
          id: string;
          related_id: string | null;
          start_date: string;
          tbm_id: string;
          usage_type: Database["public"]["Enums"]["tbm_usage_type"];
        };
        Insert: {
          description?: string | null;
          end_date?: string | null;
          id?: string;
          related_id?: string | null;
          start_date: string;
          tbm_id: string;
          usage_type: Database["public"]["Enums"]["tbm_usage_type"];
        };
        Update: {
          description?: string | null;
          end_date?: string | null;
          id?: string;
          related_id?: string | null;
          start_date?: string;
          tbm_id?: string;
          usage_type?: Database["public"]["Enums"]["tbm_usage_type"];
        };
        Relationships: [
          {
            foreignKeyName: "tbm_usage_history_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tbm_usage_records: {
        Row: {
          created_at: string | null;
          end_date: string | null;
          id: string;
          remarks: string | null;
          start_date: string;
          tbm_id: string;
          tunnel_id: string;
        };
        Insert: {
          created_at?: string | null;
          end_date?: string | null;
          id?: string;
          remarks?: string | null;
          start_date: string;
          tbm_id: string;
          tunnel_id: string;
        };
        Update: {
          created_at?: string | null;
          end_date?: string | null;
          id?: string;
          remarks?: string | null;
          start_date?: string;
          tbm_id?: string;
          tunnel_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tbm_usage_records_tbm_id_fkey";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbm_usage_records_tunnel_id_fkey";
            columns: ["tunnel_id"];
            isOneToOne: false;
            referencedRelation: "tunnel_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      tbms: {
        Row: {
          alarm_time_limit: number | null;
          boot_support: number | null;
          code: string;
          ctbm_code: string | null;
          cutter_open: number | null;
          cutter_speed: number | null;
          cutter_torque: number | null;
          device_len: number | null;
          device_power: number | null;
          device_weight: number | null;
          diameter: number;
          driver: string | null;
          driver_type: Database["public"]["Enums"]["driver_type"] | null;
          earth_pressure_bar_num: number | null;
          fp_power: number | null;
          frequency: number | null;
          geo: string | null;
          gf_ids: number | null;
          hinge: number | null;
          id: string;
          le_belt_speed: number | null;
          main_belt_speed: number | null;
          manager_code: string | null;
          model: string | null;
          motor_num: number | null;
          name: string;
          owner_id: string | null;
          particle_size: number | null;
          plc_file_ids: string | null;
          producer_id: string | null;
          production_date: string | null;
          rated_thrust: number | null;
          remark: string | null;
          screw_power: number | null;
          screw_torque: number | null;
          segment_outer: number | null;
          segment_param: string | null;
          source: boolean | null;
          thrust_group_num: number | null;
          type_id: number;
          use_date: number | null;
          worth: number | null;
        };
        Insert: {
          alarm_time_limit?: number | null;
          boot_support?: number | null;
          code: string;
          ctbm_code?: string | null;
          cutter_open?: number | null;
          cutter_speed?: number | null;
          cutter_torque?: number | null;
          device_len?: number | null;
          device_power?: number | null;
          device_weight?: number | null;
          diameter: number;
          driver?: string | null;
          driver_type?: Database["public"]["Enums"]["driver_type"] | null;
          earth_pressure_bar_num?: number | null;
          fp_power?: number | null;
          frequency?: number | null;
          geo?: string | null;
          gf_ids?: number | null;
          hinge?: number | null;
          id?: string;
          le_belt_speed?: number | null;
          main_belt_speed?: number | null;
          manager_code?: string | null;
          model?: string | null;
          motor_num?: number | null;
          name: string;
          owner_id?: string | null;
          particle_size?: number | null;
          plc_file_ids?: string | null;
          producer_id?: string | null;
          production_date?: string | null;
          rated_thrust?: number | null;
          remark?: string | null;
          screw_power?: number | null;
          screw_torque?: number | null;
          segment_outer?: number | null;
          segment_param?: string | null;
          source?: boolean | null;
          thrust_group_num?: number | null;
          type_id: number;
          use_date?: number | null;
          worth?: number | null;
        };
        Update: {
          alarm_time_limit?: number | null;
          boot_support?: number | null;
          code?: string;
          ctbm_code?: string | null;
          cutter_open?: number | null;
          cutter_speed?: number | null;
          cutter_torque?: number | null;
          device_len?: number | null;
          device_power?: number | null;
          device_weight?: number | null;
          diameter?: number;
          driver?: string | null;
          driver_type?: Database["public"]["Enums"]["driver_type"] | null;
          earth_pressure_bar_num?: number | null;
          fp_power?: number | null;
          frequency?: number | null;
          geo?: string | null;
          gf_ids?: number | null;
          hinge?: number | null;
          id?: string;
          le_belt_speed?: number | null;
          main_belt_speed?: number | null;
          manager_code?: string | null;
          model?: string | null;
          motor_num?: number | null;
          name?: string;
          owner_id?: string | null;
          particle_size?: number | null;
          plc_file_ids?: string | null;
          producer_id?: string | null;
          production_date?: string | null;
          rated_thrust?: number | null;
          remark?: string | null;
          screw_power?: number | null;
          screw_torque?: number | null;
          segment_outer?: number | null;
          segment_param?: string | null;
          source?: boolean | null;
          thrust_group_num?: number | null;
          type_id?: number;
          use_date?: number | null;
          worth?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tbms_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "owners";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbms_producer_id_fkey";
            columns: ["producer_id"];
            isOneToOne: false;
            referencedRelation: "producers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tbms_type_id_fkey";
            columns: ["type_id"];
            isOneToOne: false;
            referencedRelation: "tbm_types";
            referencedColumns: ["id"];
          },
        ];
      };
      ttm_parameter_excludes_global: {
        Row: {
          created_at: string | null;
          parameter_code: string;
          reason: string | null;
          ttm_code: string;
        };
        Insert: {
          created_at?: string | null;
          parameter_code: string;
          reason?: string | null;
          ttm_code: string;
        };
        Update: {
          created_at?: string | null;
          parameter_code?: string;
          reason?: string | null;
          ttm_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ttm_parameter_excludes_global_parameter_code_fkey";
            columns: ["parameter_code"];
            isOneToOne: false;
            referencedRelation: "tbm_runtime_parameters";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "ttm_parameter_excludes_global_ttm_code_fkey";
            columns: ["ttm_code"];
            isOneToOne: false;
            referencedRelation: "tbm_types";
            referencedColumns: ["code"];
          },
        ];
      };
      ttm_subsystem_excludes: {
        Row: {
          created_at: string | null;
          remark: string | null;
          subsystem_code: string;
          ttm_code: string;
        };
        Insert: {
          created_at?: string | null;
          remark?: string | null;
          subsystem_code: string;
          ttm_code: string;
        };
        Update: {
          created_at?: string | null;
          remark?: string | null;
          subsystem_code?: string;
          ttm_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ttm_subsystem_excludes_subsystem_code_fkey";
            columns: ["subsystem_code"];
            isOneToOne: false;
            referencedRelation: "tbm_subsystems";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "ttm_subsystem_excludes_ttm_code_fkey";
            columns: ["ttm_code"];
            isOneToOne: false;
            referencedRelation: "tbm_types";
            referencedColumns: ["code"];
          },
        ];
      };
      tunnel_daily_plans: {
        Row: {
          created_at: string | null;
          id: string;
          modified_by: string | null;
          plan_at: string;
          plan_ring_count: number | null;
          tunnel_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          modified_by?: string | null;
          plan_at: string;
          plan_ring_count?: number | null;
          tunnel_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          modified_by?: string | null;
          plan_at?: string;
          plan_ring_count?: number | null;
          tunnel_id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      tunnel_daily_progress: {
        Row: {
          created_at: string | null;
          id: string;
          modified_by: string | null;
          op_num_end: number | null;
          op_num_start: number | null;
          plan_ring_count: number | null;
          progress_at: string;
          ring_end: number | null;
          ring_start: number | null;
          tbm_id: string | null;
          tunnel_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          modified_by?: string | null;
          op_num_end?: number | null;
          op_num_start?: number | null;
          plan_ring_count?: number | null;
          progress_at: string;
          ring_end?: number | null;
          ring_start?: number | null;
          tbm_id?: string | null;
          tunnel_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          modified_by?: string | null;
          op_num_end?: number | null;
          op_num_start?: number | null;
          plan_ring_count?: number | null;
          progress_at?: string;
          ring_end?: number | null;
          ring_start?: number | null;
          tbm_id?: string | null;
          tunnel_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_tbm_id";
            columns: ["tbm_id"];
            isOneToOne: false;
            referencedRelation: "tbms";
            referencedColumns: ["id"];
          },
        ];
      };
      tunnel_entities: {
        Row: {
          created_at: string | null;
          geology: string | null;
          id: string;
          inner_diameter: number | null;
          line_side: Database["public"]["Enums"]["tunnel_line_side_enum"];
          op_num_end: number | null;
          op_num_start: number | null;
          outer_diameter: number | null;
          remark: string | null;
          ring_end: number | null;
          ring_start: number | null;
          segment_width: number | null;
          status: Database["public"]["Enums"]["project_status_enum"];
          tunnel_type: Database["public"]["Enums"]["tunnel_type_enum"];
          unit_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          geology?: string | null;
          id?: string;
          inner_diameter?: number | null;
          line_side: Database["public"]["Enums"]["tunnel_line_side_enum"];
          op_num_end?: number | null;
          op_num_start?: number | null;
          outer_diameter?: number | null;
          remark?: string | null;
          ring_end?: number | null;
          ring_start?: number | null;
          segment_width?: number | null;
          status: Database["public"]["Enums"]["project_status_enum"];
          tunnel_type: Database["public"]["Enums"]["tunnel_type_enum"];
          unit_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          geology?: string | null;
          id?: string;
          inner_diameter?: number | null;
          line_side?: Database["public"]["Enums"]["tunnel_line_side_enum"];
          op_num_end?: number | null;
          op_num_start?: number | null;
          outer_diameter?: number | null;
          remark?: string | null;
          ring_end?: number | null;
          ring_start?: number | null;
          segment_width?: number | null;
          status?: Database["public"]["Enums"]["project_status_enum"];
          tunnel_type?: Database["public"]["Enums"]["tunnel_type_enum"];
          unit_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tunnels_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "project_units";
            referencedColumns: ["id"];
          },
        ];
      };
      tunnels: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          end_chainage: number | null;
          end_stake: string | null;
          geology: Json | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string;
          prefix: string | null;
          project_catalog_id: string;
          project_id: string;
          remarks: string | null;
          start_chainage: number | null;
          start_stake: string | null;
          status_id: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          end_chainage?: number | null;
          end_stake?: string | null;
          geology?: Json | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          prefix?: string | null;
          project_catalog_id: string;
          project_id: string;
          remarks?: string | null;
          start_chainage?: number | null;
          start_stake?: string | null;
          status_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          end_chainage?: number | null;
          end_stake?: string | null;
          geology?: Json | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          prefix?: string | null;
          project_catalog_id?: string;
          project_id?: string;
          remarks?: string | null;
          start_chainage?: number | null;
          start_stake?: string | null;
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
      unit_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          order_index: number | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id: string;
          name: string;
          order_index?: number | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          order_index?: number | null;
        };
        Relationships: [];
      };
      unit_part_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          has_profile: boolean | null;
          id: string;
          name: string;
          order_index: number | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          has_profile?: boolean | null;
          id: string;
          name: string;
          order_index?: number | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          has_profile?: boolean | null;
          id?: string;
          name?: string;
          order_index?: number | null;
        };
        Relationships: [];
      };
      unit_parts: {
        Row: {
          category_id: string;
          created_at: string | null;
          id: string;
          name: string;
          order_index: number | null;
          remarks: string | null;
          short_name: string | null;
          unit_id: string;
        };
        Insert: {
          category_id: string;
          created_at?: string | null;
          id?: string;
          name: string;
          order_index?: number | null;
          remarks?: string | null;
          short_name?: string | null;
          unit_id: string;
        };
        Update: {
          category_id?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          order_index?: number | null;
          remarks?: string | null;
          short_name?: string | null;
          unit_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "unit_parts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "unit_part_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unit_parts_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "project_units";
            referencedColumns: ["id"];
          },
        ];
      };
      unit_projects: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          engineering_qty: number | null;
          external_global_id: string | null;
          external_source_id: string;
          id: string;
          name: string;
          project_catalog_std_id: string | null;
          project_id: string;
          short_name: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          engineering_qty?: number | null;
          external_global_id?: string | null;
          external_source_id: string;
          id?: string;
          name: string;
          project_catalog_std_id?: string | null;
          project_id: string;
          short_name?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          engineering_qty?: number | null;
          external_global_id?: string | null;
          external_source_id?: string;
          id?: string;
          name?: string;
          project_catalog_std_id?: string | null;
          project_id?: string;
          short_name?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "unit_projects_project_catalog_std_id_fkey";
            columns: ["project_catalog_std_id"];
            isOneToOne: false;
            referencedRelation: "project_catalog_std";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unit_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unit_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["project_id"];
          },
        ];
      };
      user_roles: {
        Row: {
          role_id: string;
          user_id: string;
        };
        Insert: {
          role_id: string;
          user_id: string;
        };
        Update: {
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      v_departments_with_path: {
        Row: {
          depth: number | null;
          id: string | null;
          name: string | null;
          parent_id: string | null;
          path_ids: string[] | null;
          path_names: string[] | null;
          path_text: string | null;
        };
        Relationships: [];
      };
      v_employees_with_positions: {
        Row: {
          birthdate: string | null;
          code: string | null;
          created_at: string | null;
          created_by: string | null;
          department_id: string | null;
          department_name: string | null;
          email: string | null;
          emp_type: string | null;
          emp_type_id: string | null;
          employment_status: string | null;
          external_id: string | null;
          full_org_path: string | null;
          gender: string | null;
          gender_id: string | null;
          guid: string | null;
          id: string | null;
          id_card_number: string | null;
          is_active: boolean | null;
          is_deleted: boolean | null;
          job_title: string | null;
          name: string | null;
          notes: string | null;
          organization_id: string | null;
          organization_name: string | null;
          phone_number: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
          version_no: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_position_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_position_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
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
            foreignKeyName: "gender_id_fkey";
            columns: ["gender_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
        ];
      };
      v_organization_employee_stats: {
        Row: {
          category_id: string | null;
          children_count: number | null;
          code: string | null;
          country_id: string | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          display_path: string | null;
          employee_count: number | null;
          employee_total_count: number | null;
          external_id: string | null;
          fullname: string | null;
          guid: string | null;
          id: string | null;
          is_disabled: boolean | null;
          is_leaf: boolean | null;
          is_virtual: boolean | null;
          level: number | null;
          name: string | null;
          org_type_id: string | null;
          org_type_name: string | null;
          parent_id: string | null;
          parent_ids: string[] | null;
          parent_name: string | null;
          process_status: string | null;
          region_id: string | null;
          region_name: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
        ];
      };
      v_organization_employee_stats_v2: {
        Row: {
          category_id: string | null;
          children_count: number | null;
          code: string | null;
          country_id: string | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          display_path: string | null;
          employee_count: number | null;
          employee_total_count: number | null;
          external_id: string | null;
          fullname: string | null;
          guid: string | null;
          id: string | null;
          is_disabled: boolean | null;
          is_leaf: boolean | null;
          is_virtual: boolean | null;
          leaders: Json | null;
          level: number | null;
          name: string | null;
          org_type_id: string | null;
          org_type_name: string | null;
          parent_id: string | null;
          parent_ids: string[] | null;
          parent_name: string | null;
          process_status: string | null;
          region_id: string | null;
          region_name: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_employee_stats_v2";
            referencedColumns: ["id"];
          },
        ];
      };
      v_tbm_assignments_overview: {
        Row: {
          assignment_id: string | null;
          catalog_id: string | null;
          catalog_name: string | null;
          diameter: number | null;
          end_chainage: number | null;
          end_stake: string | null;
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
          start_stake: string | null;
          status_id: string | null;
          tbm_code: string | null;
          tbm_id: string | null;
          tbm_model: string | null;
          tbm_name: string | null;
          tbm_operation_status: string | null;
          tunnel_id: string | null;
          tunnel_name: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_catalogs_parent_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "project_catalogs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_catalogs_parent_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "v_tbm_assignments_overview";
            referencedColumns: ["catalog_id"];
          },
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
      v_tunnel_ring_max: {
        Row: {
          max_ring: number | null;
          tunnel_id: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      add_compression_policy: {
        Args: {
          compress_after?: unknown;
          compress_created_before?: unknown;
          hypertable: unknown;
          if_not_exists?: boolean;
          initial_start?: string;
          schedule_interval?: unknown;
          timezone?: string;
        };
        Returns: number;
      };
      add_continuous_aggregate_policy: {
        Args: {
          continuous_aggregate: unknown;
          end_offset: unknown;
          if_not_exists?: boolean;
          initial_start?: string;
          schedule_interval: unknown;
          start_offset: unknown;
          timezone?: string;
        };
        Returns: number;
      };
      add_dimension:
        | {
            Args: {
              dimension: unknown;
              hypertable: unknown;
              if_not_exists?: boolean;
            };
            Returns: {
              created: boolean;
              dimension_id: number;
            }[];
          }
        | {
            Args: {
              chunk_time_interval?: unknown;
              column_name: unknown;
              hypertable: unknown;
              if_not_exists?: boolean;
              number_partitions?: number;
              partitioning_func?: unknown;
            };
            Returns: {
              column_name: unknown;
              created: boolean;
              dimension_id: number;
              schema_name: unknown;
              table_name: unknown;
            }[];
          };
      add_job: {
        Args: {
          check_config?: unknown;
          config?: Json;
          fixed_schedule?: boolean;
          initial_start?: string;
          proc: unknown;
          schedule_interval: unknown;
          scheduled?: boolean;
          timezone?: string;
        };
        Returns: number;
      };
      add_reorder_policy: {
        Args: {
          hypertable: unknown;
          if_not_exists?: boolean;
          index_name: unknown;
          initial_start?: string;
          timezone?: string;
        };
        Returns: number;
      };
      add_retention_policy: {
        Args: {
          drop_after?: unknown;
          drop_created_before?: unknown;
          if_not_exists?: boolean;
          initial_start?: string;
          relation: unknown;
          schedule_interval?: unknown;
          timezone?: string;
        };
        Returns: number;
      };
      alter_job: {
        Args: {
          check_config?: unknown;
          config?: Json;
          fixed_schedule?: boolean;
          if_exists?: boolean;
          initial_start?: string;
          job_id: number;
          max_retries?: number;
          max_runtime?: unknown;
          next_start?: string;
          retry_period?: unknown;
          schedule_interval?: unknown;
          scheduled?: boolean;
          timezone?: string;
        };
        Returns: {
          check_config: string;
          config: Json;
          fixed_schedule: boolean;
          initial_start: string;
          job_id: number;
          max_retries: number;
          max_runtime: unknown;
          next_start: string;
          retry_period: unknown;
          schedule_interval: unknown;
          scheduled: boolean;
          timezone: string;
        }[];
      };
      approximate_row_count: { Args: { relation: unknown }; Returns: number };
      attach_tablespace: {
        Args: {
          hypertable: unknown;
          if_not_attached?: boolean;
          tablespace: unknown;
        };
        Returns: undefined;
      };
      by_hash: {
        Args: {
          column_name: unknown;
          number_partitions: number;
          partition_func?: unknown;
        };
        Returns: unknown;
      };
      by_range: {
        Args: {
          column_name: unknown;
          partition_func?: unknown;
          partition_interval?: unknown;
        };
        Returns: unknown;
      };
      chunk_compression_stats: {
        Args: { hypertable: unknown };
        Returns: {
          after_compression_index_bytes: number;
          after_compression_table_bytes: number;
          after_compression_toast_bytes: number;
          after_compression_total_bytes: number;
          before_compression_index_bytes: number;
          before_compression_table_bytes: number;
          before_compression_toast_bytes: number;
          before_compression_total_bytes: number;
          chunk_name: unknown;
          chunk_schema: unknown;
          compression_status: string;
          node_name: unknown;
        }[];
      };
      chunks_detailed_size: {
        Args: { hypertable: unknown };
        Returns: {
          chunk_name: unknown;
          chunk_schema: unknown;
          index_bytes: number;
          node_name: unknown;
          table_bytes: number;
          toast_bytes: number;
          total_bytes: number;
        }[];
      };
      compress_chunk: {
        Args: {
          if_not_compressed?: boolean;
          recompress?: boolean;
          uncompressed_chunk: unknown;
        };
        Returns: unknown;
      };
      create_hypertable:
        | {
            Args: {
              create_default_indexes?: boolean;
              dimension: unknown;
              if_not_exists?: boolean;
              migrate_data?: boolean;
              relation: unknown;
            };
            Returns: {
              created: boolean;
              hypertable_id: number;
            }[];
          }
        | {
            Args: {
              associated_schema_name?: unknown;
              associated_table_prefix?: unknown;
              chunk_sizing_func?: unknown;
              chunk_target_size?: string;
              chunk_time_interval?: unknown;
              create_default_indexes?: boolean;
              if_not_exists?: boolean;
              migrate_data?: boolean;
              number_partitions?: number;
              partitioning_column?: unknown;
              partitioning_func?: unknown;
              relation: unknown;
              time_column_name: unknown;
              time_partitioning_func?: unknown;
            };
            Returns: {
              created: boolean;
              hypertable_id: number;
              schema_name: unknown;
              table_name: unknown;
            }[];
          };
      decompress_chunk: {
        Args: { if_compressed?: boolean; uncompressed_chunk: unknown };
        Returns: unknown;
      };
      delete_job: { Args: { job_id: number }; Returns: undefined };
      detach_tablespace: {
        Args: {
          hypertable?: unknown;
          if_attached?: boolean;
          tablespace: unknown;
        };
        Returns: number;
      };
      detach_tablespaces: { Args: { hypertable: unknown }; Returns: number };
      disable_chunk_skipping: {
        Args: {
          column_name: unknown;
          hypertable: unknown;
          if_not_exists?: boolean;
        };
        Returns: {
          column_name: unknown;
          disabled: boolean;
          hypertable_id: number;
        }[];
      };
      drop_chunks: {
        Args: {
          created_after?: unknown;
          created_before?: unknown;
          newer_than?: unknown;
          older_than?: unknown;
          relation: unknown;
          verbose?: boolean;
        };
        Returns: string[];
      };
      enable_chunk_skipping: {
        Args: {
          column_name: unknown;
          hypertable: unknown;
          if_not_exists?: boolean;
        };
        Returns: {
          column_stats_id: number;
          enabled: boolean;
        }[];
      };
      fn_employees_by_org: {
        Args: { include_children?: boolean; target_org: string };
        Returns: {
          birthdate: string;
          created_at: string;
          created_by: string;
          department_id: string;
          department_name: string;
          email: string;
          emp_type: string;
          emp_type_id: string;
          employment_status: string;
          gender: string;
          gender_id: string;
          id: string;
          id_card_number: string;
          job_title: string;
          name: string;
          notes: string;
          organization_id: string;
          organization_name: string;
          phone_number: string;
          sort_order: number;
          updated_at: string;
          updated_by: string;
        }[];
      };
      fn_get_param_summary_avg_max_by_ring: {
        Args: {
          p_fields: string[];
          p_ring_end: number;
          p_ring_start: number;
          p_tunnel_id: string;
        };
        Returns: {
          data: Json;
          ring: number;
        }[];
      };
      fn_get_param_summary_avg_max_by_ring_v2: {
        Args: {
          p_fields: string[];
          p_ring_end: number;
          p_ring_start: number;
          p_tunnel_id: string;
        };
        Returns: {
          data: Json;
          ring: number;
        }[];
      };
      fn_get_param_summary_avg_max_by_ring_v3: {
        Args: {
          p_fields: string[];
          p_ring_end: number;
          p_ring_start: number;
          p_tunnel_id: string;
        };
        Returns: {
          data: Json;
          ring: number;
        }[];
      };
      fn_get_param_summary_by_ring: {
        Args: {
          p_agg_func?: string;
          p_fields: string[];
          p_ring_end: number;
          p_ring_start: number;
          p_tunnel_id: string;
        };
        Returns: {
          data: Json;
          ring: number;
        }[];
      };
      fn_get_tbm_params: {
        Args: {
          p_fields: string[];
          p_from: string;
          p_tbm_id: string;
          p_to: string;
        };
        Returns: {
          data: Json;
          ts: string;
        }[];
      };
      fn_get_tbm_params_by_ring: {
        Args: { p_fields: string[]; p_ring: number; p_tbm_id: string };
        Returns: {
          data: Json;
          ts: string;
        }[];
      };
      fn_get_tbm_params_by_time: {
        Args: {
          p_fields: string[];
          p_from: string;
          p_to: string;
          p_tunnel_id: string;
        };
        Returns: {
          data: Json;
          ts: string;
        }[];
      };
      fn_get_tunnel_tbm_params: {
        Args: {
          p_fields: string[];
          p_from: string;
          p_to: string;
          p_tunnel_id: string;
        };
        Returns: {
          data: Json;
          ts: string;
        }[];
      };
      fn_get_tunnel_tbm_params_by_ring: {
        Args: { p_fields: string[]; p_ring: number; p_tunnel_id: string };
        Returns: {
          data: Json;
          ts: string;
        }[];
      };
      get_master_definitions_tree_by_id: {
        Args: { root: string };
        Returns: {
          code: string;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          display_path: string | null;
          external_global_id: string;
          hier_level: number | null;
          id: string;
          is_disabled: boolean | null;
          is_leaf: boolean;
          name: string;
          parent_id: string | null;
          parent_ids: string[] | null;
          path: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        }[];
        SetofOptions: {
          from: "*";
          to: "master_definitions";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      get_multi_tbm_advance_main_params: {
        Args: { p_day: string; p_tunnel_ids: string[] };
        Returns: {
          avg_s010102004: number;
          avg_s010109001: number;
          avg_s020901001: number;
          avg_s050001001: number;
          avg_s050009003: number;
          avg_s050109001: number;
          max_s010102004: number;
          max_s010109001: number;
          max_s020901001: number;
          max_s050001001: number;
          max_s050009003: number;
          max_s050109001: number;
          tunnel_id: string;
        }[];
      };
      get_parameter_groups_by_model: {
        Args: { ttm_column: string };
        Returns: Json;
      };
      get_parameter_groups_by_tunnel: {
        Args: { tunnel_id: string };
        Returns: Json;
      };
      get_parameter_groups_by_tunnel_v3: {
        Args: { tunnel_id: string };
        Returns: Json;
      };
      get_tbm_status_for_day: {
        Args: { p_day: string; p_tunnel_id: string };
        Returns: {
          b000000001: boolean;
          b000000002: boolean;
          recorded_at: string;
          s100100008: number;
        }[];
      };
      get_telemetry_report: { Args: never; Returns: Json };
      get_yearly_max_ring_end: {
        Args: { year_start: string };
        Returns: {
          max_ring_end: number;
          tunnel_id: string;
        }[];
      };
      hypertable_approximate_detailed_size: {
        Args: { relation: unknown };
        Returns: {
          index_bytes: number;
          table_bytes: number;
          toast_bytes: number;
          total_bytes: number;
        }[];
      };
      hypertable_approximate_size: {
        Args: { hypertable: unknown };
        Returns: number;
      };
      hypertable_compression_stats: {
        Args: { hypertable: unknown };
        Returns: {
          after_compression_index_bytes: number;
          after_compression_table_bytes: number;
          after_compression_toast_bytes: number;
          after_compression_total_bytes: number;
          before_compression_index_bytes: number;
          before_compression_table_bytes: number;
          before_compression_toast_bytes: number;
          before_compression_total_bytes: number;
          node_name: unknown;
          number_compressed_chunks: number;
          total_chunks: number;
        }[];
      };
      hypertable_detailed_size: {
        Args: { hypertable: unknown };
        Returns: {
          index_bytes: number;
          node_name: unknown;
          table_bytes: number;
          toast_bytes: number;
          total_bytes: number;
        }[];
      };
      hypertable_index_size: { Args: { index_name: unknown }; Returns: number };
      hypertable_size: { Args: { hypertable: unknown }; Returns: number };
      interpolate:
        | {
            Args: {
              next?: Record<string, unknown>;
              prev?: Record<string, unknown>;
              value: number;
            };
            Returns: number;
          }
        | {
            Args: {
              next?: Record<string, unknown>;
              prev?: Record<string, unknown>;
              value: number;
            };
            Returns: number;
          }
        | {
            Args: {
              next?: Record<string, unknown>;
              prev?: Record<string, unknown>;
              value: number;
            };
            Returns: number;
          }
        | {
            Args: {
              next?: Record<string, unknown>;
              prev?: Record<string, unknown>;
              value: number;
            };
            Returns: number;
          }
        | {
            Args: {
              next?: Record<string, unknown>;
              prev?: Record<string, unknown>;
              value: number;
            };
            Returns: number;
          };
      locf: {
        Args: {
          prev?: unknown;
          treat_null_as_missing?: boolean;
          value: unknown;
        };
        Returns: unknown;
      };
      move_chunk: {
        Args: {
          chunk: unknown;
          destination_tablespace: unknown;
          index_destination_tablespace?: unknown;
          reorder_index?: unknown;
          verbose?: boolean;
        };
        Returns: undefined;
      };
      remove_compression_policy: {
        Args: { hypertable: unknown; if_exists?: boolean };
        Returns: boolean;
      };
      remove_continuous_aggregate_policy: {
        Args: {
          continuous_aggregate: unknown;
          if_exists?: boolean;
          if_not_exists?: boolean;
        };
        Returns: undefined;
      };
      remove_reorder_policy: {
        Args: { hypertable: unknown; if_exists?: boolean };
        Returns: undefined;
      };
      remove_retention_policy: {
        Args: { if_exists?: boolean; relation: unknown };
        Returns: undefined;
      };
      reorder_chunk: {
        Args: { chunk: unknown; index?: unknown; verbose?: boolean };
        Returns: undefined;
      };
      set_adaptive_chunking: {
        Args: {
          chunk_sizing_func?: unknown;
          chunk_target_size: string;
          hypertable: unknown;
        };
        Returns: Record<string, unknown>;
      };
      set_chunk_time_interval: {
        Args: {
          chunk_time_interval: unknown;
          dimension_name?: unknown;
          hypertable: unknown;
        };
        Returns: undefined;
      };
      set_integer_now_func: {
        Args: {
          hypertable: unknown;
          integer_now_func: unknown;
          replace_if_exists?: boolean;
        };
        Returns: undefined;
      };
      set_number_partitions: {
        Args: {
          dimension_name?: unknown;
          hypertable: unknown;
          number_partitions: number;
        };
        Returns: undefined;
      };
      set_partitioning_interval: {
        Args: {
          dimension_name?: unknown;
          hypertable: unknown;
          partition_interval: unknown;
        };
        Returns: undefined;
      };
      set_project_level: {
        Args: {
          p_effective?: string;
          p_level: Database["public"]["Enums"]["project_level_enum"];
          p_note?: string;
          p_project_id: string;
        };
        Returns: undefined;
      };
      show_chunks: {
        Args: {
          created_after?: unknown;
          created_before?: unknown;
          newer_than?: unknown;
          older_than?: unknown;
          relation: unknown;
        };
        Returns: unknown[];
      };
      show_tablespaces: { Args: { hypertable: unknown }; Returns: unknown[] };
      time_bucket:
        | {
            Args: {
              bucket_width: unknown;
              offset?: unknown;
              origin?: string;
              timezone: string;
              ts: string;
            };
            Returns: string;
          }
        | {
            Args: { bucket_width: unknown; offset: unknown; ts: string };
            Returns: string;
          }
        | {
            Args: { bucket_width: unknown; origin: string; ts: string };
            Returns: string;
          }
        | { Args: { bucket_width: unknown; ts: string }; Returns: string }
        | {
            Args: { bucket_width: unknown; offset: unknown; ts: string };
            Returns: string;
          }
        | {
            Args: { bucket_width: unknown; origin: string; ts: string };
            Returns: string;
          }
        | { Args: { bucket_width: unknown; ts: string }; Returns: string }
        | {
            Args: { bucket_width: number; offset: number; ts: number };
            Returns: number;
          }
        | { Args: { bucket_width: number; ts: number }; Returns: number }
        | {
            Args: { bucket_width: number; offset: number; ts: number };
            Returns: number;
          }
        | { Args: { bucket_width: number; ts: number }; Returns: number }
        | {
            Args: { bucket_width: number; offset: number; ts: number };
            Returns: number;
          }
        | { Args: { bucket_width: number; ts: number }; Returns: number }
        | {
            Args: { bucket_width: unknown; offset: unknown; ts: string };
            Returns: string;
          }
        | {
            Args: { bucket_width: unknown; origin: string; ts: string };
            Returns: string;
          }
        | { Args: { bucket_width: unknown; ts: string }; Returns: string };
      time_bucket_gapfill:
        | {
            Args: {
              bucket_width: unknown;
              finish?: string;
              start?: string;
              timezone: string;
              ts: string;
            };
            Returns: string;
          }
        | {
            Args: {
              bucket_width: unknown;
              finish?: string;
              start?: string;
              ts: string;
            };
            Returns: string;
          }
        | {
            Args: {
              bucket_width: unknown;
              finish?: string;
              start?: string;
              ts: string;
            };
            Returns: string;
          }
        | {
            Args: {
              bucket_width: number;
              finish?: number;
              start?: number;
              ts: number;
            };
            Returns: number;
          }
        | {
            Args: {
              bucket_width: number;
              finish?: number;
              start?: number;
              ts: number;
            };
            Returns: number;
          }
        | {
            Args: {
              bucket_width: number;
              finish?: number;
              start?: number;
              ts: number;
            };
            Returns: number;
          }
        | {
            Args: {
              bucket_width: unknown;
              finish?: string;
              start?: string;
              ts: string;
            };
            Returns: string;
          };
      timescaledb_post_restore: { Args: never; Returns: boolean };
      timescaledb_pre_restore: { Args: never; Returns: boolean };
    };
    Enums: {
      acting_role_enum: "NONE" | "ACTING" | "DELEGATED";
      attendance_status:
        | "正常"
        | "迟到"
        | "早退"
        | "请假"
        | "旷工"
        | "加班"
        | "出差"
        | "公假"
        | "公休";
      contract_type_enum: "Original" | "Supplement" | "Change";
      driver_type: "电驱" | "液压";
      educate_level_enum:
        | "未知"
        | "小学"
        | "初中"
        | "高中"
        | "中专"
        | "大学专科"
        | "大学本科"
        | "研究生"
        | "硕士"
        | "博士";
      employment_status: "在岗" | "离职" | "待岗" | "调离" | "其他";
      gender_enum: "未知" | "男" | "女";
      line_side_enum: "LEFT" | "RIGHT" | "SINGLE";
      management_mode_enum:
        | "GroupHQ"
        | "AuthorizedManagement"
        | "GroupAgencyHQ"
        | "GroupAgencySubHQ"
        | "WorkTeam";
      org_role_enum: "Owner" | "Designer" | "Surveyor" | "Supervisor";
      political_status_enum: "未知" | "中共党员" | "共青团员" | "群众" | "民主党派";
      project_level_enum: "Key" | "Focus" | "Normal";
      project_org_role_enum:
        | "Owner"
        | "Designer"
        | "Surveyor"
        | "Supervisor"
        | "Contractor"
        | "Subcontractor"
        | "Supplier";
      project_status_enum:
        | "NotStarted"
        | "InProgress"
        | "Completed"
        | "Suspended"
        | "Cancelled"
        | "Closeout";
      project_type_enum:
        | "UrbanRail"
        | "WaterConservancy"
        | "Railway"
        | "Subsidiary"
        | "Municipal"
        | "Other";
      region_enum: "华东" | "华南" | "西南" | "西北" | "华北" | "东北";
      segment_method_enum: "TBM" | "MINING";
      tbm_usage_type: "subproject" | "repair" | "base" | "idle" | "transport";
      tunnel_line_side_enum: "LEFT" | "RIGHT" | "SINGLE";
      tunnel_type_enum: "TBM" | "MINING";
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
  public: {
    Enums: {
      acting_role_enum: ["NONE", "ACTING", "DELEGATED"],
      attendance_status: ["正常", "迟到", "早退", "请假", "旷工", "加班", "出差", "公假", "公休"],
      contract_type_enum: ["Original", "Supplement", "Change"],
      driver_type: ["电驱", "液压"],
      educate_level_enum: [
        "未知",
        "小学",
        "初中",
        "高中",
        "中专",
        "大学专科",
        "大学本科",
        "研究生",
        "硕士",
        "博士",
      ],
      employment_status: ["在岗", "离职", "待岗", "调离", "其他"],
      gender_enum: ["未知", "男", "女"],
      line_side_enum: ["LEFT", "RIGHT", "SINGLE"],
      management_mode_enum: [
        "GroupHQ",
        "AuthorizedManagement",
        "GroupAgencyHQ",
        "GroupAgencySubHQ",
        "WorkTeam",
      ],
      org_role_enum: ["Owner", "Designer", "Surveyor", "Supervisor"],
      political_status_enum: ["未知", "中共党员", "共青团员", "群众", "民主党派"],
      project_level_enum: ["Key", "Focus", "Normal"],
      project_org_role_enum: [
        "Owner",
        "Designer",
        "Surveyor",
        "Supervisor",
        "Contractor",
        "Subcontractor",
        "Supplier",
      ],
      project_status_enum: [
        "NotStarted",
        "InProgress",
        "Completed",
        "Suspended",
        "Cancelled",
        "Closeout",
      ],
      project_type_enum: [
        "UrbanRail",
        "WaterConservancy",
        "Railway",
        "Subsidiary",
        "Municipal",
        "Other",
      ],
      region_enum: ["华东", "华南", "西南", "西北", "华北", "东北"],
      segment_method_enum: ["TBM", "MINING"],
      tbm_usage_type: ["subproject", "repair", "base", "idle", "transport"],
      tunnel_line_side_enum: ["LEFT", "RIGHT", "SINGLE"],
      tunnel_type_enum: ["TBM", "MINING"],
    },
  },
} as const;
