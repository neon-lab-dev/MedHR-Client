import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from ".";
import axiosInstance from "./axiosInstance";


const updateUserDetails = async (formData: any): Promise<any> => {
  try {
    const response = await axiosInstance.put(api.employeedetails, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Error updating user details');
  }
};

export const useUpdateUserDetails = (): UseMutationResult<any, Error, any> => {
  return useMutation({
    mutationFn: updateUserDetails,
  });
};


