// services/TbmRuntimeService.ts
import { TbmRuntimeState, UpdateParameterPayload, ParameterRuntimeValue } from "./types.js";

export class TbmRuntimeService {
  /**
   * 内存状态
   * tbmCode -> runtimeState
   */
  private readonly runtimeMap = new Map<string, TbmRuntimeState>();

  /**
   * 获取或初始化 TBM Runtime
   */
  private getOrCreate(tbmCode: string): TbmRuntimeState {
    let state = this.runtimeMap.get(tbmCode);

    if (!state) {
      state = {
        tbmCode,
        parameters: {},
      };
      this.runtimeMap.set(tbmCode, state);
    }

    return state;
  }

  /**
   * 更新 TBM 参数（Node-RED → Processor）
   */
  updateParameters(payload: UpdateParameterPayload): TbmRuntimeState {
    const { tbmCode, parameters, ts = Date.now() } = payload;
    const state = this.getOrCreate(tbmCode);

    for (const [parameterCode, value] of Object.entries(parameters)) {
      state.parameters[parameterCode] = {
        value,
        ts,
      };
    }

    return state;
  }

  /**
   * 读取某个参数当前值
   */
  getParameter(tbmCode: string, parameterCode: string): ParameterRuntimeValue | null {
    return this.runtimeMap.get(tbmCode)?.parameters[parameterCode] ?? null;
  }

  /**
   * 读取 TBM 全量参数（只读快照）
   */
  getParametersSnapshot(tbmCode: string): Record<string, ParameterRuntimeValue> {
    const state = this.runtimeMap.get(tbmCode);
    if (!state) return {};

    // 浅拷贝，防止外部修改
    return { ...state.parameters };
  }

  /**
   * 是否存在 TBM Runtime（用于 tbmCode 校验）
   */
  hasTbm(tbmCode: string): boolean {
    return this.runtimeMap.has(tbmCode);
  }

  /**
   * 获取 TBM Runtime（只读）
   */
  getRuntime(tbmCode: string): TbmRuntimeState | null {
    return this.runtimeMap.get(tbmCode) ?? null;
  }

  /**
   * 清理 TBM（例如下线 / 回放结束）
   */
  removeTbm(tbmCode: string): void {
    this.runtimeMap.delete(tbmCode);
  }

  /**
   * 全量清空（测试 / 重放）
   */
  clear(): void {
    this.runtimeMap.clear();
  }

  /**
   * 用于调试 / 监控
   */
  stats() {
    return {
      tbmCount: this.runtimeMap.size,
      parameterCount: Array.from(this.runtimeMap.values()).reduce(
        (sum, tbm) => sum + Object.keys(tbm.parameters).length,
        0
      ),
    };
  }
}
