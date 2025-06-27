"use client";

import { updateEmployeeProfile } from "@/api/employee";
import EditableAccordionForm from "@/app/(employee)/resume/_components/EditableAccordionForm";
import { ICONS } from "@/assets";
import SelectDropdownInput from "@/components/Reusable/SelectDropdownInput/SelectDropdownInput";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

type PersonalDetailsProps = {
  personalDetails: {
    email: string;
    mobilenumber: string;
    dob: string;
    designation: string;
  };
  isEditable?: boolean;
};

const PersonalDetails = ({
  personalDetails,
  isEditable = false,
}: PersonalDetailsProps) => {
  const queryClient = useQueryClient();
  const [showAccordion, setShowAccordion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isEditable);

  const data = [
    {
      title: "Email",
      data: personalDetails?.email,
    },
    {
      title: "Mobile Number",
      data: personalDetails?.mobilenumber,
    },
    {
      title: "Date of Birth",
      data: personalDetails?.dob,
    },
    {
      title: "Designation",
      data: personalDetails?.designation,
    },
  ];

  const handleUpdate = async (updatedData: any) => {
    setIsLoading(true);
    try {
      const res = await updateEmployeeProfile(updatedData);
      console.log("Profile updated:", res);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setShowAccordion(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">
        Personal Details
      </h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* Details card */}
      <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5">
        {data.length === 0 ? (
          <p className="text-gray-400">No data added</p>
        ) : (
          <div className="flex items-start justify-between gap-3 md:items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 flex-1">
              {data.map((data, index) => (
                <div key={index}>
                  <h1 className="text-lg font-medium text-[#383842]">
                    {data.title}
                  </h1>
                  <p className="text-[#717386] mt-2">{data.data}</p>
                </div>
              ))}
            </div>

            {isEditable && (
              <button
                className="text-primary-500 font-medium flex items-center gap-[6px] cursor-pointer"
                onClick={() => setShowAccordion((prev) => !prev)}
              >
                Edit
                <Image src={ICONS.penEdit} alt="edit" className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reusable Form with Animation */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showAccordion
            ? "max-h-[1000px] opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <EditableAccordionForm
          defaultValues={personalDetails}
          editableFields={["mobilenumber", "dob", "designation"]}
          fieldLabels={{
            mobilenumber: "Mobile Number",
            dob: "Date of Birth",
            designation: "Designation",
          }}
          onSubmit={handleUpdate}
          isLoading={isLoading}
          customFieldRenderers={{
            designation: (register, errors) => (
              <SelectDropdownInput
                label="Designation"
                options={["Student", "Working Professional"]}
                {...register("designation")}
                error={errors.designation}
              />
            ),
            dob: (register, errors) => (
              <TextInput
                label="Date of Birth"
                type="date"
                {...register("dob")}
                error={errors.dob}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
