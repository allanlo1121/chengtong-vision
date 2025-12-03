export function alarmEndTemplate(ev: any) {
  return `
✅ <b>报警结束</b>

TBM：${ev.metadata.tbm_name}
参数：${ev.metadata.param_name}

最后值：${ev.value}
结束级别：${ev.severity}
环号：${ev.ring_no ?? "-"}

时间：${new Date().toLocaleString()}

${ev.param_code}
`;
}
