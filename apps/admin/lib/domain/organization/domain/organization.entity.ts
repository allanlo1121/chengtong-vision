// lib/domain/Organization/Organization.entity.ts

export type OrganizationStatus = "planning" | "active" | "paused" | "completed";

export interface OrganizationProps {
  id: string;
  name: string;
  shortName?: string;
  status: OrganizationStatus;
  regionId: string;
  isActive: boolean;
}

export class Organization {
  private props: OrganizationProps;

  constructor(props: OrganizationProps) {
    this.validate(props);
    this.props = props;
  }

  /* =============================
       业务不变量校验
    ============================== */
  private validate(props: OrganizationProps) {
    if (!props.name || props.name.trim().length < 2) {
      throw new Error("组织名称不能为空或过短");
    }

    if (!props.regionId) {
      throw new Error("组织必须属于一个区域");
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
      throw new Error("已完成组织不能暂停");
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

  toJSON(): OrganizationProps {
    return { ...this.props };
  }
}
