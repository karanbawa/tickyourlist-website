import React, { FC } from "react";
import CheckOutPagePageMain from "./PageMain";
import { cookies } from "next/headers";

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
  const currency = cookieStore.get('currency')?.value ?? 'AED'; // Default to 'USD' if no cookie

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
