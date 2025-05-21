"use client"
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextInputProps {
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  error?: FieldError | string | undefined | Merge<FieldError, FieldErrorsImpl<any>>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, placeholder = "", type = "text", error, defaultValue, onKeyDown, isDisabled = false, isRequired = true, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-Inter w-full font-plus-jakarta-sans">
        <label htmlFor={name} className="text-neutral-700 font-medium">
          {label}
          {
            isRequired &&
            <span className="text-red-600"> *</span>
          }
        </label>
        <input
          required={isRequired}
          id={name}
          name={name || undefined}
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          ref={ref}
          disabled={isDisabled}
          className={`p-4 rounded-xl bg-white border  focus:outline-none focus:border-primary-500 transition duration-300 ${error ? "border-red-500" : "border-neutral-300"
            }`}
          {...rest}
        />
        {typeof error === "object" && "message" in error && (
          <span className="text-red-500 text-sm">{String(error.message)}</span>
        )}
        {typeof error === "string" && (
          <span className="text-red-500 text-sm">{error}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
