import { Dispatch, SetStateAction } from "react";

export type TModalTypes = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  modalType: "Login" | "Signup" | "OTP" | "ForgotPassword" | "ChangePassword" | "ConfirmationEmail";
  setModalType: Dispatch<SetStateAction<"Login" | "Signup" | "OTP" | "ForgotPassword" | "ChangePassword" | "ConfirmationEmail">>;
  userType: "Student" | "Employer";
  setUserType: Dispatch<SetStateAction<"Student" | "Employer">>;
};

export type TSignupLoginModalTypes = {
  setModalType: Dispatch<SetStateAction<"Login" | "Signup" | "OTP">>;
};