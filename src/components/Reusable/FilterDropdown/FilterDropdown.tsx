import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type TFilterDropdownProps = {
  label: string;
  items: string[];
  icon: string;
  onSelect?: (item: string) => void;
  selectedData: string | null;
  classNames? : string;
  containerWidth? : string;
};

const FilterDropdown: React.FC<TFilterDropdownProps> = ({ label, items, icon, onSelect, selectedData, classNames, containerWidth="w-full lg:w-fit" }) => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
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
    <div ref={dropDownRef} className={`relative mx-auto text-white ${containerWidth}`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={twMerge(
          "px-6 py-5 bg-white shadow-secondary-button flex items-center justify-between text-neutral-700 leading-6 text-xl rounded-2xl w-full lg:w-[277px] cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 text-nowrap",
          classNames,
        )}
      >
        {
          selectedData ?
          selectedData
          :
          label
        }
        <Image src={icon} alt="dropdown-icon" className="size-6" />
      </button>
      <div
        className={`${
          open ? "visible bg-white shadow-secondary-button" : "invisible"
        } absolute top-12 z-50 w-full flex flex-col gap-2 p-3 rounded-b-2xl max-h-64 overflow-y-auto`}
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

export default FilterDropdown;
