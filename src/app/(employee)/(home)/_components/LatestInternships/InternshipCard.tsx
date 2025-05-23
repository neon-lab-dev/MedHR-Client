import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IJob } from "@/types/job";

type TInternshipCardProps = {
  showApplyButton?: boolean;
  wrapperClassName?: string;
  job: IJob;
  isApplied?: boolean;
};

const InternshipCard: React.FC<TInternshipCardProps> = ({
  wrapperClassName,
  job,
}) => {
  return (
    <div
      className={twMerge(
        "w-[380px] h-[510px] bg-white hover:bg-neutral-450/30 font-plus-jakarta-sans border-2 border-neutral-100 rounded-2xl shadow-job-card-shadow relative hover:border-primary-500 transition-all duration-300 ease-in-out transform ",
        wrapperClassName
      )}
    >
      {/* Banner image */}
      <Image
        src={IMAGES.internshipCardBg}
        alt=""
        className="w-full rounded-t-2xl"
      />
      <div className="p-6">
        {/* Company logo */}
        <div className="flex items-center gap-2">
          {/* <Image
            src={IMAGES.companyLogo}
            alt=""
            className="size-8 object-cover"
          /> */}
          <div className="size-12 rounded-md bg-primary-50 text-primary-500 border border-primary-500/20 flex items-center justify-center">
            <h1 className="text-sm font-bold">
              {job?.companyDetails?.companyName
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </h1>
          </div>
          <p className="text-neutral-400">{job?.companyDetails?.companyName}</p>
        </div>

        <h1 className="text-neutral-900 text-xl font-bold mt-4">{job?.title}</h1>

        {/* Job details */}
        <div className="flex flex-col gap-5 mt-6">
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
          <div className="flex items-center gap-1">
            <Image
              src={ICONS.sallary}
              alt="clock-icon"
              className="size-[18px]"
            />
            <p className="text-neutral-400">₹ {job?.salary} /month</p>
          </div>
        </div>

        {/* Required skills */}
        <div className="mt-6">
          <p className="text-neutral-400">Required Skills:</p>
          <div className="flex items-center gap-[10px] mt-2">
            {job?.requiredSkills?.map((skill) => (
              <div
                key={skill}
                className="px-3 py-[6px] text-secondary-600 font-medium text-sm bg-neutral-450 rounded-[999px] capitalize"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* hr */}
        <hr className="w-full border border-neutral-100 h-[2px] my-6" />

        {/* Apply details */}
        <div className="flex items-center justify-between">
          <div className="px-[10px] py-[6px] bg-primary-50 text-secondary-800 text-sm font-medium rounded-lg">
            Internship
          </div>
          <Link
            href={`/${
              job.employmentType === "Internship" ? "internships" : "jobs"
            }/${job._id}`}
            className="text-primary-500 font-semibold flex items-center gap-1"
          >
            View Details
            <Image src={ICONS.rightArrow} alt="" className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
