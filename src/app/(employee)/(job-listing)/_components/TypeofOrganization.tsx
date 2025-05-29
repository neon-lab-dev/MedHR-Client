import { organizationType } from "@/app/employer/(home)/add-new-hiring/[jobType]/page";
import React, { useEffect, useRef, useState } from "react";

type TDepartmentProps = {
  typeOfOrganization: string;
  setTypeOfOrganization: (value: string) => void;
};

const TypeofOrganization: React.FC<TDepartmentProps> = ({
  typeOfOrganization,
  setTypeOfOrganization,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-neutral-960 text-base font-medium">Type of Organization</label>
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="bg-white rounded-xl border border-neutral-650 p-4 text-sm font-normal flex items-center justify-between cursor-pointer"
        >
          {typeOfOrganization || "Select Type of Organization"}
        </div>
        {isDropdownOpen && (
          <ul className="absolute left-0 right-0 mt-2 bg-base-100 rounded-box z-10 w-full p-4 shadow flex flex-col gap-4 h-60 overflow-y-auto">
            {organizationType.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setTypeOfOrganization(item);
                  setIsDropdownOpen(false);
                }}
                className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TypeofOrganization;
