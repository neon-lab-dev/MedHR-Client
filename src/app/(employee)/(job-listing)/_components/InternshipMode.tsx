import { useParams } from "next/navigation";
import React from "react";

type TInternshipModeProps = {
  selectedMode: string;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
};

const InternshipMode: React.FC<TInternshipModeProps> = ({
  selectedMode,
  setSelectedMode,
}) => {
  const { jobType } = useParams();
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="" className="text-neutral-960 text-base font-medium">
        {jobType === "jobs" ? "Job" : "Internship"} Mode
      </label>

      <div className="flex items-center gap-6">
        {/* Radio select for remote internship */}
        <div className="flex items-center gap-[6px]">
          <input
            type="radio"
            name="internship-mode"
            id="remote-internship"
            value="Remote Internship"
            className="radio radio-error border-[2px] border-neutral-970"
            checked={selectedMode === "Remote"}
            onChange={() => {
              setSelectedMode("Remote");
            }}
          />
          <label
            htmlFor="remote-internship"
            className="text-sm font-medium text-secondary-650 cursor-pointer"
          >
            Remote
          </label>
        </div>

        {/* Radio select for on-field internship */}
        <div className="flex items-center gap-[6px]">
          <input
            type="radio"
            name="internship-mode"
            id="on-field-internship"
            value="On-Field Internship"
            className="radio radio-error border-[2px] border-neutral-970"
            checked={selectedMode === "Onsite"}
            onChange={() => {
              setSelectedMode("Onsite");
            }}
          />
          <label
            htmlFor="on-field-internship"
            className="text-sm font-medium text-secondary-650 cursor-pointer"
          >
            On-Field
          </label>
        </div>

        {/* Hybrid */}
        <div className="flex items-center gap-[6px]">
          <input
            type="radio"
            name="internship-mode"
            id="hybrid-internship"
            value="Hybrid Internship"
            className="radio radio-error border-[2px] border-neutral-970"
            checked={selectedMode === "Hybrid"}
            onChange={() => {
              setSelectedMode("Hybrid");
            }}
          />
          <label
            htmlFor="hybrid-internship"
            className="text-sm font-medium text-secondary-650 cursor-pointer"
          >
            Hybrid
          </label>
        </div>
      </div>
    </div>
  );
};

export default InternshipMode;
