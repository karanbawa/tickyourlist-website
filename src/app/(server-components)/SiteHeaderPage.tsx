// app/(server-components)/SiteHeaderPage.tsx
import { headers } from 'next/headers';
import SiteHeader from '../(client-components)/(Header)/SiteHeader';

const getCollectionData = async (cityCode: string) => {
  const timestamp = Date.now();
  const res = await fetch(`${process.env.BASE_URL}/v1/customertravel/get/travel-collection/top/list?cityCode=${cityCode}&domainId=66cacba1eeca9633c29172b9&_t=${timestamp}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch collection data');
  }

  return res.json();
};

export default async function SiteHeaderPage() {
  const headersList = headers();
  const path = headersList.get('x-invoke-path') || '/';
  
  const cityMatch = path.match(/\/things-to-do\/([^\/\?]+)/);
  let initialCollectionData = null;
  let initialCityCode = null;

  console.log('path ', path, headersList);

  if (cityMatch) {
    initialCityCode = cityMatch[1].toUpperCase();
    try {
      initialCollectionData = await getCollectionData(initialCityCode);
    } catch (error) {
      console.error(`Failed to fetch initial data for ${initialCityCode}:`, error);
    }
  }

  return (
    <SiteHeader 
      initialCollectionData={initialCollectionData?.data} 
      initialCityCode={initialCityCode || ''}
    />
  );
}