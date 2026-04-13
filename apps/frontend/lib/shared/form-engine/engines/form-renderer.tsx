// import { useEffect } from "react"
// import { FieldValues, UseFormReturn } from "react-hook-form"
// import { FieldDefinition } from "../types/field.types"
// import { runDependencyEngine } from "./dependency-engine"

// export function FormRenderer<T extends FieldValues>({
//     form,
//     fields
// }: {
//     form: UseFormReturn<T>
//     fields: FieldDefinition<T>[]
// }) {

//     useEffect(() => {

//         const subscription = form.watch((values) => {

//             runDependencyEngine(fields, values as T, form)

//         })

//         return () => subscription.unsubscribe()

//     }, [form, fields])

//     return (
//         <div className="grid grid-cols-12 gap-4">
//     //     {fields.map((field) => (
//     //             <FieldRenderer<T>
//     //             key= {field.name}
//     //             field = {field}
//     //             form = {form}
//     //             />
//     //   ))
//     //     }
//         </div>
//     )
// }
