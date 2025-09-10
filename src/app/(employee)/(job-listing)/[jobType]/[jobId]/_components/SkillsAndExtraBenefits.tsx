import React from "react";
import SkillsContainerComponent from "./SkillsContainerComponent";
import { twMerge } from "tailwind-merge";

type Props = {
  className: string;
  skills: string[];
  extraBenefits: string;
};

const SkillsAndExtraBenefits = ({
  className,
  extraBenefits,
  skills,
}: Props) => {
  return (
    <div className={twMerge("w-full xl:w-[70%] flex flex-col gap-6", className)}>
      <SkillsContainerComponent title="Skills" labels={skills} />
      {
        extraBenefits &&
        <SkillsContainerComponent
        title="Extra Benefits"
        labels={extraBenefits
          .split(",")
          .filter((label) => label !== "")
          .map((label) => label.trim())}
      />
      }
    </div>
  );
};

export default SkillsAndExtraBenefits;
