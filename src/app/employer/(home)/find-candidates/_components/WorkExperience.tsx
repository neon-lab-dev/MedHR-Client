"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { convertDate } from "@/helpers/convertDate";
import { updateEmployeeProfile } from "@/api/employee";
import Button from "@/components/Button";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import { TWorkExperience } from "@/app/(employee)/getting-started/page";
import AddUpdateExperience from "@/app/(employee)/resume/_components/AddUpdateExperience";

const WorkExperience = ({ experiences }: { experiences: TWorkExperience[] }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: TWorkExperience) => {
    setIsLoading(true);
    try {
      const updated = [...experiences];
      if (addMode) {
        updated.push(formData);
      } else if (editIndex !== null) {
        updated[editIndex] = formData;
      }
      await updateEmployeeProfile({ experience: updated });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setAddMode(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const filtered = experiences.filter((_, i) => i !== index);
      await updateEmployeeProfile({ experience: filtered });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#37466D]">Work Experience</h1>
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
      </div>

      <hr className="border border-[#F7F7F8] w-full" />

      {experiences.length === 0 ? (
        <p className="text-gray-400">No work experience added</p>
      ) : (
        experiences.map((exp, index) => (
          <div
            key={exp?._id || index}
            className="bg-white border border-[#F7F7F8] rounded-[20px] p-5"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-lg font-medium text-[#383842]">
                  {exp?.designation} @{exp?.companyName}
                </h1>
                <p className="text-[#717386] mt-2">
                  {convertDate(exp?.startDate || "")} -{" "}
                  {convertDate(exp?.endDate || "")} | {exp?.workType}
                </p>
                <p className="text-[#717386] mt-2">{exp?.description}</p>
                <h1 className="text-lg font-medium text-[#383842] mt-5">Projects</h1>
                <div className="flex flex-col gap-1 mt-1">
                  {exp?.projectLinks && exp.projectLinks.length > 0 ? (
                    exp.projectLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="size-[8px] rounded-full bg-[#717386]"></div>
                        <a
                          href={link}
                          target="_blank"
                          className="text-[#717386] hover:underline"
                        >
                          {link}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No project added</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="cursor-pointer text-primary-500 font-medium flex items-center gap-[6px]"
                  onClick={() => {
                    setEditIndex((prev) => (prev === index ? null : index));
                    setAddMode(false);
                  }}
                >
                  <Image src={ICONS.penEdit} alt="edit" className="size-4" />
                </button>
                <button
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  <Image src={IMAGES.bin} alt="delete" className="size-4" />
                </button>
              </div>
            </div>

            {/* Accordion for edit */}
            <div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    editIndex === index ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
  }`}
>
  {editIndex === index && (
    <AddUpdateExperience
      initialData={exp}
      onSubmit={(formData) => handleSubmit(formData)}
      onCancel={() => setEditIndex(null)}
      isLoading={isLoading}
    />
  )}
</div>

  <div
    className={`transition-all duration-500 ease-in-out overflow-hidden ${
      addMode ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
    }`}
  >
    <AddUpdateExperience
      initialData={{
        designation: "",
        companyName: "",
        companyLocation: "",
        description: "",
        projectLinks: [],
        workType: "",
        startDate: "",
        endDate: "",
      }}
      onSubmit={handleSubmit}
      onCancel={() => setAddMode(false)}
      isLoading={isLoading}
    />
  </div>


          </div>
        ))
      )}
    </div>
  );
};

export default WorkExperience;
