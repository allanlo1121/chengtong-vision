export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  hr: {
    Tables: {
      educations: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          degree_id: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          education_level_id: string | null;
          employee_id: string;
          end_date: string | null;
          id: string;
          major_id: string | null;
          school: string | null;
          start_date: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          degree_id?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          education_level_id?: string | null;
          employee_id: string;
          end_date?: string | null;
          id?: string;
          major_id?: string | null;
          school?: string | null;
          start_date?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          degree_id?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          education_level_id?: string | null;
          employee_id?: string;
          end_date?: string | null;
          id?: string;
          major_id?: string | null;
          school?: string | null;
          start_date?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "educations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "educations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "educations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "educations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "educations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "educations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "educations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "fk_education_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_education_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_education_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_education_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "fk_education_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      employee_assignments: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          employee_id: string;
          end_date: string | null;
          id: string;
          is_primary: boolean | null;
          org_role_type_id: string | null;
          organization_id: string;
          post_id: string | null;
          start_date: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          employee_id: string;
          end_date?: string | null;
          id?: string;
          is_primary?: boolean | null;
          org_role_type_id?: string | null;
          organization_id: string;
          post_id?: string | null;
          start_date?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          employee_id?: string;
          end_date?: string | null;
          id?: string;
          is_primary?: boolean | null;
          org_role_type_id?: string | null;
          organization_id?: string;
          post_id?: string | null;
          start_date?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_assignments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["organization_id"];
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["organization_id"];
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "fk_assignment_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_assignment_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_assignment_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_assignment_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "fk_assignment_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      employee_titles: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          employee_id: string;
          id: string;
          obtained_date: string | null;
          title_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          employee_id: string;
          id?: string;
          obtained_date?: string | null;
          title_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          employee_id?: string;
          id?: string;
          obtained_date?: string | null;
          title_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_titles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "fk_title_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_title_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_title_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_title_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "fk_title_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      employees: {
        Row: {
          auth_id: string | null;
          birth_date: string | null;
          code: string;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          email: string | null;
          employment_status_id: string | null;
          employment_type_id: string | null;
          entry_date: string | null;
          external_id: string | null;
          external_version: number | null;
          gender_id: string | null;
          hire_date: string | null;
          id: string;
          id_card: string | null;
          leave_date: string | null;
          name: string;
          phone: string | null;
          remark: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          auth_id?: string | null;
          birth_date?: string | null;
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string | null;
          employment_status_id?: string | null;
          employment_type_id?: string | null;
          entry_date?: string | null;
          external_id?: string | null;
          external_version?: number | null;
          gender_id?: string | null;
          hire_date?: string | null;
          id?: string;
          id_card?: string | null;
          leave_date?: string | null;
          name: string;
          phone?: string | null;
          remark?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          auth_id?: string | null;
          birth_date?: string | null;
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string | null;
          employment_status_id?: string | null;
          employment_type_id?: string | null;
          entry_date?: string | null;
          external_id?: string | null;
          external_version?: number | null;
          gender_id?: string | null;
          hire_date?: string | null;
          id?: string;
          id_card?: string | null;
          leave_date?: string | null;
          name?: string;
          phone?: string | null;
          remark?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employees_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employees_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employees_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employees_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employees_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employees_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "employees_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      org_type_scope_map: {
        Row: {
          org_type_id: string;
          scope_code: string;
        };
        Insert: {
          org_type_id: string;
          scope_code: string;
        };
        Update: {
          org_type_id?: string;
          scope_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "org_type_scope_map_scope_code_fkey";
            columns: ["scope_code"];
            isOneToOne: false;
            referencedRelation: "post_scopes";
            referencedColumns: ["code"];
          },
        ];
      };
      post_categories: {
        Row: {
          code: string;
          name: string;
        };
        Insert: {
          code: string;
          name: string;
        };
        Update: {
          code?: string;
          name?: string;
        };
        Relationships: [];
      };
      post_scopes: {
        Row: {
          code: string;
          name: string;
        };
        Insert: {
          code: string;
          name: string;
        };
        Update: {
          code?: string;
          name?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          category_code: string | null;
          code: string;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          grade: number | null;
          id: string;
          is_active: boolean | null;
          name: string;
          scope_code: string;
          sort_order: number;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          category_code?: string | null;
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          grade?: number | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          scope_code: string;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          category_code?: string | null;
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          grade?: number | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          scope_code?: string;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_category_code_fkey";
            columns: ["category_code"];
            isOneToOne: false;
            referencedRelation: "post_categories";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "posts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "posts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "posts_scope_code_fkey";
            columns: ["scope_code"];
            isOneToOne: false;
            referencedRelation: "post_scopes";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "posts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_employee_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "posts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["employee_id"];
          },
        ];
      };
    };
    Views: {
      v_employee_full: {
        Row: {
          code: string | null;
          educations: Json | null;
          employment_status_id: string | null;
          employment_status_name: string | null;
          employment_type_id: string | null;
          employment_type_name: string | null;
          gender_id: string | null;
          id: string | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          posts: Json | null;
          primary_post: Json | null;
          titles: Json | null;
        };
        Relationships: [];
      };
      v_employee_list: {
        Row: {
          code: string | null;
          created_at: string | null;
          employment_status_name: string | null;
          id: string | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          post_name: string | null;
          sort_order: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_org_responsibles";
            referencedColumns: ["organization_id"];
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_org_role_assignments";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      v_org_responsibles: {
        Row: {
          employee_id: string | null;
          employee_name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          role_type_code: string | null;
          role_type_name: string | null;
          scope_code: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "org_type_scope_map_scope_code_fkey";
            columns: ["scope_code"];
            isOneToOne: false;
            referencedRelation: "post_scopes";
            referencedColumns: ["code"];
          },
        ];
      };
      v_org_role_assignments: {
        Row: {
          assignment_id: string | null;
          employee_id: string | null;
          employee_name: string | null;
          end_date: string | null;
          is_primary: boolean | null;
          org_role_type_id: string | null;
          org_type_code: string | null;
          org_type_id: string | null;
          org_type_name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          post_id: string | null;
          post_name: string | null;
          role_type_code: string | null;
          role_type_name: string | null;
          scope_code: string | null;
          start_date: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "org_type_scope_map_scope_code_fkey";
            columns: ["scope_code"];
            isOneToOne: false;
            referencedRelation: "post_scopes";
            referencedColumns: ["code"];
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
  public: {
    Tables: {
      admin_regions: {
        Row: {
          code: string;
          created_at: string | null;
          created_by: string | null;
          full_name: string | null;
          id: string;
          is_active: boolean;
          level: number;
          name: string;
          parent_code: string | null;
          pinyin_code: string | null;
          short_name: string | null;
          sort_order: number;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          full_name?: string | null;
          id?: string;
          is_active?: boolean;
          level: number;
          name: string;
          parent_code?: string | null;
          pinyin_code?: string | null;
          short_name?: string | null;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          full_name?: string | null;
          id?: string;
          is_active?: boolean;
          level?: number;
          name?: string;
          parent_code?: string | null;
          pinyin_code?: string | null;
          short_name?: string | null;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "admin_regions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "admin_regions_parent_code_fkey";
            columns: ["parent_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      countries: {
        Row: {
          alpha3_code: string | null;
          code: string;
          created_at: string | null;
          created_by: string | null;
          english_name: string | null;
          id: string;
          is_active: boolean;
          name: string;
          numeric_code: string | null;
          sort_order: number;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          alpha3_code?: string | null;
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          english_name?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          numeric_code?: string | null;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          alpha3_code?: string | null;
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          english_name?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          numeric_code?: string | null;
          sort_order?: number;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "countries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "countries_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      import_batches: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          failed_count: number | null;
          finished_at: string | null;
          id: string;
          inserted_count: number | null;
          skipped_count: number | null;
          started_at: string | null;
          status: string;
          table_name: string;
          total_count: number;
          updated_at: string | null;
          updated_by: string | null;
          updated_count: number | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          failed_count?: number | null;
          finished_at?: string | null;
          id?: string;
          inserted_count?: number | null;
          skipped_count?: number | null;
          started_at?: string | null;
          status?: string;
          table_name: string;
          total_count: number;
          updated_at?: string | null;
          updated_by?: string | null;
          updated_count?: number | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          failed_count?: number | null;
          finished_at?: string | null;
          id?: string;
          inserted_count?: number | null;
          skipped_count?: number | null;
          started_at?: string | null;
          status?: string;
          table_name?: string;
          total_count?: number;
          updated_at?: string | null;
          updated_by?: string | null;
          updated_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_batches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      import_records: {
        Row: {
          batch_id: string | null;
          created_at: string | null;
          created_by: string | null;
          data: Json | null;
          deleted_at: string | null;
          deleted_by: string | null;
          external_version: number | null;
          id: string;
          message: string | null;
          raw: Json | null;
          status: string | null;
          table_name: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          batch_id?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          data?: Json | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          external_version?: number | null;
          id?: string;
          message?: string | null;
          raw?: Json | null;
          status?: string | null;
          table_name?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          batch_id?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          data?: Json | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          external_version?: number | null;
          id?: string;
          message?: string | null;
          raw?: Json | null;
          status?: string | null;
          table_name?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "import_records_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "import_batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "import_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      master_data: {
        Row: {
          code: string;
          created_at: string | null;
          created_by: string | null;
          definition_id: string;
          description: string | null;
          id: string;
          is_active: boolean;
          name: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          definition_id: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          definition_id?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_data_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "master_data_definition_id_fkey";
            columns: ["definition_id"];
            isOneToOne: false;
            referencedRelation: "master_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "master_data_definition_id_fkey";
            columns: ["definition_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["definition_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_data_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      master_definitions: {
        Row: {
          code: string;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          is_active: boolean;
          name: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_definitions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      organizations: {
        Row: {
          address: string | null;
          business_id: string | null;
          city_code: string | null;
          code: string;
          country_code: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          description: string | null;
          district_code: string | null;
          external_id: string | null;
          external_version: number | null;
          full_name: string | null;
          id: string;
          is_active: boolean | null;
          latitude: number | null;
          level: number | null;
          longitude: number | null;
          name: string;
          node_key: string;
          org_category_id: string | null;
          org_type_id: string;
          parent_id: string | null;
          path: unknown;
          province_code: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          address?: string | null;
          business_id?: string | null;
          city_code?: string | null;
          code: string;
          country_code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          description?: string | null;
          district_code?: string | null;
          external_id?: string | null;
          external_version?: number | null;
          full_name?: string | null;
          id?: string;
          is_active?: boolean | null;
          latitude?: number | null;
          level?: number | null;
          longitude?: number | null;
          name: string;
          node_key?: string;
          org_category_id?: string | null;
          org_type_id: string;
          parent_id?: string | null;
          path?: unknown;
          province_code?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          address?: string | null;
          business_id?: string | null;
          city_code?: string | null;
          code?: string;
          country_code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          description?: string | null;
          district_code?: string | null;
          external_id?: string | null;
          external_version?: number | null;
          full_name?: string | null;
          id?: string;
          is_active?: boolean | null;
          latitude?: number | null;
          level?: number | null;
          longitude?: number | null;
          name?: string;
          node_key?: string;
          org_category_id?: string | null;
          org_type_id?: string;
          parent_id?: string | null;
          path?: unknown;
          province_code?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "organizations_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "organizations_city_code_fkey";
            columns: ["city_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "organizations_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "organizations_district_code_fkey";
            columns: ["district_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "organizations_org_category_id_fkey";
            columns: ["org_category_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "organizations_org_type_id_fkey";
            columns: ["org_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
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
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_province_code_fkey";
            columns: ["province_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "organizations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_attention_level_timeline: {
        Row: {
          change_type: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          project_attention_level_id: string | null;
          project_id: string;
          remark: string | null;
          updated_at: string | null;
          updated_by: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_attention_level_id?: string | null;
          project_id: string;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from: string;
          valid_to?: string | null;
        };
        Update: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_attention_level_id?: string | null;
          project_id?: string;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_attention_type_timeline: {
        Row: {
          attention_type_id: string;
          change_type: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          project_id: string;
          source: string | null;
          updated_at: string | null;
          updated_by: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          attention_type_id: string;
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_id: string;
          source?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from: string;
          valid_to?: string | null;
        };
        Update: {
          attention_type_id?: string;
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_id?: string;
          source?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey";
            columns: ["attention_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_contract_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_schedule_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_user_favorite_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_contract_versions: {
        Row: {
          change_amount: number | null;
          change_reason: string | null;
          commissioning_date: string | null;
          contract_amount: number | null;
          contract_end_date: string | null;
          contract_id: string;
          contract_start_date: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          effective_from: string;
          effective_to: string | null;
          id: string;
          is_current: boolean | null;
          source: string | null;
          updated_at: string | null;
          updated_by: string | null;
          version_no: number;
        };
        Insert: {
          change_amount?: number | null;
          change_reason?: string | null;
          commissioning_date?: string | null;
          contract_amount?: number | null;
          contract_end_date?: string | null;
          contract_id: string;
          contract_start_date?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          effective_from: string;
          effective_to?: string | null;
          id?: string;
          is_current?: boolean | null;
          source?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          version_no: number;
        };
        Update: {
          change_amount?: number | null;
          change_reason?: string | null;
          commissioning_date?: string | null;
          contract_amount?: number | null;
          contract_end_date?: string | null;
          contract_id?: string;
          contract_start_date?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          effective_from?: string;
          effective_to?: string | null;
          id?: string;
          is_current?: boolean | null;
          source?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          version_no?: number;
        };
        Relationships: [
          {
            foreignKeyName: "project_contract_versions_contract_id_fkey";
            columns: ["contract_id"];
            isOneToOne: false;
            referencedRelation: "project_contracts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_contracts: {
        Row: {
          contract_code: string | null;
          contract_name: string | null;
          contract_type: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          owner_unit: string | null;
          project_id: string;
          sign_date: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          contract_code?: string | null;
          contract_name?: string | null;
          contract_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          owner_unit?: string | null;
          project_id: string;
          sign_date?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          contract_code?: string | null;
          contract_name?: string | null;
          contract_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          owner_unit?: string | null;
          project_id?: string;
          sign_date?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_contract_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_schedule_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_user_favorite_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_control_level_timeline: {
        Row: {
          change_type: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          project_control_level_id: string | null;
          project_id: string;
          remark: string | null;
          updated_at: string | null;
          updated_by: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_control_level_id?: string | null;
          project_id: string;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from: string;
          valid_to?: string | null;
        };
        Update: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_control_level_id?: string | null;
          project_id?: string;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_risk_level_timeline: {
        Row: {
          change_type: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          project_id: string;
          project_risk_level_id: string | null;
          remark: string | null;
          updated_at: string | null;
          updated_by: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_id: string;
          project_risk_level_id?: string | null;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from: string;
          valid_to?: string | null;
        };
        Update: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_id?: string;
          project_risk_level_id?: string | null;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_schedule_versions: {
        Row: {
          change_reason: string | null;
          commissioning_date: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          effective_from: string;
          effective_to: string | null;
          id: string;
          is_current: boolean | null;
          project_id: string;
          remark: string | null;
          schedule_end_date: string | null;
          schedule_start_date: string | null;
          source: string | null;
          updated_at: string | null;
          updated_by: string | null;
          version_no: number;
        };
        Insert: {
          change_reason?: string | null;
          commissioning_date?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          effective_from: string;
          effective_to?: string | null;
          id?: string;
          is_current?: boolean | null;
          project_id: string;
          remark?: string | null;
          schedule_end_date?: string | null;
          schedule_start_date?: string | null;
          source?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          version_no: number;
        };
        Update: {
          change_reason?: string | null;
          commissioning_date?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          effective_from?: string;
          effective_to?: string | null;
          id?: string;
          is_current?: boolean | null;
          project_id?: string;
          remark?: string | null;
          schedule_end_date?: string | null;
          schedule_start_date?: string | null;
          source?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          version_no?: number;
        };
        Relationships: [
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_contract_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_schedule_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_user_favorite_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      project_status_timeline: {
        Row: {
          change_type: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          project_id: string;
          project_status_id: string | null;
          project_sub_status_id: string | null;
          remark: string | null;
          updated_at: string | null;
          updated_by: string | null;
          valid_from: string;
          valid_to: string | null;
        };
        Insert: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_id: string;
          project_status_id?: string | null;
          project_sub_status_id?: string | null;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from: string;
          valid_to?: string | null;
        };
        Update: {
          change_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          project_id?: string;
          project_status_id?: string | null;
          project_sub_status_id?: string | null;
          remark?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          valid_from?: string;
          valid_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey";
            columns: ["project_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey";
            columns: ["project_sub_status_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      projects: {
        Row: {
          actual_end_date: string | null;
          actual_start_date: string | null;
          address: string | null;
          city_code: string | null;
          code: string;
          country_code: string | null;
          created_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          district_code: string | null;
          external_id: string | null;
          external_version: number | null;
          full_name: string | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string;
          organization_id: string | null;
          project_key_points: string | null;
          project_management_mode_id: string | null;
          project_overview: string | null;
          project_scope: string | null;
          project_sub_type_id: string | null;
          project_type_id: string | null;
          province_code: string | null;
          region_id: string | null;
          remark: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          actual_end_date?: string | null;
          actual_start_date?: string | null;
          address?: string | null;
          city_code?: string | null;
          code: string;
          country_code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          district_code?: string | null;
          external_id?: string | null;
          external_version?: number | null;
          full_name?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          organization_id?: string | null;
          project_key_points?: string | null;
          project_management_mode_id?: string | null;
          project_overview?: string | null;
          project_scope?: string | null;
          project_sub_type_id?: string | null;
          project_type_id?: string | null;
          province_code?: string | null;
          region_id?: string | null;
          remark?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          actual_end_date?: string | null;
          actual_start_date?: string | null;
          address?: string | null;
          city_code?: string | null;
          code?: string;
          country_code?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          district_code?: string | null;
          external_id?: string | null;
          external_version?: number | null;
          full_name?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          organization_id?: string | null;
          project_key_points?: string | null;
          project_management_mode_id?: string | null;
          project_overview?: string | null;
          project_scope?: string | null;
          project_sub_type_id?: string | null;
          project_type_id?: string | null;
          province_code?: string | null;
          region_id?: string | null;
          remark?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_city_code_fkey";
            columns: ["city_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "projects_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "projects_deleted_by_fkey";
            columns: ["deleted_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "projects_district_code_fkey";
            columns: ["district_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
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
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
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
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey";
            columns: ["project_management_mode_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey";
            columns: ["project_sub_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_project_type_id_fkey";
            columns: ["project_type_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_province_code_fkey";
            columns: ["province_code"];
            isOneToOne: false;
            referencedRelation: "admin_regions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "projects_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
      user_favorite_projects: {
        Row: {
          created_at: string | null;
          id: string;
          project_id: string;
          sort_order: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          project_id: string;
          sort_order?: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          project_id?: string;
          sort_order?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_contract_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_project_schedule_module";
            referencedColumns: ["project_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "v_user_favorite_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "user_favorite_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
    };
    Views: {
      v_master_options: {
        Row: {
          code: string | null;
          definition_code: string | null;
          definition_id: string | null;
          definition_name: string | null;
          description: string | null;
          id: string | null;
          is_active: boolean | null;
          name: string | null;
        };
        Relationships: [];
      };
      v_organization_detail: {
        Row: {
          address: string | null;
          business_name: string | null;
          city_name: string | null;
          code: string | null;
          country_name: string | null;
          created_at: string | null;
          description: string | null;
          district_name: string | null;
          external_id: string | null;
          external_version: number | null;
          full_name: string | null;
          id: string | null;
          is_active: boolean | null;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
          org_category_name: string | null;
          org_type_name: string | null;
          parent_org_name: string | null;
          province_name: string | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
      v_organization_list: {
        Row: {
          business_name: string | null;
          city_name: string | null;
          country_name: string | null;
          created_at: string | null;
          district_name: string | null;
          id: string | null;
          level: number | null;
          name: string | null;
          org_category_name: string | null;
          org_type_name: string | null;
          parent_id: string | null;
          parent_org_name: string | null;
          path: unknown;
          province_name: string | null;
          sort_order: number | null;
        };
        Relationships: [
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
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
            referencedColumns: ["id"];
          },
        ];
      };
      v_project_contract_module: {
        Row: {
          contract_current: Json | null;
          contract_history: Json | null;
          project_id: string | null;
        };
        Insert: {
          contract_current?: never;
          contract_history?: never;
          project_id?: string | null;
        };
        Update: {
          contract_current?: never;
          contract_history?: never;
          project_id?: string | null;
        };
        Relationships: [];
      };
      v_project_full: {
        Row: {
          actual_end_date: string | null;
          actual_start_date: string | null;
          address: string | null;
          city_name: string | null;
          code: string | null;
          commissioning_date: string | null;
          contract_amount: number | null;
          contract_current: Json | null;
          contract_end_date: string | null;
          contract_history: Json | null;
          contract_start_date: string | null;
          country_name: string | null;
          district_name: string | null;
          external_id: string | null;
          external_version: number | null;
          full_name: string | null;
          id: string | null;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          project_attention_level_id: string | null;
          project_attention_level_name: string | null;
          project_chief_engineer_id: string | null;
          project_chief_engineer_name: string | null;
          project_commercial_manager_id: string | null;
          project_commercial_manager_name: string | null;
          project_control_level_id: string | null;
          project_control_level_name: string | null;
          project_discipline_inspection_id: string | null;
          project_discipline_inspection_name: string | null;
          project_management_mode_id: string | null;
          project_management_mode_name: string | null;
          project_manager_id: string | null;
          project_manager_name: string | null;
          project_oversight_leader_id: string | null;
          project_oversight_leader_name: string | null;
          project_party_secretary_id: string | null;
          project_party_secretary_name: string | null;
          project_risk_level_id: string | null;
          project_risk_level_name: string | null;
          project_safety_director_id: string | null;
          project_safety_director_name: string | null;
          project_status_id: string | null;
          project_status_name: string | null;
          project_sub_status_id: string | null;
          project_sub_status_name: string | null;
          project_sub_type_id: string | null;
          project_sub_type_name: string | null;
          project_type_id: string | null;
          project_type_name: string | null;
          province_name: string | null;
          region_name: string | null;
          schedule_current: Json | null;
          schedule_end_date: string | null;
          schedule_history: Json | null;
          schedule_start_date: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
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
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
            referencedColumns: ["id"];
          },
        ];
      };
      v_project_list: {
        Row: {
          actual_end_date: string | null;
          actual_start_date: string | null;
          address: string | null;
          city_name: string | null;
          code: string | null;
          commissioning_date: string | null;
          contract_amount: number | null;
          contract_end_date: string | null;
          contract_start_date: string | null;
          country_name: string | null;
          district_name: string | null;
          external_id: string | null;
          external_version: number | null;
          full_name: string | null;
          id: string | null;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          project_attention_level_id: string | null;
          project_attention_level_name: string | null;
          project_chief_engineer_id: string | null;
          project_chief_engineer_name: string | null;
          project_commercial_manager_id: string | null;
          project_commercial_manager_name: string | null;
          project_control_level_id: string | null;
          project_control_level_name: string | null;
          project_discipline_inspection_id: string | null;
          project_discipline_inspection_name: string | null;
          project_management_mode_id: string | null;
          project_management_mode_name: string | null;
          project_manager_id: string | null;
          project_manager_name: string | null;
          project_oversight_leader_id: string | null;
          project_oversight_leader_name: string | null;
          project_party_secretary_id: string | null;
          project_party_secretary_name: string | null;
          project_risk_level_id: string | null;
          project_risk_level_name: string | null;
          project_safety_director_id: string | null;
          project_safety_director_name: string | null;
          project_status_id: string | null;
          project_status_name: string | null;
          project_sub_status_id: string | null;
          project_sub_status_name: string | null;
          project_sub_type_id: string | null;
          project_sub_type_name: string | null;
          project_type_id: string | null;
          project_type_name: string | null;
          province_name: string | null;
          region_name: string | null;
          schedule_end_date: string | null;
          schedule_start_date: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey";
            columns: ["project_attention_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey";
            columns: ["project_control_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "master_data";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_master_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_management_mode_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_status_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_sub_type_id"];
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey";
            columns: ["project_risk_level_id"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_type_id"];
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
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
            referencedColumns: ["id"];
          },
        ];
      };
      v_project_schedule_module: {
        Row: {
          project_id: string | null;
          schedule_current: Json | null;
          schedule_history: Json | null;
        };
        Insert: {
          project_id?: string | null;
          schedule_current?: never;
          schedule_history?: never;
        };
        Update: {
          project_id?: string | null;
          schedule_current?: never;
          schedule_history?: never;
        };
        Relationships: [];
      };
      v_runtime_user: {
        Row: {
          employee_id: string | null;
          name: string | null;
          org_path: unknown;
          organization_id: string | null;
          organization_ids: string[] | null;
          permissions: string[] | null;
          roles: string[] | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
            referencedColumns: ["id"];
          },
        ];
      };
      v_tree_nodes: {
        Row: {
          entity: string | null;
          has_children: boolean | null;
          id: string | null;
          level: number | null;
          name: string | null;
          parent_id: string | null;
          path: unknown;
          sort_order: number | null;
        };
        Insert: {
          entity?: never;
          has_children?: never;
          id?: string | null;
          level?: never;
          name?: string | null;
          parent_id?: string | null;
          path?: unknown;
          sort_order?: number | null;
        };
        Update: {
          entity?: never;
          has_children?: never;
          id?: string | null;
          level?: never;
          name?: string | null;
          parent_id?: string | null;
          path?: unknown;
          sort_order?: number | null;
        };
        Relationships: [
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
            referencedRelation: "v_organization_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_organization_list";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organizations_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_tree_nodes";
            referencedColumns: ["id"];
          },
        ];
      };
      v_user_favorite_projects: {
        Row: {
          id: string | null;
          name: string | null;
        };
        Relationships: [];
      };
      v_user_menu: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          group_name: string | null;
          icon: string | null;
          id: string | null;
          is_active: boolean | null;
          is_visible: boolean | null;
          label: string | null;
          level: number | null;
          name: string | null;
          parent_id: string | null;
          path: string | null;
          permission_code: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          group_name?: string | null;
          icon?: string | null;
          id?: string | null;
          is_active?: boolean | null;
          is_visible?: boolean | null;
          label?: string | null;
          level?: number | null;
          name?: string | null;
          parent_id?: string | null;
          path?: string | null;
          permission_code?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          group_name?: string | null;
          icon?: string | null;
          id?: string | null;
          is_active?: boolean | null;
          is_visible?: boolean | null;
          label?: string | null;
          level?: number | null;
          name?: string | null;
          parent_id?: string | null;
          path?: string | null;
          permission_code?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "menus_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
          {
            foreignKeyName: "menus_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "v_user_menu";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_full";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_chief_engineer_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_commercial_manager_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_discipline_inspection_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_manager_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_oversight_leader_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_party_secretary_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_project_list";
            referencedColumns: ["project_safety_director_id"];
          },
          {
            foreignKeyName: "menus_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_runtime_user";
            referencedColumns: ["employee_id"];
          },
        ];
      };
    };
    Functions: {
      bootstrap: { Args: { p_user_id: string }; Returns: undefined };
      fn_organizations_ancestors: {
        Args: { p_id: string };
        Returns: {
          id: string;
          level: number;
          name: string;
        }[];
      };
      fn_organizations_children: {
        Args: { p_parent_id: string };
        Returns: {
          has_children: boolean;
          id: string;
          level: number;
          name: string;
          parent_id: string;
          sort_order: number;
        }[];
      };
      fn_organizations_roots: {
        Args: never;
        Returns: {
          has_children: boolean;
          id: string;
          level: number;
          name: string;
        }[];
      };
      fn_organizations_subtree: {
        Args: { p_id: string };
        Returns: {
          id: string;
          level: number;
          name: string;
          parent_id: string;
        }[];
      };
      org_move_node: {
        Args: { p_id: string; p_new_parent: string };
        Returns: undefined;
      };
      text2ltree: { Args: { "": string }; Returns: unknown };
      tree_context_nodes: {
        Args: { p_entity: string; p_node_id: string };
        Returns: {
          entity: string | null;
          has_children: boolean | null;
          id: string | null;
          level: number | null;
          name: string | null;
          parent_id: string | null;
          path: unknown;
          sort_order: number | null;
        }[];
        SetofOptions: {
          from: "*";
          to: "v_tree_nodes";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      tree_query_organizations: {
        Args: {
          p_include_children?: boolean;
          p_limit?: number;
          p_offset?: number;
          p_parent_id?: string;
          p_search?: string;
        };
        Returns: {
          business_name: string | null;
          city_name: string | null;
          country_name: string | null;
          created_at: string | null;
          district_name: string | null;
          id: string | null;
          level: number | null;
          name: string | null;
          org_category_name: string | null;
          org_type_name: string | null;
          parent_id: string | null;
          parent_org_name: string | null;
          path: unknown;
          province_name: string | null;
          sort_order: number | null;
        }[];
        SetofOptions: {
          from: "*";
          to: "v_organization_list";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  rbac: {
    Tables: {
      employee_roles: {
        Row: {
          assigned_at: string | null;
          assigned_by: string | null;
          id: string;
          role_id: string;
          user_id: string;
        };
        Insert: {
          assigned_at?: string | null;
          assigned_by?: string | null;
          id?: string;
          role_id: string;
          user_id: string;
        };
        Update: {
          assigned_at?: string | null;
          assigned_by?: string | null;
          id?: string;
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "employee_roles_assigned_by_fkey";
            columns: ["assigned_by"];
            isOneToOne: false;
            referencedRelation: "v_user_permissions";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "employee_roles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "employee_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "v_user_permissions";
            referencedColumns: ["user_id"];
          },
        ];
      };
      permissions: {
        Row: {
          action: string;
          code: string;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          module: string;
          name: string;
          resource: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          action: string;
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          module: string;
          name: string;
          resource?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          action?: string;
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          module?: string;
          name?: string;
          resource?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "permissions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_user_permissions";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "permissions_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_user_permissions";
            referencedColumns: ["user_id"];
          },
        ];
      };
      post_data_scopes: {
        Row: {
          id: string;
          post_id: string;
          resource_id: string | null;
          resource_type: string | null;
          scope_type_id: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          resource_id?: string | null;
          resource_type?: string | null;
          scope_type_id: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          resource_id?: string | null;
          resource_type?: string | null;
          scope_type_id?: string;
        };
        Relationships: [];
      };
      post_roles: {
        Row: {
          id: string;
          post_id: string;
          role_id: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          role_id: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          role_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_roles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      role_permissions: {
        Row: {
          id: string;
          permission_id: string;
          role_id: string;
        };
        Insert: {
          id?: string;
          permission_id: string;
          role_id: string;
        };
        Update: {
          id?: string;
          permission_id?: string;
          role_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey";
            columns: ["permission_id"];
            isOneToOne: false;
            referencedRelation: "permissions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey";
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
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          name: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "roles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "v_user_permissions";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "roles_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "v_user_permissions";
            referencedColumns: ["user_id"];
          },
        ];
      };
    };
    Views: {
      v_user_permissions: {
        Row: {
          permission_code: string | null;
          user_id: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      has_permission: { Args: { p_code: string }; Returns: boolean };
      jwt_permissions: { Args: never; Returns: Json };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  system: {
    Tables: {
      bootstrap_state: {
        Row: {
          completed: boolean;
          executed_at: string | null;
          id: string;
          version: string;
        };
        Insert: {
          completed?: boolean;
          executed_at?: string | null;
          id?: string;
          version: string;
        };
        Update: {
          completed?: boolean;
          executed_at?: string | null;
          id?: string;
          version?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          created_at: string | null;
          finished_at: string | null;
          id: string;
          job_type: string;
          payload: Json | null;
          started_at: string | null;
          status: string | null;
        };
        Insert: {
          created_at?: string | null;
          finished_at?: string | null;
          id?: string;
          job_type: string;
          payload?: Json | null;
          started_at?: string | null;
          status?: string | null;
        };
        Update: {
          created_at?: string | null;
          finished_at?: string | null;
          id?: string;
          job_type?: string;
          payload?: Json | null;
          started_at?: string | null;
          status?: string | null;
        };
        Relationships: [];
      };
      menus: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          group_name: string | null;
          icon: string | null;
          id: string;
          is_active: boolean | null;
          is_visible: boolean | null;
          label: string;
          level: number | null;
          name: string;
          parent_id: string | null;
          path: string | null;
          permission_code: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          group_name?: string | null;
          icon?: string | null;
          id?: string;
          is_active?: boolean | null;
          is_visible?: boolean | null;
          label: string;
          level?: number | null;
          name: string;
          parent_id?: string | null;
          path?: string | null;
          permission_code?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          group_name?: string | null;
          icon?: string | null;
          id?: string;
          is_active?: boolean | null;
          is_visible?: boolean | null;
          label?: string;
          level?: number | null;
          name?: string;
          parent_id?: string | null;
          path?: string | null;
          permission_code?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
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
      settings: {
        Row: {
          id: string;
          key: string;
          updated_at: string | null;
          updated_by: string | null;
          value: Json;
        };
        Insert: {
          id?: string;
          key: string;
          updated_at?: string | null;
          updated_by?: string | null;
          value: Json;
        };
        Update: {
          id?: string;
          key?: string;
          updated_at?: string | null;
          updated_by?: string | null;
          value?: Json;
        };
        Relationships: [];
      };
      versions: {
        Row: {
          deployed_at: string | null;
          id: string;
          version: string;
        };
        Insert: {
          deployed_at?: string | null;
          id?: string;
          version: string;
        };
        Update: {
          deployed_at?: string | null;
          id?: string;
          version?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      allowed_org_ids: { Args: never; Returns: string[] };
      attach_audit_triggers: { Args: { p_table: unknown }; Returns: undefined };
      bootstrap: { Args: { p_user_id: string }; Returns: undefined };
      current_employee_id: { Args: never; Returns: string };
      current_org_id: { Args: never; Returns: string };
      is_super_admin: { Args: never; Returns: boolean };
      soft_delete: {
        Args: { p_ids: string[]; p_table: string };
        Returns: number;
      };
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
  hr: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
  rbac: {
    Enums: {},
  },
  system: {
    Enums: {},
  },
} as const;
