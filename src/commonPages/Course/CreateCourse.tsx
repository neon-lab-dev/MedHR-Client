"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";
import { departments } from "@/mockData/departments";
import dynamic from "next/dynamic";
import api from "@/api";
import axiosInstance from "@/api/axiosInstance";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type CourseFormData = {
  courseName: string;
  courseOverview: string;
  courseDescription?: string;
  courseType: "Certificate" | "Diploma" | "Bachelor" | "Master";
  department: string;
  duration: string;
  desiredQualificationOrExperience?: string;
  courseLink?: string;
  pricingType?: "Free" | "Paid";
  fee?: number;
  numberOfSeats?: number;
  isIncludedCertificate?: boolean;
  image: FileList;
};

const CreateCourse = ({ navigatePath }: { navigatePath: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editor = useRef(null);

  const [description, setDescription] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [isIncludedCertificate, setIsIncludedCertificate] = useState("");
  const [contentError, setDescriptionError] = useState("");

//   Handeling description error
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
  } = useForm<CourseFormData>();

//   Create course function
  const courseMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post(api.createCourse, data ,{
      withCredentials: true,
    });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      router.push(`${navigatePath}/courses`);
    },
    onError: () => {
      toast.error("Failed to create course.");
    },
  });

  // Function to create course
  const onSubmitCourse = (data: CourseFormData) => {
    const formData = new FormData();

    formData.append("courseName", data.courseName);
    formData.append("courseOverview", data.courseOverview);
    formData.append("courseDescription", description || "");
    formData.append("courseType", selectedCourseType);
    formData.append("department", selectedDepartment);
    formData.append("duration", data.duration);
    formData.append(
      "desiredQualificationOrExperience",
      data.desiredQualificationOrExperience || ""
    );
    formData.append("courseLink", data.courseLink || "");
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

    toast.promise(courseMutation.mutateAsync(formData), {
      loading: "Creating course...",
      success: "Course created successfully!",
      error: "Failed to create course.",
    });
  };

  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-[51px]">
      {/* Course Creation Form */}
      <form
        onSubmit={handleSubmit(onSubmitCourse)}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
      >
        <h3 className="text-xl font-semibold">Create Course</h3>

        <TextInput
          label="Course Name"
          placeholder="Enter course name"
          error={errors.courseName}
          {...register("courseName", { required: "Course name is required" })}
        />
        <TextArea
          label="Course Overview"
          placeholder="Write something about your course"
          cols={4}
          rows={4}
          error={errors.courseOverview}
          {...register("courseOverview", {
            required: "Course overview is required",
          })}
        />

        <DropdownInput
          label="Course Type"
          options={["Certificate", "Diploma", "Bachelor", "Master"]}
          value={selectedCourseType}
          onChange={(e) => {
            setSelectedCourseType(e.target.value);
          }}
          error={errors.courseType}
        />

        <DropdownInput
          label="Department"
          options={departments}
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
          }}
          error={errors.courseType}
        />

        <TextInput
          label="Course Duration"
          placeholder="ex- 3 Months"
          error={errors.duration}
          {...register("duration", { required: "Course duration is required" })}
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
          label="Course Link"
          placeholder="ex- https://mitraconsultancy.co.in/internship-programmes"
          error={errors.courseLink}
          {...register("courseLink")}
          isRequired={false}
        />

        <DropdownInput
          label="Fees Type"
          options={["Free", "Paid"]}
          value={pricingType}
          onChange={(e) => {
            setPricingType(e.target.value);
          }}
          error={errors.courseType}
        />

        {pricingType === "Paid" && (
          <TextInput
            label="Course Fee (₹)"
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
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
