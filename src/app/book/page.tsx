import React, { FC } from "react";
import CheckOutPagePageMain from "./PageMain";

async function fetchTourGroupData(slug: string) {
  console.log("process.env.base_url ", process.env.BASE_URL);
  const response = await fetch(`${process.env.BASE_URL}/v1/customertravel/tour-groups/3?currency=INR&domainId=${process.env.WEBSITE_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'cache-control': 'no-store'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

interface BookPageProps {
  searchParams: { tourId?: string; date?: string ; tour?: string; variantId?: string };
}

const page: FC<BookPageProps> = async ({ searchParams }) => {
  const tourId = searchParams.tourId || ""; // Fetch tourId from query params
  const date = searchParams.date || ""; // Fetch date from query params
  const tour = searchParams.tour || "";
  const variantId = searchParams.variantId || "";

  // // Handle missing parameters
  // if (!tourId || !date || !tour || !variantId) {
  //   return <div>Invalid or missing data</div>;
  // }

  try {
    // Fetch the data using the tourId
    const data = await fetchTourGroupData(tourId);
    const tourGroup = data.data.tourgroup;

    return <CheckOutPagePageMain tourGroup={tourGroup} date={date} tour={tour} variantId={variantId} />;
  } catch (error) {
    console.error("Error fetching tour group data:", error);
    return <div>Failed to load tour group data.</div>;
  }
};

export default page;
