import SkillsProgrammesPageEmployer from "../_components/SkillsProgrammesPageEmployer";


const Job = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <SkillsProgrammesPageEmployer id={id} />
    </div>
  );
};

export default Job;
