import { id } from "date-fns/locale";
import { z } from "zod";

export interface ITBMStatus {
  tbmLabel: string; // TBM名称
  tbmCode: string; // TBM编号
  tbmStatus: number; // TBM状态
  tbmProgressToday: number; // 今日进尺
  tbmTPlanToday: number; // 今日计划进尺
  tbmProgressThisWeek: number; // 本周进尺
  tbmTPlanThisWeek: number; // 本周计划进尺
  tbmProgressThisMonth: number; // 本月进尺
  tbmTPlanThisMonth: number; // 本月计划进尺
  tbmProgressThisYear: number; // 本年进尺
  tbmTPlanThisYear: number; // 本年计划进尺
  tbmProgressTotal: number; // 累计进尺
  tbmTPlanTotal: number; // 累计计划进尺
  tbmProjectName: string; // 项目名称
  tbmSection: string; // 区间名称
  tbmCurrentRing: number; // 当前环号
  tbmAdvanceSpeed: number; // 前进速度
  areaName: string; // 区域名称
}

export interface ITbmBaseInfo {
  id: string;
  name: string;
  type: string;
}

export interface ITbmMainInfo extends ITbmBaseInfo {
  diameter: number; // TBM直径
  segmentOuter: number; // TBM外径
  productionDate: string; // TBM生产日期
  owner: string; // TBM所有单位
  geo: string | null; // 地质类型
  remark?: string | null; // 备注信息
}

export interface ITbmWorkInfo extends ITbmBaseInfo {
  regionName: string; // 所在片区名称
  projectShortName: string; // 所在片区简称
  subprojectShortName: string; // 所在项目名称
}

export interface ITbmMainForm extends ITbmBaseInfo {
  diameter: number; // TBM直径
  segmentOuter: number; // TBM外径
  productionDate: string; // TBM生产日期
  ownerId: string; // TBM所有单位
  geo: string | null; // 地质类型
  remark?: string | null; // 备注信息
}

export interface ITbmProducer {
  id: string; // 生产厂家ID
  name: string; // 生产厂家名称
}

export interface ITbmOwner {
  id: string; // 所有单位ID
  name: string; // 所有单位名称
}

export const TbmFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: "必须输入一个盾构机名称。" }),
  code: z.string().min(1, { message: "必须输入一个盾构机代码。" }),
  typeId: z.coerce.number().min(1, { message: "必须输入一个盾构机类型。" }),
  diameter: z.coerce.number().min(0, { message: "必须输入一个直径。" }),
  segmentOuter: z.coerce.number().optional(),
  producerId: z.coerce.string().optional(),
  productionDate: z.string().optional(),
  ownerId: z.coerce.string().optional(),
  geo: z.string().optional(),
  remark: z.string().optional(),
});

export type TypeTbmFormSchema = z.infer<typeof TbmFormSchema>;

export interface ITbmType {
  id: number;
  code: string;
  name: string;
  remark: string;
}


export interface ITbmAdvanceParam {
  id: number;
  code: string;
  name: string;
  digits: number;
}