import { useParams } from "next/navigation";
import React from "react";

type TMonthlyStipendProps = {
  monthlyStipend: number;
  setMonthlyStipend: (stipend: number) => void;
};

const MonthlyStipend: React.FC<TMonthlyStipendProps> = ({
  monthlyStipend,
  setMonthlyStipend,
}) => {
  // Monthly stipend slider
  const maxRange = 20000;
  const stepSize = 5000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyStipend(Number(e.target.value));
  };

  const { jobType } = useParams();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-neutral-960 text-base font-medium">
        Monthly {jobType === "jobs" ? "Salary" : "Stipend"}
      </label>
      <div className="relative w-full">
        <input
          type="range"
          min={0}
          value={monthlyStipend}
          onChange={handleChange}
          step={stepSize}
          max={maxRange}
          className="w-full h-[10px] bg-secondary-100 rounded-lg appearance-none cursor-pointer"
        />
        <div className=" flex justify-between text-secondary-400 text-xs font-medium">
          <span>0</span>
          <span>5K</span>
          <span>10K</span>
          <span>15K</span>
          <span>20K</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStipend;
