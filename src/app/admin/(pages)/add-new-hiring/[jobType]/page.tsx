"use client";
import AddNewHiring from "@/commonPages/AddNewHiring";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  return <AddNewHiring path={"/admin"} jobType={params.jobType as string} />;
};
export default Page;
