import { ISectorInfo } from "@/lib/canvas/canvasTypes";
import { ITbmDataItem } from "@/lib/tbm_del/types";
import { createSectorInfo, drawDataBlock } from "./drawDataBlock";

// 将弧度转换为角度的函数
export function radToDeg(radian: number): number {
  return radian * (180 / Math.PI);
}

export function getTangentIntersectionWithArc(
  cx: number,
  cy: number,
  r: number,
  theta: number,
  angleStart: number,
  angleEnd: number
) {
  const rW = r / Math.cos(theta); // 切线的半径

  // 计算切线的交点坐标（对称点）
  const intersectionX = rW * Math.cos(angleEnd - theta); // 切线交点的 X 坐标
  const intersectionY = rW * Math.sin(angleEnd - theta); // 切线交点的 Y 坐标

  return { intersectionX, intersectionY };
}

export function drawMainInterface(
  ctx: CanvasRenderingContext2D,
  sectorNum: number = 4,
  r: number,
  ratio: number = 0.64,
  areaLabels: string[]
) {
  if (!ctx) return; // 如果 ctx 不存在，直接返回
 // console.log("ctx deawMainInterface", ctx.getTransform()); // 打印当前变换矩阵
  ctx.save();

  const rLabel = ((1 + ratio) * r) / 2; // 标签所在半径
  const sectorInfos: ISectorInfo[] = []; // 扇形信息数组

  //绘制推进主界面
  for (let i = 0; i < sectorNum; i++) {
    ctx.save(); // 保存当前状态

    // 计算每个扇形的角度范围
    const angleStep = (2 * Math.PI) / sectorNum;
    const offset = Math.PI / sectorNum; // 偏移角度，比如让第一个扇形从 45° 开始

    // 起始角度，加上偏移量，使第一个扇形不从最上面开始
    const angleStart = -Math.PI / 2 + i * angleStep + offset; // -90°是最上面，增加偏移

    // 结束角度
    const angleEnd = angleStart + angleStep;

    // 颜色根据 i 生成 HSL（彩虹渐变）
    ctx.fillStyle = `hsl(${(i / sectorNum) * 360}, 80%, 90%)`;

    ctx.beginPath();
    ctx.moveTo(0, 0); // 从中心开始
    ctx.arc(0, 0, r, angleStart, angleEnd); // 画圆弧
    ctx.closePath();
    // ctx.fill();
    //  console.log(`第 ${i} 个扇形的起始角度为：${angleStart}，结束角度为：${angleEnd}`);

    // ctx.beginPath(); // 开始路径
    // ctx.moveTo(0, 0); // 从中心开始
    // ctx.arc(0, 0, r, angleStart, angleEnd); // 画圆弧
    ctx.strokeStyle = "#A0A0A4"; // 边框颜色
    ctx.lineWidth = 5; // 边框宽度
    ctx.stroke(); // 绘制边框

    // 保存几何信息
    const info = createSectorInfo(i, angleStart, angleEnd, r, ratio);
    // 如果是第一个扇形（即 i == 0），把它放到最后

    sectorInfos.push(info); // 第一个扇形添加到最后

    if (angleEnd > Math.PI / 2 && angleEnd < (3 / 2) * Math.PI) {
      // console.log(`第 ${i} 个扇形结束角度为：${angleEnd}`);
      const x =
        Math.cos(angleEnd - (angleEnd - angleStart) / sectorNum / 1.5) * rLabel;
      const y =
        Math.sin(angleEnd - (angleEnd - angleStart) / sectorNum / 1.5) * rLabel;
      ctx.font = "24px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center"; // 文字右对齐
      ctx.fillText(areaLabels[i], x, y);
    } else {
      const x =
        Math.cos(angleStart + (angleEnd - angleStart) / sectorNum / 1.5) *
        rLabel;
      const y =
        Math.sin(angleStart + (angleEnd - angleStart) / sectorNum / 1.5) *
        rLabel;

      ctx.font = "24px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center"; // 文字右对齐
      ctx.fillText(areaLabels[i], x, y); // 绘制文字
    }
    const xStart = Math.cos(angleStart) * r * 1.02; // 起始点X坐标
    const yStart = Math.sin(angleStart) * r * 1.02; // 起始点Y坐标
    const xEnd = Math.cos(angleEnd) * r * 1.02; // 结束点X坐标
    const yEnd = Math.sin(angleEnd) * r * 1.02; // 结束点Y坐标

    const res = getTangentIntersectionWithArc(
      0,
      0,
      r * 1.02,
      offset,
      angleStart,
      angleEnd
    );

    ctx.beginPath(); // 开始路径
    ctx.moveTo(xStart, yStart); // 从中心开始
    ctx.arcTo(res.intersectionX, res.intersectionY, xEnd, yEnd, r); // 画圆弧

    ctx.strokeStyle = `hsl(${(i / sectorNum) * 360}, 80%, 80%)`; // 边框颜色
    ctx.lineWidth = 40; // 边框宽度
    ctx.stroke(); // 绘制边框
    ctx.closePath(); // 关闭路径

    ctx.restore(); // 恢复坐标系，确保不影响后续扇形
  }

  ctx.fillStyle = "#A0A0A4";
  ctx.beginPath(); // 开始路径
  ctx.moveTo(0, 0); // 从中心开始
  ctx.arc(0, 0, r * ratio, 0, Math.PI * 2); // 画圆弧
  ctx.closePath();
  ctx.fill(); // 填充颜色

  ctx.restore(); // 恢复坐标系，确保不影响后续扇形

  return sectorInfos; // 返回扇形信息数组
}

export function drawItemTable(
  ctx: CanvasRenderingContext2D,
  data: ITbmDataItem[],
  r: number,
  width: number,
  itemHeight: number
) {
  //绘制推进主要数据

  if (!ctx) return; // 如果 ctx 不存在，直接返回
  if (!data || data.length === 0) return; // 如果数据为空，直接返回
  ctx.save(); // 保存当前状态
  const totalHeight = itemHeight * data.length; // 总高度

  ctx.fillStyle = "#E0E0E0";
  ctx.beginPath(); // 开始路径
  ctx.moveTo(0, 0); // 从中心开始
  ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2); // 画圆弧
  ctx.closePath();
  ctx.fill(); // 填充颜色

  ctx.beginPath(); // 开始路径
  ctx.moveTo(0, 0); // 从中心开始
  ctx.strokeRect(-width / 2, -totalHeight / 2, width, totalHeight);
  ctx.strokeStyle = "#919191"; // 边框颜色
  ctx.stroke(); // 绘制边框
  const baseY = -totalHeight / 2; // 从 -100 开始

  data.forEach((item, index) => {
    ctx.save();

    // 计算 y 坐标，确保每个块等高排列，贴合 strokeRect 边框
    const cx = -100;
    const cy = baseY + index * itemHeight;

    ctx.strokeStyle = "#C0C0C0";
    ctx.strokeRect(cx, cy, 200, itemHeight);

    ctx.translate(cx + 100, cy + itemHeight / 2); // 平移坐标系到矩形中心

    drawDataBlock(ctx, item); // 居中放文字

    ctx.restore();
  });
}

export function drawInterface(
  ctx: CanvasRenderingContext2D,
  sectorNum: number = 4,
  r: number,
  
) {
  if (!ctx) return; // 如果 ctx 不存在，直接返回  
  ctx.save(); // 保存当前状态 
  console.log("ctx deawInterface", ctx.getTransform()); // 打印当前变换矩阵
   
  ctx.beginPath(); // 开始路径
  ctx.moveTo(0, 0); // 从中心开始
  ctx.lineTo(0, -200); // 画线到上方
  ctx.lineWidth = 5; // 边框宽度
  ctx.stroke();

  //绘制推进主界面
  for (let i = 0; i < sectorNum; i++) {
    ctx.save(); // 保存当前状态

    // 计算每个扇形的角度范围
    const angleStep = (2 * Math.PI) / sectorNum;
    const offset = Math.PI / sectorNum; // 偏移角度，比如让第一个扇形从 45° 开始

    // 起始角度，加上偏移量，使第一个扇形不从最上面开始
    const angleStart = (-Math.PI / 2) + i * angleStep + offset; // -90°是最上面，增加偏移

    // 结束角度
    const angleEnd = angleStart + angleStep;

    const xStart = Math.cos(angleStart) * r * 1.02; // 起始点X坐标
    const yStart = Math.sin(angleStart) * r * 1.02; // 起始点Y坐标
    const xEnd = Math.cos(angleEnd) * r * 1.02; // 结束点X坐标
    const yEnd = Math.sin(angleEnd) * r * 1.02; // 结束点Y坐标

    const res = getTangentIntersectionWithArc(
      0,
      0,
      r * 1.02,
      offset,
      angleStart,
      angleEnd
    );

    ctx.beginPath(); // 开始路径
    ctx.moveTo(xStart, yStart); // 从中心开始
    ctx.arcTo(res.intersectionX, res.intersectionY, xEnd, yEnd, r); // 画圆弧

    ctx.strokeStyle = `hsl(${(i / sectorNum) * 360}, 80%, 80%)`; // 边框颜色
    ctx.lineWidth = 40; // 边框宽度
   // ctx.closePath(); // 关闭路径
    ctx.stroke(); // 绘制边框

    ctx.restore(); // 恢复坐标系，确保不影响后续扇形
  }
  ctx.restore(); // 恢复坐标系，确保不影响后续扇形
}
