import React, { FC } from "react";
import CheckOutPagePageMain from "./PageMain";
import { cookies, headers } from "next/headers";

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

async function fetchTourGroupData(tourId: string, variantId: string, currency: string) {
  // const id = slug.match(/\d+$/)?.[0]; 

  if (!tourId) {
    throw new Error("Invalid slug2 format. Could not extract ID.");
  }
  const response = await fetch(`${process.env.BASE_URL}/v1/customertravel/tour-group/book/by-tourid/${tourId}/variant/${variantId}?currency=${currency}&domainId=${process.env.WEBSITE_ID}`, {
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

interface BookPageProps {
  searchParams: { tourId?: string; date?: string ; tour?: string; variantId?: string; guests?: string; adult?: string; child?: string; infant?: string  };
}

const page: FC<BookPageProps> = async ({ searchParams }) => {
  const tourId = searchParams.tourId || "";
  const date = searchParams.date || "";
  const tour = searchParams.tour || "";
  const variantId = searchParams.variantId || "";
  const totalGuests = searchParams?.guests;
  const totalAdults = searchParams?.adult;
  const totalChilds = searchParams?.child;
  const totalInfants = searchParams?.infant;

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

  try {
    // Fetch the data using the tourId
    const data = await fetchTourGroupData(tourId, variantId, currency);
    const tourGroup = data.data.tourgroup;

    return <CheckOutPagePageMain tourGroup={tourGroup} date={date} tour={tour} variantId={variantId} currencyCode={currency} totalGuests={totalGuests} totalAdults={totalAdults} totalChilds={totalChilds} totalInfants={totalInfants} />;
  } catch (error) {
    return <div>Failed to load tour group data.</div>;
  }
};

export default page;
