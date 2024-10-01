import PageHome3 from './PageHome3';

async function getTravelSections(cityCode: string) {
  const res = await fetch(`${process.env.BASE_URL}/v1/tyltravelsection/get/public/travel-sections/?cityCode=${cityCode?.toUpperCase()}&domainId=${process.env.WEBSITE_ID}&currency=EUR`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
     'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 0 }, // Ensure Vercel does not cache this fetch
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
  const travelSections = await getTravelSections(cityCode);

  return <PageHome3 travelSections={travelSections} />;
}