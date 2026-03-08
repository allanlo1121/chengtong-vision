import { FieldInput } from "./fields/field-input";
// import { FieldSelect } from "./field-select"
import { FieldSwitch } from "./fields/field-switch";
import { FieldTreeSelect } from "./fields/field-tree-select";
import { FieldCascader } from "./fields/field-region-cascader";
import { FieldUI } from "./field-component.types";
import { FieldSelect } from "./fields/field-select";
import { FormTextarea } from "./fields/field-textarea";

export function FieldRenderer({ name, ui, form }: { name: string; ui: FieldUI; form: any }) {
  // console.log("FieldRender-ui", ui);

  switch (ui.component) {
    case "input":
      return (
        <FieldInput
          name={name}
          label={ui.label}
          control={form.control}
          placeholder={ui.placeholder}
          type={ui.inputType}
          readonly={ui.readonly}
          required={ui.required}
          disabled={ui.disabled}
        />
      );

    case "select":
      return (
        <FieldSelect
          name={name}
          label={ui.label}
          control={form.control}
          placeholder={ui.placeholder}
          option={ui.option}
          required={ui.required}
          disabled={ui.disabled}
        />
      );

    case "treeSelect":
      if (!ui.option) return null;

      return (
        <FieldTreeSelect name={name} label={ui.label} option={ui.option} control={form.control} />
      );

    // case "cascader":
    //     return (
    //         <FieldCascader
    //             name={name}
    //             label={ui.label}
    //             option={ui.option}
    //             form={form}
    //         />
    //     )

    case "switch":
      return <FieldSwitch name={name} label={ui.label} control={form.control} />;
    case "textarea":
      return (
        <FormTextarea
          name={name}
          label={ui.label}
          control={form.control}
          placeholder={ui.placeholder}
          required={ui.required}
          disabled={ui.disabled}
          readonly={ui.readonly}
        />
      );

    default:
      return null;
  }
}
