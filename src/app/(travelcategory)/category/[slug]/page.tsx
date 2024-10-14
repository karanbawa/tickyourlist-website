import { notFound } from 'next/navigation';
import PageHome3 from './PageHome';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies, headers } from 'next/headers';

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

async function getSubCategoryDetails(slug: string, currency: string) {
  const url = `${process.env.BASE_URL}/v1/customertravel/get/travel-category/by-slug/EN/${slug}?currencyCode=${currency}&page=1&limit=20&domainId=66cacba1eeca9633c29172b9`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
      next: { revalidate: 5 },
    });

    const text = await res.text();

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch collection details: ${res.status}`);
    }

    try {
      const data = JSON.parse(text);
      return data;
    } catch (e) {
      throw new Error('Invalid JSON response');
    }

  } catch (error) {
    return null;
  }
}

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const slug = params.slug;
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
  
    // fetch data
    const collectionData = await getSubCategoryDetails(slug, currency);
  
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
  
    if (!collectionData) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
      }
    }
  
    const currentSubCategory = collectionData?.data?.currentSubcategory;
  
    return {
      title: currentSubCategory?.metaTitle || currentSubCategory?.displayName,
      description: currentSubCategory?.metaDescription,
      openGraph: {
        title: currentSubCategory?.heading || currentSubCategory?.displayName,
        description: currentSubCategory?.metaDescription,
        images: [currentSubCategory?.medias?.[0]?.url, ...previousImages],
      },
      twitter: {
        card: 'summary_large_image',
        title: currentSubCategory?.metaTitle || currentSubCategory?.displayName,
        description: currentSubCategory?.metaDescription,
        images: [currentSubCategory?.medias?.[0]?.url],
      },
    }
  }

export default async function Page({ params }: {
  params: { slug: string };
}) {
  const slug = params.slug;
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
  
  const subcategoryData = await getSubCategoryDetails(slug, currency);

  if (!subcategoryData) {
    return notFound();
  }

  return <PageHome3 category={subcategoryData?.data?.category} currentSubcategory={subcategoryData?.data?.currentSubcategory} relatedSubcategories={subcategoryData?.data?.subcategories} tourGroups={subcategoryData?.data?.tourGroups} />;

}