/* eslint-disable react/no-unescaped-entities */
import OurValuableHiringPartners from "@/components/OurValuableHiringPartners";
import TrendingCourseToday from "@/components/TrendingCourseToday";
import WhatWeDo from "@/components/WhatWeDo";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="max-width-full h-[175px] md:h-[283px] lg:h-[310px] bg-[#F5F6FA] flex flex-col justify-center items-center font-plus-jakarta-sans">
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
        <p className="text-[#303D5C] text-sm md:text-base lg:text-[20px] leading-[27px] md:leading-[33px] lg:leading-[36px] font-Poppins text-justify">
          All monetary transactions conducted by site users are facilitated
          through the payment gateway partner of Monchi Enterprise
          <strong>(https://medhrplus.com)</strong>, and we take no
          responsibility for any payment discrepancies with the other agency/
          user account. Additionally, we reserve the right to consider and
          review refund cases if the amount paid by the user exceeds the
          original amount. Also, you are required to note your Transaction ID
          and receipt no as provided by the payment gateway to furnish any
          information or track the payment status of your application form.
          <br />
          
          Secondly, a missing policy is not required on the website as we are
          not selling any product; we are charging only a yearly membership fee,
          and registered employer may charge their required amount directly in
          their account.
        </p>

        <h1 className="text-xl lg:text-2xl font-bold mt-5 lg:mt-10">
          Cancellation Policy{" "}
        </h1>
        <p className="text-[#303D5C] text-sm md:text-base lg:text-[20px] leading-[27px] md:leading-[33px] lg:leading-[36px] font-Poppins text-justify mt-3">
          The Consumer Protection Act, 2019, and the Indian Contract Act, 1872.
          Because of the need for fairness and transparency, we have framed the
          refund and cancellation policy as we are charging registration fees
          from aspirants to search and apply for their desired program/programs.
          We are not liable to refund the registration charges after three
          months of registration or after applying to even a single program by
          the aspirants.
          <br />
          <br />
          If we cancel registration of any aspirant in any unforeseen
          circumstances at any point in time, we will refund 100% of the charged
          amount within 2 to 3 working days. Some charges, such as
          administrative fees, setup costs, or third-party expenses, may be
          explicitly stated as non-refundable.
          <br />
          <br />
          Aspirants may contact directly to the company's customer support or
          grievance officer at{" "}
          <a href="mailto:info@medhrplus.com" className="font-semibold underline text-primary-500">info@medhrplus.com</a>
        </p>
      </div>
      <TrendingCourseToday />
      <OurValuableHiringPartners />
      <WhatWeDo />
    </div>
  );
};

export default page;
