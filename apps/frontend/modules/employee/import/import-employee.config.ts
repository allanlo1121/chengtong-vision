// import { ImportConfig } from "@/modules/import/types";
// import { EmployeeImportSchema } from "../schemas";

// export const employeeImportConfig: ImportConfig<"employees"> = {

//   entity: "employees",

//   schema: EmployeeImportSchema,

//   fields: {
//     emp_name: "name",
//     emp_code: "code",
//     emp_sex: "genderId",
//     emp_tel: "phone",
//     emp_mail: "email",

//     emp_type: "employeeTypeId",
//     emp_bel_dept: "organizationId",
//     emp_id: "externalId",

//     emp_bel_name: "postId",
//     emp_worktime: "hireDate",

//     ctcemti_bltjzz_serial_version: "externalVersion",
//   },

//   lookups: {
//     organizationId: "parentOrganizations",
//     employeeTypeId: "masterDatas",
//     genderId: "masterDatas",
//     postId: "masterDatas",

//   },
//   getExternalVersion: (row: any) => {
//     const versionStr = row["ctcemti_bltjzz_serial_version"];
//     return versionStr ? Number(versionStr) : 0;
//   },
// };
