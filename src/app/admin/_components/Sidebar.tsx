"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { IMAGES } from "@/assets";

interface INavLink {
  label: string;
  icon?: any;
  path: string;
}

const Sidebar = ({ navLinks }: { navLinks: INavLink[] }) => {
  const pathname = usePathname();

  return (
    <div className="w-[270px] pl-6 py-7 font-plus-jakarta-sans bg-white border-r border-neutral-150 flex flex-col gap-16 h-full">
        <Link href="/" className="size-[80px]"><Image src={IMAGES.medHr} alt="medHr" /></Link>

      <div className="flex flex-col gap-3">
        {navLinks.map((navLink, index) => (
          <div key={index} className="py-2 flex items-center justify-between">
            <Link
              href={navLink?.path}
              className={twMerge(
                "flex items-center gap-[6px] text-sm font-semibold",
                pathname === navLink?.path
                  ? "text-primary-500"
                  : "text-neutral-600"
              )}
            >
              {navLink?.icon && <Image src={navLink?.icon} alt="home-icon" />}
              {navLink.label}
            </Link>
            {pathname === navLink?.path ? (
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
