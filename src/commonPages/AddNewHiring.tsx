import api from "@/api";
import axiosInstance from "@/api/axiosInstance";
import { ICONS } from "@/assets";
import Button from "@/components/Button";
import SelectDropdownInput from "@/components/Reusable/SelectDropdownInput/SelectDropdownInput";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { departments } from "@/mockData/departments";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";

type FormData = {
  title: string;
  description: string;
  requirements: string;
  requiredSkills: string;
  responsibilities: string;
  locationType: string;
  country: string;
  city: string;
  employmentType: string;
  employmentTypeCategory: string;
  employmentDuration: number;
  department: string;
  typeOfOrganization: string;
  salary: number;
  applicationDeadline: string;
  extraBenefits: string;
  experience: string;
};

const AddNewHiring = ({
  path,
  jobType,
  defaultValues,
  isLoading,
  actionType = "add",
  backNavigationPath,
}: {
  path: string;
  jobType: string;
  defaultValues?: any;
  isLoading?: boolean;
  actionType?: string;
  backNavigationPath?: string;
}) => {
  // Function to format form data
  const formatFormData = (data: FormData) => {
    const { requiredSkills, ...restData } = data;
    return {
      ...restData,
      requiredSkills: requiredSkills.split(",").map((skill) => skill.trim()),
    };
  };

  // const createJobRequest = async (data: FormData) => {
  //   const payload = formatFormData(data);
  //   const response = await axiosInstance.post(api.creatrjob, payload, {
  //     withCredentials: true,
  //   });

  //   if (response.status !== 201) {
  //     throw new Error("Failed to create job");
  //   }
  //   return response.data;
  // };
  // const useCreateJobMutation = (): UseMutationResult<any, Error, FormData> => {
  //   const router = useRouter();
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationFn: createJobRequest,
  //     onSuccess: () => {
  //       toast.success(`${jobType.toUpperCase()} created successfully`);
  //       queryClient.invalidateQueries({ queryKey: ["jobs-employer-job"] });
  //       queryClient.invalidateQueries({ queryKey: ["jobs"] });

  //       const navigateRoute = jobType === "job" ? "jobs" : "internships";
  //       router.push(`${path}/${navigateRoute}`);
  //     },
  //     onError: (error: Error) => {
  //       console.error("Error creating job:", error);
  //       toast.error(error.message || "Failed to create job");
  //     },
  //   });
  // };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const jobRequest = async ({
  data,
  actionType,
  id,
}: {
  data: FormData;
  actionType: "add" | "edit";
  id?: string;
}) => {
  const payload = formatFormData(data);

  if (actionType === "add") {
    const response = await axiosInstance.post(api.creatrjob, payload, {
      withCredentials: true,
    });
    if (response.status !== 201) {
      throw new Error("Failed to create job");
    }
    return response.data;
  } else {
    if (!id) throw new Error("Job ID is required for update");

    const response = await axiosInstance.put(`${api.job}/${id}`, payload, {
      withCredentials: true,
    });
    if (response.status !== 200) {
      throw new Error("Failed to update job");
    }
    return response.data;
  }
};



  const useJobMutation = (
  jobType: "job" | "internship" | string,
  actionType: "add" | "edit" | string,
  path: string
): UseMutationResult<any, Error, any> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, actionType, id }) =>
      jobRequest({ data, actionType, id }),

    onSuccess: () => {
      toast.success(
        `${jobType.toUpperCase()} ${
          actionType === "add" ? "created" : "updated"
        } successfully`
      );

      queryClient.invalidateQueries({ queryKey: ["jobs-employer-job"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });

      const navigateRoute = jobType === "job" ? "jobs" : "internships";
      router.push(`${path}/${navigateRoute}`);
    },

    onError: (error: Error) => {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong");
    },
  });
};

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (key === "applicationDeadline" && typeof value === "string") {
          const date = new Date(value);
          const formattedDate = date.toISOString().split("T")[0];
          setValue(key as keyof FormData, formattedDate, {
            shouldValidate: true,
          });
        } else if (Array.isArray(value)) {
          setValue(key as keyof FormData, value.join(", "), {
            shouldValidate: true,
          });
        } else if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            setValue(`${key}.${nestedKey}` as keyof FormData, nestedValue, {
              shouldValidate: true,
            });
          });
        } else {
          setValue(key as keyof FormData, value as string | number, {
            shouldValidate: true,
          });
        }
      });
    }
  }, [defaultValues, setValue]);

  const mutation = useJobMutation(jobType, actionType, path);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate({ data: data, actionType, id: defaultValues?._id });
  };

  const validLocationTypes = ["Remote", "Onsite", "Hybrid"];
  const validEmploymentTypes = ["Job"];
  const jobTypes = ["Full-Time", "Part-Time", "Contract"];
  const internshipEmploymentTypes = ["Internship"];
  const internshipTypes = ["Shadow Internship", "Practice Internship"];

  const organizationType = [
    "Allopathy Hospital",
    "Allopathy Clinic",
    "Ayurveda Hospital",
    "Ayurveda Clinic",
    "Homeopathy Hospital",
    "Homeopathy Clinic",
    "Nursing Home",
    "Diagnostic Centers",
    "Imaging Centers",
  ];
  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col font-plus-jakarta-sans">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto min-h-screen">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link href={`${path}/${backNavigationPath}`}>
              <Image src={ICONS.leftArrow} alt={""} className="size-7" />
            </Link>
            <h1 className="text-neutral-950 text-xl font-bold">
              {actionType === "add" ? "Add New Hiring" : "Update Details"}
            </h1>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Oval
              height={40}
              width={40}
              color="#F9533A"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#f4f4f4"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-8"
          >
            {/* Title */}
            <TextInput
              label={jobType === "job" ? "Job Title" : "Internship Title"}
              placeholder="e.g., Healthcare Operations Project Manager"
              error={errors.title}
              {...register("title", {
                required: `${
                  jobType === "job" ? "Job Title" : "Internship Title"
                } is required`,
              })}
            />

            {/* Description */}
            <TextArea
              label={
                jobType === "job" ? "Job Description" : "Internship Description"
              }
              placeholder="e.g., Oversee operational projects within healthcare facilities..."
              rows={4}
              cols={4}
              error={errors.description}
              {...register("description", {
                required: `${
                  jobType === "job"
                    ? "Job Description"
                    : "Internship Description"
                } is required`,
              })}
            />

            {/* Requirements */}
            <TextArea
              label="Requirements"
              placeholder="e.g., Experience in healthcare operations and project management."
              rows={4}
              cols={4}
              error={errors.requirements}
              {...register("requirements", {
                required: "Requirements are required",
              })}
            />

            {/* Qualification Required */}
            <TextArea
              label="Qualification Required (comma-separated)"
              placeholder="e.g., Healthcare Operations, Project Management"
              rows={4}
              cols={4}
              error={errors.requiredSkills}
              {...register("requiredSkills", {
                required: "Required skills are required",
              })}
            />

            {/* Roles and Responsibilities */}
            <TextArea
              label="Roles and Responsibilities"
              placeholder="e.g., Implement process improvements and manage operational projects..."
              rows={4}
              cols={4}
              error={errors.responsibilities}
              {...register("responsibilities", {
                required: "Roles and responsibilities are required",
              })}
            />

            <div className="flex justify-center gap-6">
              <SelectDropdownInput
                label="Location Type"
                {...register("locationType", {
                  required: "Location type is required",
                })}
                error={errors?.locationType}
                options={validLocationTypes}
                isRequired={true}
              />

              <TextInput
                label="Country"
                placeholder="e.g., India"
                error={errors.country}
                {...register("country", { required: "Country is required" })}
              />

              <TextInput
                label="City"
                placeholder="e.g., Bangalore"
                error={errors.city}
                {...register("city", { required: "City is required" })}
              />
            </div>

            <div className="flex justify-center gap-6 w-full">
              <SelectDropdownInput
                label="Employment Type"
                {...register("employmentType", {
                  required: "Employment type is required",
                })}
                error={errors?.employmentType}
                options={
                  jobType === "job"
                    ? validEmploymentTypes
                    : internshipEmploymentTypes
                }
                isRequired={true}
              />

              <SelectDropdownInput
                label="Job Type"
                {...register("employmentTypeCategory", {
                  required: "Job type is required",
                })}
                error={errors?.employmentTypeCategory}
                options={jobType === "job" ? jobTypes : internshipTypes}
                isRequired={true}
              />

              <TextInput
                label="Employment Duration (years)"
                type="number"
                placeholder="e.g., 3"
                error={errors.employmentDuration}
                {...register("employmentDuration", {
                  required: "Employment duration is required",
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="flex justify-center gap-6 w-full">
              <SelectDropdownInput
                label="Type of Organization"
                {...register("typeOfOrganization", {
                  required: "Organization type is required",
                })}
                error={errors?.typeOfOrganization}
                options={organizationType}
                isRequired={true}
              />

              <SelectDropdownInput
                label="Department"
                {...register("department", {
                  required: "Department is required",
                })}
                error={errors?.department}
                options={departments}
                isRequired={true}
              />
            </div>

            <div className="flex justify-center gap-6">
              <TextInput
                label="Salary"
                type="number"
                placeholder="e.g., 10000000"
                error={errors.salary}
                {...register("salary", {
                  required: "Salary is required",
                  valueAsNumber: true,
                })}
              />

              <TextInput
                label="Application Deadline"
                type="date"
                error={errors.applicationDeadline}
                {...register("applicationDeadline", {
                  required: "Application deadline is required",
                })}
              />
            </div>
            <div className="flex justify-center gap-6">
              <TextInput
                label="Extra Benefits"
                placeholder="e.g., Professional development programs, Health insurance"
                error={errors.extraBenefits}
                {...register("extraBenefits")}
              />

              <TextInput
                label="Experience Required"
                type="number"
                placeholder="e.g., 5"
                error={errors.experience}
                {...register("experience")}
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link href={`${path}/${backNavigationPath}`}>
              <Button
                variant="natural"
                className="text-base bg-neutral-100 rounded-lg px-10"
              >
                Cancel
              </Button>
              </Link>
              <Button type="submit" className="px-10">
                {actionType === "add" ? "Add" : "Update"}{" "}
                {jobType === "internship" ? "Internship" : "Job"}
              </Button>
            </div>
          </form>
        )}
        {mutation.isError && (
          <div className="mt-6">
            <p className="text-red-500">
              An error occurred: {mutation.error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewHiring;
