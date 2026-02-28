// menu/types.ts

// export interface MenuNode {
//   id: string;
//   parent_id: string | null;
//   label: string;
//   name: string;
//   path: string | null;
//   icon: string | null;
//   sort_order: number;
//   permission_code: string | null;
//   is_visible: boolean;
//   is_disabled: boolean;
//   children?: MenuNode[];
// }

export interface MenuRow {
  id: string;
  parent_id: string | null;
  name: string;
  label: string;
  path: string | null;
  icon: string | null;
  sort_order: number;
  group_name: string | null;
  permission_code: string | null;
  is_visible: boolean;
  is_disabled: boolean;
}

export interface MenuNode extends MenuRow {
  children?: MenuNode[];
}
