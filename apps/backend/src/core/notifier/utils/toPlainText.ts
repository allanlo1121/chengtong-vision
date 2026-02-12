export function toPlainText(md: string): string {
  return md
    .replace(/^####\s*参数详情：?.*$/gm, "")
    .replace(/^###\s+/gm, "")
    .replace(/^##\s+/gm, "")
    .replace(/^#\s+/gm, "")

    .replace(/^>\s*/gm, "") // 去掉引用符号 >

    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")

    .replace(/`{1,3}(.*?)`{1,3}/g, "$1")

    .replace(/\n{2,}/g, "\n")
    .trim();
}
