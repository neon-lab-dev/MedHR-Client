"use client";

import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/assets";
import { updateEmployeeProfile } from "@/api/employee";
import { useQueryClient } from "@tanstack/react-query";
import EditableAccordionForm from "@/app/(employee)/resume/_components/EditableAccordionForm";

const GuardianDetails = ({ guardianDetails }: { guardianDetails: any }) => {
  const [showAccordion, setShowAccordion] = useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    {
      title: "Guardian Name",
      data: guardianDetails?.guardianName,
    },
    {
      title: "Guardian Occupation",
      data: guardianDetails?.occupation,
    },
    {
      title: "Guardian Phone Number",
      data: guardianDetails?.phoneNumber,
    },
  ];

  const handleUpdate = async (updatedData: any) => {
    setIsLoading(true);
    try {
      const payload = {
        guardian: {
          ...guardianDetails,
          ...updatedData,
        },
      };

      await updateEmployeeProfile(payload);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setShowAccordion(false);
    } catch (err) {
      console.error("Error updating guardian details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">
        Guardian Details
      </h1>
      <hr className="border border-[#F7F7F8] w-full" />

      <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5">
        {data.length === 0 ? (
          <p className="text-gray-400">No data added</p>
        ) : (
          <div className="flex justify-between gap-3 items-start md:items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 flex-1">
              {data.map((data, index) => (
                <div key={index}>
                  <h1 className="text-lg font-medium text-[#383842]">
                    {data.title}
                  </h1>
                  <p className="text-[#717386] mt-2 capitalize">{data.data}</p>
                </div>
              ))}
            </div>
            <button
              className="text-primary-500 font-medium flex items-center gap-[6px] cursor-pointer"
              onClick={() => setShowAccordion((prev) => !prev)}
            >
              Edit
              <Image src={ICONS.penEdit} alt="edit" className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Editable Accordion */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showAccordion
            ? "max-h-[1000px] opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <EditableAccordionForm
          defaultValues={guardianDetails}
          editableFields={["guardianName", "occupation", "phoneNumber"]}
          fieldLabels={{
            guardianName: "Guardian Name",
            occupation: "Guardian Occupation",
            phoneNumber: "Guardian Phone Number",
          }}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GuardianDetails;
