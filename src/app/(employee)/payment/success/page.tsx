import PaymentSuccessPage from "@/components/PaymentSuccessPage/PaymentSuccessPage";
import { Suspense } from "react";

const PaymentSuccess = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default PaymentSuccess;
