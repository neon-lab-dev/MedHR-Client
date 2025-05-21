"use client"

import { fetchJobDetails } from "@/api/employer";
import KPICard from "@/components/KPICard";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import applicationIcon from "@/assets/icons/applications.svg";
import hourglass from "@/assets/icons/hourglass.svg";
import checkCircle from "@/assets/icons/check-circle.svg";
import closeCircle from "@/assets/icons/close-circle.svg";
import Table from "./ViewApplicaitonTable";

const JobPageEmployer = ({jobId} : {jobId:string}) => {
    const { data: jobData, isLoading } = useQuery({
        queryKey: ['jobDetails', jobId],
        queryFn: () => fetchJobDetails(jobId),
        enabled: !!jobId, // Only fetch if jobId is available
      });
    
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
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
    
    
    
      if (!jobData) {
        return <div className="flex justify-center items-center h-screen">No job data available.</div>;
      }
    
      const formData = {
        title: jobData.title || "",
        employmentType: jobData.employmentType || "",
        responsibilities: jobData.responsibilities || "",
        description: jobData.description || "",
        applicationDeadline: jobData.applicationDeadline || "",
        employmentDuration: jobData.employmentDuration || "",
        salary: jobData.salary || "",
        requiredSkills: jobData.requiredSkills ? jobData.requiredSkills.join(", ") : "",
        extraBenefits: jobData.extraBenefits || "",
        requirements: jobData.requirements || "",
        experience: jobData.experience || "",
        location: jobData.location || "",
        locationType: jobData.locationType || "",
        companyDetails: jobData.companyDetails || {},
        status: jobData.status || "",
        applicants: jobData.applicants || [],
      };
    return (
        <div className="bg-[#f5f6fa] p-6 flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-10 overflow-x-auto">
        <KPICard
          classNames="w-full max-w-full"
          image={applicationIcon}
          title="Total Applications"
          value={formData.applicants.length}
          alt="application-icon"
        />
        <KPICard
          classNames="w-full max-w-full"
          image={hourglass}
          title="Review Pending"
          value={formData.applicants.filter((applicant: { status: string; }) => applicant.status === 'APPLIED').length}
          alt="application-icon"
        />
        <KPICard
          classNames="w-full max-w-full"
          image={checkCircle}
          title="Selected"
          value={formData.applicants.filter((applicant: { status: string; }) => applicant.status === 'HIRED').length}
          alt="application-icon"
        />
        <KPICard
          classNames="w-full max-w-full"
          image={closeCircle}
          title="Rejected"
          value={formData.applicants.filter((applicant: { status: string; }) => applicant.status === 'REJECTED').length}
          alt="application-icon"
        />
      </div>

      {/* Pass formData as prop to Table */}
      <Table formdata={formData} jobId={jobId} className="w-full" />
    </div>
    );
};

export default JobPageEmployer;