
import EmployerPage from './../_components/EmployerPage';

const EmployerDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <EmployerPage id={id} />
    </div>
  );
};

export default EmployerDetails;
