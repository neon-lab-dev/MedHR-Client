import React from "react";
import { IMAGES } from "@/assets";
import Image from "next/image";

type TInternshipTypeProps = {
  selectedInternshipType: string;
  setSelectedInternshipType: React.Dispatch<React.SetStateAction<string>>;
};

const InterhshipType: React.FC<TInternshipTypeProps> = ({
  selectedInternshipType,
  setSelectedInternshipType,
}) => {

  // Internship type
  const handleInternshipType = (internshipType: string) => {
    setSelectedInternshipType(internshipType);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor="" className="text-neutral-960 text-base font-medium">
        Internship Type
      </label>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="bg-white rounded-xl border border-neutral-650 p-4 text-sm font-normal flex items-center justify-between"
        >
          {selectedInternshipType
            ? selectedInternshipType
            : "Select Tech / Non-Tech"}

          <Image src={IMAGES.arrowDown} alt="arrow-down" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-4 shadow flex flex-col gap-4"
        >
          <li
            onClick={() => handleInternshipType("Tech")}
            className="cursor-pointer"
          >
            Tech
          </li>
          <li
            onClick={() => handleInternshipType("Non-Tech")}
            className="cursor-pointer"
          >
            Non-Tech
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InterhshipType;
