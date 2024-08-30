import StartRating from "@/components/StartRating";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import PayPage from "./pay-done";

async function fetchTourGroupData(slug: string) {
  const id = slug.match(/\d+$/)?.[0]; 

  if (!id) {
    throw new Error("Invalid slug2 format. Could not extract ID.");
  }
  const response = await fetch(`${process.env.BASE_URL}/v1/tyltourcustomerbooking/razorpay/payment-confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'cache-control': 'no-store',
      'domainId': '66cacba1eeca9633c29172b9'
    },
    // body: 
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export interface Page {}

const Page: FC<Page> = async () => {

  const renderContent = () => {
    return (
      <PayPage />
    );
  };

  try {
    // Fetch the data using the tourId
    // const data = await fetchTourGroupData(tourId);
    // const tourGroup = data.data.tourgroup;

    return (<div className={`nc-PayPage`}>
       <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>);
  } catch (error) {
    console.error("Error fetching tour group data:", error);
    return <div>Failed to load tour group data.</div>;
  }
};

export default Page;
