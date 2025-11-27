import { TbmParamResult } from "./pipeline.types.js";

/**
 * EventBus 消息类型
 */
export interface TbmEvent {
  type: "tbm.param.evaluated" | string;
  data: TbmParamResult;
  timestamp: number;
}
