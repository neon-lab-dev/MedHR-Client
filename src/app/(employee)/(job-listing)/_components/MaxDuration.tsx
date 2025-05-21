import React from "react";

type TMaxDurationProps = {
  duration: number;
  setDuration: (duration: number) => void;
};

const MaxDuration: React.FC<TMaxDurationProps> = ({
  duration,
  setDuration,
}) => {
  // Max duration slider

  const maxStep = 6;

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stepValue = Number(e.target.value);
    setDuration(stepValue + 1);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-neutral-960 text-base font-medium">
        Duration
        <span className="text-secondary-400 text-xs  ml-2">
          (in months)
        </span>
      </label>
      <div className="relative w-full">
        <input
          type="range"
          min={0}
          max={maxStep - 1}
          value={duration - 1}
          onChange={handleDurationChange}
          className="w-full h-[10px] bg-secondary-100 rounded-lg appearance-none cursor-pointer"
        />
        <div className=" flex justify-between text-secondary-400 text-xs font-medium">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>
    </div>
  );
};

export default MaxDuration;
