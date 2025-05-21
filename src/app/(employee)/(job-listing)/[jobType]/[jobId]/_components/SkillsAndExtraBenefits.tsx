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
    <div className={twMerge("sm:min-w-[447px] flex flex-col gap-6", className)}>
      <SkillsContainerComponent title="Skills" labels={skills} />
      <SkillsContainerComponent
        title="Extra Benefits"
        labels={extraBenefits
          .split(",")
          .filter((label) => label !== "")
          .map((label) => label.trim())}
      />
    </div>
  );
};

export default SkillsAndExtraBenefits;
