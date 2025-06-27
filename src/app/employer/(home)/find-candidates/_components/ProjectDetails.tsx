"use client";

import { useState } from "react";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import Button from "@/components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { updateEmployeeProfile } from "@/api/employee";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { TProjectDetails } from "@/app/(employee)/getting-started/page";
import EditableAccordionForm from "@/app/(employee)/resume/_components/EditableAccordionForm";
import { convertDate } from "@/helpers/convertDate";

const ProjectDetails = ({
  projects,
  isEditable = false,
}: {
  projects: TProjectDetails[];
  isEditable?: boolean;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: TProjectDetails) => {
    setIsLoading(true);
    try {
      const updated = [...projects];
      if (addMode) {
        updated.push(formData);
      } else if (editIndex !== null) {
        updated[editIndex] = formData;
      }
      await updateEmployeeProfile({ projects: updated });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setAddMode(false);
      setEditIndex(null);
    } catch (err) {
      console.error("Project update failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const filtered = projects.filter((_, i) => i !== index);
      await updateEmployeeProfile({ projects: filtered });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (err) {
      console.error("Project delete failed", err);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#37466D]">
          Project Details
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

      {projects.length === 0 ? (
        <p className="text-gray-400">No projects added</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <div
              key={project._id || index}
              className="bg-white border border-[#F7F7F8] rounded-[20px] p-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-lg font-medium text-[#383842]">
                    {project.title}
                  </h1>
                  <p className="text-[#717386] mt-[2px]">
                    From {convertDate(project?.startDate as string)} - To{" "}
                    {convertDate(project?.endDate as string)}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-[#717386] mt-2 underline block hover:text-primary-500 w-fit"
                    >
                      {project.link}
                    </a>
                  )}
                  <p className="text-[#717386] mt-3">{project.description}</p>
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
                      <Image src={IMAGES.bin} alt="delete" className="size-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion for editing */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  editIndex === index
                    ? "max-h-[1000px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                {editIndex === index && (
                  <EditableAccordionForm
                    defaultValues={project}
                    editableFields={[
                      "title",
                      "description",
                      "link",
                      "startDate",
                      "endDate",
                    ]}
                    fieldLabels={{
                      title: "Project Title",
                      description: "Description",
                      link: "Project Link",
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new project form */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          addMode ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {addMode && (
          <EditableAccordionForm
            defaultValues={{
              title: "",
              description: "",
              link: "",
              startDate: "",
              endDate: "",
            }}
            editableFields={[
              "title",
              "description",
              "link",
              "startDate",
              "endDate",
            ]}
            fieldLabels={{
              title: "Project Title",
              description: "Description",
              link: "Project Link",
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
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
