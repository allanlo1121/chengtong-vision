export interface IdNameRef {
  id: string;
  name: string;
}

export interface CodeNameRef {
  code: string;
  name: string;
}

export interface MasterRef {
  id: string;
  code: string;
  name: string;
}

export type ActionResult<T> = { success: true; data: T } | { success: false; error: string };
