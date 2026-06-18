// components/projects/ProjectTable/column-types.ts
export interface ColumnConfig {
  id: string;
  title: string;

  /** 是否允许排序 */
  enableSorting?: boolean;

  /** 是否允许被隐藏 */
  enableHiding?: boolean;

  /** 默认是否显示（关键） */
  defaultVisible?: boolean;

  /** 是否为“系统列”（用户不能关） */
  fixed?: boolean;
}
