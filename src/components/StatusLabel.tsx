import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  variant: "applied" | "rejected" | "hired" | "interview";
  children: ReactNode;
}

const StatusLabel: React.FC<ButtonProps> = ({ variant, children }) => {
  const baseStyles = "px-4 pb-[10px] pt-2 rounded-[100px] font-semibold";

  const variantStyles = {
    applied: "bg-secondary-50 text-secondary-600",
    rejected: "bg-primary-25 text-primary-650",
    hired: "bg-success-50 text-success-100",
    interview: "bg-secondary-20 text-secondary-25",
  };

  const buttonClass = twMerge(baseStyles, variantStyles[variant]);

  return <span className={buttonClass}>{children}</span>;
};

export default StatusLabel;
