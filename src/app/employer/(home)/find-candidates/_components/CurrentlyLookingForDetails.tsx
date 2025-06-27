import React from "react";

const CurrentlyLookingForDetails = ({ currentlyLookingFor }: { currentlyLookingFor: string[] }) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-[#37466D] capitalize">Currently looking for</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* currentlyLookingFor card */}
      <div className="flex flex-wrap gap-3 mt-4">
        {currentlyLookingFor.length > 0 ? (
          currentlyLookingFor.map((item, index) => (
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

export default CurrentlyLookingForDetails;
