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

export interface ISubProject {
  id: string;
  projectId: string;
  areaName: string;
  ringStart: number;
  ringEnd: number;
  tbmCode: string;
  opNumStart: number; // 施工段起始环号
  opNumEnd: number; // 施工段结束环号
  shortName: string;
  projectName: string;
  startDate: Date; // timestamp
  endDate: Date | null; // timestamp
  subProjectStatus: ProjectStatus;
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



// export interface IProjectType extends IProject {
//   projectAddressName: string;
//   regionName: string;
//   constructionCosts: number; // 合约造价
//   subProject: ISubProject[]; // 子工程
// }

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
  id:string; // 这个是前端生成的，后端不需要
  name: string;
  shortName: string;
  addressName: string;
  leaderId: number;  // ✅ 后端要这个
  regionId: number;
  constructionCosts: number;
  contractStartDate: string;
  contractEndDate: string;
  status: ProjectStatus;
}


