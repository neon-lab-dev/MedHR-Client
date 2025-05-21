import ViewIdPage from "../_components/ViewIdPage";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ viewId: string }>;
}) => {
  const resolvedParams = await params;
  const { viewId } = resolvedParams;

  return (
    <div>
      <ViewIdPage viewId={viewId} />
    </div>
  );
};

export default JobDetailsPage;
