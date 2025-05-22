/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/assets";

interface Navlink {
  label: string;
  icon?: any;
  path: string;
}

interface SidebarProps {
  navlinks: Navlink[];
}

const Sidebar: React.FC<SidebarProps> = ({ navlinks }) => {
  const pathname = usePathname();

  return (
    <div className="w-[270px] sticky top-0 left-0 pl-6 py-7 font-plus-jakarta-sans bg-white border-r border-neutral-150 min-h-screen overflow-y-auto h-full flex flex-col gap-16">
      <Link href="/" className="size-[80px]">
        <Image src={IMAGES.medHr} alt="medHr" />
      </Link>

      {/* NavLinks */}
      <div className="flex flex-col gap-3">
        {navlinks.map((navlink, index) => (
          <div key={index} className="py-2 flex items-center justify-between">
            <Link
              href={navlink.path}
              className={`flex items-center gap-[6px] text-sm font-semibold ${
                pathname === navlink.path
                  ? "text-primary-500"
                  : "text-neutral-600"
              } ${
                pathname === "/employer/getting-started"
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {navlink?.icon && (
                <Image
                  src={navlink.icon}
                  alt={`${navlink.label}-icon`}
                  className="size-5"
                />
              )}
              {navlink.label}
            </Link>

            {pathname === navlink?.path ? (
              <div className="w-1 h-[22px] bg-primary-500 rounded-l-[20px]"></div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
