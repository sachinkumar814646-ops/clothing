"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "../../../lib/menu-context";

export default function PaymentFailure() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Payment failed.");
  const [order, setOrder] = useState(null);
  const { settings } = useApp();
  console.log("settings", settings);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setErrorMessage("No session ID provided.");
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const res = await fetch(
          `https://coombb.com/backend/api/payment/cancel?session_id=${sessionId}`,
        );

        const data = await res.json();

        // ✅ Store order data
        if (data.order) {
          setOrder(data.order);
        }

        // ✅ Set message
        if (!data.success) {
          setErrorMessage(
            data.message || "Your payment could not be processed.",
          );
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Error fetching payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, []);

  const handleBackHome = () => {
    window.location.href = "/";
  };

  const handleRetry = () => {
    window.location.href = "/";
  };

  if (loading) {
    return (
      <p className="p-6 text-center text-lg">Checking payment status...</p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        {/* ❌ Title */}
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Payment Failed ❌
        </h1>

        {/* ⚠️ Custom Message */}
        <p className="text-gray-700 mb-3">
          Your order is{" "}
          <span className="font-semibold text-black-600">confirmed </span>
          but your{" "}
          <span className="font-semibold text-red-600">
            payment is not confirmed
          </span>
          .
        </p>

        <p className="text-sm text-gray-600 mb-4">
          For more information, please contact us at <br />
          <span className="font-medium">
            📞 {settings?.phone || "+44 4413193140"}
          </span>
          <br />
          <span className="font-medium">
            ✉️ {settings?.email || "coombb11@gmail.com"}
          </span>
        </p>

        {/* 📦 Order Details */}
        {order && (
          <div className="bg-gray-50 border rounded p-4 mb-4 text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Order Details
            </h2>

            <p>
              <strong>Order ID:</strong> {order.order_code}
            </p>
            <p>
              <strong>Order Status:</strong>{" "}
              <span className="text-black-600 font-medium">
                {order.order_status}
              </span>
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className="text-red-600 font-medium">
                {order.payment_status}
              </span>
            </p>
            <p>
              <strong>Payment Type:</strong>{" "}
              <span className="capitalize">{order.payment_type}</span>
            </p>
          </div>
        )}

        {/* 🔘 Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleBackHome}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Back to Home
          </button>

          <button
            onClick={handleRetry}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Retry / Shop Again
          </button>
        </div>
      </div>
    </div>
  );
}
