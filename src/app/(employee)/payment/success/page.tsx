"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [isVerifying, setIsVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!orderId) return;

    // 1) Call backend to verify payment
    const verifyPayment = async () => {
      try {
        setIsVerifying(true);
        const res = await fetch("http://localhost:7000/api/v1/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();

        if (res.ok) {
          setSuccess(true);
          setMessage("Payment verified successfully!");
        } else {
          setSuccess(false);
          setMessage(data.error || "Payment verification failed");
        }
      } catch (err) {
        console.error(err);
        setSuccess(false);
        setMessage("Payment verification failed");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();

    // 2) Redirect to dashboard after 10 seconds
    const timer = setTimeout(() => {
    //   router.push("/dashboard"); // change to your dashboard route
    
    }, 10000);

    return () => clearTimeout(timer);
  }, [orderId, router]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {isVerifying ? (
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Verifying Payment...
          </h2>
        ) : success ? (
          <>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-700 mb-4">
              Your payment with order ID{" "}
              <span className="font-mono font-bold">{orderId}</span> has been
              verified.
            </p>
            <p className="text-gray-500">
              You will be redirected to your dashboard in{" "}
              <span className="font-bold">10 seconds</span>.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Payment Verification Failed
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
