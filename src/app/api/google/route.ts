import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { googleId, email, firstName, lastName, picture } = await req.json();

    const response = await fetch(`${process.env.BASE_URL}/v1/customerAuthentication/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      },
      body: JSON.stringify({ domainId: process.env.WEBSITE_ID, googleId, email, firstName, lastName, picture }),
    });

    const data = await response.json();

    if (data?.statusCode !== '10000') {
      return NextResponse.json({ error: 'Login failed', data }, { status: response.status });
    }

    return NextResponse.json({ message: 'Login successful', data });
  } catch (error) {
    console.error('Error processing login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
