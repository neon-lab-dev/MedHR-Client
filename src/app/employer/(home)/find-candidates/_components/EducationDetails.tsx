import { convertDate } from "@/helpers/convertDate";
import React from "react";

type TEducationDetails = {
  _id?: string;
  city?: string;
  courseName?: string;
  designation?: string;
  endDate?: string;
  grade?: string;
  institutionName?: string;
  startDate?: string;
};


const EducationDetails = ({education} : {education:TEducationDetails[]}) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">
        Education Details
      </h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* Education card */}
      <div className="flex flex-col gap-3">
      {
        education?.length > 0 ?
        education?.map((education:TEducationDetails, index:number) => 
          <div key={index} className="bg-white border border-[#F7F7F8] rounded-[20px] p-5">
        <h1 className="text-lg font-medium text-[#383842]">
          {education?.institutionName}
        </h1>
        <p className="text-[#717386] mt-2">
        {education?.designation} | {education?.courseName} | Grade {education?.grade}
        </p>
        <p className="text-[#717386] mt-[2px]">{convertDate(education?.startDate as string)} - {convertDate(education?.endDate as string)}</p>
      </div>
        )
        :
        "No education details added"
      }
      </div>
    </div>
  );
};

export default EducationDetails;
