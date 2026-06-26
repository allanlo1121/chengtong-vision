import React, { FC, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  errors?: string[];
  IconComponent?: React.ElementType;
}

const FormInput: FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  errors,
  IconComponent,
  required,
  ...props
}) => {
  const hasError = !!errors && errors.length > 0;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative mt-2 rounded-md">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError}
          className={`block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
            hasError ? "border-red-500" : "border-gray-200"
          }`}
          required={required}
          {...props}
        />

        {IconComponent && (
          <IconComponent className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        )}
      </div>

      {hasError && (
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {errors!.map((error, index) => (
            <p className="mt-2 text-sm text-red-500" key={index}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormInput;
