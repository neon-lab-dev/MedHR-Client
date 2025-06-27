import JobPageEmployer from "./_components/JobPageEmployer";

const Dashboard = async ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const resolvedParams = await params;
  const { jobId } = resolvedParams;

  return (
    <div>
      <JobPageEmployer jobId={jobId} />
    </div>
  );
};

export default Dashboard;
