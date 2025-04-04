// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export type EmployeesTableType = {
  id: number;
  fullName: string;
  gender: string;
  birthdate?: string;
  birthplace?: string;
  email?: string;
  departmentName?: string;
  phoneNumber?: string;
  ethnicity?: string;
  position?: string;
  educationLevel?: string;
  politicalStatus?: string;
  employmentType?: string;
  employerName?: string;
  avatar?: string;
};

export type DepartmentsTableType = {
  id: number;
  departmentName: string;
  managerName: string;
};

export type Department = {
  id: number;
  departmentName: string;
  managerId?: string;
};

export type ManagerField = {
  id: number;
  fullName: string;
  position: string;
};

export type DepartmentForm = {
  id: number;
  departmentName: string;
  managerId?: string;
};
//用工类型
export type EmploymentType = {
  id: number;
  employmentTypeName: string;
};
//劳务派遣公司
export type DispatchAgency = {
  id: number;
  name?: string;
  shortName?: string;
};
//雇佣公司
export type Employer = {
  id: number;
  shortName?: string;
};
// 定义性别枚举
export enum Gender {
  Male = "男",
  Female = "女",
  Unknown = "未知",
}

// 定义政治身份枚举
export enum PoliticalStatus {
  PartyMember = "中共党员",
  DemocraticParties = "民主党派",
  LeagueMember = "共青团员",
  Masses = "群众",
  Other = "未知",
}

export enum EducationLevel {
  Primary = "小学",
  Junior = "初中",
  Senior = "高中",
  Vocational = "中专",
  College = "大学专科",
  Bachelor = "大学本科",
  Master = "硕士",
  Doctor = "博士",
  Other = "未知",
}

// export enum EmploymentType {
//   FullTime = "正式",
//   PartTime = "临聘",
//   Dispatch = "劳务派遣",
//   Trainee = "见习",
//   Intern = "实习",
//   Other = "未知",
// }

export type Employee = {
  employee_id: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  id_card_number?: string;
  birthdate?: Date;
  birthplace?: string;
  email?: string;
  department?: string;
  phone_number?: string;
  ethnicity?: string;
  position?: string;
  position_level?: number;
  professional_title?: string;
  technical_title?: string;
  start_work_date?: Date;
  transfer_in_date?: Date;
  transfer_out_date?: Date;
  education_level?: EducationLevel;
  political_status?: PoliticalStatus;
  employment_type?: EmploymentType;
  image_url?: string;
  notes?: string;
};

// export const employee: Employee = {
//   employee_id: "12345678",
//   first_name: "张",
//   last_name: "三",
//   gender: Gender.Unknown,
//   id_card_number: "",
//   birthdate: new Date("1990-01-01"),
//   birthplace: "",
//   email: "",
//   department: "",
//   phone_number: "",
//   ethnicity: "",
//   position: "",
//   position_level: 0,
//   professional_title: "",
//   technical_title: "",
//   start_work_date: new Date("2020-01-01"),
//   transfer_in_date: new Date("2020-01-01"),
//   transfer_out_date: new Date("2020-01-01"),
//   education_level: EducationLevel.Other,
//   political_status: PoliticalStatus.Other,
//   employment_type: null,
//   image_url: "",
//   notes: "",
// };

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  idCardNumber?: string;
  birthdate?: string;
  birthplace?: string;
  gender: Gender;
  ethnicity?: string;
  phoneNumber: string;
  email?: string;
  departmentId?: Department | string | Department[];
  managerId?: string;
  position?: string;
  positionLevel?: string;
  professionalTitle?: string;
  technicalTitle?: string;
  startWorkDate?: string;
  transferInDate?: string;
  transferOutDate?: string;
  educationLevel?: EducationLevel;
  politicalStatus?: PoliticalStatus;
  employmentTypeId?: EmploymentType | string;
  agencyId?: DispatchAgency | string | DispatchAgency[];
  avatarUrl?: string;
  notes?: string;
  createAt?: Date;
  updatedAt?: Date;
}

export interface IEmployeeForm {
  id: number;
  firstName: string;
  lastName: string;
  idCardNumber?: string;
  birthdate?: string;
  birthplace?: string;
  gender: string;
  ethnicity?: string;
  phoneNumber: string;
  email?: string;
  departmentId?: number;
  managerId?: string;
  position?: string;
  positionLevel?: string;
  professionalTitle?: string;
  technicalTitle?: string;
  startWorkDate?: string;
  transferInDate?: string;
  transferOutDate?: string;
  educationLevel?: string;
  politicalStatus?: string;
  employmentTypeId?: number;
  employerId?: number;
  avatar?: string;
  notes?: string;
}


export interface IManager {
  id: number;
  fullName: string;
  position: string;
}