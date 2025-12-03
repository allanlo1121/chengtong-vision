export function alarmUpdateTemplate(ev: any) {
  return `
⚠️ <b>报警更新</b>

TBM：${ev.metadata.tbm_name}
参数：${ev.metadata.param_name}

级别：${ev.old_severity} → ${ev.severity}
Level：${ev.old_level} → ${ev.level}

当前值：${ev.value}
环号：${ev.ring_no ?? "-"}

${ev.param_code}
`;
}
