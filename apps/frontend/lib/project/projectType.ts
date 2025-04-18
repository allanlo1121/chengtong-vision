export interface IProject {
  id: number;
  projectName: string;
  shortName: string;
  areaName: string;
  projectLeader: string;
  startDate: Date | null; // timestamp
  endDate: Date | null; // timestamp
  projectStatus: ProjectStatus;
}

export interface ISubProject {
  id: number;
  projectId: number;
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
  "在建",
  "竣工",
  "停工", // 停工
}
