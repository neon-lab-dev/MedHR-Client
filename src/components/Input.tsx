import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "filled" | "stroke";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: Variant;
  isError?: boolean;
};

const classNames = {
  default:
    "py-4 px-5 rounded-lg border body-small outline-none focus:border-2 focus:border-secondary-500 disabled:border-neutral-300 disabled:text-neutral-300",
  variants: {
    filled: "bg-neutral-50 border-neutral-300 text-neutral-500",
    stroke: "",
  },
};

const Input = ({
  variant = "stroke",
  isError = false,
  children,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      className={twMerge(
        classNames.default,
        classNames.variants[variant],
        isError && "border-error-500",
        className
      )}
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
