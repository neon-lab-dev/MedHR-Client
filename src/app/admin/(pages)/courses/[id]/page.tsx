import EditCourse from "@/commonPages/Course/EditCourse";

const EditCoursePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <EditCourse id={id} navigatePath="/admin" />
    </div>
  );
};

export default EditCoursePage;
