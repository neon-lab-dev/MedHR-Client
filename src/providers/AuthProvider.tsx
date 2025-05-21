"use client";

import {
  handleGetEmployeeProfileService,
  handleGetEmployerProfileService,
} from "@/api/authentication";
import Loading from "@/components/Loading";
import { useAppDispatch } from "@/hooks/store";
import {
  setEmployeeProfile,
  setEmployerProfile,
  setIsAuthenticating,
} from "@/store/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const student = useQuery({
    queryKey: ["student-profile"],
    queryFn: handleGetEmployeeProfileService,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const employer = useQuery({
    queryKey: ["employer-profile"],
    queryFn: handleGetEmployerProfileService,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (student.isSuccess) {
      dispatch(setEmployeeProfile(student.data!));
    }
    if (!student.isLoading) {
      dispatch(setIsAuthenticating(false));
    }
  }, [student.isLoading, student.isFetching, student.isSuccess]);

  useEffect(() => {
    if (employer.isSuccess) {
      dispatch(setEmployerProfile(employer.data!));
    }
    if (!employer.isLoading) {
      dispatch(setIsAuthenticating(false));
    }
  }, [employer.isLoading, employer.isFetching, employer.isSuccess]);

  if (student.isLoading) return <Loading className="h-screen w-screen" />;
  return <div>{children}</div>;
};

export default AuthProvider;
