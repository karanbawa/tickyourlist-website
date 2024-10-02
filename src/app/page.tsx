import { cookies } from 'next/headers';
import PageHome3 from './PageHome3';

async function getTravelSections(cityCode: string, currency: string) {
  console.log("Currency detected:1", currency);
  const res = await fetch(`${process.env.BASE_URL}/v1/tyltravelsection/get/public/travel-sections/?cityCode=${cityCode?.toUpperCase()}&domainId=${process.env.WEBSITE_ID}&currency=${currency}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch travel sections');
  }

  const data = await res.json();
  return data;
}

export default async function PageHome3Server({ params }: { params: { slug: string } }) {
  // const slugParts = params.slug.split('-');
  // const cityCode = slugParts[slugParts.length - 1]?.toUpperCase() || 'DUBAI'; // Default to 'DUBAI' if no city is found
  const cityCode = params.slug as string || 'DUBAI';
  const cookieStore = cookies();
  const currency = cookieStore.get('currency')?.value || 'AED'; // Default to 'AED' if no cookie

  console.log("Currency detected: ", currency , cookieStore.get('currency')?.value);

  // Fetch travel sections based on the city code and currency
  const travelSections = await getTravelSections(cityCode, currency);

  console.log("travelSections datat ", travelSections?.data?.[0]?.tourGroups?.[0]?.listingPrice?.prices?.[0]?.originalPrice)

  return <PageHome3 travelSections={travelSections} />;
}
