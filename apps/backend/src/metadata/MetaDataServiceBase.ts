export abstract class MetadataServiceBase {
  protected lastRefreshed = 0;
  protected initialized = false;

  /** 子类必须实现：实际加载数据 */
  abstract load(): Promise<void>;

  /** 初始化时调用一次 */
  async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.load();
      this.initialized = true;
    }
  }

  /** 是否需要刷新 */
  async refreshIfNeeded(maxAgeMs: number): Promise<void> {
    const now = Date.now();
    if (now - this.lastRefreshed > maxAgeMs) {
      console.log(`♻️ Auto-refreshing metadata: ${this.constructor.name}`);
      await this.load();
    }
  }
}
