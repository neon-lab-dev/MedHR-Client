import React from "react";

const InterestedDepartmentDetails = ({ interestedDepartments }: { interestedDepartments: string[] }) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-[#37466D] capitalize">Interested Departments</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* interestedDepartments card */}
      <div className="flex flex-wrap gap-3 mt-4">
        {interestedDepartments.length > 0 ? (
          interestedDepartments.map((item, index) => (
            <div
              key={index}
              className="bg-[#37466D] rounded-[10px] px-5 py-[10px] text-[#F5F6FA] text-sm font-medium capitalize"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-[#717386]">No data added</p>
        )}
      </div>
    </div>
  );
};

export default InterestedDepartmentDetails;
