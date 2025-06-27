import React from "react";

const OrganizationInterestedIn = ({ interestedOrganizations }: { interestedOrganizations: string[] }) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-[#37466D] capitalize">Organization you are interested in</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* interestedOrganizations card */}
      <div className="flex flex-wrap gap-3 mt-4">
        {interestedOrganizations.length > 0 ? (
          interestedOrganizations.map((interestedOrganizations, index) => (
            <div
              key={index}
              className="bg-[#37466D] rounded-[10px] px-5 py-[10px] text-[#F5F6FA] text-sm font-medium capitalize"
            >
              {interestedOrganizations}
            </div>
          ))
        ) : (
          <p className="text-[#717386]">No data added</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationInterestedIn;
