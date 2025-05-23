import NotFound from "@/components/NotFound";
import JobShareButton from "./_components/JobShareButtonComponent";
import Link from "next/link";
import { AVAILABLE_JOB_TYPES } from "@/constants/jobTypes";
import SimilarJobsForYou from "./_components/SimilarJobsForYouComponent";
// import TrendingCourseToday from "@/components/TrendingCourseToday";
// import OurValuableHiringPartners from "@/components/OurValuableHiringPartners";
// import WhatWeDo from "@/components/WhatWeDo";
import SkillsAndExtraBenefits from "./_components/SkillsAndExtraBenefits";
import { getJobById } from "@/api/jobs";
import ApplyJob from "./_components/ApplyJob";
import Container from "@/components/Container";

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

  const isClosed =
    job.status !== "Open" || new Date(job.applicationDeadline) < new Date();
  return (
    <Container>
      <div className="wrapper flex flex-col pb-6">
        {/* job titles and cta */}
        <div className="py-16 flex items-end justify-between">
          <div className="flex gap-5 items-center">
            {/* <Image
              src={job.companyDetails.logo}
              alt="Company Logo"
              height={99}
              width={99}
              className="h-[62px] w-[62px] xl:h-[99px] xl:w-[99px] rounded-lg"
            /> */}

            <div className="bg-primary-550 p-2 rounded-full size-16 flex items-center justify-center text-white">
              <p className="text-xs xl:text-2xl font-semibold -tracking-[0.32px]">
                {job?.companyDetails?.companyName
                  ? job.companyDetails.companyName.charAt(0)
                  : "?"}
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
          <div className="flex-grow flex flex-col gap-4 xl:gap-6">
            <div className="p-6 rounded-[22px] border border-secondary-200 text-base lg:text-xl flex flex-col gap-3 lg:gap-3">
              <h3 className="capitalize font-semibold text-neutral-800">
                About {jobType.substring(0, jobType.length - 1)}{" "}
                <span className="ml-2 text-sm text-red-500">
                  {isClosed ? "(Status: Closed)" : null}
                </span>
              </h3>
              <p className=" text-neutral-700 flex flex-col gap-3 lg:gap-6">
                {job.description
                  .split("\n")
                  .filter((res) => res)
                  .map((para, index) => (
                    <span key={index}>{para}</span>
                  ))}
              </p>{" "}
              <h3 className="capitalize font-semibold text-neutral-800 mt-2 lg:mt-6">
                Roles and Responsibilities
              </h3>
              <ul className=" text-neutral-700 flex flex-col gap-1 list-disc">
                {job.responsibilities
                  .split("\n")
                  .filter((res) => res)
                  .map((res, index) => (
                    <li key={index} className="ml-8">
                      {res}
                    </li>
                  ))}
              </ul>
              <h3 className="capitalize font-semibold text-neutral-800 mt-2 lg:mt-6">
                Requirements
              </h3>
              <ul className=" text-neutral-700 flex flex-col gap-1 list-disc">
                {job.requirements
                  .split("\n")
                  .filter((res) => res)
                  .map((res, index) => (
                    <li key={index} className="ml-8">
                      {res}
                    </li>
                  ))}
              </ul>
              <div className="flex flex-col gap-1  mt-2 text-neutral-700">
                <span>Job-Type: {job.employmentType}</span>
                <span>Location: {job.location}</span>
                <span>Location Type: {job.locationType}</span>
                {job.employmentType === "Internship" ? (
                  <span>Duration: {job.employmentDuration} months</span>
                ) : null}
                {
                  <span>
                    {job.employmentType === "Internship"
                      ? "Stipend: "
                      : "Salary: "}
                    {job.salary ? `₹ ${job.salary}/month` : `Unpaid`}
                  </span>
                }
                {job.applicationDeadline && (
                  <span>
                    Application Deadline:{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </span>
                )}
                <span>
                  Posted At: {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <SkillsAndExtraBenefits
              extraBenefits={job.extraBenefits}
              skills={job.requiredSkills}
              className="xl:hidden"
            />
            <div className="p-4 lg:p-6 rounded-[22px] border border-secondary-200 text-xl flex flex-col gap-6">
              <h3 className="capitalize font-semibold text-neutral-800 text-2xl">
                About the Company
              </h3>
              <hr />
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-lg lg:text-xl text-neutral-800">
                    {job.companyDetails.companyName}
                  </span>
                  <div className="flex gap-3 lg:gap-6 items-center text-sm lg:text-base font-medium text-primary-500">
                    {job.companyDetails.websiteLink ? (
                      <Link
                        href={job.companyDetails.websiteLink}
                        target="_blank"
                      >
                        Website
                      </Link>
                    ) : (
                      "Website not available"
                    )}

                    <div className="h-2 w-2 rounded-full bg-secondary-100" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex gap-6 items-center text-base font-medium text-secondary-400">
                    <span>{job.companyDetails.industryType}</span>
                  </div>
                </div>
                {/* <Image
                  src={job.companyDetails.logo}
                  alt="Company Logo"
                  height={56}
                  width={56}
                  className="h-[56px] w-[56px] rounded-full"
                /> */}
                <div className="bg-primary-550 p-2 rounded-full size-10 flex items-center justify-center text-white">
                  <p className="text-xs xl:text-[16px] -tracking-[0.32px]">
                    {job?.companyDetails?.companyName
                      ? job.companyDetails.companyName.charAt(0)
                      : "?"}
                  </p>
                </div>
              </div>
              <hr />
              <p className=" text-neutral-700 flex flex-col gap-6">
                {job.companyDetails.bio
                  .split("\n")
                  .filter((res) => res)
                  .map((para, index) => (
                    <span key={index}>{para}</span>
                  ))}
              </p>
            </div>
          </div>
          <SkillsAndExtraBenefits
            extraBenefits={job.extraBenefits}
            skills={job.requiredSkills}
            className="hidden xl:flex"
          />
        </div>
      </div>
      <SimilarJobsForYou title={job.title} type={jobType} ignore={jobId} />
      {/* <TrendingCourseToday />
      <OurValuableHiringPartners />
      <WhatWeDo /> */}
    </Container>
  );
};

export default JobIdPage;
