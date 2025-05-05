import React, { FC, SelectHTMLAttributes } from "react";

interface FormSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  showPlaceholder?: boolean; // 控制是否显示 `请选择`
  placeholderLabel?: string; // 自定义占位符文本
  errors?: string[];
  defaultValue?: string;
  IconComponent?: React.ElementType;
}

const FormSelect: FC<FormSelectProps> = ({
  id,
  name,
  label,
  options,
  showPlaceholder = true,  // 默认显示 `请选择`
  placeholderLabel,
  errors = [],
  IconComponent,
  defaultValue,
  ...props
}) => {
  const hasError = errors.length > 0;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <select
          id={id}
          name={name}
          aria-describedby={`${id}-error`}
          className={`peer block w-full cursor-pointer rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
            hasError ? "border-red-500" : "border-gray-200"
          }`}
          defaultValue={defaultValue}
          {...props}
        >
          {showPlaceholder && (
            <option value="" disabled>
              {placeholderLabel || `请选择 ${label}`}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {IconComponent && (
          <IconComponent className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        )}
      </div>

      {hasError && (
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {errors.map((error, index) => (
            <p className="mt-2 text-sm text-red-500" key={index}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
