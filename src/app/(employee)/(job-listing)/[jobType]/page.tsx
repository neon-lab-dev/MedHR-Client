import JobTypePage from "../_components/JobTypePage";

const PageComponent = async ({ params }: { params: Promise<{ jobType: string }> }) => {
  const resolvedParams = await params;
  const { jobType } = resolvedParams;
  
  return (
    <div>
      <JobTypePage jobType={jobType} />
    </div>
  );
};

export default PageComponent;
