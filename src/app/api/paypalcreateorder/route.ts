import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to extract cart details
    const { cart } = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { message: 'Cart is empty or missing' },
        { status: 400 }
      );
    }

    // PayPal API URL for creating an order
    const paypalOrderUrl = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';

    console.log("paypalOrderUrl ", paypalOrderUrl);

    // Send a request to PayPal to create the order
    const response = await fetch(paypalOrderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer A21AAKbNdE7jy34rdLVgumJT8dfs2rtr4urI5OUSMrZE46Y9T8jVEaAnUuwgMXRbSVd0jD5m0yMxLQDfQS5DqyeOkeheSX_yQ`, // Add your PayPal access token here
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: cart.reduce(
                (total: number, item: { quantity: number; price: number }) =>
                  total + item.quantity * item.price,
                0
              ).toFixed(2),
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('PayPal API Error:', error);
      return NextResponse.json(
        { message: 'Failed to create order', error },
        { status: response.status }
      );
    }

    const orderData = await response.json();

    // Return the PayPal order ID to the client
    return NextResponse.json({ id: orderData.id }, { status: 201 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
