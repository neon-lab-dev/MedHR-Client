import EditCoursePage from "../_components/EditCoursePage";

const EditCourse = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <EditCoursePage id={id} />
    </div>
  );
};

export default EditCourse;
