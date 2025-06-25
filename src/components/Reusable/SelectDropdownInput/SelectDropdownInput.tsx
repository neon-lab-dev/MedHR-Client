/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";


interface DropdownProps {
  label?: string;
  options: string[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  isRequired?: boolean;
  selected?: boolean;
}

const SelectDropdownInput = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, error, isRequired=true, selected, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-Inter w-full font-plus-jakarta-sans">
        <label className="text-neutral-700 font-medium">
          {label}
          {
            isRequired && <span className="text-red-600">*</span>
          }
        </label>
        <select
          ref={ref}
          defaultChecked={selected}
          required={isRequired}
          className={`p-4 rounded-xl bg-white border  focus:outline-none focus:border-primary-500 transition duration-300 ${error ? "border-red-500" : "border-neutral-300"
            }`}
          {...rest}
        >
          <option value="" disabled selected>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && typeof error.message === 'string' && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
      </div>
    );
  }
);

SelectDropdownInput.displayName = "SelectDropdownInput";

export default SelectDropdownInput;
