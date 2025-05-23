"use client";
import { getSingleCourse } from "@/api/admin";
import Loading from "@/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";
import { departments } from "@/mockData/departments";
import dynamic from "next/dynamic";
import api from "@/api";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export type CourseFormData = {
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

const EditCourse = ({ id, navigatePath }: { id: string, navigatePath: string }) => {
  const router = useRouter();
  const [editExpanded, setEditExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Fetching data by id
  const { isLoading, data } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => getSingleCourse(id),
  });

  const courseMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.put(
        `${api.updateCourse}/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["employerCourses"] });
      router.push(`${navigatePath}/courses`);
    },
    onError: () => {
      toast.error("Failed to update Course.");
    },
  });

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

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    toast.promise(courseMutation.mutateAsync(formData), {
      loading: "Updating course...",
      success: "Course updated successfully!",
      error: "Failed to update course.",
    });
  };

  const editor = useRef(null);

  const [description, setDescription] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("");
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
    setValue,
  } = useForm<CourseFormData>();

  useEffect(() => {
    if (data?.course) {
      setValue("courseName", data.course.courseName || "");
      setValue("courseOverview", data.course.courseOverview || "");
      setDescription(data.course.courseDescription || "");
      setSelectedCourseType(data.course.courseType);
      setSelectedDepartment(data.course.department);
      setValue("duration", data.course.duration || "");
      setValue(
        "desiredQualificationOrExperience",
        data.course.desiredQualificationOrExperience || ""
      );
      setValue("courseLink", data.course.courseLink || "");
      setPricingType(data.course.pricingType);
      setValue("fee", data.course.fee || 0);
      setValue("numberOfSeats", data.course.numberOfSeats || 0);
      setIsIncludedCertificate(data.course.isIncludedCertificate);
    }
  }, [data?.course, setValue]);

  if (isLoading) return <Loading className="h-[60vh] w-full" />;

  return (
    <div className="w-full">
      <div className="bg-[#f5f6fa] p-6 flex flex-col gap-[51px]">
        {/* Course Update Form */}
        <form
          onSubmit={handleSubmit(onSubmitCourse)}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
        >
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
            {...register("duration", {
              required: "Course duration is required",
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
            label="Course Link"
            placeholder="ex- https://mitraconsultancy.co.in/internship-programmes"
            error={errors.courseLink}
            {...register("courseLink")}
            isRequired={false}
          />

          <DropdownInput
            label="Pricing Type"
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
            {data?.course?.thumbnail?.url ? (
              <div className="relative w-fit">
                <Image
                  src={data?.course?.thumbnail?.url}
                  width={400}
                  height={400}
                  className="object-cover"
                  alt={data?.course?.thumbnail?.name}
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

export default EditCourse;
