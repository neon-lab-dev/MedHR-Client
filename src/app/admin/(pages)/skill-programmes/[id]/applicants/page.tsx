/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getSingleSkill } from "@/api/admin";
import Applicants from "@/commonPages/Course/Applicants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const AllApplicantsPage = () => {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["skillprogramme", id],
    queryFn: () => getSingleSkill(id as string),
  });

  return <Applicants data={data?.skill} isLoading={isLoading} />;
};

export default AllApplicantsPage;
