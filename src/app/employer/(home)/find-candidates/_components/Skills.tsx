import React from "react";

const Skills = ({ skills }: { skills: string[] }) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">Skills</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* Skills card */}
      <div className="flex flex-wrap gap-3 mt-4">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div
              key={index}
              className="bg-[#37466D] rounded-[10px] px-5 py-[10px] text-[#F5F6FA] text-sm font-medium capitalize"
            >
              {skill}
            </div>
          ))
        ) : (
          <p className="text-[#717386]">No skills added</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
