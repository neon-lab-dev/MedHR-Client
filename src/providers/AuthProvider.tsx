"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { handleGetEmployeeProfileService, handleGetEmployerProfileService } from "@/api/authentication";
import Loading from "@/components/Loading";
import { useAppDispatch } from "@/hooks/store";
import { setEmployeeProfile, setEmployerProfile, setIsAuthenticating } from "@/store/slices/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  // ✅ Check if tokens exist
  const employeeToken = Cookies.get("employee_auth_token");
  const employerToken = Cookies.get("employeer_auth_token");

  const student = useQuery({
    queryKey: ["student-profile"],
    queryFn: handleGetEmployeeProfileService,
    enabled: !!employeeToken, // ✅ Run only if token exists
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const employer = useQuery({
    queryKey: ["employer-profile"],
    queryFn: handleGetEmployerProfileService,
    enabled: !!employerToken, // ✅ Run only if token exists
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  console.log(employerToken);

  useEffect(() => {
    if (student.isSuccess) {
      dispatch(setEmployeeProfile(student.data!));
    }
    if (!student.isLoading) {
      dispatch(setIsAuthenticating(false));
    }
  }, [student.isLoading, student.isSuccess]);

  useEffect(() => {
    if (employer.isSuccess) {
      dispatch(setEmployerProfile(employer.data!));
    }
    if (!employer.isLoading) {
      dispatch(setIsAuthenticating(false));
    }
  }, [employer.isLoading, employer.isSuccess]);

  if (employeeToken && student.isLoading) {
    return <Loading className="h-screen w-screen" />;
  }

  return <div>{children}</div>;
};

export default AuthProvider;
