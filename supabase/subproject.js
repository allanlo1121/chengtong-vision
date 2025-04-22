const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// CSV 文件路径（相对于项目根目录）
const filePath = path.join(__dirname, 'sub_project_mock_data.csv');

// 读取 CSV 文件内容
const csvText = fs.readFileSync(filePath, 'utf8');

// 解析 CSV 内容
const parsed = Papa.parse(csvText, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
});

const rawData = parsed.data;

// 转换为对象数组
const subProjects = rawData.map((row) => ({
  id: Number(row.id),
  projId: Number(row.projId),
  areacode: String(row.areacode),
  builder: Number(row.builder),
  wtype: String(row.wtype),
  ringStart: Number(row.ringStart),
  ringEnd: Number(row.ringEnd),
  tbmCode: String(row.tbmCode),
  mshift: row.mshift === 'true' || row.mshift === true,
  lng: Number(row.lng),
  lat: Number(row.lat),
  direction: row.direction === 'true' || row.direction === true,
  loc: String(row.loc),
  riskDis: Number(row.riskDis),
  remark: row.remark === '' ? null : String(row.remark),
  twins: row.twins === 'true' || row.twins === true,
  opNumStart: Number(row.opNumStart),
  opNumEnd: Number(row.opNumEnd),
  pname: row.pname === '' ? null : String(row.pname),
  bname: String(row.bname),
  bid: Number(row.bid),
  xid: Number(row.xid),
  gname: String(row.gname),
  projName: String(row.projName),
  buildName: String(row.buildName),
  areaName: String(row.areaName),
  hover: row.hover === 'true' || row.hover === true,
  startDate: Number(row.startDate),
  endDate: Number(row.endDate),
  stateId: row.stateId === '' || row.stateId === undefined ? null : Number(row.stateId),
}));

console.log('✅ 解析成功，条目数:', subProjects.length);
console.log(subProjects);

// 如果你想保存为 JSON 文件：
fs.writeFileSync('sub_project_output.json', JSON.stringify(subProjects, null, 2), 'utf8');
console.log('📁 已导出为 sub_project_output.json');



