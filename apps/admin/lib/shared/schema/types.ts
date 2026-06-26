// export interface FormFieldMeta {
//   label: string;

//   component: string;

//   type?: FormFieldType;

//   section?: string;

//   colSpan?: 1 | 2 | 3 | 4;

//   placeholder?: string;
//   readonly?: boolean;
//   hidden?: boolean;

//   options?: {
//     label: string;
//     value: string;
//   }[];

//   optionSource?: OptionSource;
//   dependsOn?: string[];
// }

// export type FormFieldType =
//   | "text"
//   | "number"
//   | "email"
//   | "password"
//   | "date"
//   | "datetime-local"
//   | "tel"
//   | "url";

// export interface FormFieldOverride {
//   readonly?: boolean;

//   hidden?: boolean;
// }

// export interface OptionItem {
//   label: string;
//   value: string;
// }

// export interface OptionSourceConfig {
//   source: string;

//   code?: string;

//   level?: number;

//   parentCode?: string;
// }

// export type OptionSource =
//   | OptionSourceConfig
//   | ((values: Record<string, any>) => OptionSourceConfig);
