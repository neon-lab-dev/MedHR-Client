import { getJobsByTitle } from "@/api/jobs";
import Button from "@/components/Button";
import JobDetailCard from "@/components/JobDetailCard";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  type: string;
  ignore: string;
};

const SimilarJobsForYouComponent = async ({ title, type, ignore }: Props) => {
  let jobs = await getJobsByTitle(title.split(" ")[0]);

  if (!jobs || jobs.length === 0) return null;

  jobs = jobs.filter((job) => job._id !== ignore);

  if (jobs.length === 0) return null;

  return (
    <div className="py-section flex flex-col items-center justify-center gap-14">
      <h3 className="section-heading wrapper max-width m-auto">
        <span className="highlight">Similar Jobs</span> For You
      </h3>
      <div className="w-full overflow-hidden wrapper-left">
        <div className="carousel carousel-center w-full p-4 space-x-6 bg-neutral rounded-box">
          {jobs.map((details, index) => (
            <div key={index} className="carousel-item">
              <JobDetailCard
                wrapperClassName="xl:min-w-[500px]"
                showApplyButton
                job={details}
              />
            </div>
          ))}
        </div>
      </div>
      <Link href={`/${type}`}>
        <Button variant="outline" className="px-12 py-5">
          View all openings
        </Button>
      </Link>
    </div>
  );
};

export default SimilarJobsForYouComponent;
