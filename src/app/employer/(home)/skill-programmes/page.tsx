import { getAllEmployerSkillProgrammes } from '@/api/employer';
import SkillProgrammesDashboard from '@/commonPages/SkillProgrammesDashboard';
import { useQuery } from '@tanstack/react-query';

const SkillProgrammePage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["skillprogrammes"],
    queryFn: getAllEmployerSkillProgrammes,
  });
  return (
    <SkillProgrammesDashboard skillProgrammes={data?.skills} isLoading={isLoading} navigatePath="/employer" />
  );
};

export default SkillProgrammePage;