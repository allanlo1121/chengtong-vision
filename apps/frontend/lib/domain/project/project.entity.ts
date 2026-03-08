// lib/domain/project/project.entity.ts

export type ProjectStatus = "planning" | "active" | "paused" | "completed";

export interface ProjectProps {
  id: string;
  name: string;
  shortName?: string;
  status: ProjectStatus;
  regionId: string;
  isActive: boolean;
}

export class Project {
  private props: ProjectProps;

  constructor(props: ProjectProps) {
    this.validate(props);
    this.props = props;
  }

  /* =============================
       业务不变量校验
    ============================== */
  private validate(props: ProjectProps) {
    if (!props.name || props.name.trim().length < 2) {
      throw new Error("项目名称不能为空或过短");
    }

    if (!props.regionId) {
      throw new Error("项目必须属于一个区域");
    }
  }

  /* =============================
       业务行为
    ============================== */

  activate() {
    this.props.isActive = true;
  }

  pause() {
    if (this.props.status === "completed") {
      throw new Error("已完成项目不能暂停");
    }
    this.props.status = "paused";
  }

  complete() {
    this.props.status = "completed";
    this.props.isActive = false;
  }

  /* =============================
       只读访问器
    ============================== */

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get status() {
    return this.props.status;
  }

  toJSON(): ProjectProps {
    return { ...this.props };
  }
}
