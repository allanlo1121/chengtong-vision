import { ITBMThrustStatus } from "./tbmDataTypes";

export function getTBMThrustData(n: number = 4): ITBMThrustStatus[] {
  const areaLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const data: ITBMThrustStatus[] = [];

  for (let i = 0; i < n; i++) {
    const name = i < 26 ? areaLabels[i] : `区${i + 1}`;

    data.push({
      areaName: name,
      stroke: getRandomInt(100, 2000), // 整数，100 到 2000
      pressure: getRandomInt(0, 100), // 整数，0 到 100
    });
  }

  return data;
}
