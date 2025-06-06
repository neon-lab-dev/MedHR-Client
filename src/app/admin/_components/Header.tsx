"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAdminLogoutService } from "@/api/authentication";
import { toast } from "sonner";
import Cookies from 'js-cookie';

const Header = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: handleAdminLogoutService,
    onSuccess: (msg) => {
       Cookies.remove("admin_auth_token");
      toast.success(msg);
      queryClient
        .invalidateQueries({
          queryKey: ["admin-profile"],
        })
        .finally(() => {
          router.push("/admin/login");
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
  return (
    <div className="bg-white px-7 py-4 font-plus-jakarta-sans flex justify-between items-center">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-secondary-900 capitalize">
        {pathname.split("/")[2] ?? "Dashboard"}
      </h1>

      {/* Profile Dropdown */}
      <Button
        onClick={() => mutate()}
        variant="secondary"
        className="flex items-center min-w-32 justify-center"
      >
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default Header;
