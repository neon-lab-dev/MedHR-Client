import api from ".";
import { IEmployer, TEmployee } from "@/types/employer";
import { JobData } from "@/app/employer/(home)/page";
import { User } from "@/app/employer/(home)/profile/page";
import {
  JobDetails,
  UpdateJobPayload,
} from "@/app/employer/(home)/_components/ViewIdPage";
import axiosInstance from "./axiosInstance";

export const handleGetAllCandidatesService = async (
  filters: Record<string, string | string[] | null>
): Promise<any[]> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  try {
    const response = await axiosInstance.get(
      `${api.findCandidate}?${params.toString()}`,
      {
        withCredentials: true,
      }
    );
    return response.data?.candidates ?? [];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleGetAllEmployersForAdminService = async ({
  keyword,
}: {
  keyword?: string;
}): Promise<IEmployer[]> => {
  const url = keyword
    ? `${api.allEmployers}?full_name=${keyword}`
    : api.allEmployers;

  try {
    const res = await axiosInstance.get(url, {
      withCredentials: true,
    });
    return res.data?.employers ?? [];
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleDeleteEmployerService = async (
  id: string
): Promise<string> => {
  try {
    const res = await axiosInstance.delete(`${api.adminEmployer}/${id}`, {
      withCredentials: true,
    });
    return res.data?.message ?? "Employer deleted successfully";
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleGEtEmployerByIdForAdminService = async (
  id: string
): Promise<IEmployer> => {
  try {
    const res = await axiosInstance.get(`${api.adminEmployer}/${id}`, {
      withCredentials: true,
    });
    return res.data?.employer;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleGEtEmployerByIdForEmployer = async (
  id: string
): Promise<TEmployee> => {
  try {
    const res = await axiosInstance.get(`${api.employergetemploee}/${id}`, {
      withCredentials: true,
    });
    return res?.data?.emp;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};

export const sendHiredEmail = async (
  userId: string,
  companyName: string
): Promise<any> => {
  try {
    const res = await axiosInstance.post(
      `${api.sendHiredEmail}/${userId}`,
      { companyName },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};

// To send contact mail to employees
export const sendContactEmail = async (
  userId: string,
  companyName: string
): Promise<any> => {
  try {
    const res = await axiosInstance.post(
      `${api.sendContactEmail}/${userId}`,
      { companyName },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "Something went wrong");
  }
};


export const fetchEmployerProfileData = async () => {
  const response = await axiosInstance.get("/employeer/me", {
    withCredentials: true,
  });
  return response.data;
};

export const fetchJobData = async (): Promise<JobData> => {
  const response = await axiosInstance.get(api.employerJob, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllEmployerCourses = async (): Promise<any> => {
  const response = await axiosInstance.get(api.getAllEmployerCourses, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllEmployerSkillProgrammes = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get(api.getAllEmployerSkillProgrammes, {
      withCredentials: true,
    });
    return res?.data ?? null;
  } catch (err: any) {
    throw err?.response?.message ?? "Something went wrong";
  }
};

export const fetchJobs = async () => {
  const response = await axiosInstance.get(api.employerJob, {
    withCredentials: true,
  });
  return response.data.jobs;
};

export const deleteJob = async (id: string) => {
  const response = await axiosInstance.delete(`${api.job}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchProfileData = async (applicantId: string) => {
  const response = await axiosInstance.get(
    `${api.employergetemploee}/${applicantId}`,
    {
      withCredentials: true,
    }
  );
  return response.data.emp;
};

export const approveApplicant = async (data: {
  jobId: string;
  applicantId: string;
  status: string;
}) => {
  await axiosInstance.put(api.changeStatus, data, {
    withCredentials: true,
  });
};

export const rejectApplicant = async (data: {
  jobId: string;
  applicantId: string;
  status: string;
}) => {
  await axiosInstance.put(api.changeStatus, data, {
    withCredentials: true,
  });
};

export const fetchJobDetails = async (jobId: string) => {
  const response = await axiosInstance.get(`${api.job}/${jobId}`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error(`Failed to fetch job details. Status: ${response.status}`);
  }
  return response.data.jobs;
};

export const fetchJobDetail = async (viewId: string): Promise<JobDetails> => {
  const { data } = await axiosInstance.get(`${api.job}/${viewId}`, {
    withCredentials: true,
  });
  return data.jobs;
};

export const updateJobDetails = async (
  viewId: string,
  payload: UpdateJobPayload
) => {
  const { data } = await axiosInstance.put(`${api.job}/${viewId}`, payload, {
    withCredentials: true,
  });
  return data;
};

export const uploadResume = async (file: File) => {
  const fileData = new FormData();
  fileData.append("file", file);

  await axiosInstance.put(api.employeeUploadResume, fileData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

export const fetchEmployerData = async () => {
  const response = await axiosInstance.get("/employeer/me", {
    withCredentials: true,
  });
  return response.data;
};

export const updateEmployerData = async (updatedData: User) => {
  const response = await axiosInstance.put("/employeer/details", updatedData, {
    withCredentials: true,
  });
  return response.data;
};
