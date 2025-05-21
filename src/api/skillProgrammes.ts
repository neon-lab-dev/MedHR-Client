import axios from "axios";
import api from ".";

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