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

export enum EmploymentType {
  FullTime = "正式",
  PartTime = "临聘",
  Dispatch = "劳务派遣",
  Trainee = "见习",
  Intern = "实习",
  Other = "未知",
}

export interface IPerson {
  firstName: string;
  lastName: string;
  gender?: string;
  idCardNumber: string;
  birthday?: Date;
  birthPlace?: string;
  ethnicity?: string;
  email?: string;
  phone_number?: string;
  height?: number;
  weight?: number;
  avatar?: string;
  getFullName(): string;
  getAge(): number;
  getBirthday(): Date;
}

export interface IEmployee extends IPerson {
  department?: string;
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
  notes?: string;
}

export class Person implements IPerson {
  firstName: string;
  lastName: string;
  gender?: string;
  idCardNumber: string;
  birthday?: Date;
  birthPlace?: string;
  height?: number;
  weight?: number;
  avatar?: string;

  constructor(
    idCardNumber: string,
    firstName: string,
    lastName: string,
    birthday?: Date,
    birthPlace?: string,
    height?: number,
    weight?: number
  ) {
    this.idCardNumber = idCardNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.birthPlace = birthPlace;
    this.height = height;
    this.weight = weight;
  }

  getFullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  getBirthday(): Date {
    if (!this.birthday) {
      if (this.idCardNumber && this.idCardNumber.length >= 14) {
        const birthString = this.idCardNumber.substring(6, 14);
        const year = parseInt(birthString.substring(0, 4), 10);
        const month = parseInt(birthString.substring(4, 6), 10) - 1;
        const day = parseInt(birthString.substring(6, 8), 10);
        this.birthday = new Date(year, month, day);
        return this.birthday;
      }
      throw new Error(
        "Birthday is not set and cannot be inferred from ID card number"
      );
    }
    return this.birthday;
  }

  getAge(): number {
    const birthday = this.getBirthday();
    const now = new Date();
    let age = now.getFullYear() - birthday.getFullYear();
    if (
      now.getMonth() < birthday.getMonth() ||
      (now.getMonth() === birthday.getMonth() &&
        now.getDate() < birthday.getDate())
    ) {
      age--;
    }
    return age;
  }

  speak(n: number): void {
    console.log(
      `Hello, I'm ${this.getFullName()}, my birthday ${this.getBirthday()},${this.getAge()} years old, I say ${n}`
    );
  }
}

export class Employee extends Person implements IEmployee {
  department?: string;
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
  notes?: string;
  constructor(
    idCardNumber: string,
    firstName: string,
    lastName: string,
    birthday?: Date,
    birthPlace?: string,
    height?: number,
    weight?: number
  ) {
    super(
      idCardNumber,
      firstName,
      lastName,
      birthday,
      birthPlace,
      height,
      weight
    );
  }
}
