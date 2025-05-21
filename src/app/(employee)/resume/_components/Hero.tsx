import React from "react";

const HeroComponent = () => {
  return (
    <div className="pt-20 pb-10 bg-secondary-50">
      <div className="max-width flex flex-col gap-28">
        <div className="flex flex-col items-center gap-5 justify-center text-center">
          <h1 className="text-secondary-950 text-5xl max-lg:text-3xl font-bold leading-[120%] tracking-[-1.28px]">
            Your{" "}<span className="highlight text-white">Resume</span> 
          </h1>
        </div>
      </div>
    </div>
  );
};
export default HeroComponent;
