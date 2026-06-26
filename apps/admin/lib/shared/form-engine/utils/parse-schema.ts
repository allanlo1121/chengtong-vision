// import { ZodObject, ZodAny, ZodString, ZodNumber, ZodBoolean, ZodEnum } from "zod";

// import { FieldDefinition } from "../types/field.types";

// export function parseSchema(schema: ZodObject<any>): FieldDefinition[] {
//   const shape = schema.shape;

//   return Object.keys(shape).map((key) => {
//     const field = shape[key];

//     const ui = field.meta?.() ?? {};

//     return {
//       name: key,

//       ui: {
//         label: ui.label ?? key,
//         component: ui.component ?? "input",
//         colSpan: ui.colSpan ?? 1,
//         placeholder: ui.placeholder,
//         inputType: ui.inputType,
//         required: ui.required,
//         disabled: ui.disabled,
//         readonly: ui.readonly,
//         option: ui.option,
//       },
//     };
//   });
// }
