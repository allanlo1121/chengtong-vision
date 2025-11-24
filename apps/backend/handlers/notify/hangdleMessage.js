import { getTbmMetadata, getParameterMetadata,getParameterMetadataByCode } from '../../datastore/metadataStore.js';

const GUIDANCE_KEYS = ["s100206003", "s100206004", "s100206006", "s100206007"];


function formatDeviationItems(items) {
  // 参数映射
  const paramNameMap = {
    's100206003': '前点水平偏差',
    's100206004': '前点垂直偏差',
    's100206006': '后点水平偏差',
    's100206007': '后点垂直偏差',
  };
  // 超限标记
  const severityMark = {
    'normal': '',
    'warning': '⚠超限',
    'critical': '🚨严重超限',
  };
  return items.map(item => {
    const name = paramNameMap[item.paramCode] || item.paramCode;
    const value = item.value;
    const mark = severityMark[item.severity] || '';
    return `${name}: ${value} mm${mark ? ' ' + mark : ''}`;
  }).join('\n');
}

// 格式化偏差信息，只保留整数部分
function formatDeviationItemsInt(items) {
    const paramNameMap = {
        's100206003': '前点水平偏差',
        's100206004': '前点垂直偏差',
        's100206006': '后点水平偏差',
        's100206007': '后点垂直偏差',
    };
    const severityMark = {
        'normal': '',
        'warning': '⚠超限',
        'critical': '🚨严重超限',
    };
    return items.map(item => {
        const name = paramNameMap[item.paramCode] || item.paramCode;
        const value = Math.trunc(item.value); // 只保留整数部分
        const mark = severityMark[item.severity] || '';
        return `${name}: ${value} mm${mark ? ' ' + mark : ''}`;
    }).join('\n');
}

// 格式化偏差信息，只保留整数部分
function formatDeltaDeviationItemsInt(items) {
    const paramNameMap = {
        's100206003': '前点水平偏差(波动)',
        's100206004': '前点垂直偏差(波动)',
        's100206006': '后点水平偏差(波动)',
        's100206007': '后点垂直偏差(波动)',
    };
    const severityMark = {
        'normal': '',
        'warning': '⚠超限',
        'critical': '🚨严重超限',
    };
    return items.map(item => {
        const name = paramNameMap[item.paramCode] || item.paramCode;
        const value = Math.trunc(item.value); // 只保留整数部分
        const min = Math.trunc(item.min); // 只保留整数部分
        const max = Math.trunc(item.max); // 只保留整数部分
        const deltaValue = Math.trunc(item.deltaValue); // 只保留整数部分
        const mark = severityMark[item.severity] || '';
        return `${name}: ${deltaValue}(${min}～${max}) mm${mark ? ' ' + mark : ''}`;
    }).join('\n');
}



export const guidanceThresholdsMessage = (event) => {
  const { canonicalKey, ringNo, paramCode, value, severity, range, payload } = event || {};
  // console.log("guidanceThresholdsMessage", payload);
  // console.log("paramCode",paramCode);

  let tbmInfo = getTbmMetadata(canonicalKey);
  let paramMeta = getParameterMetadataByCode(paramCode);
  const headerParts = [tbmInfo?.projectShortName, tbmInfo?.tunnelName].filter(Boolean);
  const readableName = headerParts.length ? headerParts.join(" / ") : tbmInfo?.tbmName || "未知设备";

  //console.log("paramMeta",paramMeta);
  //console.log("tbmInfo", tbmInfo);

  const severityMessage = paramMeta.name

  const details = formatDeviationItemsInt(payload);
  //console.log("details", details);



  const message = `${readableName} 第${ringNo}环,${severityMessage}:\n${details}`;
  return message;
};

export const guidanceDeltaThresholdsMessage = (event) => {
  const { canonicalKey, ringNo, paramCode, value, severity, range, payload } = event || {};
  // console.log("guidanceThresholdsMessage", payload);
  // console.log("paramCode",paramCode);

  let tbmInfo = getTbmMetadata(canonicalKey);
  let paramMeta = getParameterMetadataByCode(paramCode);
  const headerParts = [tbmInfo?.projectShortName, tbmInfo?.tunnelName].filter(Boolean);
  const readableName = headerParts.length ? headerParts.join(" / ") : tbmInfo?.tbmName || "未知设备";

  //console.log("paramMeta",paramMeta);
  //console.log("tbmInfo", tbmInfo);

  const severityMessage = paramMeta.name

  const details = formatDeltaDeviationItemsInt(payload);
  //console.log("details", details);



  const message = `${readableName} 第${ringNo}环,${severityMessage}:\n${details}`;
  return message;
};


export const tbmConnectivityMessage = (event) => {
  const { canonicalKey, ringNo, paramCode, severity, message } = event;
  
  // tbmKey here is expected to be the canonicalKey; resolve metadata for readable fields
  let tbmInfo = getTbmMetadata(canonicalKey);
  // console.log("tbmInfo", tbmInfo);


  const headerParts = [tbmInfo?.projectShortName, tbmInfo?.tunnelName].filter(Boolean);
  const readableName = headerParts.length ? headerParts.join(" / ") : tbmInfo?.tbmName || "未知设备";

  const content = `${readableName} 第${ringNo}环: ${message}`;
  return content;
};


// export const guidanceThresholdsMessage = (event) => {
//   const { canonicalKey, ringNo, paramCode, value, severity, range, payload } = event || {}; 
//   console.log("guidanceThresholdsMessage", payload);


//   let tbmInfo = getTbmMetadata(canonicalKey);
//   let paramMeta = getParameterMetadata(paramCode);
//   const headerParts = [tbmInfo?.projectShortName, tbmInfo?.tunnelName].filter(Boolean);
//   const readableName = headerParts.length ? headerParts.join(" / ") : tbmInfo?.tbmName || "未知设备";

//   let flag = severity === 'critical' ? " 🚨严重超限" : severity === 'warning' ? " ⚠️超限" : "";
//   let details = '';
//   const fmtValue = (v) => {
//     if (typeof v === 'number') return Math.round(v);
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.round(n) : v;
//   };

//   if (paramMeta) {
//     details = `${paramMeta?.name}: ${fmtValue(value)}${paramMeta?.unit ? ` ${paramMeta?.unit}` : ''}${flag}`;
//   } else {
//     details = `参数${paramCode}: ${fmtValue(value)}${flag}`;
//   }
  
//   const text = formatDeviationItems(payload);
//   console.log("text",text);
  
//   const payloadValues = [];
//   // Support metrics present in several possible places:
//   //  - event.payload.<paramCode>
//   //  - event.payload.s10.<paramCode>
//   //  - event.<paramCode>
//   //  - event.s10.<paramCode>
//   const sources = [];
//   if (event?.payload && typeof event.payload === 'object') sources.push(event.payload);
//   // include the event object itself as a fallback (some callers attach s10 at top-level)
//   sources.push(event || {});

//   for (const key of GUIDANCE_KEYS) {
//     let raw;
//     for (const src of sources) {
//       if (!src || typeof src !== 'object') continue;
//       if (Object.prototype.hasOwnProperty.call(src, key)) {
//         raw = src[key];
//         break;
//       }
//       if (src.s10 && typeof src.s10 === 'object' && Object.prototype.hasOwnProperty.call(src.s10, key)) {
//         raw = src.s10[key];
//         break;
//       }
//     }
//     if (raw === undefined) continue;

//     const meta = getParameterMetadata(key);
//     const label = meta?.name || key;
//     const unit = meta?.unit ? ` ${meta.unit}` : '';
//     const display = (typeof raw === 'number' || (!Number.isNaN(Number(raw)) && raw !== null && raw !== undefined)) ? fmtValue(raw) : raw;
//     payloadValues.push(`${label}: ${display}${unit}`);
//   }

//   if (payloadValues.length) {
//     // join with newlines; fix previous stray quote and ensure clean formatting
//     details = `${details}，相关指标：\n${payloadValues.join('，\n')}`;
//   }

//   const thresholdText = range ? ` 指标超限（${range}）` : " 指标超限";

//   // Safely check reason (either in payload or top-level event) and append a terminal punctuation only when needed
//   const reason = payload?.reason || event?.reason;
//   if (reason === 'delta_exceeded') {
//     if (details && !/[。\.\!\?]$/.test(details)) {
//       details = `${details}。`;
//     }
//   }
//   const message = `${readableName} 第${ringNo}环:${thresholdText} ${details}`;
//   return message;
// };
