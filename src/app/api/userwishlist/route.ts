// app/api/wishlist/route.ts
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Function to map country codes to currencies
function mapCountryToCurrency(countryCode: string) {
  switch (countryCode) {
    case 'US':
      return 'USD';
    case 'GB':
      return 'GBP';
    case 'JP':
      return 'JPY';
    case 'EU':
      return 'EUR';
    case 'IN':
      return 'INR';
    case 'AE':
      return 'AED';
    case 'SG':
      return 'SGD';
    default:
      return 'AED'; // Default currency if the country is unknown
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization');
    const cookieStore = cookies();
    let currency = cookieStore.get('currency')?.value; // Default to 'USD' if no cookie
    if (!currency) {
      // No currency cookie, get country from headers
      const headersList = headers();
      const country = headersList.get('x-vercel-ip-country') ?? 'AE'; // Fallback to 'AE' if not available
      currency = mapCountryToCurrency(country);
  
      // Optionally set the currency cookie for future requests
      // Note: Setting cookies in server components is not straightforward; you may need to adjust your approach
    }

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const response = await fetch(`${process.env.BASE_URL}/v1/customeractivities/get/user/wishlist?currency=${currency}`, {
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

    if (data.statusCode === "10000" && data.data) {
    //   const wishlistIds = data.data.tourGroup.map((item: any) => item._id);
      return NextResponse.json({ tourGroup: data.data });
    } else {
      return NextResponse.json({ message: 'Failed to fetch wishlist', data }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}