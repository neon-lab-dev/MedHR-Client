import OurValuableHiringPartners from "@/components/OurValuableHiringPartners";
import TrendingCourseToday from "@/components/TrendingCourseToday";
import WhatWeDo from "@/components/WhatWeDo";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="max-width-full h-[175px] md:h-[283px] lg:h-[310px] bg-[#F5F6FA] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-[17px] mt-[20px] h-[40px] w-[229px] md:h-[71px] md:w-[390px] lg:h-[81px] lg:w-[441px]">
          <div className="highlight">
            <p className="text-white font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              Refund
            </p>
          </div>
          <div>
            <p className="text-black font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              Policy
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 2xl:px-0 mt-10">
        <p className="text-[#303D5C] text-[400] text-sm md:text-base lg:text-[20px] leading-[27px] md:leading-[33px] lg:leading-[36px] font-Poppins text-justify">
          All the monetary transactions done by the user of the site are in lieu
          of the payment gateway partner of Monchi Enterprise (https://medhrplus.com),
          and we take no responsibility for any payment discrepancies to the
          other agency/ user account. Also, we have full right to consider and
          review the refund case, if the amount paid by the user is in excess.
          Also, you are required to note your Transaction ID and receipt no. as
          provided by the payment gateway to furnish any information or track
          the payment status of your application form.
        </p>
      </div>
      <TrendingCourseToday />
      <OurValuableHiringPartners />
      <WhatWeDo />
    </div>
  );
};

export default page;
