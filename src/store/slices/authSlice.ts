import { IAuthModalTypes, IAuthTabs } from "@/types/auth";
import { IEmployee } from "@/types/employee";
import { IEmployer } from "@/types/employer";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  studentProfile: IEmployee | null;
  employerProfile: IEmployer | null;
  activeTab: IAuthTabs;
  isAuthModalOpen: boolean;
  authModalType: IAuthModalTypes;
  isAuthenticating: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  studentProfile: null,
  activeTab: "Aspirants",
  isAuthModalOpen: false,
  authModalType: "LOGIN",
  employerProfile: null,
  isAuthenticating: true,
};

export const counterSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<IAuthModalTypes>) => {
      state.isAuthModalOpen = true;
      state.authModalType = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
      state.authModalType = null;
    },
    setAuthModalType: (state, action: PayloadAction<IAuthModalTypes>) => {
      state.authModalType = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<IAuthTabs>) => {
      state.activeTab = action.payload;
    },
    setEmployeeProfile: (state, action: PayloadAction<IEmployee | null>) => {
      state.studentProfile = action.payload;
    },
    setEmployerProfile: (state, action: PayloadAction<IEmployer | null>) => {
      state.employerProfile = action.payload;
    },
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
  },
});

export const {
  closeAuthModal,
  openAuthModal,
  setActiveTab,
  setAuthModalType,
  setEmployeeProfile,
  setEmployerProfile,
  setIsAuthenticating,
} = counterSlice.actions;
export default counterSlice.reducer;
