import OurValuableHiringPartners from "@/components/OurValuableHiringPartners";
import TrendingCourseToday from "@/components/TrendingCourseToday";
import WhatWeDo from "@/components/WhatWeDo";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="max-width-full h-[175px] md:h-[283px] lg:h-[310px] bg-[#F5F6FA] flex flex-col justify-center items-center ">
        <div className="flex justify-center items-center gap-[17px] mt-[20px] h-[40px] w-[154px] md:h-[71px] md:w-[260px] lg:h-[81px] lg:w-[293px]">
          <div className=" highlight">
            <p className="text-white font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              About
            </p>
          </div>
          <div>
            <p className="text-black font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              Us
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 2xl:px-0 mt-10">
        <p className="text-[#303D5C] text-[400] text-sm md:text-base lg:text-[20px] leading-[27px] md:leading-[33px] lg:leading-[36px] font-Poppins text-justify">
          &quot;MONCHI ENTERPRISE&quot; is an operator of the website
          “MeDHr+” and all of its different versions including mobile
          applications, print material, social media posts, etc. https://medhrplus.com is
          a bridge between career seekers/aspirants and employers (i.e.
          consultants/mentors, CEOs, HRs, etc.) where they meet together share
          their interest and requirements. The employers post their vacant
          positions i.e. skill programs, internships, courses, Jobs, etc., and
          career seekers (employees) can apply according to requirements as they
          fit for or according to their interests.
        </p>
        <br />
        <p className="text-[#303D5C] text-[400] text-sm md:text-base lg:text-[20px] leading-[27px] md:leading-[33px] lg:leading-[36px] font-Poppins text-justify">
          MeDHr+ does not take any responsibilities on behalf of any
          registered employers, (consultants, advisors, recruiters, colleges,
          institutions, guides/mentors, CEOs, HRs, etc.) if they mislead, fraud,
          cheat, or any type misguide any employees by their posts on MeDHr+
          site or any type of physical meet, it&#39;s advised to be careful on
          any type of money transactions/deal with registered employees on the
          above site, similarly, it’s also advised to registered career seekers,
          aspirants, or employees, be care full to choose registered employers
          for their future goal we are not responsible for any fraud or hide any
          required information not update on MeDHr+ website. MeDHr+ is just
          a platform like a bridge between both registered employees and
          employers, we facilitate/help them to get desired candidates as well
          as employers, but not responsible for any genuineness or authenticity.
        </p>
      </div>
      <TrendingCourseToday />
      <OurValuableHiringPartners />

      <WhatWeDo />
    </div>
  );
};

export default page;
