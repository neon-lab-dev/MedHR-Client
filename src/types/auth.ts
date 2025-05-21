export type IAuthTabs = "Aspirants" | "Organization";
export type IAuthModalTypes =
  | null
  | "LOGIN"
  | "SIGNUP"
  | "OTP"
  | "FORGOT_PASSWORD"
  | "CHANGE_PASSWORD"
  | "CONFIRMATION_EMAIL";

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  full_name: string;
  mobilenumber: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface IOTP {
  email: string;
  otp: number;
}
