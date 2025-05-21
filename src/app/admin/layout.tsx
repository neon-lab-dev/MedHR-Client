"use client";
import React, { useEffect } from "react";
import ScreenWarning from "@/components/ScreenWarning";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { handleGetAminProfileService } from "@/api/authentication";
import Loading from "@/components/Loading";

export default function EmployeeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isLoading, isError } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: handleGetAminProfileService,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      router.push("/admin/login");
    }
  }, [isError, isLoading]);

  if (isLoading) return <Loading className="h-screen w-screen" />;
  return (
    <div className="flex h-screen w-screen">
      <div className="flex justify-center w-full h-screen xl:hidden">
        <ScreenWarning />
      </div>
      <div className="hidden xl:flex w-full bg-[#f5f6fa]">{children}</div>
    </div>
  );
}
