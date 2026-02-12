// export class ParameterMetadataEngine {
//     private metaMap = new Map<string, ParameterMetadata>();
//     private lastLoaded = 0;

//     async load();
//     get(paramCode: string): ParameterMetadata | undefined;
//     getAll(): Map<string, ParameterMetadata>;

//     renderValue(value: any, paramCode: string): string;
//     renderParamLine(paramCode: string, value: any, trend?: string): string;
//     renderGroupItems(paramCode: string, groupActives: any[], payload: any): string[];
// }

// TbmRuntimeTypes.ts

export interface ParameterRuntimeValue {
  value: number | null;
  ts: number; // 毫秒时间戳
}

export interface TbmRuntimeState {
  tbmCode: string;

  parameters: Record<
    string, // parameterCode
    ParameterRuntimeValue
  >;
}

export interface UpdateParameterPayload {
  tbmCode: string;
  parameters: Record<string, number | null>;
  ts?: number;
}
