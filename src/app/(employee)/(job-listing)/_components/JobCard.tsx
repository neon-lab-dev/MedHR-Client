
import React from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { IJob } from "@/types/job";
import ApplyJob from "@/app/(employee)/(job-listing)/[jobType]/[jobId]/_components/ApplyJob";
import Button from "@/components/Button";

type Props = {
  showApplyButton?: boolean;
  wrapperClassName?: string;
  job: IJob;
  isApplied?: boolean;
};

const JobCard = ({
  showApplyButton,
  wrapperClassName,
  job,
  isApplied,
}: Props) => {
  if (!job) return null;
  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 xl:gap-5 p-4 xl:p-6 rounded-[20px] border border-neutral-100 bg-white",
        wrapperClassName
      )}>
      <div className="flex gap-3 items-center">
        {/* <Image
          src={job.companyDetails.logo}
          alt="Company Logo"
          height={64}
          width={64}
          className="h-9 w-9 xl:h-16 xl:w-16"
        /> */}
        <div className="bg-primary-550 p-2 rounded-full size-10 flex items-center justify-center text-white">
          <p className="text-xs xl:text-[16px] -tracking-[0.32px]">
            {job?.companyDetails?.companyName
              ? job?.companyDetails?.companyName?.charAt(0)
              : "?"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base xl:text-[22px] -tracking-[0.44px] font-semibold text-neutral-900">
            {job.title}
          </h3>
          <div className="flex items-center text-xs gap-2 xl:text-[18px] text-neutral-400">
            <span className="capitalize">{job?.companyDetails?.companyName}</span>
            <div className="w-[5px] h-[5px] bg-neutral-400 rounded-full" />
            <span>{job.locationType}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {[
          job.employmentType,
          job.locationType,
          `Exp: ${job.experience}`,
          job.employmentType === "Internship"
            ? `${job.employmentDuration} months`
            : "",
        ]
          ?.filter((item) => item !== "")
          ?.map((tag) => (
            <div
              key={tag}
              className=" py-2 xl:py-2.5 font-medium rounded-md px-3 xl:px-[18px] bg-white border border-secondary-200 text-xs xl:text-sm text-secondary-400"
            >
              {tag}
            </div>
          ))}
      </div>
      <hr />
      <div className="flex justify-between items-center gap-6 sm:gap-16 xl:gap-36">
        <div className="flex flex-col gap-1 ">
          <span className="text-xs xl:text-base text-neutral-400">Salary</span>
          <span className="text-x xl:text-base !font-semibold text-primary-500">
            {job.salary === "Unpaid" ? "" : `₹ ${job.salary}/month`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${job.employmentType === "Internship" ? "internships" : "jobs"
              }/${job._id}`}
          >
            <Button variant="muted">View full details</Button>
          </Link>
          {showApplyButton && (
            <div className="hidden sm:block">
              <ApplyJob jobId={job._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;