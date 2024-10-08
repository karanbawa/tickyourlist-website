import { cookies, headers } from 'next/headers';
import SiteHeader from '../(client-components)/(Header)/SiteHeader';

// Function to map country codes to currencies
function mapCountryToCurrency(countryCode: string) {
  switch (countryCode) {
    case 'US':
      return 'USD';
    case 'GB':
      return 'GBP';
    case 'JP':
      return 'JPY';
    case 'EU':
      return 'EUR';
    case 'IN':
      return 'INR';
    case 'AE':
      return 'AED';
    case 'SG':
      return 'SGD';
    default:
      return 'AED'; // Default currency if the country is unknown
  }
}

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

  // Access cookies from the request
  const cookieStore = cookies();
  let currency = cookieStore.get('currency')?.value; // Default to 'AED' if no currency cookie exists

  if (!currency) {
    // No currency cookie, get country from headers
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') ?? 'AE'; // Fallback to 'AE' if not available
    currency = mapCountryToCurrency(country);

    // Optionally set the currency cookie for future requests
    // Note: Setting cookies in server components is not straightforward; you may need to adjust your approach
  }

  return (
    <SiteHeader 
      initialCollectionData={initialCollectionData?.data} 
      initialCityCode={initialCityCode || ''}
      initialCategoriesData={initialCategoriesData?.data}
      currencyCode={currency}
    />
  );
}
