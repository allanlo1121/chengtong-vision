export abstract class MetadataServiceBase {
    protected lastRefreshed = 0;

    abstract load(): Promise<void>;

    refreshIfNeeded(maxAgeMs: number) {
        const now = Date.now();
        if (now - this.lastRefreshed > maxAgeMs) {
            return this.load();
        }
    }
}