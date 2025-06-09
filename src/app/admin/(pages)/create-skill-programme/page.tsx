"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { departments } from "@/mockData/departments";
import dynamic from "next/dynamic";
import { TSkillFormData } from "@/app/employer/(home)/create-skill-programme/page";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";
import axiosInstance from "@/api/axiosInstance";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CreateSkillProgramme = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

   const editor = useRef(null);
  
    const [description, setDescription] = useState("");
    const [selectedProgrammeType, setSelectedProgrammeType] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [pricingType, setPricingType] = useState("");
    const [isIncludedCertificate, setIsIncludedCertificate] = useState("");
    const [contentError, setDescriptionError] = useState("");
  
    useEffect(() => {
      setDescriptionError("");
      if (description?.length === 0) {
        setDescriptionError("");
      } else if (description?.length < 1) {
        setDescriptionError("Course description is required");
      } else {
        setDescriptionError("");
      }
    }, [description]);

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<TSkillFormData>();


  const skillMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post(
        "/skills/create", 
        data, 
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillprogrammes"] });
      toast.success("Skill programme created successfully!");
      router.push("/admin/skill-programmes");
    },
    onError: () => {
      toast.error("Failed to create skill programme.");
    },
  });
  

  const handleCreateSkillProgramme = (data: TSkillFormData) => {
  
    const formData = new FormData();

    formData.append("skillProgrammeName", data.skillProgrammeName);
    formData.append("programmeOverview", data.programmeOverview);
    formData.append("programmeDescription", description || "");
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

    // Assuming image is uploaded
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
  
    toast.promise(
      skillMutation.mutateAsync(formData),
      {
        loading: 'Creating skill programme...',
        success: 'Skill programme created successfully!',
        error: 'Failed to create skill programme.',
      }
    );
  };
  

  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-[51px]">
      {/* Course Creation Form */}
      <form
        onSubmit={handleSubmit(handleCreateSkillProgramme)}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
      >
        <h3 className="text-xl font-semibold">Create Skill Programme</h3>

        <TextInput
          label="Skill Programme Name"
          placeholder="Enter skill programme name"
          error={errors.skillProgrammeName}
          {...register("skillProgrammeName", { required: "Skill programme name is required" })}
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
          options={["Offline", "Online", "Fellowship", "Scholarships", "Events"]}
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
          {...register("duration", { required: "Programme duration is required" })}
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
          label="Fees Type"
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
            Programme Description
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
          <label
            htmlFor="image"
            className="text-neutral-600 font-medium font-plus-jakarta-sans"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            className="bg-neutral-450 border border-neutral-550 rounded-[10px] px-4 py-2 focus:outline-none w-full"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-3 rounded-md cursor-pointer"
        >
         Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSkillProgramme;
