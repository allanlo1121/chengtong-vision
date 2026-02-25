export async function withTransaction<T>(fn: () => Promise<T>): Promise<T> {
  // 未来可替换为真正事务
  return fn();
}
