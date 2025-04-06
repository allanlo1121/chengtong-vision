export interface IPosition {
  x: number;
  y: number;
}

export interface ISectorInfo {
  index: number;
  angleStart: number;
  angleEnd: number;
  centerAngle: number;
  edgeLeft: { x: number; y: number };
  edgeRight: { x: number; y: number };
  centerPoint: { x: number; y: number };
  direction: "horizontal" | "vertical"; // 水平或垂直
}

export interface IBoxDimensions {
  nameWidth: number;
  valueWidth: number;
  unitWidth: number;
  height: number;
}

export interface IBoxConfig {
  dimensions: IBoxDimensions;
  center: IPosition; // center 坐标
}
