// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const token = request.headers.get('authorization');

    if (!token) {
        return NextResponse.json({ message: 'No token provided' }, { status: 401 });
      }

    const wishlishtData = {
        tourGroupId: formData.tourGroupId,
        action: formData.action
    }

    const response = await fetch(`${process.env.BASE_URL}/v1/customeractivities/add/wishlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
            'customer-authorization': token,
        },
        body: JSON.stringify(wishlishtData),
    });
    const errorData = response;
    if (response.status !== 200) {
        return NextResponse.json({ error: 'Wishlist addition failed', errorData }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'Wishlist addtion successful', errorData });
    }
  } catch (error) {
    console.error('Error in wishlist API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userId = cookies().get('userId')?.value;

  if (!userId) {
    return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const stayId = searchParams.get('stayId');

  if (!stayId) {
    return NextResponse.json({ success: false, error: 'Stay ID is required' }, { status: 400 });
  }

  // Here you would check your database to see if the stay is in the user's wishlist
  // This is a placeholder implementation
  const isInWishlist = Math.random() < 0.5; // Randomly determine if it's in the wishlist

  return NextResponse.json({ success: true, isInWishlist });
}