import { ProjectStatus } from "../types";
import { z } from "zod";

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
  tbmId?: string; // TBM ID
  opNumStart: number; // 施工段起始环号
  opNumEnd: number; // 施工段结束环号
  planLaunchDate: string; // timestamp
  planBreakthroughDate: string; // timestamp
  actualLaunchDate?: string; // timestamp
  actualBreakthroughDate?: string; // timestamp
  status: ProjectStatus;
}

export const TunnelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "必须输入一个工程名称。" }),
  shortName: z.string().min(1, { message: "必须输入一个工程简称。" }),
  ringStart: z.coerce.number().min(0, { message: "必须输入一个起始环号。" }),
  ringEnd: z.coerce.number().min(1, { message: "必须输入一个结束环号。" }),
  opNumStart: z.coerce.number().min(0, { message: "必须输入一个起始里程。" }),
  opNumEnd: z.coerce.number().min(1, { message: "必须输入一个结束里程。" }),
  planLaunchDate: z.string().min(1, { message: "必须填写始发时间。" }),
  planBreakthroughDate: z.string().min(1, { message: "必须填写始发时间。" }),
  actualLaunchDate: z.string().optional(),
  actualBreakthroughDate: z.string().optional(),
  tbmId: z.string().optional(),
  projectId: z.coerce.string().min(1, { message: "请选择所属项目。" }),
  wtype: z.coerce.string().optional(),
  status: z.nativeEnum(ProjectStatus, {
    errorMap: () => ({ message: "必须选择一个项目状态。" }),
  }),
});

export type TypeTunnelFormSchema = z.infer<typeof TunnelSchema>;
