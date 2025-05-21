"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: StaticImageData;
};
const SearchInput: React.FC<Props> = ({ placeholder, icon, ...props }) => {
  return (
    <div className="bg-neutral-450 border border-neutral-550 rounded-[10px] max-w-[240px] px-4 py-[14px] flex justify-between items-center">
      <input
        type="text"
        placeholder={placeholder}
        className="bg-neutral-450 focus:outline-none w-[170px]"
        {...props}
      />
      <Image src={icon} alt="search-icon" className="w-[18px]" />
    </div>
  );
};

export default SearchInput;
