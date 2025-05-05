export interface IProjectBasic {
  id: string;
  name: string;
  shortName: string;
}

export interface IProject {
  id: string;
  name: string;
  shortName: string;
  addressName: string;
  leader: string;
  regionName: string;
  constructionCosts: number; // 合约造价
  contractStartDate: string;
  contractEndDate: string;
  status: ProjectStatus;
  subProjects: ISubProjectBasic[];
}



export enum ProjectStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed",
  Suspended = "Suspended",
  Cancelled = "Cancelled",
}

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.NotStarted]: "未开工",
  [ProjectStatus.InProgress]: "在建",
  [ProjectStatus.Completed]: "竣工",
  [ProjectStatus.Suspended]: "停工",
  [ProjectStatus.Cancelled]: "已取消",
};

export interface ISubProjectBasic {
  id: number;
  shortName: string;
  status: ProjectStatus;
}

export interface IRegion {
  id: number;
  name: string;
}

export interface IProjectForm {
  id: string; // 这个是前端生成的，后端不需要
  name: string;
  shortName: string;
  addressName: string;
  leaderId: number; // ✅ 后端要这个
  regionId: number;
  constructionCosts: number;
  contractStartDate: string;
  contractEndDate: string;
  status: ProjectStatus;
}

export interface ISubproject {
  id: string;
  name: string;
  shortName: string;
  projectShortName: string;
  regionName: string;
  ringStart: number;
  ringEnd: number;
  tbmName: string;
  opNumStart: number; // 施工段起始环号
  opNumEnd: number; // 施工段结束环号
  startDate: string; // timestamp
  endDate: string; // timestamp
  status: ProjectStatus;
}

export interface ISubprojectForm {
  id: string;
  name: string;
  shortName: string;
  projectId: string;  
  ringStart: number;
  ringEnd: number;
  tbmId: string;
  opNumStart: number; // 施工段起始环号
  opNumEnd: number; // 施工段结束环号
  planStartDate: string; // timestamp
  planEndDate: string; // timestamp
  status: ProjectStatus;
}
