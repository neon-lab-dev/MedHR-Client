import api from ".";
import { IEmployee } from "@/types/employee";
import { IEmployer } from "@/types/employer";
import { IOTP, ISignupData } from "@/types/auth";
import axiosInstance from "./axiosInstance";

export const handleAdminLoginService = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const res = await axiosInstance.post("/login/admin", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Login failed");
  }
};

export const handleGetAminProfileService = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get("/admin/me", {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to get profile");
  }
};

export const handleAdminLogoutService = async (): Promise<string> => {
  try {
    const res = await axiosInstance.get("/logout/admin", {
      withCredentials: true,
    });
    return res.data?.message ?? "Logout successful";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to logout");
  }
};

export const handleSendResetPasswordEmailService = async (
  data: any
): Promise<string> => {
  try {
    const res = await axiosInstance.post("/password/forgot", data, {
      withCredentials: true,
    });
    return res.data?.message ?? "Email sent successfully";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to send email");
  }
};

export const handleResetPasswordService = async (
  data: any
): Promise<string> => {
  try {
    const res = await axiosInstance.put(`/password/reset/${data.token}`, data, {
      withCredentials: true,
    });
    return res.data?.message ?? "Password reset successful";
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "Failed to reset password"
    );
  }
};

export const handleGetEmployeeProfileService = async (): Promise<IEmployee> => {
  try {
    const res = await axiosInstance.get(api.employeeProfile);
    return res.data?.user;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to get profile");
  }
};

export const handleGetEmployerProfileService = async (): Promise<IEmployer> => {
  try {
    const res = await axiosInstance.get(api.employerProfile, {
      withCredentials: true,
    });
    return res.data?.user;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to get profile");
  }
};

export const handleEmployeeLoginService = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const res = await axiosInstance.post("/login", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Login failed");
  }
};

export const handleEmployerLoginService = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const res = await axiosInstance.post("/login/employeer", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Login failed");
  }
};

export const handleEmployeeLogoutService = async (): Promise<string> => {
  try {
    const res = await axiosInstance.get("/logout", {
      withCredentials: true,
    });
    return res.data?.message ?? "Logout successful";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to logout");
  }
};

export const handleEmployerLogoutService = async (): Promise<string> => {
  try {
    const res = await axiosInstance.get("/employeer/logout", {
      withCredentials: true,
    });
    return res.data?.message ?? "Logout successful";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Failed to logout");
  }
};

export const handleEmployerSignupService = async (
  data: ISignupData
): Promise<string> => {
  try {
    const res = await axiosInstance.post(api.employerRegistration, data, {
      withCredentials: true,
    });
    return res.data?.message ?? "OTP sent successfully!";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Signup failed");
  }
};

export const handleEmployeeSignupService = async (
  data: ISignupData
): Promise<string> => {
  try {
    const res = await axiosInstance.post(api.employeeRegister, data, {
      withCredentials: true,
    });
    return res.data?.message ?? "OTP sent successfully!";
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "Signup failed");
  }
};

export const handleVerifyEmployeeOTPService = async (
  data: IOTP
): Promise<any> => {
  try {
    const res = await axiosInstance.post(api.employeeOTPVerify, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "OTP verification failed"
    );
  }
};

export const handleVerifyEmployerOTPService = async (
  data: IOTP
): Promise<any> => {
  try {
    const res = await axiosInstance.post(api.employerOTPVerify, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? "OTP verification failed"
    );
  }
};
