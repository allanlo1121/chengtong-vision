import { TableEntity } from "@/lib/core/database/types";

type EntityRoutes = {
  list: string;
  create: string;
  import: string;
  detail: (id: string) => string;
  edit: (id: string) => string;
  workspace?: (id: string) => string;
  runtime?: (id: string) => string;
};

export const routes = {
  organizations: {
    list: "/hrm/organizations",

    create: "/hrm/organizations/create",

    import: "/hrm/organizations/import",

    detail: (id: string) => `/hrm/organizations/${id}`,

    edit: (id: string) => `/hrm/organizations/${id}/edit`,
  },

  employees: {
    list: "/hrm/employees",

    create: "/hrm/employees/create",

    import: "/hrm/employees/import",

    detail: (id: string) => `/hrm/employees/${id}`,
    edit: (id: string) => `/hrm/employees/${id}/edit`,
  },

  projects: {
    list: "/proj/projects",
    create: "/proj/projects/create",
    import: "/proj/projects/import",
    detail: (id: string) => `/proj/projects/${id}`,
    edit: (id: string) => `/proj/projects/${id}/edit`,
  },

  tunnels: {
    list: "/proj/tunnels",
    create: "/proj/tunnels/create",
    import: "/proj/tunnels/import",
    detail: (id: string) => `/proj/tunnels/${id}`,
    edit: (id: string) => `/proj/tunnels/${id}/edit`,
    workspace: (id: string) => `/workspace/tunnels/${id}/`,
  },

  tbms: {
    list: "/equip/tbms",
    create: "/equip/tbms/create",
    import: "/equip/tbms/import",
    detail: (id: string) => `/equip/tbms/${id}`,
    edit: (id: string) => `/equip/tbms/${id}/edit`,
    runtime: (id: string) => `/equip/tbms/${id}/runtime`,
  },
} satisfies Record<TableEntity, EntityRoutes>;
