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
  const country = request.geo?.country || 'AE'; // Fallback to 'US' if geo info isn't available
  const existingCurrencyCookie = request.cookies.get('currency');

  if (!existingCurrencyCookie) {
    // No existing currency cookie, set one based on geo-location
    const currency = mapCountryToCurrency(country);
    
    const response = NextResponse.next();
    response.cookies.set('currency', currency, { maxAge: 3600, path: '/' }); // Set the cookie for 1 hour
    // Proceed without an immediate redirect to avoid the loop
    return response;
  }

  // If the currency cookie already exists, continue with the request
  return NextResponse.next();
}

// Enable middleware to run on all routes
export const config = {
  matcher: '/:path*', // Apply to all routes
};
