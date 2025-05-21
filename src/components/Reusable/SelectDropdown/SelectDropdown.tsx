import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type TSelectDropdownProps = {
  label: string;
  items: string[];
  icon: string;
  onSelect?: (item: string) => void;
  selectedData: string | null;
};

const SelectDropdown: React.FC<TSelectDropdownProps> = ({
  label,
  items,
  icon,
  onSelect,
  selectedData,
}) => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <div ref={dropDownRef} className="relative font-plus-jakarta-sans">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-[14px] bg-white border border-[#CAD5E2] flex items-center justify-between leading-6 rounded-lg w-[277px] cursor-pointer 
        transition-all duration-300 ease-in-out transform active:scale-95 text-[#1D293D] font-medium"
      >
        {selectedData ? selectedData : label}
        <Image src={icon} alt="dropdown-icon" className="size-6" />
      </button>
      <div
        className={`${
          open ? "visible bg-white shadow-secondary-button" : "invisible"
        } absolute top-12 z-50 w-full flex flex-col gap-2 p-3 rounded-b-2xl`}
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(item)}
            className={`rounded-md bg-neutral-100 text-neutral-700 font-medium text-start py-2 px-3 ${
              open ? "opacity-100 duration-500" : "opacity-0 duration-150"
            } hover:bg-neutral-200`}
            style={{
              transform: `translateY(${open ? 0 : (idx + 1) * 10}px)`,
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectDropdown;
