import NotFound from "@/components/NotFound";
import JobShareButton from "./_components/JobShareButtonComponent";
import { AVAILABLE_JOB_TYPES } from "@/constants/jobTypes";
import { getJobById } from "@/api/jobs";
import ApplyJob from "./_components/ApplyJob";
import Container from "@/components/Container";
import Image from "next/image";
import { ICONS } from "@/assets";
import { convertDate } from "@/helpers/convertDate";

const JobIdPage = async ({
  params,
}: {
  params: Promise<{ jobType: string; jobId: string }>;
}) => {
  const resolvedParams = await params;
  const { jobType, jobId } = resolvedParams;

  if (!AVAILABLE_JOB_TYPES.includes(jobType)) return <NotFound />;

  const job = await getJobById(jobId);
  if (!job) return <NotFound />;

  const isClosed = job.status !== "Open";

  const headingStyle = "capitalize font-semibold text-[26px] text-neutral-800";

  return (
    <Container>
      <div className="wrapper flex flex-col pb-6 font-poppins">
        {/* job titles and cta */}
        <div className="py-16 flex items-end justify-between">
          <div className="flex gap-5 items-center">
            <div className="bg-primary-550 p-2 rounded-full size-16 flex items-center justify-center text-white">
              <p className="text-xs xl:text-2xl font-semibold -tracking-[0.32px]">
                {job?.companyDetails?.companyName
                  ? job.companyDetails.companyName
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                      .toUpperCase()
                  : "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[20px] lg:text-[32px] -tracking-[0.44px] font-semibold text-neutral-900">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-sm lg:text-[22px] text-neutral-400">
                <span>{job.companyDetails.companyName}</span>
                <div className="w-[5px] h-[5px] bg-neutral-400 rounded-full" />
                <span>{job.locationType}</span>
              </div>
            </div>
          </div>
          <div className="fixed z-30 sm:z-auto bottom-0 left-0 w-full sm:w-auto sm:static flex-row-reverse sm:flex-row flex items-center gap-5 bg-white py-3 px-6 sm:px-0 sm:py-0">
            <JobShareButton jobTitle="Test Title" />
            <ApplyJob jobId={jobId} disabled={isClosed} />
          </div>
        </div>


        {/* job details */}
        <div className="flex gap-6">
          <div className="p-6 rounded-xl border border-secondary-200 text-base flex flex-col gap-6 w-full xl:w-[30%] h-fit sticky top-10">
            <h3 className="capitalize font-semibold text-xl text-neutral-800">
              {jobType.substring(0, jobType.length - 1)} Details
              <span className="ml-2 text-sm text-red-500">
                {isClosed ? "(Status: Closed)" : null}
              </span>
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.location}
                  alt="location-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">
                    Location:
                  </span>{" "}
                  {job?.city}, {job?.country}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.jobType}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">
                    Location Type:
                  </span>{" "}
                  {job?.locationType}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.department}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">
                    Department:
                  </span>{" "}
                  {job?.department}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.employmentType}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">
                    Employment type:
                  </span>{" "}
                  {job?.employmentTypeCategory}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.duration}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">
                    Duration:
                  </span>{" "}
                  {job?.duration} months
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.salary}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">Salary:</span>{" "}
                  {job?.salary}/month
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.deadline}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">
                    Deadline:
                  </span>{" "}
                  {convertDate(job?.applicationDeadline)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={ICONS.company}
                  alt="clock-icon"
                  className="size-[18px]"
                />
                <p className="text-neutral-400">
                  <span className="font-medium text-neutral-700">Company:</span>{" "}
                  <a
                    href={job?.companyDetails?.websiteLink || "#"}
                    className="text-primary-500 underline"
                  >
                    {job?.companyDetails?.companyName}
                  </a>
                </p>
              </div>
            </div>
            <ApplyJob jobId={jobId} disabled={isClosed} />
          </div>

          <div className="p-6 rounded-xl border border-secondary-200 text-base flex flex-col gap-10 w-full xl:w-[70%]">
            {/* Header */}
            <div className="flex items-center gap-2">
              <Image
                src={ICONS.calender}
                alt="clock-icon"
                className="size-[18px]"
              />
              <p className="text-neutral-400">
                <span className="font-medium text-neutral-700">Posted:</span>{" "}
                {convertDate(job?.postedAt)}
              </p>
            </div>

            {/* Job Description */}
            <div>
              <h3 className={headingStyle}>
                {jobType.substring(0, jobType.length - 1)} Description
              </h3>
              <p className="text-neutral-700 mt-2">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className={headingStyle}>Requirements</h3>
              <ul className="text-neutral-700 flex flex-col gap-1 list-disc mt-2">
                {job.requirements
                  .split("\n")
                  .filter((res) => res)
                  .map((res, index) => (
                    <li key={index} className="ml-8">
                      {res}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Roles and Responsibilities */}
            {job.responsibilities && (
              <div>
                <h3 className={headingStyle}>Roles and Responsibilities</h3>
                <ul className=" text-neutral-700 flex flex-col gap-1 list-disc mt-2">
                  {job.responsibilities}
                </ul>
              </div>
            )}

            {/* Skills Required */}
            <div>
              <h3 className={headingStyle}> Skills Required</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {job?.requiredSkills.map((label) => (
                  <div
                    className="rounded-md border border-neutral-400/30 text-neutral-700 px-2 py-1 text-xs"
                    key={label}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Benefits */}
            <div>
              <h3 className={headingStyle}> Extra Benefits</h3>
              <ul className=" text-neutral-700 flex flex-col gap-1 list-disc mt-2">
                {job.extraBenefits}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JobIdPage;
