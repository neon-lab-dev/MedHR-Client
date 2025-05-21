import React from "react";
import { IMAGES } from "@/assets";
import Image from "next/image";

type TExperiencedLevelProps = {
  experienceLevel: string;
  setExperienceLevel: (level: string) => void;
};

const ExperiencedLevel: React.FC<TExperiencedLevelProps> = ({
  experienceLevel,
  setExperienceLevel,
}) => {
  // Experience level
  const handleExperienceLevel = (level: string) => {
    setExperienceLevel(level);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor="" className="text-neutral-960 text-base font-medium">
        Experience Level
      </label>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="bg-white rounded-xl border border-neutral-650 p-4 text-sm font-normal flex items-center justify-between"
        >
          {experienceLevel ? experienceLevel : "Select Level"}

          <Image src={IMAGES.arrowDown} alt="arrow-down" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-4 shadow flex flex-col gap-4 h-60 "
        >
          {[
            "1 Year",
            "2 Years",
            "3 Years",
            "4 Years",
            "5 Years",
            "6 Years",
            "7 Years",
            "8 Years",
            "9 Years",
            "10 Years",
            "10+ Years",
          ].map((level, index) => (
            <li
              key={index}
              onClick={() => handleExperienceLevel(level)}
              className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg"
            >
              {level}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperiencedLevel;
