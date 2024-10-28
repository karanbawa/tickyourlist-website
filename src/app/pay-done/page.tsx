import React, { FC } from "react";
import PayPage from "./pay-done";
import PaymentConfirmation from "./PaymentConfirmation";

export interface PageProps {
  searchParams: { razorpayOrderId?: string; razorpayPaymentId?: string; razorpaySignature?: string; bookingId?: string; };
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const razorpayOrderId = searchParams.razorpayOrderId || "";
  const razorpayPaymentId = searchParams.razorpayPaymentId || "";
  const razorpaySignature = searchParams.razorpaySignature || "";
  const bookingId = searchParams?.bookingId || "";

  // Ensure all required params are present
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return <div>Missing or invalid payment details</div>;
  }

  const searchParamsData = {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    bookingId
  }

  try {
    return (
      <div className="nc-PayPage">
        <main className="container mt-11 mb-24 lg:mb-32">
          <div className="max-w-4xl mx-auto">
            <PaymentConfirmation searchParams={searchParamsData} />
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
