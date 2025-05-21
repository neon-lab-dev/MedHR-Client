import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      <span className="loading loading-spinner loading-md" />
    </div>
  );
};

export default Loading;
