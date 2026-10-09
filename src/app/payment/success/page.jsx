"use client";

import React, { useEffect, useState } from "react";

export default function PaymentResult() {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get session_id from URL query
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setError("No session ID provided.");
      setLoading(false);
      return;
    }

    // Fetch payment data from backend
    const fetchPayment = async () => {
      try {
        const res = await fetch(
          `https://coombb.com/backend/api/payment/success?session_id=${sessionId}`,
        );
        const data = await res.json();

        if (data.success) {
          setPaymentData(data);
        } else {
          setError(data.message || "Payment failed.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching payment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, []);

  const handleBackHome = () => {
    window.location.href = "/";
  };

  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  if (loading)
    return <p className="p-6 text-center">Loading payment details...</p>;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          Payment Failed ❌
        </h1>
        <p className="mb-4">{error}</p>
        <div className="flex gap-4">
          <button
            onClick={handleBackHome}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Back to Home
          </button>
          <button
            onClick={handleContinueShopping}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Retry / Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Payment success view
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black-50 p-6">
      <h1 className="text-3xl font-bold text-black-700 mb-4">
        Payment Successful! 🎉
      </h1>
      <p className="mb-2">{paymentData.message}</p>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <p>
          <strong>Order Code:</strong> {paymentData.order_code}
        </p>
        <p>
          <strong>Payment Status:</strong> {paymentData.payment_status}
        </p>
        <p>
          <strong>Order Status:</strong> {paymentData.order_status}
        </p>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleBackHome}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Back to Home
        </button>
        <button
          onClick={handleContinueShopping}
          className="px-6 py-2 bg-black-600 hover:bg-black-700 text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
