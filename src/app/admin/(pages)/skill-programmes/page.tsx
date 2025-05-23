"use client";
import { getAllSkillProgrammes } from "@/api/admin";
import SkillProgrammesDashboard from "@/commonPages/SkillProgrammesDashboard";
import { useQuery } from "@tanstack/react-query";

const SkillProgramme = () => {

  const { isLoading, data } = useQuery({
    queryKey: ["skillprogrammes"],
    queryFn: getAllSkillProgrammes,
  });

  return (
    <SkillProgrammesDashboard skillProgrammes={data?.skills} isLoading={isLoading} navigatePath="/admin" />
  );
};

export default SkillProgramme;
