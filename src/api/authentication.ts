import axios from "axios";
import api from ".";
import { IEmployee } from "@/types/employee";
import { IEmployer } from "@/types/employer";
import { IOTP, ISignupData } from "@/types/auth";

export const handleAdminLoginService = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.adminLogin, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Login successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Login failed");
      });
  });
};

export const handleGetAminProfileService = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.adminProfile, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to get profile");
      });
  });
};

export const handleAdminLogoutService = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.adminLogout, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Logout successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to logout");
      });
  });
};

export const handleSendResetPasswordEmailService = async (data: {
  email: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employeeForgotPassword, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Email sent successfully");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to send email");
      });
  });
};

export const handleResetPasswordService = async (data: {
  password: string;
  confirmPassword: string;
  token: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${api.employeeResetPassword}/${data.token}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Password reset successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to reset password");
      });
  });
};

export const handleGetEmployeeProfileService = async (): Promise<IEmployee> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.employeeProfile, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.user);
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to get profile");
      });
  });
};

export const handleGetEmployerProfileService = async (): Promise<IEmployer> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.employerProfile, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.user);
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to get profile");
      });
  });
};

export const handleEmployeeLoginService = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employeeLogin, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Login successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Login failed");
      });
  });
};

export const handleEmployerLoginService = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employerLogin, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Login successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Login failed");
      });
  });
};

export const handleEmployeeLogoutService = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.employeeLogout, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Logout successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to logout");
      });
  });
};

export const handleEmployerLogoutService = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get(api.employerLogout, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Logout successful");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Failed to logout");
      });
  });
};

export const handleEmployerSignupService = async (
  data: ISignupData
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employerRegistration, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "OPT sent successfully!");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Signup failed");
      });
  });
};

export const handleEmployeeSignupService = async (
  data: ISignupData
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employeeRegister, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "OTP sent successfully!");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "Signup failed");
      });
  });
};

export const handleVerifyEmployeeOTPService = async (
  data: IOTP
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employeeOTPVerify, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "OTP verified successfully!");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "OTP verification failed");
      });
  });
};

export const handleVerifyEmployerOTPService = async (
  data: IOTP
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(api.employerOTPVerify, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "OTP verified successfully!");
      })
      .catch((err) => {
        reject(err.response?.data?.message ?? "OTP verification failed");
      });
  });
};
