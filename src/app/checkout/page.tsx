import React, { FC } from "react";
import CheckOutPagePageMain from "./PageMain";

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
  const currency = 'AED';

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
