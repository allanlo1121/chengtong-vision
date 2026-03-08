// // form/field-component.types.ts

// import { UseFormReturn, FieldValues } from "react-hook-form"
// import { OptionConfig } from "@/modules/shared/options/types"
// import { fieldRegistry } from "./field-registry"

// // =============================
// // Component 类型
// // =============================

// export type FieldComponent = keyof typeof fieldRegistry

// // =============================
// // UI Schema
// // =============================

// export interface FieldUI<T extends FieldValues = FieldValues> {
//     label?: string
//     component: FieldComponent
//     colSpan?: number
//     placeholder?: string
//     inputType?: string
//     required?: boolean
//     disabled?: boolean
//     readOnly?: boolean
//     option?: OptionConfig
//     section?: string
//     visible?: (values: T) => boolean
//     dependsOn?: string[]
// }

// // =============================
// // Schema Field
// // =============================

// export interface FieldDefinition<T extends FieldValues = FieldValues> {
//     name: string
//     ui: FieldUI<T>
// }

// // =============================
// // Renderer Props
// // =============================

// export interface FieldRendererProps<
//     T extends FieldValues = FieldValues
// > {
//     name: string
//     ui: FieldUI
//     form: UseFormReturn<T>
// }
