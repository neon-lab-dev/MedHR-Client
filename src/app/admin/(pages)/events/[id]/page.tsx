import UpdateEventPage from "../../../../../commonPages/UpdateEventPage";


const UpdateEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = await params;
  const { id } = resolvedParams;
    return (
        <div>
            <UpdateEventPage id={id} navigateRoute="/admin/events" />
        </div>
    );
};

export default UpdateEvent;