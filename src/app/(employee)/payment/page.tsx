"use client";
import React, { useState } from 'react';

const Payment: React.FC = () => {

  const [isProcessing, setIsProcessing] = useState(false);


  const initiateCashfreePayment = async () => {
    setIsProcessing(true);

    try {
      // In real implementation, you would call your backend to create order
      // const response = await fetch('/api/create-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     amount: 500,
      //     customerName: paymentDetails.name,
      //     customerEmail: paymentDetails.email,
      //     customerPhone: paymentDetails.phone,
      //   })
      // });
      
      // const orderData = await response.json();
      
      // For demo purposes, we'll simulate the Cashfree integration
      setTimeout(() => {
        setIsProcessing(false);
        // In real implementation, you would redirect to Cashfree checkout
        // window.location.href = orderData.payment_link;
        
        alert('Redirecting to Cashfree payment gateway...');
        // Simulate successful payment callback
      }, 2000);

    } catch (error:any) {
        console.log(error);
      setIsProcessing(false);
      alert('Payment initiation failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary-500 py-6 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Complete Your Registration</h1>
            <div className="bg-white rounded-lg px-3 py-1">
              <span className="text-primary-500 font-semibold text-sm">Secure</span>
            </div>
          </div>
          <p className="text-blue-100 mt-2">Join our healthcare community</p>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Registration Fee</span>
              <span className="text-lg font-bold text-primary-500">₹500.00</span>
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary-500">₹500.00</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-4">Payment Method</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CF</span>
                  </div>
                  <span className="font-medium text-gray-700">Cashfree Payments</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Secure payment processed by Cashfree. All your data is protected.
              </p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={initiateCashfreePayment}
            disabled={isProcessing}
            className={`w-full mt-8 py-3 px-4 rounded-lg font-semibold text-white transition-colors cursor-pointer ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              `Pay ₹500.00`
            )}
          </button>

          {/* Security Badges */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">SSL Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">PCI DSS</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;