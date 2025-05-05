import { ProjectStatus } from "../types";

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

export interface IRegion {
  id: number;
  name: string;
}

export interface ISubProjectBasic {
  id: string;
  name: string;
  shortName: string;
  projectShortName: string;
  regionName: string;
  status: ProjectStatus;
}

export interface ITunnelBasic extends ISubProjectBasic {
  ringStart: number;
  ringEnd: number;
  opNumStart: number; // 施工段起始环号
  opNumEnd: number; // 施工段结束环号
  planLaunchDate: string; // timestamp
  planBreakthroughDate: string; // timestamp
  actualLaunchDate: string; // timestamp
  actualBreakthroughDate: string; // timestamp
  wtype: string; // TBM 类型
  tbmName?: string;
}

export interface ITunnelBasicForm {
  id: string; // 这个是前端生成的，后端不需要
  name: string;
  shortName: string;
  projectId: string;
  ringStart: number;
  ringEnd: number;
  wtype?: string; // TBM 类型
  tbmId: string | null; // TBM ID
  opNumStart: number; // 施工段起始环号
  opNumEnd: number; // 施工段结束环号
  planLaunchDate: string; // timestamp
  planBreakthroughDate?: string; // timestamp
  actualLaunchDate?: string; // timestamp
  actualBreakthroughDate?: string; // timestamp
  status: ProjectStatus;
}
