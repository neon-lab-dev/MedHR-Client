/* eslint-disable @typescript-eslint/no-unused-vars */

import { IJob } from "@/types/job";
import api from ".";
import { IDefaultQueryParams } from "@/app/(employee)/(job-listing)/_components/ApplyFilter";
import axiosInstance from "./axiosInstance";

export interface IJobResponse {
  success: boolean;
  jobsCount: number;
  jobs: IJob[];
  resultPerPage: number;
  filteredJobsCount: number;
}

export const getLatestInternships = async (): Promise<IJob[]> => {
  const { data } = await axiosInstance.get<IJobResponse>(
    `${api.jobs}?employmentType=Internship`
  );
  return data.jobs ?? [];
};

export const getLatestJobs = async (): Promise<IJob[]> => {
  const { data } = await axiosInstance.get<IJobResponse>(`${api.jobs}`);
  return data.jobs?.filter((j) => j.employmentType !== "Internship") ?? [];
};

export const getJobById = async (id: string): Promise<IJob | null> => {
  const { data } = await axiosInstance.get<{ jobs: IJob }>(`${api.job}/${id}`);
  return data.jobs ?? null;
};

export const getJobsByTitle = async (title: string): Promise<IJob[]> => {
  const { data } = await axiosInstance.get<IJobResponse>(
    `${api.jobs}?keyword=${title}`
  );
  return data.jobs ?? [];
};

export const handleGetAllJobsForAdminService = async ({
  keyword,
}: {
  keyword?: string;
}): Promise<IJob[]> => {
  try {
    const url = keyword ? `${api.jobs}?keyword=${keyword}` : api.jobs;
    const { data } = await axiosInstance.get<{ jobs: IJob[] }>(url, {
      withCredentials: true,
    });
    return data.jobs ?? [];
  } catch (err: any) {
    throw err?.response?.data?.message ?? "Something went wrong";
  }
};

export const handleDeleteJobService = async (id: string): Promise<string> => {
  try {
    const { data } = await axiosInstance.delete<{ message: string }>(
      `${api.adminJob}/${id}`,
      {
        withCredentials: true,
      }
    );
    return data.message ?? "Job deleted successfully";
  } catch (err: any) {
    throw err?.response?.data?.message ?? "Something went wrong";
  }
};

export const handleGetJobByIdForAdminService = async (
  id: string
): Promise<IJob | null> => {
  try {
    const { data } = await axiosInstance.get<{ jobs: IJob }>(
      `${api.job}/${id}`,
      {
        withCredentials: true,
      }
    );
    return data.jobs ?? null;
  } catch (err: any) {
    throw err?.response?.message ?? "Something went wrong";
  }
};

export const handleGetAllJobsByTypeService = async ({
  type,
  employmentType,
  locationType,
  salary,
  duration,
  experienceLevel,
  country,
  city,
  department,
  typeOfOrganization,
  ...params
}: IDefaultQueryParams & { type: string }): Promise<IJob[]> => {
  try {
    // Filter out falsy or empty params
    const truthyParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => Boolean(value))
    );

    const requestParams: any = {
      ...truthyParams,
    };

    if (employmentType) requestParams.employmentType = employmentType;
    if (locationType) requestParams.locationType = locationType;
    if (salary) requestParams["salary[gte]"] = salary;
    if (duration) requestParams["employmentDuration[gte]"] = duration;
    if (country) requestParams.country = country;
    if (city) requestParams.city = city;
    if (department) requestParams.department = department;
    if (typeOfOrganization)
      requestParams.typeOfOrganization = typeOfOrganization;

    const { data } = await axiosInstance.get<{ jobs: IJob[] }>(api.jobs, {
      withCredentials: true,
      params: requestParams,
    });

    let jobs = data.jobs ?? [];

    if (type) {
      jobs = jobs.filter((job) => {
        if (type === "internships") {
          return job.employmentType === "Internship";
        } else {
          return job.employmentType !== "Internship";
        }
      });
    }

    if (experienceLevel) {
      jobs = jobs.filter(
        (job) => job.experience.toLowerCase() === experienceLevel.toLowerCase()
      );
    }

    return jobs ?? [];
  } catch (err: any) {
    throw err?.response?.data?.message ?? "Something went wrong";
  }
};

export const handleWithdrawApplicationService = async (
  id: string
): Promise<string> => {
  try {
    const res = await axiosInstance.put(
      `${api.withDrawApplication}/${id}`,
      {},
      { withCredentials: true }
    );
    return res.data?.message ?? "Application withdrawn successfully";
  } catch (err: any) {
    throw err?.response?.data?.message ?? "Something went wrong";
  }
};

export const handleApplyJobService = async (id: string): Promise<string> => {
  try {
    const res = await axiosInstance.put(
      `${api.applyJob}/${id}`,
      {},
      { withCredentials: true }
    );
    return res.data?.message ?? "Applied successfully";
  } catch (err: any) {
    throw err?.response?.data?.message ?? "Failed to apply";
  }
};

export const handleGetJobByIdService = async (id: any): Promise<IJob> => {
  try {
    const res = await axiosInstance.get(`${api.job}/${id}`, {
      withCredentials: true,
    });
    return res.data?.jobs;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};