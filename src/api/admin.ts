/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import api from ".";
import axiosInstance from "./axiosInstance";

export interface IAdminStats {
  jobsCount: number;
  employersCount: number;
  employeesCount: number;
  hiredApplicantsCount: number;
}

export const handleGetAdminStatsService = async (): Promise<IAdminStats> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(api.adminStats)
      .then((res) => resolve(res.data ?? null))
      .catch((err) => reject(err?.response?.message ?? "Something went wrong"));
  });
};

export const getAllSkillProgrammes = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(api.allSkillProgrammes)
      .then((res) => resolve(res.data ?? null))
      .catch((err) => reject(err?.response?.message ?? "Something went wrong"));
  });
};

export const getSingleSkill = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${api.singleSkillProgramme}/${id}`)
      .then((res) => resolve(res.data ?? null))
      .catch((err) => reject(err?.response?.message ?? "Something went wrong"));
  });
};

export const deleteSkillProgramme = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`${api.deleteSkill}/${id}`)
      .then(() => resolve())
      .catch((err) =>
        reject(err?.response?.message ?? "Failed to delete skill programme")
      );
  });
};

export const getAllCourses = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(api.getAllCourses)
      .then((res) => resolve(res.data ?? null))
      .catch((err) => reject(err?.response?.message ?? "Something went wrong"));
  });
};

// Function to delete a course using its id
export const deleteCourseById = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`${api.deleteCourse}/${id}`)
      .then(() => resolve())
      .catch((err) =>
        reject(err?.response?.message ?? "Failed to delete course")
      );
  });
};

// Function to delete a video using its id
export const deleteVideoById = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`${api.video}/${id}`)
      .then(() => resolve())
      .catch((err) =>
        reject(err?.response?.message ?? "Failed to delete video")
      );
  });
};

// Function to get single course data using id
export const getSingleCourse = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${api.getSingleCourse}/${id}`)
      .then((res) => resolve(res.data ?? null))
      .catch((err) => reject(err?.response?.message ?? "Something went wrong"));
  });
};
