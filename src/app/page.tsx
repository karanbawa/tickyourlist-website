import { cookies } from 'next/headers';
import PageHome3 from './PageHome3';

async function getTravelSections(cityCode: string, currency: string) {
  const res = await fetch(`${process.env.BASE_URL}/v1/tyltravelsection/get/public/travel-sections/?cityCode=${cityCode?.toUpperCase()}&domainId=${process.env.WEBSITE_ID}&currency=${currency}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
     'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    // return [];
    throw new Error('Failed to fetch travel sections');
  }

  const data =  res.json();
  return data;
}

export default async function PageHome3Server({ params }: {
  params: { slug: string };
}) {
  const cityCode = params.slug as string || 'DUBAI';
  const cookieStore = cookies();
  const currency = cookieStore.get('currency')?.value || 'AED'; // Default to 'USD' if no cookie
  const travelSections = await getTravelSections(cityCode, currency);

  return <PageHome3 travelSections={travelSections} />;
}