// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const response = await fetch(`${process.env.WEBSITE_ID}/v1/customeractivities/get/wishlist`, {
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
    console.log("Wishlist data:", data);

    if (data.statusCode === "10000" && data.data && data.data.tourGroup) {
      const wishlistIds = data.data.tourGroup.map((item: any) => item._id);
      return NextResponse.json({ wishlist: wishlistIds });
    } else {
      return NextResponse.json({ message: 'Failed to fetch wishlist', data }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}