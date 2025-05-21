import React from "react";

const SkillChipComponent = ({ label }: { label: string }) => {
  return (
    <div className="border border-secondary-200 rounded-[100px] font-medium text-secondary-400 text-sm px-4 py-2">
      {label}
    </div>
  );
};

export default SkillChipComponent;
