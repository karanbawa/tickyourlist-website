import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// A function to map country codes to currencies
function mapCountryToCurrency(countryCode: string): string {
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

export async function middleware(request: NextRequest) {
  // Access the geo object from the request (this works on platforms like Vercel)
  // request.cookies.delete('currency');
  const country = request.geo?.country || 'US'; // Fallback to 'US' if geo info isn't available

  // Check if the currency cookie already exists
  const existingCurrencyCookie = request.cookies.get('currency');

  console.log("existingCurrencyCookie ", existingCurrencyCookie);

  if (!existingCurrencyCookie) {
    // No existing currency cookie, set one based on geo-location
    const currency = mapCountryToCurrency(country);

    // Create a response and set the cookie
    const response = NextResponse.next();
    response.cookies.set('currency', currency, { maxAge: 3600, path: '/' }); // Set the cookie for 1 hour

    return response;
  }

  // If the currency cookie already exists, just continue with the request
  return NextResponse.next();
}

// Enable middleware to run on all routes
export const config = {
  matcher: '/:path*', // Apply to all routes
};
