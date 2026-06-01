// "use client";

// import { useRouter } from "next/navigation";
// import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// import { ZodType } from "zod";

// type CrudCreatePageProps<T> = {
//   title: string;
//   description?: string;
//   schema: ZodType<T>;
//   action: (formData: FormData) => Promise<any>;
// };

// export function CrudCreatePage<T>({ title, description, schema, action }: CrudCreatePageProps<T>) {
//   const router = useRouter();

//   return (
//     <Card className="w-full max-w-4xl">
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>

//         {description && <CardDescription>{description}</CardDescription>}
//       </CardHeader>

//       <CardContent>
//         <SchemaForm
//           schema={schema}
//           action={action}
//           onSuccess={() => {
//             router.push("/system/organizations");
//           }}
//           onCancel={() => {
//             router.back();
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// }
