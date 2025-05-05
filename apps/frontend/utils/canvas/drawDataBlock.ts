import {
  ISectorInfo,
  IBoxConfig,
  IBoxDimensions,
} from "@/lib/canvas/canvasTypes";
import { ITbmDataItem } from "@/lib/tbm/types";

export function createSectorInfo(
  index: number,
  angleStart: number,
  angleEnd: number,
  r: number,
  ratio: number
): ISectorInfo {
  const centerAngle = (angleStart + angleEnd) / 2;

  const edgeLeft = {
    x: Math.cos(angleStart) * r * ratio,
    y: Math.sin(angleStart) * r * ratio,
  };

  const edgeRight = {
    x: Math.cos(angleEnd) * r * ratio,
    y: Math.sin(angleEnd) * r * ratio,
  };

  const centerPoint = {
    x: (Math.cos(centerAngle) * (r * ratio + r)) / 2,
    y: (Math.sin(centerAngle) * (r * ratio + r)) / 2,
  };

  // 判断方向（竖向 = 接近垂直）
  // 归一化角度为 [0, 2π]
  const normalizedCenterAngle = (centerAngle + 2 * Math.PI) % (2 * Math.PI);
  // console.log("normalizedCenterAngle", normalizedCenterAngle, centerAngle);

  let direction: "horizontal" | "vertical";

  // 判断竖向范围 [π/4, 3π/4] 或 [5π/4, 7π/4]
  if (
    (normalizedCenterAngle >= Math.PI / 4 &&
      normalizedCenterAngle <= (3 * Math.PI) / 4) ||
    (normalizedCenterAngle >= (5 * Math.PI) / 4 &&
      normalizedCenterAngle <= (7 * Math.PI) / 4)
  ) {
    direction = "horizontal"; // 竖向
  } else {
    direction = "vertical"; // 横向
  }

  return {
    index,
    angleStart,
    angleEnd,
    centerAngle,
    edgeLeft,
    edgeRight,
    centerPoint,
    direction,
  };
}

export function drawDataBlock(
  ctx: CanvasRenderingContext2D,
  data: ITbmDataItem,
  boxConfig: Partial<IBoxConfig> = {
    dimensions: {
      nameWidth: 28,
      valueWidth: 48,
      unitWidth: 32,
      height: 32,
    },
    center: { x: 0, y: 0 },
  }
) {
  if (!ctx) return;
  if (!data) return;
  function formatValue(value: string | number, digits = 0): string {
    if (typeof value === "string") return value; // 如果是字符串，直接返回
    return value.toFixed(digits); // 保留小数
  }
  ctx.save(); // 保存当前状态
  const { name, value, unit } = data;
  const valueStr = formatValue(value, 0); // 格式化数值
  // console.log("drawDataBlock", center, data);

  const {
    nameWidth: boxNameWidth,
    valueWidth: boxValueWidth,
    unitWidth: boxUnitWidth,
    height,
  } = boxConfig.dimensions || {
    nameWidth: 64,
    valueWidth: 104,
    unitWidth: 32,
    height: 32,
  };

  const { x, y } = boxConfig.center || { x: 0, y: 0 };

  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  ctx.textAlign = "right"; // 文字左对齐

  const padding = 4;
  const boxRadius = padding; // 圆角半径

  const totalWidth = boxNameWidth + boxValueWidth + boxUnitWidth; // 总宽度

  const nameX = x - totalWidth / 2 - 40; // 文字居中
  const nameY = y; // 文字位置
  const boxValueX = nameX + boxNameWidth + 40; // 方框X位置
  const boxValueY = nameY - height / 2 + padding; // 方框Y位置
  const valueX = boxValueX + padding; // 数值位置
  const valueY = y; // 数值位置
  const unitY = y; // 单位位置
  const unitX = valueX + boxValueWidth + 20; // 单位位置

 // console.log(x, nameX, boxValueX, valueX, unitX, totalWidth);
  ctx.translate(0, 0); // 平移坐标系到扇形中心
 // console.log("ctx", ctx.getTransform());

  // ctx.translate(x, y); // 平移坐标系到扇形中心

  // 文字：标签名
  ctx.textAlign = "left"; // 文字左对齐
  ctx.fillStyle = "#3F3F3F";
  ctx.fillText(name, nameX, nameY);

  // 画方框
  ctx.beginPath();
  ctx.roundRect(boxValueX, boxValueY, boxValueWidth, height * 0.8, boxRadius);
  ctx.closePath();
  ctx.fillStyle = "#E0E0E0";
  ctx.fill();

  // 数值文字
  ctx.fillStyle = "#475CA7";
  ctx.textBaseline = "middle";
  ctx.fillText(valueStr, valueX, valueY);

  // 单位文字
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#919191";
  ctx.textBaseline = "middle";
  ctx.fillText(unit, unitX, unitY);

  ctx.restore(); // 恢复状态
}

export function getVertical(angle: number): boolean {
  // 将角度转换为 [0, 360) 范围内
  const normalizedAngle = (angle * 180) / Math.PI;

  if (
    (normalizedAngle >= 0 && normalizedAngle < 45) ||
    (normalizedAngle >= 135 && normalizedAngle < 225) ||
    (normalizedAngle >= 315 && normalizedAngle <= 360)
  ) {
    return false; // 横向
  } else {
    return true; // 竖向
  }
}

export function drawArcDataBlock(
  ctx: CanvasRenderingContext2D,
  data: ITbmDataItem[] | ITbmDataItem,
  sectorInfo: ISectorInfo,
  boxConfig: Partial<IBoxDimensions> = {
    nameWidth: 32,
    valueWidth: 48,
    unitWidth: 32,
    height: 20,
  }
) {
  if (!ctx) {
    console.log("ctx错误");
    return;
  }
  if (!data) {
    console.log("data错误");
    return;
  }
  if (!sectorInfo) {
    console.log("sectorInfo错误");
    return;
  }
  function formatValue(value: string | number, digits = 0): string {
    if (typeof value === "string") return value; // 如果是字符串，直接返回
    return value.toFixed(digits); // 保留小数
  }

  ctx.save(); // 保存当前状态
  // console.log("sectorInfo", ctx, sectorInfo,data);

  // 如果传入的是单个对象，将其转换为数组
  const dataArray = Array.isArray(data) ? data : [data];

  const {
    centerPoint: { x: cx, y: cy },
    direction,
  } = sectorInfo;
  // 获取扇形中心点坐标
  ctx.translate(cx, cy); // 平移坐标系到扇形中心

  const isVertical = direction === "vertical"; // 是否竖向

  const {
    nameWidth: boxNameWidth = 32,
    valueWidth: boxValueWidth = 48,
    unitWidth: boxUnitWidth = 32,
    height = 20,
  } = boxConfig ?? {};

  //const { x, y } = boxConfig.center || { x: 0, y: 0 };
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#3F3F3F";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left"; // 文字左对齐

  const padding = 4;
  const boxRadius = padding; // 圆角半径

  const boxNum = isVertical ? dataArray.length * 2 : dataArray.length; // 数据个数

  dataArray.forEach((item, index) => {
    const { name, value, unit } = item;
    const valueStr = formatValue(value, 2); // 格式化数值
    const nameWidth = ctx.measureText(name).width;
    const computedBoxNameWidth = Math.max(boxNameWidth, nameWidth);

    const valueWidth = ctx.measureText(valueStr).width;
    const computedBoxValueWidth = Math.max(
      valueWidth + padding * 2,
      boxValueWidth
    );
    const unitWidth = ctx.measureText(unit).width; // 单位宽度
    const computedBoxUnitWidth = Math.max(boxUnitWidth, unitWidth); // 方框宽度
    const totalWidth = isVertical
      ? computedBoxValueWidth + computedBoxUnitWidth
      : computedBoxNameWidth + computedBoxValueWidth + computedBoxUnitWidth; // 总宽度
    const textHeight = parseInt(ctx.font, 10); // 字体高度

    const nameX = 0 - totalWidth / 2; // 文字居中

    const boxValueX = isVertical ? nameX : nameX + nameWidth; // 方框X位置

    const valueX = boxValueX + padding; // 数值位置

    const unitX = valueX + computedBoxValueWidth; // 单位位置
    const boxHeight = Math.max(height, textHeight * 1.3); // 方框高度
    const nameY = ((index * boxNum) / 2 - Math.floor(boxNum / 2)) * boxHeight; // 文字位置
    const valueY = isVertical ? nameY + boxHeight : nameY; // 数值位置
    const boxValueY = valueY - boxHeight / 2; // 方框Y位置
    const unitY = valueY; // 单位位置

    // 文字：标签名
    ctx.fillStyle = "#3F3F3F";
    ctx.fillText(name, nameX, nameY);

    // 画方框
    ctx.beginPath();
    ctx.roundRect(
      boxValueX,
      boxValueY,
      computedBoxValueWidth,
      boxHeight,
      boxRadius
    );
    ctx.fillStyle = "#E0E0E0";
    ctx.fill();
    ctx.strokeStyle = "#C0C0C0";
    ctx.stroke();

    // 单位文字
    ctx.fillStyle = "#919191";
    ctx.textBaseline = "middle";
    ctx.fillText(unit, unitX, unitY);

    // 数值文字
    ctx.fillStyle = "#475CA7";
    ctx.textBaseline = "middle";
    ctx.fillText(valueStr, valueX, valueY);
  });

  // console.log(x, nameX, boxValueX, valueX, unitX, textHeight);

  ctx.restore(); // 恢复状态
}
