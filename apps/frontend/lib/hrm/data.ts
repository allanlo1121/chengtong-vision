import { createClient } from "@/utils/supabase/server";

import {
  DepartmentsTableType,
  Department,
  ManagerField,
  EmployeesTableType,
  EmploymentType,
  Employer,
  IEmployeeForm,
  IManager,
  Leader,
} from "./definitions";

import { cleanNullValues } from "@/lib/utils";

// 查询经理人选
export async function fetchManagers(): Promise<ManagerField[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: employees, error } = await supabase
      .from("employees")
      .select("id, first_name,last_name,position")
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: IManager[] = employees.map(
      (employee: {
        id: number;
        first_name: string;
        last_name: string;
        position: string;
      }) => ({
        id: employee.id,
        fullName: `${employee.last_name} ${employee.first_name}`,
        position: employee.position,
      })
    );
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchDepartments(): Promise<Department[]> {
  const supabase = await createClient();
  try {
    // 查询部门信息，包括关联的 manager 数据
    const { data: departments, error } = await supabase
      .from("departments")
      .select("id, department_name, manager_id");

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch departments.");
    }

    const result: Department[] = departments.map(
      (department: {
        id: number;
        department_name: string;
        manager_id?: string;
      }) => ({
        id: department.id,
        departmentName: department.department_name,
        managerId: department.manager_id,
      })
    );

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch departments.");
  }
}

export async function fetchEmploymentTypes(): Promise<EmploymentType[]> {
  const supabase = await createClient();
  try {
    // 查询用工类型
    const { data: employmentTypes, error } = await supabase
      .from("employment_type")
      .select("id, employment_type_name");

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employment types.");
    }
    //  console.log("用工类型:", employmentTypes);
    const result = employmentTypes.map(
      (type: { id: number; employment_type_name: string }) => ({
        id: type.id,
        employmentTypeName: type.employment_type_name,
      })
    );
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employment types.");
  }
}

export async function fetchEmployers(): Promise<Employer[]> {
  const supabase = await createClient();
  try {
    // 查询劳务派遣公司
    const { data: employers, error } = await supabase
      .from("employers")
      .select("id,  short_name");

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch dispatch agencies.");
    }
    // console.log("劳务派遣公司:", agencies);
    const result = employers.map(
      (employer: { id: number; short_name: string }) => ({
        id: employer.id,
        shortName: employer.short_name,
      })
    );
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dispatch agencies.");
  }
}

const ITEMS_PER_PAGE = 10;

export async function fetchDepartmentsPages(query: string): Promise<number> {
  const supabase = await createClient();
  console.log("Fetching departments pages with query:", query);

  try {
    // 判断查询条件是否为空
    const parsedQuery = isNaN(parseInt(query)) ? null : parseInt(query);

    // 构建查询条件，显式包含 manager 字段
    let filterQuery = supabase
      .from("department_with_employees")
      .select(`id,department_name,manager_name`, {
        count: "exact",
        head: true,
      });

    // 添加筛选条件
    if (parsedQuery) {
      filterQuery = filterQuery.or(
        `department_name.ilike.%${query}%,manager_name.ilike.%${query}`
      );
    }

    // 获取记录总数
    const { count, error } = await filterQuery;

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch total number of departments.");
    }
    console.log("Count:", count);

    // 计算总页数
    const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
    // console.log("Total pages:", totalPages);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of departments.");
  }
}

export async function fetchDepartment(query: string): Promise<number> {
  const supabase = await createClient();
  console.log("Fetching departments pages with query:", query);

  try {
    // 判断查询条件是否为空
    const parsedQuery = isNaN(parseInt(query)) ? null : parseInt(query);

    // 构建查询条件，显式包含 manager 字段
    let filterQuery = supabase
      .from("department_with_employees")
      .select(`id,department_name,manager_name`, {
        count: "exact",
        head: true,
      });

    // 添加筛选条件
    if (parsedQuery) {
      filterQuery = filterQuery.or(
        `department_name.ilike.%${query}%,manager_name.ilike.%${query}`
      );
    }

    // 获取记录总数
    const { count, error } = await filterQuery;

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch total number of departments.");
    }
    console.log("Count:", count);

    // 计算总页数
    const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
    // console.log("Total pages:", totalPages);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of departments.");
  }
}

// 获取筛选部门的函数，支持分页
export async function fetchFilteredDepartments(
  query: string,
  currentPage: number
): Promise<DepartmentsTableType[]> {
  const supabase = await createClient();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // 计算偏移量

  try {
    // 构建筛选查询

    let filterQuery = supabase
      .from("department_with_employees")
      .select(`id,department_name,manager_name`, {
        count: "exact",
      })
      .range(offset, offset + ITEMS_PER_PAGE - 1)
      .order("id", { ascending: false });

    // 添加过滤条件
    if (query) {
      filterQuery = filterQuery.or(
        `department_name.ilike.%${query}%,manager_name.ilike.%${query}%`
      );
    }

    // 执行查询
    const { data: departments, error } = await filterQuery;
    //console.log("部门数据:", departments);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch departments.");
    }
    const result: DepartmentsTableType[] = (departments || []).map(
      (department: {
        id: number;
        department_name: string;
        manager_name: string;
      }) => ({
        id: department.id,
        departmentName: department.department_name,
        managerName: department.manager_name,
      })
    );

    // console.log("获取部门:", result);
    return result;
  } catch (error) {
    console.error("数据库错误:", error);
    throw new Error("Failed to fetch departments.");
  }
}

export async function fetchDepartmentById(
  id: number
): Promise<Department | null> {
  const supabase = await createClient();
  try {
    // 查询部门信息，包括关联的 manager 数据
    const { data: department, error } = await supabase
      .from("departments")
      .select("id, department_name, manager_id")
      .eq("id", id)
      .single();

    if (!department) {
      return null; // 如果未找到，返回 null
    }

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch department.");
    }
    console.log("部门数据:", department);
    return {
      id: department.id,
      departmentName: department.department_name,
      managerId: department.manager_id,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch department.");
  }
}

export async function fetchEmployeesPages(query: string): Promise<number> {
  const supabase = await createClient();
  console.log("Fetching employees pages with query:", query);

  try {
    // 构建查询
    let filterQuery = supabase
      .from("employee_full_name_view")
      .select(
        `id,full_name,birthdate,birthplace,gender,ethnicity,email,phone_number,position,avatar,education_level,political_status,department_name,manager_id,professional_title,technical_title,start_work_date,transfer_in_date,transfer_out_date,notes,employment_type_name,employer_name`,
        { count: "exact", head: true }
      );

    if (query) {
      console.log("add query:", query);

      const conditions = [
        `full_name.ilike.%${query}%`,
        `position.ilike.%${query}%`,
        `birthplace.ilike.%${query}%`,
        `department_name.ilike.%${query}%`,
        `gender.ilike.%${query}%`,
        `political_status.ilike.%${query}%`,
        `education_level.ilike.%${query}%`,
        `employer_name.ilike.%${query}%`,
        `employment_type_name.ilike.%${query}%`,
      ];
      filterQuery = filterQuery.or(conditions.join(","));
    }

    // 获取记录总数
    const { count, error } = await filterQuery;

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch total number of employees.");
    }
    //console.log("Count:", count);

    // 计算总页数
    const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
    // console.log("Total pages:", totalPages);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of employees.");
  }
}

export async function fetchFilteredEmployees(
  query: string,
  currentPage: number
): Promise<EmployeesTableType[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const supabase = await createClient();

  try {
    // 构建查询
    let filterQuery = supabase
      .from("employee_full_name_view")
      .select(
        `id,full_name,birthdate,birthplace,gender,ethnicity,email,phone_number,position,avatar,education_level,political_status,department_name,manager_id,professional_title,technical_title,start_work_date,transfer_in_date,transfer_out_date,notes,employment_type_name,employer_name`,
        { count: "exact" }
      )
      .range(offset, offset + ITEMS_PER_PAGE - 1)
      .order("id", { ascending: true });

    if (query) {
      //  console.log("add query:", query);

      const conditions = [
        `full_name.ilike.%${query}%`,
        `position.ilike.%${query}%`,
        `birthplace.ilike.%${query}%`,
        `department_name.ilike.%${query}%`,
        `gender.ilike.%${query}%`,
        `political_status.ilike.%${query}%`,
        `education_level.ilike.%${query}%`,
        `employer_name.ilike.%${query}%`,
        `employment_type_name.ilike.%${query}%`,
      ];
      filterQuery = filterQuery.or(conditions.join(","));
    }

    const { data: employees, error } = await filterQuery;

    if (error) {
      console.error("查询失败:", error.message, error.details);
      throw new Error("Failed to fetch employees.");
    }

    //console.log("员工数据:", employees);

    const result: EmployeesTableType[] = (employees || []).map(
      (employee: {
        id: number;
        full_name: string;
        birthdate: string;
        birthplace: string;
        gender: string;
        ethnicity: string;
        email: string;
        phone_number: string;
        position: string;
        avatar: string;
        education_level: string;
        political_status: string;
        department_name: string;
        manager_id: number;
        professional_title: string;
        technical_title: string;
        start_work_date: string;
        transfer_in_date: string;
        transfer_out_date: string;
        notes: string;
        employment_type_name: string;
        employer_name: string;
      }) => ({
        ...employee,
        fullName: employee.full_name,
        departmentName: employee.department_name,
        phoneNumber: employee.phone_number,
        educationLevel: employee.education_level,
        politicalStatus: employee.political_status,
        employmentType: employee.employment_type_name,
        employerName: employee.employer_name,
      })
    );

    // console.log("获取员工:", employees);
    return result;
  } catch (error) {
    console.error("数据库错误:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchEmployeeById(
  id: number
): Promise<IEmployeeForm | null> {
  const supabase = await createClient();
  try {
    // 查询部门信息，包括关联的 manager 数据
    const { data: employee, error } = await supabase
      .from("employees") // 查询视图
      .select(
        "id,first_name,last_name,birthdate,birthplace,gender,ethnicity,email,phone_number,position,position_level,avatar,education_level,political_status,department_id,manager_id,professional_title,technical_title,start_work_date,transfer_in_date,transfer_out_date,notes,employment_type_id,employer_id"
      )
      .eq("id", id)
      .single(); // 确保返回单一记录

    // if (!employee) {
    //   return null; // 如果未找到，返回 null
    // }

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch department.");
    }
    // console.log("部门数据:", employee);
    const result = cleanNullValues(employee);
    console.log("部门处理数据:", result);

    const employeeData: IEmployeeForm = {
      id: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      birthdate: result.birthdate,
      birthplace: result.birthplace,
      gender: result.gender,
      ethnicity: result.ethnicity,
      phoneNumber: result.phone_number,
      email: result.email,
      departmentId: result.department_id,
      managerId: result.manager_id,
      position: result.position,
      positionLevel: result.position_level,
      professionalTitle: result.professional_title,
      technicalTitle: result.technical_title,
      startWorkDate: result.start_work_date,
      transferInDate: result.transfer_in_date,
      transferOutDate: result.transfer_out_date,
      educationLevel: result.education_level,
      politicalStatus: result.political_status,
      employmentTypeId: result.employment_type_id,
      employerId: result.employer_id,
      avatar: result.avatar,
      notes: result.notes,
    };
    return employeeData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch department.");
  }
}

export async function fetchEmployeeByPosition(
  position: string
): Promise<Leader[]> {
  const supabase = await createClient();
  try {
    // 查询部门信息，包括关联的 manager 数据
    const { data: leaders, error } = await supabase
      .from("employee_full_name_view") // 查询视图
      .select("id,full_name")
      .eq("position", position);

    // if (!employee) {
    //   return null; // 如果未找到，返回 null
    // }

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch department.");
    }
    // console.log("部门数据:", employee);

    const result: Leader[] = leaders.map(
      (leader: { id: number; full_name: string }) => ({
        id: leader.id,
        fullName: leader.full_name,
      })
    );

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch department.");
  }
}
