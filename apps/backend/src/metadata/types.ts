export class ParameterMetadataEngine {
    private metaMap = new Map<string, ParameterMetadata>();
    private lastLoaded = 0;

    async load();
    get(paramCode: string): ParameterMetadata | undefined;
    getAll(): Map<string, ParameterMetadata>;

    renderValue(value: any, paramCode: string): string;
    renderParamLine(paramCode: string, value: any, trend?: string): string;
    renderGroupItems(paramCode: string, groupActives: any[], payload: any): string[];
}