import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// A function to map country codes to currencies
function mapCountryToCurrency(countryCode: string): string {
  switch (countryCode) {
    case 'US': return 'USD';
    case 'GB': return 'GBP';
    case 'JP': return 'JPY';
    case 'EU': return 'EUR';
    case 'IN': return 'INR';
    case 'AE': return 'AED';
    case 'SG': return 'SGD';
    default: return 'AED'; // Default currency if the country is unknown
  }
}

// Fetch geolocation based on IP (server-side)
const getGeolocation = async (ip: string) => {
  try {
    const res = await fetch(`https://ipapi.co/json/`, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch geolocation');
    }

    const data = await res.json();
    return data.country_code;
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return 'AE'; // Default to AE (United Arab Emirates) if there's an error
  }
};

export async function middleware(request: NextRequest) {
  const existingCurrencyCookie = request.cookies.get('currency');

  // If no currency cookie exists, we need to set one
  if (!existingCurrencyCookie) {
    const countryCode = await getGeolocation(request.ip || '');
    const currency = mapCountryToCurrency(countryCode);

    console.log("Middleware detected countryCode: ", countryCode);
    console.log("Middleware detected currency: ", currency);

    // Set the cookie
    const response = NextResponse.redirect(request.url);
    response.cookies.set('currency', currency, { maxAge: 3600, path: '/' }); // Set for 1 hour
    return response;
  }

  // If the currency cookie already exists, continue with the request
  return NextResponse.next();
}

// Enable middleware to run on all routes
export const config = {
  matcher: '/:path*',
};
