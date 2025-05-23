"use client";

import { getSingleSkill } from "@/api/admin";
import Loading from "@/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import { departments } from "@/mockData/departments";
import dynamic from "next/dynamic";
import api from "@/api";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export type SkillProgrammeFormData = {
  skillProgrammeName: string;
  programmeOverview: string;
  programmeDescription?: string;
  programmeType?:
    | "Offline"
    | "Online"
    | "Fellowship"
    | "Scholarships"
    | "Events";
  department: string;
  duration: string;
  desiredQualificationOrExperience?: string;
  programmeLink?: string;
  pricingType?: "Free" | "Paid";
  fee?: number;
  numberOfSeats?: number;
  isIncludedCertificate?: boolean;
  image: FileList;
};

const UpdateSkillProgrammeDashboard = ({
  id,
  navigatePath,
}: {
  id: string;
  navigatePath: string;
}) => {
  const router = useRouter();
  const [editExpanded, setEditExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Fetching data by id
  const { isLoading, data } = useQuery({
    queryKey: ["skillprogramme", id],
    queryFn: () => getSingleSkill(id),
  });

  const courseMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.put(`${api.updateSkill}/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["skillprogrammes"] });
      router.push(`${navigatePath}/skill-programmes`);
    },
    onError: () => {
      toast.error("Failed to update Course.");
    },
  });

  // Function to update skill programme
  const onSubmitCourse = (data: SkillProgrammeFormData) => {
    const formData = new FormData();
    formData.append("skillProgrammeName", data.skillProgrammeName);
    formData.append("programmeOverview", data.programmeOverview);
    formData.append("courseDescription", description || "");
    formData.append("programmeType", selectedProgrammeType);
    formData.append("department", selectedDepartment);
    formData.append("duration", data.duration);
    formData.append(
      "desiredQualificationOrExperience",
      data.desiredQualificationOrExperience || ""
    );
    formData.append("programmeLink", data.programmeLink || "");
    formData.append("pricingType", pricingType || "Free");
    formData.append("fee", String(data.fee ?? 0));
    formData.append("numberOfSeats", String(data.numberOfSeats ?? 0));
    formData.append(
      "isIncludedCertificate",
      String(isIncludedCertificate === "Yes" ? true : false)
    );

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    toast.promise(
      courseMutation.mutateAsync(formData).then(() => {
        router.push("/employer/skill-programmes");
      }),
      {
        loading: "Updating...",
        success: "Updated successfully!",
        error: "Failed to update.",
      }
    );
  };

  const editor = useRef(null);

  const [description, setDescription] = useState("");
  const [selectedProgrammeType, setSelectedProgrammeType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [isIncludedCertificate, setIsIncludedCertificate] = useState("");
  const [contentError, setDescriptionError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SkillProgrammeFormData>();

  //   Setting default values
  useEffect(() => {
    if (data?.skill) {
      setValue("skillProgrammeName", data.skill.skillProgrammeName || "");
      setValue("programmeOverview", data.skill.programmeOverview || "");
      setDescription(data.skill.programmeDescription || "");
      setSelectedProgrammeType(data.skill.programmeType);
      setSelectedDepartment(data.skill.department);
      setValue("duration", data.skill.duration || "");
      setValue(
        "desiredQualificationOrExperience",
        data.skill.desiredQualificationOrExperience || ""
      );
      setValue("programmeLink", data.skill.programmeLink || "");
      setPricingType(data.skill.pricingType);
      setValue("fee", data.skill.fee || 0);
      setValue("numberOfSeats", data.skill.numberOfSeats || 0);
      setIsIncludedCertificate(data.skill.isIncludedCertificate);
    }
  }, [data?.skill, setValue]);

  if (isLoading) return <Loading className="h-[60vh] w-full" />;

  return (
    <div className="w-full">
      <div className="bg-[#f5f6fa] p-6 flex flex-col gap-[51px]">
        {/* Skill programme Update Form */}
        <form
          onSubmit={handleSubmit(onSubmitCourse)}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
        >
          <TextInput
            label="Skill Programme Name"
            placeholder="Enter skill programme name"
            error={errors.skillProgrammeName}
            {...register("skillProgrammeName", {
              required: "Skill programme name is required",
            })}
          />
          <TextArea
            label="Programme Overview"
            placeholder="Write something about your skill programme"
            cols={4}
            rows={4}
            error={errors.programmeOverview}
            {...register("programmeOverview", {
              required: "Skill programme overview is required",
            })}
          />

          <DropdownInput
            label="Programme Type"
            options={[
              "Offline",
              "Online",
              "Fellowship",
              "Scholarships",
              "Events",
            ]}
            value={selectedProgrammeType}
            onChange={(e) => {
              setSelectedProgrammeType(e.target.value);
            }}
            error={errors.programmeType}
          />

          <DropdownInput
            label="Department"
            options={departments}
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
            }}
            error={errors.programmeType}
          />

          <TextInput
            label="Programme Duration"
            placeholder="ex- 3 Months"
            error={errors.duration}
            {...register("duration", {
              required: "Programme duration is required",
            })}
          />

          <TextArea
            label="Necessary Qualification or Experience"
            placeholder="What are you expecting from the students?"
            cols={4}
            rows={4}
            error={errors.desiredQualificationOrExperience}
            {...register("desiredQualificationOrExperience")}
            isRequired={false}
          />

          <TextInput
            label="Programme Link"
            placeholder="ex- https://mitraconsultancy.co.in/internship-programmes"
            error={errors.programmeLink}
            {...register("programmeLink")}
            isRequired={false}
          />

          <DropdownInput
            label="Pricing Type"
            options={["Free", "Paid"]}
            value={pricingType}
            onChange={(e) => {
              setPricingType(e.target.value);
            }}
            error={errors.programmeType}
          />

          {pricingType === "Paid" && (
            <TextInput
              label="Skill Programme Fee (₹)"
              type="number"
              placeholder="ex- 999"
              error={errors.fee}
              {...register("fee")}
              isRequired={false}
            />
          )}

          <TextInput
            label="Number Of Seats"
            type="number"
            placeholder="ex- 50"
            error={errors.numberOfSeats}
            {...register("numberOfSeats")}
            isRequired={false}
          />

          <DropdownInput
            label="Certificate Included?"
            options={["Yes", "No"]}
            value={isIncludedCertificate}
            onChange={(e) => {
              setIsIncludedCertificate(e.target.value);
            }}
            error={errors.isIncludedCertificate}
          />

          <div className="space-y-2 text-sm">
            <label
              htmlFor="Course Description"
              className="block text-zinc-700 font-medium"
            >
              Course Description
            </label>
            <JoditEditor
              ref={editor}
              value={description}
              onChange={(newContent) => setDescription(newContent)}
            />
            {contentError && (
              <span className="text-warning-10 text-start">{contentError}</span>
            )}
          </div>

          <div>
            {data?.skill?.thumbnail?.url ? (
              <div className="relative w-fit">
                <Image
                  src={data?.skill?.thumbnail?.url}
                  width={400}
                  height={400}
                  className="object-cover"
                  alt={data?.skill?.thumbnail?.name}
                />
                <div
                  onClick={() => setEditExpanded(!editExpanded)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg absolute top-2 right-2 cursor-pointer"
                >
                  Edit
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {editExpanded && (
            <div>
              <label
                className="text-neutral-600 font-medium font-plus-jakarta-sans"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                className="bg-neutral-450 border border-neutral-550 rounded-[10px] px-4 py-2 focus:outline-none w-full"
                {...register("image")}
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-3 rounded-md"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSkillProgrammeDashboard;
