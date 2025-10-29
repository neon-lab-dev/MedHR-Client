"use client";
import React from "react";
import HeroComponent from "./_components/HeroComponent";
// import TrendingToday from "../../../components/TrendingCourseToday";
import WhatWeDoComponent from "../../../components/WhatWeDo";
import OurValuableHiringPartners from "@/components/OurValuableHiringPartners";
import SkillProgrammes from "./_components/SkillProgrammes";
// import AvailableCourses from './_components/AvailableCourses';
import LatestJobs from "./_components/LatestJobs/LatestJobs";
import LatestInternships from "./_components/LatestInternships/LatestInternships";
// import Events from "./_components/Events";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroComponent />
      <SkillProgrammes/>
      {/* <TrendingToday /> */}
      <LatestJobs />
      <LatestInternships />
      {/* <AvailableCourses/> */}
      {/* <Events/> */}
      <OurValuableHiringPartners />
      <WhatWeDoComponent />
    </div>
  );
};

export default HomePage;
