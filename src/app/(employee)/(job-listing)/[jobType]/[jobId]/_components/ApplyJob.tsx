"use client";

import {
  handleApplyJobService,
  handleGetJobByIdForAdminService,
} from "@/api/jobs";
import Button from "@/components/Button";
import { useAppSelector } from "@/hooks/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ApplyJob = ({
  jobId,
  disabled = false,
}: {
  jobId: string;
  disabled?: boolean;
}) => {
  const [isApplied, setIsApplied] = React.useState(false);
  const { studentProfile } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useQuery({
    queryFn: () => handleGetJobByIdForAdminService(jobId),
    queryKey: ["job", jobId],
  });
  const { mutate, isPending } = useMutation({
    mutationFn: handleApplyJobService,
    onSuccess: (msg) => {
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  useEffect(() => {
    if (!data) return;
    setIsApplied(
      data.applicants.findIndex((a) => a.employee === studentProfile?._id) > -1
    );
  }, [data]);

  return (
    <>
      <Button
        disabled={isLoading || disabled || isApplied || isPending}
        onClick={() => {
          if (!studentProfile) {
            toast.error("Login to apply for the job");
            return;
          }
          mutate(jobId);
        }}
        className="w-full sm:w-auto"
      >
        {isLoading
          ? "Loading"
          : isApplied
          ? "Applied"
          : isPending
          ? "Applying..."
          : "Apply Now"}
      </Button>
    </>
  );
};

export default ApplyJob;
