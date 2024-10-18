import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { orderID: string } }
) {
  try {
    const { orderID } = params;

    if (!orderID) {
      return NextResponse.json(
        { message: 'Order ID is required' },
        { status: 400 }
      );
    }

    // PayPal API endpoint for capturing the order
    const paypalCaptureUrl = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(paypalCaptureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('PayPal Capture Error:', error);
      return NextResponse.json(
        { message: 'Failed to capture order', error },
        { status: response.status }
      );
    }

    const orderData = await response.json();
    return NextResponse.json(orderData, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
