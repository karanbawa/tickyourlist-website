import React, { FC } from "react";
import PayPage from "./pay-done";

async function fetchPaymentConfirmation(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string, bookingId: string) {
  const requestBody = {
    razorpay_payment_id: razorpayPaymentId,
    razorpay_order_id: razorpayOrderId,
    razorpay_signature: razorpaySignature,
    bookingId: bookingId
  };

  // const response = await fetch(`${process.env.BASE_URL}/v1/tyltourcustomerbooking/razorpay/payment-confirmation`, {
    const response = await fetch(`${process.env.BASE_URL}/v1/tyltourcustomerbooking/razorpay/payment-confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    console.log("response.json()" , response);
    throw new Error('Failed to fetch payment confirmation');
  }

  return response.json();
}

export interface PageProps {
  searchParams: { razorpayOrderId?: string; razorpayPaymentId?: string; razorpaySignature?: string; bookingId?: string; };
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const razorpayOrderId = searchParams.razorpayOrderId || "";
  const razorpayPaymentId = searchParams.razorpayPaymentId || "";
  const razorpaySignature = searchParams.razorpaySignature || "";
  const bookingId = searchParams?.bookingId || "";

  console.log("ids ", razorpayOrderId, razorpayPaymentId, razorpaySignature);

  // Ensure all required params are present
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return <div>Missing or invalid payment details</div>;
  }

  try {
    // Fetch the payment confirmation data
    const data = await fetchPaymentConfirmation(razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId);

    console.log("responsedatatest ", data);

    // Render the content with the fetched data
    return (
      <div className="nc-PayPage">
        <main className="container mt-11 mb-24 lg:mb-32">
          <div className="max-w-4xl mx-auto">
            <PayPage />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching payment confirmation data:", error);
    return <div>Failed to confirm payment. Please try again.</div>;
  }
};

export default Page;
