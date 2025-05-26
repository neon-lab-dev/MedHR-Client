import { IMAGES } from "@/assets";
import Image from "next/image";
import React from "react";
import SectionHeading from "./Reusable/SectionHeading/SectionHeading";

const WhatWeDo = () => {
  return (
    <div className="py-section flex flex-col items-center justify-center gap-14 max-w-7xl mx-auto px-6 2xl:px-0 max-width font-plus-jakarta-sans">
      <SectionHeading
        highlightedText="Do?"
        normalText="What we"
        align="right"
      />
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
        {[
          {
            img:IMAGES.org,
            heading: "Platform provider ",
            desc: "Medhrplus is an online platform for “organisations” and “aspirants”, where both update their credentials and connect in between from their dedicated dashboards.",
          },
          {
            img:IMAGES.apr,
            heading: "For Aspirants ",
            desc: "Aspirants/students update their credentials and field of interest, and they can apply to their desired programs (skills, Internships, Jobs, courses, etc.) from their dashboard.",
          },
          {
            img:IMAGES.org,
            heading: "For Organisation ",
            desc: "Organizations/employers may post their programs/requirements and get registered aspirants by filtering their details according to their requirements.",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-80">
            <div className="rounded-2xl w-32 h-32">
              <Image src={item.img} alt="org" />
            </div>
            <h4 className="text-2xl font-extrabold text-secondary-950 capitalize">
              {item.heading}
            </h4>
            <p className="text-secondary-950 mt-2 text-justify">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
