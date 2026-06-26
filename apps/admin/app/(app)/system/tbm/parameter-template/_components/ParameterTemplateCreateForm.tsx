import { createTbmParameterTemplateAction } from "@/lib/domain/tbm-runtime/actions/create-parameter-template.action";
import {
  CreateTbmParameterTemplateInput,
  CreateTbmParameterTemplateSchema,
} from "@/lib/domain/tbm-runtime/schemas/tbm-parameter-template.schema";
import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import { useRouter } from "next/navigation";
import { DefaultValues } from "react-hook-form";
import { toast } from "sonner";
interface ParameterTemplateCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ParameterTemplateCreateForm({
  onSuccess,
  onCancel,
}: ParameterTemplateCreateFormProps) {
  const router = useRouter();

  return (
    <SchemaForm
      schema={CreateTbmParameterTemplateSchema}
      initialValues={
        {
          isDefault: false,
          isDisabled: false,
          sortOrder: 0,
        } satisfies DefaultValues<CreateTbmParameterTemplateInput>
      }
      action={createTbmParameterTemplateAction}
      onSuccess={(result) => {
        toast.success(result.message || "创建成功");

        router.refresh();

        onSuccess?.();
      }}
      onError={(result) => {
        toast.error(result.message || "创建失败");
      }}
      onCancel={() => {
        onCancel?.();
      }}
    />
  );
}
