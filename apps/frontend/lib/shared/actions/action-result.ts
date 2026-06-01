export interface ActionResult<T> {
  success: boolean;

  data?: T;

  message?: string;

  errors?: Record<string, string[]>;

  errorCode?: string;

  errorLevel?: "warning" | "error" | "fatal";

  nextAction?: {
    type: "retry" | "confirm" | "redirect";

    label?: string;

    href?: string;
  };
}
