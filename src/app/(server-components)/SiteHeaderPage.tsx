import { headers } from 'next/headers';
import SiteHeader from '../(client-components)/(Header)/SiteHeader';

const getCollectionData = async (cityCode: string) => {
  const timestamp = Date.now();
  const res = await fetch(`${process.env.BASE_URL}/v1/customertravel/get/travel-collection/top/list?cityCode=${cityCode}&currency=EUR&domainId=66cacba1eeca9633c29172b9&_t=${timestamp}`, {
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
    throw new Error('Failed to fetch category data');
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
  
  // Corrected regex to match 'things-to-do-in-dubai' and extract 'dubai'
  const cityMatch = path.match(/\/things-to-do-in-(.+)/);
  let initialCollectionData = null;
  let initialCategoriesData = null;
  let initialCityCode = null;

  if (cityMatch) {
    initialCityCode = cityMatch[1].toUpperCase(); // Extract 'dubai' and convert to uppercase
    try {
      // Fetching collection and category data based on the city code
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
      currencyCode={'AED'}
    />
  );
}
