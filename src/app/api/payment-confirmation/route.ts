import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const paymentDetails = await request.json(); // Parse request body once

    if (!paymentDetails) {
      return NextResponse.json(
        { message: "Payment details are missing." },
        { status: 400 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = paymentDetails;

    // Send payment details to backend for Razorpay verification
    const response = await fetch(
      `${process.env.BASE_URL}/v1/tyltourcustomerbooking/razorpay/payment-confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj",
        },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          bookingId,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Payment verification failed", details: responseData },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    console.error("Error in payment confirmation API:", error.message);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
