import api from ".";
import axiosInstance from "./axiosInstance";

// Get all skill programmes
export const getAllSkillProgrammes = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get(api.allSkillProgrammes, {
      withCredentials: true,
    });
    return res.data ?? null;
  } catch (err: any) {
    throw err?.response?.message ?? "Something went wrong";
  }
};
