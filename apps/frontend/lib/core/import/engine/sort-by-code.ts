export function sortByCodeDepth(rows: any[]) {
  return rows.sort((a, b) => {
    const aDepth = a.org_code.split("-").length;
    const bDepth = b.org_code.split("-").length;

    return aDepth - bDepth;
  });
}
