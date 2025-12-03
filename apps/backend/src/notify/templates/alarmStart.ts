

export function alarmStartTemplate(ev: any) {
    return `
🚨 <b>报警开始</b>

TBM：${ev.metadata.tbm_name}
参数：${ev.metadata.param_name}
子系统：${ev.metadata.sub_system}

当前值：${ev.value}
级别：${ev.severity}（level ${ev.level}）

环号：${ev.ring_no ?? "-"}
时间：${new Date().toLocaleString()}

${ev.param_code}
`;
}
