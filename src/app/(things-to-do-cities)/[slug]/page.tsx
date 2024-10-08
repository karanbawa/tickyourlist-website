import { cookies } from 'next/headers';
import PageHome3 from './PageHome3';

async function getTravelSections(cityCode: string, currency: string) {
  const res = await fetch(`${process.env.BASE_URL}/v1/tyltravelsection/get/public/travel-sections/?cityCode=${cityCode?.toUpperCase()}&domainId=${process.env.WEBSITE_ID}&currency=${currency}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 10 }, // Ensure Vercel does not cache this fetch
  });

  if (!res.ok) {
    throw new Error('Failed to fetch travel sections');
  }

  const data = await res.json();
  return data;
}

async function getTravelSectionBanners(cityCode: string, language: string) {
  const res = await fetch(`${process.env.BASE_URL}/v1/customertravel/section/banner/sorted/${cityCode?.toUpperCase()}?language=${language}&domainId=${process.env.WEBSITE_ID}`, {
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
  // Split the slug by hyphen and extract the last part for the city code
  const slugParts = params.slug.split('-');
  const cityCode = slugParts[slugParts.length - 1]?.toUpperCase() || 'DUBAI'; // Default to 'DUBAI' if no city is found
  const cookieStore = cookies();
  const currency = cookieStore.get('currency')?.value ?? 'AED'; // Default to 'USD' if no cookie
  // Fetch travel sections based on the city code
  const travelSections = await getTravelSections(cityCode, currency);
  const travelSectionBanners = await getTravelSectionBanners(cityCode,'EN');

  return <PageHome3 travelSections={travelSections} travelSectionBanners={travelSectionBanners?.data} />;
}
