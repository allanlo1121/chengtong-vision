// "use client";

// import { createMqttUserWithAclAction } from "../../actions";
// import { CreateMqttUserWithAclSchema } from "../../schemas";
// import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
// import { routes } from "@/lib/core/router/router";

// type Props = {
//   title: string;
//   description: string;
//   parentId?: string;
// };

// export function CreateMqttUserWithAcl({ title, description, parentId }: Props) {
//   return (
//     <CrudFormPage
//       title={title}
//       description={description}
//       schema={CreateMqttUserWithAclSchema}
//       action={createMqttUserWithAclAction}
//       redirect={routes.tbms.list}
//     />
//   );
// }
