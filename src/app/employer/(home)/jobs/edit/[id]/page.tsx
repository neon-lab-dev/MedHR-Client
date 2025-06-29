"use client";
import { handleGetJobByIdService } from "@/api/jobs";
import AddNewHiring from "@/commonPages/AddNewHiring";
import { IJob } from "@/types/job";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditJob = () => {
  const params = useParams();
  const jobId = params?.id;

  const [job, setJob] = useState<IJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  console.log(job);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await handleGetJobByIdService(jobId);
        setJob(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

//   if (loading) return <p>Loading job data...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;
//   if (!job) return <p>No job found</p>;

  return (
    <AddNewHiring path={"/employer"} backNavigationPath="/jobs" jobType={job?.employmentType.toLocaleLowerCase() as string} defaultValues={job} isLoading={loading} actionType="edit" />
  );
};

export default EditJob;
