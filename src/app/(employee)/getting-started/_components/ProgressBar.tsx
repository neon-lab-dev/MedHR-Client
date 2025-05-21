"use client";
import { ICONS } from '@/assets';
import Image from 'next/image';
import React from 'react';

type TProgressBarProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
}

const ProgressBar: React.FC<TProgressBarProps> = ({ step, setStep, progress }) => {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={ICONS.leftArrow}
        alt="left arrow icon"
        className="size-10 cursor-pointer"
        onClick={() => {
          if (step > 1) {
            setStep(step - 1);
          }
        }}
      />
      <div className="w-full bg-neutral-50 rounded-full h-[14px] relative">
        <div
          className="bg-primary-500 h-[14px] rounded-[100px] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute right-2 -top-8 text-sm font-medium text-primary-500">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;