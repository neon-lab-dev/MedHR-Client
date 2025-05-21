import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import api from ".";


// Update User Details
const updateUserDetails = (formData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.put(api.employeedetails, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => resolve(response.data))
    .catch(error => reject(new Error(error?.response?.data?.message ?? 'Error updating user details')));
  });
};


export const useUpdateUserDetails = (): UseMutationResult<any, Error, any> => {
  return useMutation({
    mutationFn: updateUserDetails,
  });
};

