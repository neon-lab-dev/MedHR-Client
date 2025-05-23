import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { IJob } from "@/types/job";
import ApplyJob from "@/app/(employee)/(job-listing)/[jobType]/[jobId]/_components/ApplyJob";

type Props = {
  showApplyButton?: boolean;
  isDetailsBtnVisible?: boolean;
  wrapperClassName?: string;
  job: IJob;
  isApplied?: boolean;
};

const JobDetailCard = ({
  showApplyButton,
  isDetailsBtnVisible=true,
  wrapperClassName,
  job,
}: Props) => {
  if (!job) return null;
  return (
    <div
      className={twMerge(
        "max-w-[450px] min-h-[600px] xl:min-h-[530px] bg-white font-plus-jakarta-sans border border-neutral-100 rounded-2xl shadow-job-card-shadow relative hover:border-primary-500  transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between",
        wrapperClassName
      )}
    >
      {/* Banner image */}
      <Image src={IMAGES.jobCardBg} alt="" className="w-full rounded-t-2xl" />
      <div className="p-7 absolute top-12 w-full">
        {/* Company logo */}
        {/* <Image
          src={IMAGES.companyLogo}
          alt=""
          className="size-[91px] object-cover"
        /> */}
        <div className="size-20 rounded-xl bg-primary-50 text-primary-500 border border-primary-500/20 flex items-center justify-center">
          <h1 className=" text-2xl font-bold">
            {job?.companyDetails?.companyName
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </h1>
        </div>
        <h1 className="text-neutral-900 text-2xl font-bold mt-3 capitalize">
          {job?.title}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-neutral-400">
            {" "}
            {job?.companyDetails?.companyName}
          </p>
          <div className="bg-neutral-400 size-[5px] rounded-full"></div>
          <p className="text-neutral-400">Ahmedabad, India</p>
        </div>

        <p className="text-neutral-400 mt-6">
          {job?.description?.length > 70
            ? `${job?.description?.slice(0, 70)}...`
            : job?.description}
        </p>

        {/* Job details */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Image src={ICONS.clock} alt="clock-icon" className="size-[18px]" />
            <p className="text-neutral-400">{job?.employmentType}</p>
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

        {/* Required skills */}
        <div className="flex items-center gap-[10px] mt-[18px] overflow-x-auto hide-scrollbar">
  {job?.requiredSkills?.map((skill) => (
    <div
      key={skill}
      className="px-3 py-[6px] text-secondary-600 font-medium text-sm bg-neutral-450 rounded-[999px] capitalize whitespace-nowrap"
    >
      {skill}
    </div>
  ))}
</div>


        {/* hr */}
        <hr className="w-full border border-neutral-100 h-[2px] my-6" />

        {/* Apply details */}
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-neutral-400">Job Offer</p>
            <h2 className="text-primary-500 text-xl font-bold mt-1">
              ₹ {job?.salary}
            </h2>
          </div>

          {/* Apply btn */}
          <div className="flex items-center gap-3">
            {
              isDetailsBtnVisible &&
              <Link
              href={`/${
                job.employmentType === "Internship" ? "internships" : "jobs"
              }/${job._id}`}
            >
              <Button variant="muted" className="px-5 py-4">
                View full details
              </Button>
            </Link>
            }
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
