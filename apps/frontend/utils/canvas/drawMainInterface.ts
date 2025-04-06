import { ISectorInfo } from "@/lib/canvas/canvasTypes";
import { createSectorInfo } from "./drawDataBlock";

// 将弧度转换为角度的函数
function radToDeg(radian: number): number {
  return radian * (180 / Math.PI);
}

function getTangentIntersectionWithArc(
  cx: number,
  cy: number,
  r: number,
  theta: number,
  angleStart: number,
  angleEnd: number
) {
  // 计算夹角的一半，用于计算切线的角度
  //const alpha = theta / 2;

  // 计算圆弧起点和终点的坐标
  // const x1 = cx + r * Math.cos(angleStart); // 圆弧起点的 X 坐标
  // const y1 = cy + r * Math.sin(angleStart); // 圆弧起点的 Y 坐标
  // const x2 = cx + r * Math.cos(angleEnd);   // 圆弧终点的 X 坐标
  // const y2 = cy + r * Math.sin(angleEnd);   // 圆弧终点的 Y 坐标

  const rW = r / Math.cos(theta);

  // 计算两条切线的交点
  // const xTangent1 = cx + r * Math.cos(angleStart + alpha); // 第一条切线的切点 X 坐标
  // const yTangent1 = cy + r * Math.sin(angleStart + alpha); // 第一条切线的切点 Y 坐标

  // const xTangent2 = cx + r * Math.cos(angleEnd - alpha);   // 第二条切线的切点 X 坐标
  // const yTangent2 = cy + r * Math.sin(angleEnd - alpha);   // 第二条切线的切点 Y 坐标

  console.log("r,rw", r, rW);
  console.log("jiaodu", radToDeg(theta - angleEnd));

  // 计算切线的交点坐标（对称点）
  const intersectionX = rW * Math.cos(angleEnd - theta); // 交点的 X 坐标
  const intersectionY = rW * Math.sin(angleEnd - theta); // 交点的 Y 坐标

  console.log("intersectionX,intersectionY", intersectionX, intersectionY);

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

    const angleStartDeg = radToDeg(angleStart); // 起始角度（度数）
    const angleEndDeg = radToDeg(angleEnd); // 结束角度（度数）
    const offsetDeg = radToDeg(offset); // 偏移角度（度数）
    console.log(
      `第 ${i} 个扇形的起始角度为：${angleStartDeg}°，结束角度为：${angleEndDeg}°`
    );
    console.log(`第 ${i} 个扇形的偏移角度为：${offsetDeg}°`);

    // 颜色根据 i 生成 HSL（彩虹渐变）
    ctx.fillStyle = `hsl(${(i / sectorNum) * 360}, 80%, 90%)`;

    const res = getTangentIntersectionWithArc(
      0,
      0,
      r,
      offset,
      angleStart,
      angleEnd
    );

    ctx.beginPath();
    ctx.moveTo(0, 0); // 从中心开始
    ctx.arc(0, 0, r, angleStart, angleEnd); // 画圆弧
    ctx.closePath();
    ctx.fill();
    //  console.log(`第 ${i} 个扇形的起始角度为：${angleStart}，结束角度为：${angleEnd}`);

    // ctx.beginPath(); // 开始路径
    // ctx.moveTo(0, 0); // 从中心开始
    // ctx.arc(0, 0, r, angleStart, angleEnd); // 画圆弧
    // ctx.strokeStyle = `hsl(${(i / sectorNum) * 360}, 80%, 60%)`; // 边框颜色
    // ctx.lineWidth = 5; // 边框宽度
    // ctx.stroke(); // 绘制边框

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
    const xStart = Math.cos(angleStart) * r; // 起始点X坐标
    const yStart = Math.sin(angleStart) * r; // 起始点Y坐标
    const xEnd = Math.cos(angleEnd) * r; // 结束点X坐标
    const yEnd = Math.sin(angleEnd) * r; // 结束点Y坐标

    ctx.beginPath(); // 开始路径
    ctx.moveTo(xStart, yStart); // 从中心开始
    ctx.arcTo(res.intersectionX, res.intersectionY, xEnd, yEnd, r); // 画圆弧

    ctx.strokeStyle = `hsl(${(i / sectorNum) * 360}, 80%, 80%)`; // 边框颜色
    ctx.lineWidth = 10; // 边框宽度
    ctx.stroke(); // 绘制边框
    ctx.closePath(); // 关闭路径

    ctx.restore(); // 恢复坐标系，确保不影响后续扇形
  }
  return sectorInfos; // 返回扇形信息数组
}
