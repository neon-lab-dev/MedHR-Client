"use client";
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type TDropdownInputProps = {
  label: string;
  options: string[];
  error?: FieldError | string | undefined | Merge<FieldError, FieldErrorsImpl<any>>;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropdownInput = forwardRef<HTMLSelectElement, TDropdownInputProps>(
  ({ label, options, error, isRequired = true, value, onChange, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-plus-jakarta-sans">
        <label className="text-neutral-700 font-medium">
          {label}
          {isRequired && <span className="text-red-600">*</span>}
        </label>
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          required={isRequired}
          className={`p-4 rounded-xl bg-white border focus:outline-none focus:border-primary-500 transition duration-300 ${
            error ? "border-red-500" : "border-neutral-300"
          }`}
          {...rest}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="max-w-[100px]">
              {option}
            </option>
          ))}
        </select>
        {error && typeof error !== "string" && "message" in error && typeof error.message === "string" && (
          <p className="text-xs text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

DropdownInput.displayName = "DropdownInput";
export default DropdownInput;
