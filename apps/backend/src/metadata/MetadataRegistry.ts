import { ParameterGroupService } from "./ParameterGroupService.js";
import { ParameterMetadataService } from "./ParameterMetadataService.js";
import { ThresholdRuleService } from "./ThresholdRuleService.js";
import { TbmValidatorService } from "./TbmValidatorService.js";

export class MetadataRegistry {
  static parameterGroups = new ParameterGroupService();
  static parameterMetas = new ParameterMetadataService();
  static thresholdRules = new ThresholdRuleService();
  static tbmValidator = new TbmValidatorService();

  static async initialize() {
    await Promise.all([
      this.parameterGroups.initialize(),
      this.parameterMetas.initialize(),
      this.thresholdRules.load(),
      this.tbmValidator.preload(),
    ]);
  }
}
