import api from ".";
import { IEmployee } from "@/types/employee";
import { IJob } from "@/types/job";
import axiosInstance from "./axiosInstance";

export const handleGetAllEmployeesForAdminService = async ({
  keyword,
}: {
  keyword?: string;
}): Promise<IEmployee[]> => {
  try {
    const url = keyword
      ? `${api.allEmployees}?full_name=${keyword}`
      : api.allEmployees;
    const res = await axiosInstance.get(url, {
      withCredentials: true,
    });
    return res.data?.employees ?? [];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleDeleteEmployeeService = async (
  id: string
): Promise<string> => {
  try {
    const res = await axiosInstance.delete(`${api.adminEmployee}/${id}`, {
      withCredentials: true,
    });
    return res.data?.message ?? "Employee deleted successfully";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleGetSingleEmployeeByAdminService = async (
  id: string
): Promise<IEmployee> => {
  try {
    const res = await axiosInstance.get(`${api.adminEmployee}/${id}`, {
      withCredentials: true,
    });
    return res.data?.employee ?? {};
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const handleGetAppliedJobsByEmployeeService = async (): Promise<
  IJob[]
> => {
  try {
    const res = await axiosInstance.get(api.getEmployeeApplications, {
      withCredentials: true,
    });
    return res.data?.jobs ?? [];
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};

export const uploadResume = async (file: File): Promise<void> => {
  const fileData = new FormData();
  fileData.append("file", file);
  try {
    await axiosInstance.put(api.employeeUploadResume, fileData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "Failed to upload resume"
    );
  }
};

export const applyOnCourse = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `${api.applyOnCourse}/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "Failed to apply on course"
    );
  }
};

export const applyOnSkillProgram = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `${api.applySkillProgram}/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "Failed to apply on skill program"
    );
  }
};

export const fetchUserData = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/me", {
      baseURL: "https://carrerhub-backend.vercel.app/api/v1",
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "Failed to fetch user data"
    );
  }
};
