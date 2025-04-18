

//处理数字位数
export function formatNumber(value: number | string | null | undefined, digits: number): string {
    const num = Number(value);
    if (value == null || isNaN(num)) return '-';
    return num.toFixed(digits);
  }
  