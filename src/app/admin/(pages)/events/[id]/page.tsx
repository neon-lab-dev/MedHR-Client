import UpdateEventPage from "../_components/UpdateEventPage";


const UpdateEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = await params;
  const { id } = resolvedParams;
    return (
        <div>
            <UpdateEventPage id={id} />
        </div>
    );
};

export default UpdateEvent;