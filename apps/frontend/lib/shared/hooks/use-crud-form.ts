import { useForm, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractDefaults } from "../form/utils/extract-defaults";

export function useCrudForm<TSchema extends z.ZodObject<any>>({
  schema,
  defaultValues,
}: {
  schema: TSchema;
  defaultValues?: DefaultValues<z.infer<TSchema>>;
}) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as any,
    defaultValues: extractDefaults(schema),
  });
}
