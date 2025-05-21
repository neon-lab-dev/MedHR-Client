
import ChangePassword from "@/components/AuthModal/ChangePassword";

const ResetPassword = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <ChangePassword token={id} />
    </div>
  );
};

export default ResetPassword;
