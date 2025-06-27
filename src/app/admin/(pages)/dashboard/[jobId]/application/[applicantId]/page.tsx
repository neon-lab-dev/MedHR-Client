import ApplicationPage from "../../_components/ApplicationPage";

const ApplicationDetails = async ({
  params,
}: {
  params: Promise<{ applicantId: string; jobId: string }>;
}) => {
  const resolvedParams = await params;
  const { applicantId, jobId } = resolvedParams;
  return (
    <div>
      <ApplicationPage jobId={jobId} applicantId={applicantId} />
    </div>
  );
};

export default ApplicationDetails;
