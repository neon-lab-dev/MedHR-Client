import { ICONS } from "@/assets";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { IJob } from "@/types/job";
import ApplyJob from "@/app/(employee)/(job-listing)/[jobType]/[jobId]/_components/ApplyJob";
import { convertDate } from "@/helpers/convertDate";

type Props = {
  showApplyButton?: boolean;
  isDetailsBtnVisible?: boolean;
  wrapperClassName?: string;
  job: IJob;
  isApplied?: boolean;
};

const JobDetailCard = ({
  showApplyButton,
  isDetailsBtnVisible = true,
  job,
}: Props) => {
  if (!job) return null;
  return (
    <div
      className={twMerge(
        "bg-white font-plus-jakarta-sans border border-neutral-100 rounded-2xl shadow-job-card-shadow hover:border-primary-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between",
      )}
    >
      <div className="p-7 w-full">
        <div className="border border-primary-500 bg-neutral-50 p-2 rounded size-16 flex items-center justify-center">
          <p className="text-xs xl:text-[16px] -tracking-[0.32px]">
            {job?.companyDetails?.companyName
              ? job.companyDetails.companyName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()
              : "N/A"}
          </p>
        </div>

        <h1 className="text-neutral-900 text-2xl font-bold mt-5 capitalize">
          {job?.title}
        </h1>

        {/* Job details */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Image
              src={ICONS.location}
              alt="location-icon"
              className="size-[18px]"
            />
            <p className="text-neutral-400">{job?.location}Location</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={ICONS.jobType}
              alt="clock-icon"
              className="size-[18px]"
            />
            <p className="text-neutral-400">{job?.locationType}</p>
          </div>
        </div>

        {/* hr */}
        <hr className="w-full border border-neutral-100 h-[2px] my-6" />

        {/* Apply details */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Image
              src={ICONS.calender}
              alt="clock-icon"
              className="size-[18px]"
            />
            <p className="text-neutral-400">
              {convertDate(job?.applicationDeadline)}
            </p>
          </div>

          {/* Apply btn */}
          <div className="flex items-center gap-3">
            {isDetailsBtnVisible && (
              <Link
                href={`/${
                  job.employmentType === "Internship" ? "internships" : "jobs"
                }/${job._id}`}
              >
                <Button variant="muted" className=" rounded-3xl">
                  Details
                </Button>
              </Link>
            )}
            {showApplyButton && (
              <div className="hidden sm:block">
                <ApplyJob jobId={job._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailCard;
