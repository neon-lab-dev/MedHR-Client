import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type TMultiSelectDropdownProps = {
  label: string;
  items: string[];
  icon: string;
  selectedData: string[]; // always array
  onSelect: (item: string) => void;
};

const MultiSelectDropdown: React.FC<TMultiSelectDropdownProps> = ({
  label,
  items,
  icon,
  selectedData,
  onSelect,
}) => {
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

  const isSelected = (item: string) => selectedData.includes(item);

  const handleToggleItem = (item: string) => {
    onSelect(item);
  };

  return (
    <div ref={dropDownRef} className="relative text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
       className="px-4 py-[14px] bg-white border border-[#CAD5E2] flex items-center justify-between leading-6 rounded-lg min-w-[277px] w-fit cursor-pointer 
        transition-all duration-300 ease-in-out transform active:scale-95 text-[#1D293D]"
      >
        {selectedData.length > 0 ? selectedData.join(", ") : label}
        <Image src={icon} alt="dropdown-icon" className="size-6" />
      </button>

      <div
        className={`${
          open ? "visible bg-white shadow-secondary-button max-h-96 overflow-y-auto" : "invisible"
        } absolute top-12 z-50 w-full flex flex-col gap-2 p-3 rounded-b-2xl`}
      >
        {items.map((item, idx) => (
          <label
            key={item}
            className={`rounded-md bg-neutral-100 text-neutral-700 font-medium text-start py-2 px-3 flex items-center gap-2 cursor-pointer hover:bg-neutral-200
              ${open ? "opacity-100 duration-500" : "opacity-0 duration-150"}`}
            style={{
              transform: `translateY(${open ? 0 : (idx + 1) * 10}px)`,
            }}
          >
            <input
              type="checkbox"
              checked={isSelected(item)}
              onChange={() => handleToggleItem(item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
