// import { z } from "zod"

// export const OrganizationCreateSchema = z.object({
//   parentId: z.uuid().optional(),

//   name: z.string().min(1, "名称不能为空"),
//   fullName: z.string().optional(),

//   description: z.string().optional(),

//   orgTypeId: z.string().uuid(),
//   businessId: z.string().uuid(),

//   regionId: z.string().uuid(),

//   countryCode: z.string(),
//   adminRegionCode: z.string().optional(),

//   address: z.string().optional(),

//   latitude: z.number().optional(),
//   longitude: z.number().optional(),

//   isActive: z.boolean().default(true)
// })

// export type OrganizationCreateInput =
//   z.infer<typeof OrganizationCreateSchema>
