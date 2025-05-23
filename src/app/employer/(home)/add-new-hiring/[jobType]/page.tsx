"use client";
import { usePathname, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { ICONS } from "@/assets";
import Button from "@/components/Button";
import Link from "next/link";
import api from "@/api";
import { useEffect, useState } from "react";

type FormData = {
  title: string;
  description: string;
  requirements: string;
  requiredSkills: string;
  responsibilities: string;
  locationType: string;
  location: string;
  employmentType: string;
  employmentTypeCategory: string;
  employmentDuration: number;
  department: string;
  subDepartment: string;
  salary: number;
  applicationDeadline: string;
  extraBenefits: string;
  experience: string;
};

// Function to format form data
const formatFormData = (data: FormData) => {
  const { requiredSkills, ...restData } = data;
  return {
    ...restData,
    requiredSkills: requiredSkills.split(",").map((skill) => skill.trim()),
  };
};

// Function to handle job creation request
const createJobRequest = async (data: FormData) => {
  const payload = formatFormData(data);
  const response = await axios.post(api.creatrjob, payload, {
    withCredentials: true,
  });

  if (response.status !== 201) {
    throw new Error("Failed to create job");
  }
  return response.data;
};

// Custom hook for job creation mutation
const useCreateJobMutation = (): UseMutationResult<any, Error, FormData> => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobRequest,
    onSuccess: () => {
      toast.success("Job created successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs-employer-job"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });

      router.push("/employer");
    },
    onError: (error: Error) => {
      console.error("Error creating job:", error);
      toast.error(error.message || "Failed to create job");
    },
  });
};

const subDepartmentOptions: Record<string, string[]> = {
  Clinical: [
    "Anesthesia",
    "Anatomy",
    "Cardiology",
    "Dermatology",
    "Dentistry",
    "Emergency Medicine",
    "Endocrinology",
    "ENT",
    "Forensic Medicine & Toxicology",
    "Gastroenterology",
    "Geriatric Medicine",
    "Gynecology",
    "Hematology",
    "Infertility & IVF",
    "Medical Surgical",
    "Medicine",
    "Nephrology",
    "Neurology",
    "Surgery",
    "Ophthalmology",
    "Out Patient Department OPD",
    "Orthopedics",
    "Pediatrics",
    "Physical Medicine & Rehabilitation",
    "Physiology",
    "Physiotherapy",
    "Plastic Surgery",
    "Pulmonary Medicine and sleep disorders",
    "Psychiatry",
    "Rheumatology",
    "Surgery",
    "Urology",
  ],
  "Diagnostic Labs": [
    "Lab Technician",
    "Blood Bank",
    "Biochemistry",
    "Microbiology",
    "Pathology",
    "Pharmacology",
    "Radio diagnosis",
    "Radiographers",
  ],
  "Technique": ["OT Technicians", "Technicians CSSD", "Nursing"],
  "Other": [
    "Hospital Administration",
    "Laundry",
    "Pharmacist",
    "Dietician",
    "HR",
    "Ward assistance",
  ],
};

const Page = () => {
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const mutation = useCreateJobMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  const validLocationTypes = ["Remote", "Onsite", "Hybrid"];
  const validEmploymentTypes = ["Job"];
  const jobTypes = ["Full-Time", "Part-Time", "Contract"];
  const internshipEmploymentTypes = ["Internship"];
  const internshipTypes = ["Shadow Internship", "Practice Internship"];

  const selectedDepartment = watch("department"); // React Hook Form watch
  const [subDepartments, setSubDepartments] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDepartment) {
      setSubDepartments(subDepartmentOptions[selectedDepartment] || []);
    } else {
      setSubDepartments([]);
    }
  }, [selectedDepartment]);

  return (
    <div className="p-6 bg-[#f5f6fa]">
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            <Link href="/employer/">
              <Image src={ICONS.leftArrow} alt={""} />
            </Link>
            <h1 className="text-neutral-950 text-[28px] font-bold">
              Add New Hiring
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mt-16 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                <span className="text-lg">Job Title</span>
              </label>
              <input
                type="text"
                {...register("title", { required: "Job title is required" })}
                placeholder="e.g., Healthcare Operations Project Manager"
                className="p-3 border border-neutral-300 rounded-xl w-[770px]"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                <span className="text-lg">Job Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Job description is required",
                })}
                placeholder="e.g., Oversee operational projects within healthcare facilities..."
                className="p-3 border border-neutral-300 rounded-xl w-[770px]"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="requirements">
                <span className="text-lg">Requirements</span>
              </label>
              <textarea
                {...register("requirements", {
                  required: "Requirements are required",
                })}
                placeholder="e.g., Experience in healthcare operations and project management."
                className="p-3 border border-neutral-300 rounded-xl w-[770px]"
              />
              {errors.requirements && (
                <p className="text-red-500">{errors.requirements.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="requiredSkills">
                <span className="text-lg">
                  Required Skills (comma-separated)
                </span>
              </label>
              <textarea
                {...register("requiredSkills", {
                  required: "Required skills are required",
                })}
                placeholder="e.g., Healthcare Operations, Project Management"
                className="p-3 border border-neutral-300 rounded-xl w-[770px]"
              />
              {errors.requiredSkills && (
                <p className="text-red-500">{errors.requiredSkills.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="responsibilities">
                <span className="text-lg">Roles and Responsibilities</span>
              </label>
              <textarea
                {...register("responsibilities", {
                  required: "Roles and responsibilities are required",
                })}
                placeholder="e.g., Implement process improvements and manage operational projects..."
                className="p-3 border border-neutral-300 rounded-xl w-[770px]"
              />
              {errors.responsibilities && (
                <p className="text-red-500">
                  {errors.responsibilities.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="locationType">
                <span className="text-lg">Location Type</span>
              </label>
              <select
                {...register("locationType", {
                  required: "Location type is required",
                })}
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              >
                <option value="">Select Location Type</option>
                {validLocationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.locationType && (
                <p className="text-red-500">{errors.locationType.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">
                <span className="text-lg">Location</span>
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="e.g., Operations HQ, MediPark, Bangalore"
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="employmentType">
                <span className="text-lg">Employment Type</span>
              </label>
              <select
                {...register("employmentType", {
                  required: "Employment type is required",
                })}
                className="p-3 border border-neutral-300 rounded-xl w-full"
              >
                <option value="">Select Employment Type</option>
                {(pathname === "/employer/add-new-hiring/job"
                  ? validEmploymentTypes
                  : internshipEmploymentTypes
                ).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.employmentType && (
                <p className="text-red-500">{errors.employmentType.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="employmentTypeCategory">
                <span className="text-lg">Job Type</span>
              </label>
              <select
                {...register("employmentTypeCategory", {
                  required: "Job type is required",
                })}
                className="p-3 border border-neutral-300 rounded-xl w-full"
              >
                <option value="">Select Employment Type</option>
                {(pathname === "/employer/add-new-hiring/job"
                  ? jobTypes
                  : internshipTypes
                ).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.employmentTypeCategory && (
                <p className="text-red-500">
                  {errors.employmentTypeCategory.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="employmentDuration">
                <span className="text-lg">Employment Duration (in years)</span>
              </label>
              <input
                type="number"
                {...register("employmentDuration", {
                  required: "Employment duration is required",
                  valueAsNumber: true,
                })}
                placeholder="e.g., 3"
                className="p-3 border border-neutral-300 rounded-xl w-full"
              />
              {errors.employmentDuration && (
                <p className="text-red-500">
                  {errors.employmentDuration.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-6 w-full">
            {/* Department */}
            <div className="flex flex-col gap-2">
              <label htmlFor="department">
                <span className="text-lg">Department</span>
              </label>
              <select
                {...register("department", {
                  required: "Department is required",
                })}
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              >
                <option value="">Select Department</option>
                {Object.keys(subDepartmentOptions).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500">{errors.department.message}</p>
              )}
            </div>

            {/* Sub Department */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subDepartment">
                <span className="text-lg">Sub Department</span>
              </label>
              <select
                {...register("subDepartment", {
                  required: "Sub Department is required",
                })}
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              >
                <option value="">Select Sub Department</option>
                {subDepartments.map((subDept) => (
                  <option key={subDept} value={subDept}>
                    {subDept}
                  </option>
                ))}
              </select>
              {errors.subDepartment && (
                <p className="text-red-500">{errors.subDepartment.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="salary">
                <span className="text-lg">Salary</span>
              </label>
              <input
                type="number"
                {...register("salary", {
                  required: "Salary is required",
                  valueAsNumber: true,
                })}
                placeholder="e.g., 10000000"
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              />
              {errors.salary && (
                <p className="text-red-500">{errors.salary.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="applicationDeadline">
                <span className="text-lg">Application Deadline</span>
              </label>
              <input
                type="date"
                {...register("applicationDeadline", {
                  required: "Application deadline is required",
                })}
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              />
              {errors.applicationDeadline && (
                <p className="text-red-500">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="extraBenefits">
                <span className="text-lg">Extra Benefits</span>
              </label>
              <input
                type="text"
                {...register("extraBenefits")}
                placeholder="e.g., Professional development programs, Health insurance"
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="experience">
                <span className="text-lg">Experience Required</span>
              </label>
              <input
                type="text"
                {...register("experience")}
                placeholder="e.g., 5+ years"
                className="p-3 border border-neutral-300 rounded-xl w-[370px]"
              />
            </div>
          </div>
          <div className="flex justify-center mt-10 gap-6">
            <Button type="submit" className="px-10">
              Create{" "}
              {pathname === "/employer/add-new-hiring/internship"
                ? "Internship"
                : "Job"}
            </Button>
          </div>
        </form>
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
export default Page;
