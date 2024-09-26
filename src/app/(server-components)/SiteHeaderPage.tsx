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

const getCategoryData = async (cityCode: string) => {
  const timestamp = Date.now();
  const res = await fetch(`${process.env.BASE_URL}/v1/customertravel/categories-with-subcategories/${cityCode}?domainId=66cacba1eeca9633c29172b9&_t=${timestamp}`, {
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

// Country to currency mapping
const countryCurrencyMap: { [key: string]: string } = {
  AE: "AED",
  US: "USD",
  GB: "GBP",
  EU: "EUR",
  IN: 'INR',
  // Add more country-currency mappings as needed
};

// Fetch geolocation based on IP (server-side)
const getGeolocation = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch geolocation');
    }

    const data = await res.json();
    return data.country_code;
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return 'AE'; // Default to AE (United Arab Emirates) if there's an error
  }
};


export default async function SiteHeaderPage() {
  const headersList = headers();
  const path = headersList.get('x-invoke-path') || '/';
  const countryCode = await getGeolocation();
  const currencyCode = countryCurrencyMap[countryCode] || "AED";
  
  const cityMatch = path.match(/\/things-to-do-city\/([^\/\?]+)/);
  let initialCollectionData = null;
  let initialCategoriesData = null;
  let initialCityCode = null;

  console.log('path ', path, headersList);

  if (cityMatch) {
    initialCityCode = cityMatch[1].toUpperCase();
    try {
      initialCollectionData = await getCollectionData(initialCityCode);
      initialCategoriesData = await getCategoryData(initialCityCode);
    } catch (error) {
      console.error(`Failed to fetch initial data for ${initialCityCode}:`, error);
    }
  }

  return (
    <SiteHeader 
      initialCollectionData={initialCollectionData?.data} 
      initialCityCode={initialCityCode || ''}
      initialCategoriesData={initialCategoriesData?.data}
      currencyCode={currencyCode}
    />
  );
}