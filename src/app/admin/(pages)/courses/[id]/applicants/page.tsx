"use client";
import { getSingleCourse } from "@/api/admin";
import Applicants from "@/commonPages/Course/Applicants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const AllApplicantsPage = () => {
  const { id } = useParams();
   const { isLoading, data } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getSingleCourse(id as string),
  });
  return (
    <Applicants data={data?.course} isLoading={isLoading} />
  );
};

export default AllApplicantsPage;
