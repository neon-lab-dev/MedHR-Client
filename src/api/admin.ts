import axios from "axios";
import api from ".";

export interface IAdminStats {
  jobsCount: number;
  employersCount: number;
  employeesCount: number;
  hiredApplicantsCount: number;
};



export const handleGetAdminStatsService = async (): Promise<IAdminStats> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.adminStats, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data ?? null);
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Something went wrong");
      });
  });
};

// Get all skill programmes
export const getAllSkillProgrammes = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.allSkillProgrammes, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data ?? null);
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Something went wrong");
      });
  });
};


// Function to get single skill data using id
export const getSingleSkill = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api.singleSkillProgramme}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data ?? null);
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Something went wrong");
      });
  });
};



// Function to delete a skill programme using its id
export const deleteSkillProgramme = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${api.deleteSkill}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve()
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Failed to delete skill programme");
      });
  });
};



// Get all courses
export const getAllCourses = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.getAllCourses, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data ?? null);
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Something went wrong");
      });
  });
};



// Function to delete a course using its id
export const deleteCourseById = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${api.deleteCourse}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve()
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Failed to delete course");
      });
  });
};


// Function to delete a video using its id
export const deleteVideoById = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${api.video}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve()
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Failed to delete video");
      });
  });
};


// Function to get single course data using id
export const getSingleCourse = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api.getSingleCourse}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data ?? null);
      })
      .catch((err) => {
        reject(err?.response?.message ?? "Something went wrong");
      });
  });
};