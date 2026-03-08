"use client";

import { useActionState } from "react";
import {
  createOrganizationAction,
  OrganizationFormState,
} from "@/modules/organization/actions/create-organization.action";
import { FormSection, FormInput, FormSelect } from "@/components/form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { getMasterOptions } from "@/modules/master-data/services/master-option.service";

// const initialState = {
//     success: false,
//     errors: {},
//     message: "",
// }

const initialState: OrganizationFormState = {
  success: false,
  errors: {},
  message: "",
};

export async function OrganizationCreateForm() {
  const [state, formAction] = useActionState(createOrganizationAction, initialState);
  const orgTypesRes = await getMasterOptions("ORG_TYPE");
  const regionsRes = await getMasterOptions("REGION");

  const orgTypes = orgTypesRes.success ? orgTypesRes.data : [];
  const regions = regionsRes.success ? regionsRes.data : [];
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <FormSection title="基本信息">
            <FormInput control={form.control} name="name" label="组织名称" required />

            <FormInput control={form.control} name="code" label="组织编码" />

            <FormSelect
              control={form.control}
              name="orgTypeId"
              label="组织类型"
              options={orgTypes}
            />

            <FormSelect control={form.control} name="regionId" label="所属片区" options={regions} />
          </FormSection>

          <FormSection title="地址信息">
            <FormInput control={form.control} name="address" label="地址" />
          </FormSection>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-switch">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
