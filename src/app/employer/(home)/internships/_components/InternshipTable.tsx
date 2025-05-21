"use client";
import { deleteJob, fetchJobs } from "@/api/employer";
import { IMAGES } from "@/assets";
import StatusLabel from "@/components/StatusLabel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface Internship {
  _id: string;
  title: string;
  salary: string;
  applicants: any[];
  employmentType: string;
  status: string;
}

interface Props {
  className: string;
}

const useFetchInternships = () => {
  return useQuery<Internship[], Error>({
    queryKey: ["jobs-employer-job"],
    queryFn: fetchJobs,
  });
};

const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (data: { success: boolean; message: string }) => {
      queryClient.invalidateQueries({ queryKey: ["jobs-employer-job"] });
      if (data.success) {
        toast.success("Job deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
      } else {
        toast.error(`Failed to delete job: ${data.message}`);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete job";
      console.error("Error deleting job:", errorMessage);
      toast.error(`Error: ${errorMessage}`);
    },
  });
};

const InternshipTable = ({ className }: { className: string }) => {
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const { data: jobs = [], isLoading, isError, error } = useFetchInternships();
  const allInternship = jobs.filter(
    (job) => job?.employmentType === "Internship"
  );
  const { mutate: deleteJob } = useDeleteJob();

  const handleMenuClick = (id: string) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    deleteJob(id);
  };

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

  if (isError) {
    return (
      <div>
        Error fetching jobs:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
  return (
    <div
      className={twMerge(
        `w-full overflow-x-auto h-[700px] max-w-[1300px] font-Poppins mx-auto px-0 ${className}`
      )}
    >
      <div className="rounded-[124px]">
        <table className="table w-full">
          <thead className="bg-secondary-100 w-full text-secondary-800 font-plus-jakarta-sans font-medium text-base">
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <span>Role</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Stipend Offered</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Total Applications</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Job Type</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Status</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Action</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody className="bg-white w-full text-base">
            {allInternship.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center font-Poppins">
                  No data found.
                </td>
              </tr>
            ) : (
              allInternship.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{job.title}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{job.salary}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>
                        {job.applicants.length}{" "}
                        <Link href={`/employer/dashboard/${job._id}`}>
                          <span className="text-red-500 underline cursor-pointer">
                            View Applications
                          </span>
                        </Link>{" "}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{job.employmentType}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <StatusLabel key="status" variant="applied">
                        {job.status}
                      </StatusLabel>
                    </div>
                  </td>
                  <td>
                    <div className="relative flex items-center gap-2">
                      <div
                        onClick={() => handleMenuClick(job._id)}
                        className="cursor-pointer"
                      >
                        <Image src={IMAGES.menudots} alt="Menu Icon" />
                      </div>
                      {dropdownOpenId === job._id && (
                        <div className="absolute right-0 mt-48 w-48 p-4 rounded-xl bg-white border shadow-lg z-10">
                          <Link href={`/employer/dashboard/${job._id}`}>
                            <div className="flex items-center gap-2 text-sm p-2">
                              <Image src={IMAGES.doc} alt="Role Icon" />
                              <span>View Applications</span>
                            </div>
                          </Link>
                          <Link href={`/employer/${job._id}`}>
                            <div className="flex items-center gap-2 text-sm p-2">
                              <Image src={IMAGES.view} alt="Role Icon" />
                              <span>View</span>
                            </div>
                          </Link>
                          <div
                            onClick={() => handleDelete(job._id)}
                            className="flex items-center gap-2 text-sm p-2 cursor-pointer"
                          >
                            <Image src={IMAGES.bin} alt="Role Icon" />
                            <span className="text-red-500">Delete</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternshipTable;
