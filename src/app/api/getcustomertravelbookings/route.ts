// app/api/wishlist/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const response = await fetch(`${process.env.BASE_URL}/v1/customeractivities/get/customer/travel-bookings?domainId=66cacba1eeca9633c29172b9&page=1&limit=20`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        'customer-authorization': token,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.statusCode === "10000" && data.data) {
      return NextResponse.json({ bookings: data.data.bookings });
    } else {
      return NextResponse.json({ message: 'Failed to fetch wishlist', data }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}