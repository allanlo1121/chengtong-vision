export interface IEmployeeSalary {
    id: number; // 主键
    employee_id: number; // 员工ID
    salary_month: Date; // 工资月份（YYYY-MM）
    
    // 工资组成部分
    position_salary: number; // 岗位工资
    experience_salary: number; // 工龄工资
    overtime_salary: number; // 加班工资
    professional_qualification_allowance: number; // 执业资格津贴
    technical_allowance: number; // 技术职业津贴
    young_talent_allowance: number; // 青年人才津贴
    other_allowance: number; // 其他津贴
    high_temperature_subsidy: number; // 高温补贴
    performance_bonus: number; // 绩效工资
    milestone_bonus: number; // 节点奖金
    other_bonus: number; // 其他奖金
    
    // 社保和公积金
    personal_pension: number; // 个人养老金
    company_pension: number; // 公司养老金
    personal_medical: number; // 个人医保金
    company_medical: number; // 公司医保金
    major_medical_insurance_fee: number; // 大额医疗保险费
    personal_housing_fund: number; // 个人住房公积金
    company_housing_fund: number; // 公司住房公积金
    personal_corporate_annuity: number; // 个人企业年金
    company_corporate_annuity: number; // 公司企业年金
    company_work_injury_insurance: number; // 公司工伤金
    company_maternity_insurance: number; // 公司生育金
    personal_unemployment_insurance: number; // 个人失业金
    company_unemployment_insurance: number; // 公司失业金
  
    // 其他扣款
    board_money: number; // 食堂费用扣款
    personal_income_tax: number; // 个人所得税
    outsourcing_service_fee: number; // 劳务派遣服务费
    social_security_late_fee: number; // 社保缴纳滞纳金
    other_expenses: number; // 其他费用
    created_at: Date; // 记录创建时间
  
    /** 计算工资收入（基础工资 + 津贴 + 加班费） */
    calculateSalaryIncome(): number;
  
    /** 计算绩效收入（绩效工资 + 奖金） */
    calculatePerformanceIncome(): number;
  
    /** 计算社保收入（公司社保、公积金等支付） */
    calculateCompanySocialInsuranceIncome(): number;
  
    /** 计算社保支出（个人社保、公积金扣款） */
    calculatePersonalSocialInsuranceExpense(): number;
  
    /** 计算单位其他支出（劳务派遣服务费、社保滞纳金） */
    calculateCompanyOtherExpense(): number;
  
    /** 计算个人其他支出（食堂扣款、个税等） */
    calculatePersonalOtherExpense(): number;
  }
  
  export class EmployeeSalaryRecord implements IEmployeeSalary {
    constructor(
        public id: number,
        public employee_id: number,
        public salary_month: Date,
        public position_salary: number,
        public experience_salary: number,
        public overtime_salary: number,
        public professional_qualification_allowance: number,
        public technical_allowance: number,
        public young_talent_allowance: number,
        public other_allowance: number,
        public high_temperature_subsidy: number,
        public performance_bonus: number,
        public milestone_bonus: number,
        public other_bonus: number,
        public personal_pension: number,
        public company_pension: number,
        public personal_medical: number,
        public company_medical: number,
        public major_medical_insurance_fee: number,
        public personal_housing_fund: number,
        public company_housing_fund: number,
        public personal_corporate_annuity: number,
        public company_corporate_annuity: number,
        public company_work_injury_insurance: number,
        public company_maternity_insurance: number,
        public personal_unemployment_insurance: number,
        public company_unemployment_insurance: number,
        public board_money: number,
        public personal_income_tax: number,
        public outsourcing_service_fee: number,
        public social_security_late_fee: number,
        public other_expenses: number,
        public created_at: Date
    ) {}
  
    /** 计算工资收入（基础工资 + 津贴 + 加班费） */
    calculateSalaryIncome(): number {
      return (
        this.position_salary +
        this.experience_salary +
        this.overtime_salary +
        this.professional_qualification_allowance +
        this.technical_allowance +
        this.young_talent_allowance +
        this.other_allowance +
        this.high_temperature_subsidy
      );
    }
  
    /** 计算绩效收入（绩效工资 + 奖金） */
    calculatePerformanceIncome(): number {
      return (
        this.performance_bonus +
        this.milestone_bonus +
        this.other_bonus
      );
    }
  
    /** 计算社保收入（公司社保、公积金等支付） */
    calculateCompanySocialInsuranceIncome(): number {
      return (
        this.company_pension +
        this.company_medical +
        this.major_medical_insurance_fee +
        this.company_housing_fund +
        this.company_corporate_annuity +
        this.company_work_injury_insurance +
        this.company_maternity_insurance +
        this.company_unemployment_insurance
      );
    }
  
    /** 计算社保支出（个人社保、公积金扣款） */
    calculatePersonalSocialInsuranceExpense(): number {
      return (
        this.personal_pension +
        this.personal_medical +
        this.personal_housing_fund +
        this.personal_corporate_annuity +
        this.personal_unemployment_insurance
      );
    }
  
    /** 计算单位其他支出（劳务派遣服务费、社保滞纳金） */
    calculateCompanyOtherExpense(): number {
      return (
        this.outsourcing_service_fee +
        this.social_security_late_fee
      );
    }
  
    /** 计算个人其他支出（食堂扣款、个税等） */
    calculatePersonalOtherExpense(): number {
      return (
        this.board_money +
        this.personal_income_tax +
        this.other_expenses
      );
    }
  }
  