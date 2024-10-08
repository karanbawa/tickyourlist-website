import { cookies, headers } from 'next/headers';
import PageHome3 from './PageHome3';

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
  let currency = cookieStore.get('currency')?.value; // Default to 'USD' if no cookie

  if (!currency) {
    // No currency cookie, get country from headers
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') ?? 'AE'; // Fallback to 'AE' if not available
    currency = mapCountryToCurrency(country);

    // Optionally set the currency cookie for future requests
    // Note: Setting cookies in server components is not straightforward; you may need to adjust your approach
  }

  
  // Fetch travel sections based on the city code
  const travelSections = await getTravelSections(cityCode, currency);
  const travelSectionBanners = await getTravelSectionBanners(cityCode,'EN');

  return <PageHome3 travelSections={travelSections} travelSectionBanners={travelSectionBanners?.data} />;
}
