"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ThanksPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status");

  let message = "Thank you for your reservation!";
  let subMessage = "Your payment is being processed.";

  if (transactionStatus === "settlement" || transactionStatus === "capture") {
    message = "Payment Successful!";
    subMessage = `Your reservation with Order ID: ${orderId} has been confirmed.`;
  } else if (transactionStatus === "pending") {
    message = "Payment Pending!";
    subMessage = `Your reservation with Order ID: ${orderId} is awaiting payment. Please complete the payment process.`;
  } else if (
    transactionStatus === "deny" ||
    transactionStatus === "cancel" ||
    transactionStatus === "expire" ||
    statusCode !== "200"
  ) {
    message = "Payment Failed!";
    subMessage = `There was an issue with your payment for Order ID: ${orderId}. Please try again or contact support.`;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="rounded-lg bg-white p-8 shadow-lg text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">{message}</h1>
        <p className="text-lg text-gray-600">{subMessage}</p>
        {orderId && (
          <p className="mt-4 text-sm text-gray-500">Order ID: {orderId}</p>
        )}
        {/* You can add more details or a link back to the home page */}
        <a href="/" className="mt-6 inline-block rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default ThanksPage;
