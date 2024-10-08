import React, { FC } from "react";
import CheckOutPagePageMain from "./PageMain";
import { cookies, headers } from 'next/headers';

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

async function fetchTourGroupData(tourId: string, currency: string) {
  // const id = slug.match(/\d+$/)?.[0]; 

  if (!tourId) {
    throw new Error("Invalid slug2 format. Could not extract ID.");
  }
  const response = await fetch(`${process.env.BASE_URL}/v1/customertravel/tour-group/by-tourid/${tourId}?currency=${currency}&domainId=${process.env.WEBSITE_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 10 }, // Ensure Vercel does not cache this fetch
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

interface CheckoutPageProps {
  searchParams: { tourId?: string; date?: string };
}

const page: FC<CheckoutPageProps> = async ({ searchParams }) => {
  const tourId = searchParams.tourId || ""; // Fetch tourId from query params
  const date = searchParams.date || ""; // Fetch date from query params
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


  // Handle missing parameters
  if (!tourId) {
    return <div>Invalid or missing tour ID</div>;
  }

  try {
    // Fetch the data using the tourId
    const data = await fetchTourGroupData(tourId, currency);
    const tourGroup = data.data.tourgroup;

    return <CheckOutPagePageMain tourGroup={tourGroup} currencyCode={currency} />;
  } catch (error) {
    console.error("Error fetching tour group data:", error);
    return <div>Failed to load tour group data.</div>;
  }
};

export default page;
