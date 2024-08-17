import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`${process.env.BASE_URL}/v1/customerAuthentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      },
      body: JSON.stringify({ domainId: process.env.WEBSITE_ID, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Login failed', errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: 'Login successful', data });
  } catch (error) {
    console.error('Error processing login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
