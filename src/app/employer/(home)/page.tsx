"use client";
import KPICard from "@/components/KPICard";
import React from "react";
import applicationIcon from "@/assets/icons/applications.svg";
import hourglass from "@/assets/icons/hourglass.svg";
import checkCircle from "@/assets/icons/check-circle.svg";
import closeCircle from "@/assets/icons/close-circle.svg";
import Tablel from "./_components/Tablel";
import { useQuery } from '@tanstack/react-query';
import { fetchJobData } from "@/api/employer";
import { Oval } from "react-loader-spinner";

export type JobItem = {
  title: string;
  status: string;
};

export type JobData = {
  jobsCount: number;
  jobs: {
    title: string;
    status: string;
    employmentType: string;
    applicants: {
      status: string;
    }[];
  }[];
};

const Dashboard = () => {
  const { data, error, isLoading } = useQuery<JobData>({
    queryKey: ['jobs'],
    queryFn: fetchJobData,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Oval
          height={40}
          width={40}
          color="#F9533A"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f4f4f4"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching job data: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const jobsCount = data.jobsCount || 0;
  let internshipsPosted = 0;
  let internshipsHired = 0;
  let internshipsRejected = 0;

  const openJobs = data.jobs
    .filter((job) => job.status === "Open")
    .map((job) => {
      if (job.employmentType === "Internship") {
        internshipsPosted++;
        job.applicants.forEach((applicant) => {
          if (applicant.status === "HIRED") {
            internshipsHired++;
          } else if (applicant.status === "REJECTED") {
            internshipsRejected++;
          }
        });
      }
      return {
        title: job.title,
        status: job.status,
      };
    });
    console.log(openJobs);

  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-6">
      <div className="flex items-center gap-4 overflow-x-auto">
        <KPICard
          classNames="w-full max-w-full"
          image={applicationIcon}
          title="Jobs Posted"
          value={jobsCount - internshipsPosted}
          alt="application-icon"
        />
        <KPICard
          classNames="w-full max-w-full"
          image={hourglass}
          title="Internships Posted"
          value={internshipsPosted}
          alt="hourglass-icon"
        />
        <KPICard
          classNames="w-full max-w-full"
          image={checkCircle}
          title="Internships Hired"
          value={internshipsHired}
          alt="check-circle-icon"
        />
        <KPICard
          classNames="w-full max-w-full"
          image={closeCircle}
          title="Internships Rejected"
          value={internshipsRejected}
          alt="close-circle-icon"
        />
      </div>

      {/* Display open jobs in a table */}
      <Tablel className="w-full max-w-full"/>
    </div>
  );
};

export default Dashboard;
