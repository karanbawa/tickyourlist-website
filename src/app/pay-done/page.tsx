"use client"; // Enabling client-side logic for this component

import React, { useEffect, useState } from "react";
import PayPage from "./pay-done";

// Fetch payment confirmation data from the backend
async function fetchPaymentConfirmation(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  bookingId: string
) {
  const response = await fetch(
    `${process.env.BASE_URL}/v1/tyltourcustomerbooking/razorpay/payment-confirmation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj' || "",
      },
      body: JSON.stringify({
        razorpay_payment_id: razorpayPaymentId,
        razorpay_order_id: razorpayOrderId,
        razorpay_signature: razorpaySignature,
        bookingId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch payment confirmation");
  }

  return response.json();
}

interface PaymentConfirmationProps {
  searchParams: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    bookingId?: string;
  };
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  searchParams,
}) => {
  const [status, setStatus] = useState<"loading" | "confirmed" | "failed">(
    "loading"
  );
  const [bookingData, setBookingData] = useState<any>(null);

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } =
    searchParams;

  useEffect(() => {
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      setStatus("failed");
      return;
    }

    const pollPaymentStatus = async () => {
      try {
        const data = await fetchPaymentConfirmation(
          razorpayOrderId!,
          razorpayPaymentId!,
          razorpaySignature!,
          bookingId!
        );
        setBookingData(data.booking);
        setStatus("confirmed");
      } catch (error) {
        console.error("Error polling payment confirmation:", error);
        setStatus("failed");
      }
    };

    pollPaymentStatus();

    // Start polling every 5 seconds until status is confirmed
    // const intervalId = setInterval(pollPaymentStatus, 5000);

    // return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId]);

  if (status === "loading") {
    return (
      <div className="nc-PayPage">
      <main className="container mt-11 mb-24 lg:mb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2>Verifying your payment...</h2>
          <p>{`This may take a few moments. Please don't refresh the page.`}</p>
        </div>
      </main>
    </div>    
    );
  }

  if (status === "failed") {
    return (
      <div className="nc-PayPage">
        <main className="container mt-11 mb-24 lg:mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2>Failed to confirm payment</h2>
            <p>Please try again or contact support if the issue persists.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="nc-PayPage">
      <main className="container mt-11 mb-24 lg:mb-32">
        <div className="max-w-4xl mx-auto">
          <PayPage bookingDetails={bookingData} />
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmation;
