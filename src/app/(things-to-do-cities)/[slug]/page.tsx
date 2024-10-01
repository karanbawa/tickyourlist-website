import PageHome3 from './PageHome3';

async function getTravelSections(cityCode: string) {
  const res = await fetch(`${process.env.BASE_URL}/v1/tyltravelsection/get/public/travel-sections/?cityCode=${cityCode?.toUpperCase()}&domainId=${process.env.WEBSITE_ID}&currency=AED`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 100 }, // Ensure Vercel does not cache this fetch
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

  // Fetch travel sections based on the city code
  const travelSections = await getTravelSections(cityCode);

  return <PageHome3 travelSections={travelSections} />;
}
