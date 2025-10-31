"use client";
import Button from "@/components/Button";
import { getLatestJobs } from "@/api/jobs";
import Link from "next/link";
import React from "react";
import NoDataFound from "@/components/NoDataFound";
import SectionHeading from "@/components/Reusable/SectionHeading/SectionHeading";
import Container from "@/components/Container";

import JobCarousel from "./JobCarousel";
import { useQuery } from "@tanstack/react-query";

const LatestJobs = () => {
  const { data } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: getLatestJobs,
  });

  if (!data || data.length === 0) return null;

  return (
    <Container>
      <div className="py-section flex flex-col items-center justify-center gap-14">
        <SectionHeading
          highlightedText="Jobs"
          normalText="You Might Like"
          align="left"
        />

        {data?.length === 0 ? (
          <NoDataFound message="No Jobs Available" />
        ) : (
          <JobCarousel jobs={data} />
        )}
        {data?.length > 0 && (
          <Link href="/jobs">
            <Button variant="normal" className="px-9 py-4">
              View all openings
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
};

export default LatestJobs;

{
  /* <div className="w-full overflow-hidden wrapper-left">
          <div className="carousel carousel-center w-full p-4 space-x-6 bg-neutral rounded-box">
            {jobs?.map((details, index) => (
              <div key={index} className="carousel-item">
                <JobDetailCard
                  wrapperClassName="min w-[400px] xl:min-w-[500px]"
                  job={details}
                />
              </div>
            ))}
          </div>
        </div> */
}
