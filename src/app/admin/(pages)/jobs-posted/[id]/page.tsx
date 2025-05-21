import JobsPostedPage from "../_components/JobsPostedPage";

const Job = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  return (
    <div>
      <JobsPostedPage id={id} />
    </div>
  );
};

export default Job;
