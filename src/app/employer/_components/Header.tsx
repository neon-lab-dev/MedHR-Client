"use client";
import React from "react";
import { IMAGES } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleEmployerLogoutService } from "@/api/authentication";
import { toast } from "sonner";
 import Cookies from "js-cookie";

const Header = () => {
  const user = useAppSelector((state) => state.auth.employerProfile);
  const pathname = usePathname();
  const router = useRouter(); // Add useRouter hook
  const queryClient = useQueryClient(); // Add useQueryClient hook

  const getTitle = (path : string) => {
    const knownPrefixes = ["/admin/", "/employer/"];
    let title = path;
    knownPrefixes.forEach((prefix) => {
      if (title.startsWith(prefix)) {
        title = title.replace(prefix, "");
      }
    });
    return title.charAt(0).toUpperCase() + title.slice(1);
  };
  const title = getTitle(pathname);
  console.log(title);

  const { mutate } = useMutation({
    mutationFn: handleEmployerLogoutService,
    onSuccess: (msg) => {
      Cookies.remove("employeer_auth_token");
      toast.success(msg);
      queryClient
        .invalidateQueries({
          queryKey: ["employer-logout"],
        })
        .finally(() => {
          router.push("/");
          // window.location.reload();
        });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Dropdown items
  const dropdownItems = [
    {
      label: "Profile",
      path: "employer/profile",
    },
  ];

  return (
    <div className="bg-white px-7 py-4 font-plus-jakarta-sans flex justify-between items-center sticky top-0 z-30 border-b border-neutral-150">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-secondary-900">Home</h1>
      {/* Profile Dropdown */}
      <div
        tabIndex={0}
        role="button"
        className="dropdown bg-white border border-secondary-100 rounded-xl p-3 relative"
      >
        <div className="flex justify-between gap-1 items-center cursor-pointer">
          <div className="flex items-center gap-[6px]">
            {/* User name */}
            <div className="size-10 rounded-full border border-primary-500 text-primary-500 font-bold flex justify-center items-center">
              <p>
                {user?.full_name
                  ? user.full_name
                      .split(" ")
                      .map((letter) => letter.charAt(0))
                      .join("")
                  : "?"}
              </p>
            </div>
            {user?.full_name || "Guest"}
          </div>

          {/* Dropdown icon/arrow */}
          <Image src={IMAGES.down} alt="arrow-down" />
        </div>

        {/* Dropdown Menus */}
        <ul
          tabIndex={0}
          className="dropdown-content  menu bg-base-100  z-[1] w-48  shadow absolute top-[80px] right-3 rounded-xl flex flex-col gap-4"
        >
          {dropdownItems.map((item, index) => (
            <Link key={index} href={`/${item.path}`}>
              <span className="">{item.label}</span>
            </Link>
          ))}
          <hr />
          <div
            className="flex justify-center pt-0 hover:bg-neutral-200 cursor-pointer rounded-xl"
            onClick={() => mutate()} // Correct mutate call
          >
            <span className="text-center text-red-500 text-lg font-extrabold">
              Logout
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
