"use client"
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextAreaProps {
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
  rows : number;
  cols : number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name, placeholder = "", rows, cols, error, isDisabled = false, isRequired = true, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-Inter w-full font-plus-jakarta-sans">
        <label htmlFor={name} className="text-neutral-700 font-medium">
          {label}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
        <textarea
          ref={ref}
          required={isRequired}
          id={name}
          name={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          disabled={isDisabled}
          className={`p-4 rounded-xl bg-white border focus:outline-none focus:border-primary-500 transition duration-300 ${
            error ? "border-red-500" : "border-neutral-300"
          }`}
          {...rest}
        />
        {error?.message && (
          <span className="text-red-500 text-sm">{String(error.message)}</span>
        )}
      </div>
    );
  }
);


TextArea.displayName = "TextArea";

export default TextArea;
