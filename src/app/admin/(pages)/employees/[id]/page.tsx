import EmployeePage from "../_components/EmployeePage";


const EmployeeDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <EmployeePage id={id} />
    </div>
  );
};

export default EmployeeDetails;
