// app/api/collection-data/route.ts
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
// import Cookie from 'cookie';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityCode = searchParams.get('cityCode');
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
  // const cookies = Cookie.parse(request.headers.cookie || '');

  if (!cityCode) {
    return NextResponse.json({ error: 'Invalid city code' }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const apiRes = await fetch(`${process.env.BASE_URL}/v1/customertravel/get/travel-collection/top/list?cityCode=${cityCode}&currency=${currency}&domainId=66cacba1eeca9633c29172b9&_t=${timestamp}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
      next: { revalidate: 10 },
    });

    if (!apiRes.ok) {
      throw new Error('Failed to fetch collection data');
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch collection data' }, { status: 500 });
  }
}