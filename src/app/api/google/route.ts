import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { googleId, email, firstName, lastName, picture } = await req.json();

    const response = await fetch(`${process.env.LOCAL_URL}/v1/customerAuthentication/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      },
      body: JSON.stringify({ domainId: process.env.WEBSITE_ID, googleId, email, firstName, lastName, picture }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("errormessage ", errorData);
      return NextResponse.json({ error: 'Login failed', errorData }, { status: response.status });
    }

    const data = await response.json();
    console.log("errorData ", data);
    return NextResponse.json({ message: 'Login successful', data });
  } catch (error) {
    console.error('Error processing login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
