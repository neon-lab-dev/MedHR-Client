"use client";

import { convertDate } from "@/helpers/convertDate";
import { useState } from "react";
import Image from "next/image";
import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Button";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { updateEmployeeProfile } from "@/api/employee";
import { useQueryClient } from "@tanstack/react-query";
import EditableAccordionForm from "@/app/(employee)/resume/_components/EditableAccordionForm";

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

const EducationDetails = ({
  education,
  isEditable = false,
}: {
  education: TEducationDetails[];
  isEditable?: boolean;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: TEducationDetails) => {
    setIsLoading(true);
    try {
      const updatedEducation = [...education];

      if (addMode) {
        updatedEducation.push(formData); // Add new
      } else if (editIndex !== null) {
        updatedEducation[editIndex] = formData; // Update existing
      }

      await updateEmployeeProfile({ education: updatedEducation });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setEditIndex(null);
      setAddMode(false);
    } catch (error) {
      console.error("Failed to update education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    setIsLoading(true);
    try {
      const filtered = education.filter((_, i) => i !== index);
      await updateEmployeeProfile({ education: filtered });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (err) {
      console.error("Education data delete failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#37466D]">
          Education Details
        </h1>
        {isEditable && (
          <Button
            variant="natural"
            className="text-base bg-neutral-100 rounded-lg px-6 font-semibold py-2"
            onClick={() => {
              setAddMode(!addMode);
              setEditIndex(null);
            }}
          >
            Add More
          </Button>
        )}
      </div>

      <hr className="border border-[#F7F7F8] w-full" />

      {/* List of education cards */}
      <div className="flex flex-col gap-3">
        {education && education.length > 0 ? (
          education.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#F7F7F8] rounded-[20px] p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-lg font-medium text-[#383842]">
                    {item?.institutionName}, {item?.city}
                  </h1>
                  <p className="text-[#717386] mt-2">
                    {item?.courseName} | Grade {item?.grade}
                  </p>
                  <p className="text-[#717386] mt-[2px]">
                    {convertDate(item?.startDate as string)} -{" "}
                    {convertDate(item?.endDate as string)}
                  </p>
                </div>
                {isEditable && (
                  <div className="flex gap-4">
                    <button
                      className="text-primary-500 font-medium flex items-center gap-[6px] cursor-pointer"
                      onClick={() => {
                        setEditIndex((prev) => (prev === index ? null : index));
                        setAddMode(false);
                      }}
                    >
                      <Image
                        src={ICONS.penEdit}
                        alt="edit"
                        className="size-4"
                      />
                    </button>
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    >
                      {/* {isLoading && editIndex === index ? (
                        <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Image
                          src={IMAGES.bin}
                          alt="delete"
                          className="size-4"
                        />
                      )} */}
                      <Image
                          src={IMAGES.bin}
                          alt="delete"
                          className="size-4"
                        />
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion for editing this education */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  editIndex === index
                    ? "max-h-[1000px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <EditableAccordionForm
                  defaultValues={item}
                  editableFields={[
                    "institutionName",
                    "city",
                    "courseName",
                    "grade",
                    "startDate",
                    "endDate",
                  ]}
                  fieldLabels={{
                    institutionName: "Institution Name",
                    city: "City",
                    courseName: "Course Name",
                    grade: "Grade",
                    startDate: "Start Date",
                    endDate: "End Date",
                  }}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  customFieldRenderers={{
                    startDate: (register, errors) => (
                      <TextInput
                        label="Start Date"
                        type="month"
                        {...register("startDate")}
                        error={errors?.startDate}
                      />
                    ),
                    endDate: (register, errors) => (
                      <TextInput
                        label="End Date"
                        type="month"
                        {...register("endDate")}
                        error={errors?.endDate}
                      />
                    ),
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No education details added</p>
        )}
      </div>

      {/* Add New Accordion */}

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          addMode ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <EditableAccordionForm
          defaultValues={{
            institutionName: "",
            city: "",
            courseName: "",
            grade: "",
            startDate: "",
            endDate: "",
          }}
          editableFields={[
            "institutionName",
            "city",
            "courseName",
            "grade",
            "startDate",
            "endDate",
          ]}
          fieldLabels={{
            institutionName: "Institution Name",
            city: "City",
            courseName: "Course Name",
            grade: "Grade",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          customFieldRenderers={{
            startDate: (register, errors) => (
              <TextInput
                label="Start Date"
                type="date"
                {...register("startDate")}
                error={errors?.startDate}
              />
            ),
            endDate: (register, errors) => (
              <TextInput
                label="End Date"
                type="date"
                {...register("endDate")}
                error={errors?.endDate}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default EducationDetails;
