import { BaseError } from "./base.error";

export class PermissionDeniedError extends BaseError {
  constructor() {
    super("权限不足", "PERMISSION_DENIED", 403);
  }
}
