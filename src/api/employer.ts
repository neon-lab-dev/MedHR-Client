/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api from ".";
import { IEmployer, TEmployee } from "@/types/employer";
import { JobData } from "@/app/employer/(home)/page";
import { User } from "@/app/employer/(home)/profile/page";
import { JobDetails, UpdateJobPayload } from "@/app/employer/(home)/_components/ViewIdPage";


export const handleGetAllCandidatesService = async (
  filters: Record<string, string | null>
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
  
  const url = `${api.findCandidate}?${params.toString()}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.candidates ?? []);
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};


export const handleGetAllEmployersForAdminService = async ({
  keyword,
}: {
  keyword?: string;
}): Promise<IEmployer[]> => {
  const url = keyword
    ? `${api.allEmployers}?full_name=${keyword}`
    : api.allEmployers;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.employers ?? []);
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

export const handleDeleteEmployerService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${api.adminEmployer}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Employee deleted successfully");
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

export const handleGEtEmployerByIdForAdminService = async (
  id: string
): Promise<IEmployer> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api.adminEmployer}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.employer);
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

export const handleGEtEmployerByIdForEmployer = async (
  id: string
): Promise<TEmployee> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api.employergetemploee}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res?.data?.emp);
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

// api/employer.ts
export const sendHiredEmail = async (userId: string, companyName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${api.sendHiredEmail}/${userId}`,
        { companyName },
        { withCredentials: true }
      )
      .then((res) => resolve(res.data))
      .catch((err) =>
        reject(err?.response?.data?.message ?? "Something went wrong")
      );
  });
};

export const fetchEmployerProfileData = async () => {
  const response = await axios.get('https://carrerhub-backend.vercel.app/api/v1/employeer/me', {
    withCredentials: true,
  });
  return response.data;
};


export const fetchJobData = async (): Promise<JobData> => {
  const response = await axios.get(api.employerJob, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllEmployerCourses = async (): Promise<any> => {
  const response = await axios.get(api.getAllEmployerCourses, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllEmployerSkillProgrammes = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.getAllEmployerSkillProgrammes, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res?.data ?? null);
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Something went wrong");
      });
  });
};

export const fetchJobs = async () => {
  const response = await axios.get(api.employerJob, {
    withCredentials: true,
  });
  return response.data.jobs;
};

export const deleteJob = async (id: string) => {
  const response = await axios.delete(`${api.job}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchProfileData = async (applicantId: string) => {
  const response = await axios.get(`${api.employergetemploee}/${applicantId}`, {
    withCredentials: true,
  });
  return response.data.emp;
};

export const approveApplicant = async (data: { jobId: string; applicantId: string; status: string }) => {
  await axios.put(api.changeStatus, data, {
    withCredentials: true,
  });
};

export const rejectApplicant = async (data: { jobId: string; applicantId: string; status: string }) => {
  await axios.put(api.changeStatus, data, {
    withCredentials: true,
  });
};

export const fetchJobDetails = async (jobId: string) => {
  const response = await axios.get(`${api.job}/${jobId}`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch job details. Status: ${response.status}`);
  }
  return response.data.jobs;
};

export const fetchJobDetail = async (viewId: string): Promise<JobDetails> => {
  const { data } = await axios.get(`${api.job}/${viewId}`, {
    withCredentials: true,
  });
  return data.jobs;
};


export const updateJobDetails = async (viewId: string, payload: UpdateJobPayload) => {
  const { data } = await axios.put(
    `${api.job}/${viewId}`,
    payload,
    { withCredentials: true }
  );
  return data;
};


export const uploadResume = async (file: File) => {
  const fileData = new FormData();
  fileData.append('file', file);

  await axios.put(api.employeeUploadResume, fileData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
};

export const fetchEmployerData = async () => {
  const response = await axios.get('https://api.medhrplus.com/api/v1/employeer/me', {
    withCredentials: true,
  });
  return response.data;
};



export const updateEmployerData = async (updatedData: User) => {
  const response = await axios.put("https://api.medhrplus.com/api/v1/employeer/details", updatedData, {
    withCredentials: true,
  });
  return response.data;
};