/* eslint-disable @next/next/no-img-element */
"use client";
import { ICONS } from "@/assets";
import { convertDate } from "@/helpers/convertDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type TEventCardProps = {
  wrapperClassName?: string;
  isLoading: boolean;
  _id: string;
  eventName: string;
  eventUrl: string;
  image: {
    fileId: string;
    name: string;
    url: string;
  };
  date: string;
  time: string;
  company: {
    companyName: string;
    companyLocation: string;
    _id: string;
  };
  skillCovered: string[];
};
const EventCard: React.FC<TEventCardProps> = ({
  wrapperClassName,
  isLoading,
  _id,
  eventName,
  eventUrl,
  image,
  date,
  time,
  company,
  skillCovered,
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleSkills = expanded ? skillCovered : skillCovered.slice(0, 2);
  const hasMore = skillCovered.length > 2;
  return (
    <div
      className={twMerge(
        `max-w-[340px] w-full h-auto font-plus-jakarta-sans rounded-2xl group`,
        wrapperClassName
      )}
    >
      <div className="h-[348px] w-full rounded-2xl border border-neutral-400/40 overflow-hidden">
        {isLoading ? (
          <div className="bg-gray-300 w-full h-[348px] animate-pulse rounded-2xl"></div>
        ) : (
          <Link href={eventUrl} target="_blank">
            <img
              src={image?.url}
              alt=""
              className="h-full w-full object-cover rounded-2xl transition-all duration-300 ease-in-out transform group-hover:scale-105"
            />
          </Link>
        )}
      </div>

      {/* Event date */}
      <div className="flex items-center gap-2 mt-[18px] mb-3">
        <div className="flex items-center gap-2">
          <Image src={ICONS.calender} alt="" className="size-[18px]" />
          <p className="text-neutral-400 text-xs sm:text-[15px]">
            {convertDate(date)}
          </p>
        </div>
        <div className="bg-neutral-400 size-[5px] rounded-full"></div>
        <p className="text-neutral-400 text-xs sm:text-[15px]">{time}</p>
      </div>

      {/* Event Name */}
      <Link
        href={eventUrl}
        target="_blank"
        className="text-neutral-900 hover:underline text-lg font-bold leading-6"
      >
        {eventName}
      </Link>

      {/* Company Info */}
      <div className="flex items-center gap-2 mt-4 sm:mt-2 text-neutral-400 text-xs sm:text-[15px]">
        <div className="flex gap-2">
          <Image
            src={ICONS.company}
            alt=""
            className="size-5 object-cover rounded-full"
          />
          <p className="">{company?.companyName}</p>
        </div>
        <div className="bg-neutral-400 size-[5px] rounded-full"></div>
        <p className="">{company?.companyLocation}</p>
      </div>

      <div className="w-full mt-4 sm:mt-3">
        <div className="flex flex-wrap items-center gap-[10px]">
          {visibleSkills.map((skill) => (
            <div
              key={skill}
              className="px-3 py-[6px] text-secondary-600 font-medium text-xs bg-neutral-500/5 rounded-[999px] text-nowrap"
            >
              {skill}
            </div>
          ))}
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary-500 text-xs font-medium underline transition hover:text-primary-600"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
