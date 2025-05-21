import { Dispatch, SetStateAction, RefObject } from "react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "@/assets";

interface EmploymentTypeFilterProps {
  selectedEmploymentTypeCategory: string | null;
  selectedEmploymentType: string | null;
  setSelectedEmploymentType: Dispatch<SetStateAction<string | null>>;
  categoryOptions: string[];
  employmentTypeOptions: any[];
  handleEmploymentTypeCategorySelect: (category: string) => void;
  handleCategorySelect: (category: string) => void;
}

const EmploymentTypeFilter = ({
  selectedEmploymentTypeCategory,
  selectedEmploymentType,
  setSelectedEmploymentType,
  categoryOptions,
  employmentTypeOptions,
  handleEmploymentTypeCategorySelect,
  handleCategorySelect,
}: EmploymentTypeFilterProps) => {

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
  return (
    <div
    ref={dropDownRef}
    className="relative mx-auto w-fit text-white"
  >
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="px-6 py-5 bg-white shadow-secondary-button flex items-center justify-between text-neutral-700 text-xl leading-6 rounded-2xl w-[300px] lg:w-[277px] cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 text-nowrap"
    >
      {selectedEmploymentTypeCategory ||
        selectedEmploymentType ||
        "Employment Type"}
      <Image
        src={ICONS.downArrow}
        alt="dropdown-icon"
        className="size-6"
      />
    </button>

    <div
      className={`${
        open
          ? "visible bg-white shadow-secondary-button"
          : "invisible"
      } absolute top-12 z-50 w-full flex flex-col gap-2 p-3 rounded-b-2xl`}
    >
      {/* If a parent is selected and has children, show its children */}
      {selectedEmploymentType && categoryOptions.length > 0 ? (
        <>
          {categoryOptions.map((child, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleEmploymentTypeCategorySelect(child);
                setOpen(false);
              }}
              className={`rounded-md bg-neutral-100 text-neutral-700 font-medium text-start py-2 px-3 ${
                open
                  ? "opacity-100 duration-500"
                  : "opacity-0 duration-150"
              } hover:bg-neutral-200`}
              style={{
                transform: `translateY(${
                  open ? 0 : (idx + 1) * 10
                }px)`,
              }}
            >
              {child}
            </button>
          ))}
          <button
            onClick={() => setSelectedEmploymentType(null)}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            ← Back
          </button>
        </>
      ) : (
        employmentTypeOptions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleCategorySelect(item.label)}
            className={`rounded-md bg-neutral-100 text-neutral-700 font-medium text-start py-2 px-3 ${
              open
                ? "opacity-100 duration-500"
                : "opacity-0 duration-150"
            } hover:bg-neutral-200`}
            style={{
              transform: `translateY(${open ? 0 : (idx + 1) * 10}px)`,
            }}
          >
            {item.label}
          </button>
        ))
      )}
    </div>
  </div>
  );
};

export default EmploymentTypeFilter;
