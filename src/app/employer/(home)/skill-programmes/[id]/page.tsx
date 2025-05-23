import UpdateSkillProgrammeDashboard from "@/commonPages/UpdateSkillProgrammeDashboard";

const Job = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
       <UpdateSkillProgrammeDashboard id={id} navigatePath="/employer" />
    </div>
  );
};

export default Job;
