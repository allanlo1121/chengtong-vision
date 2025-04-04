

export interface IPieSlice { // 图形相关的数据
  label: string;
  value: number; // 图形占比，比如每月产量
}

// 设备相关的数据
export interface ITBMThrustStatus {
  areaName: string;
  stroke: number;
  pressure: number;  
}

export interface IPieItem extends ITBMThrustStatus {
  value: number;
}

export interface ITBMCHDStatus {
  areaName: string;  
  earthPressure: number;  
}


export interface ITBMStatus {
  tbmLabel:string; // TBM名称
  tbmCode:string; // TBM编号
  tbmStatus:number; // TBM状态
  tbmProgressToday:number; // 今日进尺
  tbmTPlanToday:number; // 今日计划进尺
  tbmProgressThisWeek:number; // 本周进尺
  tbmTPlanThisWeek:number; // 本周计划进尺
  tbmProgressThisMonth:number; // 本月进尺
  tbmTPlanThisMonth:number; // 本月计划进尺
  tbmProgressThisYear:number; // 本年进尺
  tbmTPlanThisYear:number; // 本年计划进尺
  tbmProgressTotal:number; // 累计进尺
  tbmTPlanTotal:number; // 累计计划进尺
  tbmProjectName:string; // 项目名称
  tbmSection:string; // 区间名称
  tbmCurrentRing:number; // 当前环号
  tbmAdvanceSpeed:number; // 前进速度
  areaName:string; // 区域名称
}  

export interface  ISubProject {
  id: number;
  projId: number;
  areacode: string;
  builder: number;
  wtype: string;
  ringStart: number;
  ringEnd: number;
  tbmCode: string;
  mshift: boolean;
  lng: number;
  lat: number;
  direction: boolean;
  loc: string;
  riskDis: number;
  remark: string | null;
  twins: boolean;
  opNumStart: number;
  opNumEnd: number;
  pname: string | null;
  bname: string;
  bid: number;
  xid: number;
  gname: string;
  projName: string;
  buildName: string;
  areaName: string;
  hover: boolean;
  startDate: number; // timestamp
  endDate: number;   // timestamp
  stateId: number | null;
}
