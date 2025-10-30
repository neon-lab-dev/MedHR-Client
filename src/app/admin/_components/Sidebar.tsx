 "use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/assets";

interface INavLink {
  label: string;
  icon?: any;
  path: string;
}

const Sidebar = ({ navLinks }: { navLinks: INavLink[] }) => {
  const pathname = usePathname();

  return (
    <div className="w-[270px] py-7 font-plus-jakarta-sans bg-white border-r border-neutral-150 flex flex-col gap-16 h-full">
      <div className="px-6">
        <Link href="/" className="">
          <Image src={IMAGES.careerHublogo} alt="medHrPlus" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 pl-6">
        {navLinks.map((navLink, index) => (
          <div key={index} className="py-2 flex items-center justify-between">
            <Link
              href={navLink.path}
              className={`flex items-center gap-[6px] text-sm font-semibold ${
                pathname === navLink.path
                  ? "text-primary-500"
                  : "text-neutral-600"
              } ${
                pathname === "/employer/getting-started"
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {navLink?.icon && (
                <Image
                  src={navLink.icon}
                  alt={`${navLink.label}-icon`}
                  className="size-5"
                />
              )}
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
