import SkillsProgrammesPageAdmin from "../_components/SkillsProgrammesPageAdmin";

const Job = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <SkillsProgrammesPageAdmin id={id} />
    </div>
  );
};

export default Job;
