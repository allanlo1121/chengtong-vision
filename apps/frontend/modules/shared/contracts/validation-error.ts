// validation-error.ts

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationError {
  errors: ValidationErrorDetail[];
}
