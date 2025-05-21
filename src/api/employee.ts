import axios from "axios";
import api from ".";
import { IEmployee } from "@/types/employee";
import { IJob } from "@/types/job";

export const handleGetAllEmployeesForAdminService = async ({
  keyword,
}: {
  keyword?: string;
}): Promise<IEmployee[]> => {
  const url = keyword
    ? `${api.allEmployees}?full_name=${keyword}`
    : api.allEmployees;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.employees ?? []);
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

export const handleDeleteEmployeeService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${api.adminEmployee}/${id}`, {
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

export const handleGetSingleEmployeeByAdminService = async (
  id: string
): Promise<IEmployee> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api.adminEmployee}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.employee ?? {});
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

export const handleGetAppliedJobsByEmployeeService = async (): Promise<
  IJob[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.getEmployeeApplications, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.jobs ?? []);
      })
      .catch((err) => {
        reject(err?.response?.data?.message ?? "Something went wrong");
      });
  });
};

/*************  ✨ Windsurf Command ⭐  *************/
/**

/*******  aa8e44ba-7beb-415a-85f0-ca2757f4653c  *******/

export const uploadResume = async (file: File) => {
  const fileData = new FormData();
  fileData.append('file', file);

  await axios.put(api.employeeUploadResume, fileData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
};

export const fetchUserData = async () => {
  const response = await axios.get('https://carrerhub-backend.vercel.app/api/v1/me', {
    withCredentials: true,
  });
  return response.data;
};
