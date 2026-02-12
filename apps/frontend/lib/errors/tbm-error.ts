export function mapTbmError(err: any): string {
  // Postgres unique violation
  if (err?.code === "23505") {
    return "盾构编号已存在";
  }

  // Foreign key violation
  if (err?.code === "23503") {
    return "关联数据不存在";
  }

  // RLS / permission
  if (err?.code === "42501") {
    return "你没有权限执行该操作";
  }

  return err?.message ?? "创建盾构失败";
}
