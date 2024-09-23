import { notFound } from 'next/navigation';
import PageHome3 from './PageHome';
import { Metadata, ResolvingMetadata } from 'next';

async function getCollectionDetails(slug: string) {
  const url = `${process.env.BASE_URL}/v1/customertravel/get/travel-collection/by-slug/EN/${slug}?currency=USD&page=1&limit=20&domainId=66cacba1eeca9633c29172b9`;
  console.log('Fetching from URL:', url);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
      next: { revalidate: 10 },
    });

    console.log('Response status:', res.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(res.headers), null, 2));

    const text = await res.text();
    console.log('Response body:', text);

    if (!res.ok) {
      if (res.status === 404) {
        console.log('Resource not found:', url);
        return null;
      }
      throw new Error(`Failed to fetch collection details: ${res.status}`);
    }

    try {
      const data = JSON.parse(text);
      console.log("asaadasddadadad ", data);
      console.log('Parsed data:', JSON.stringify(data, null, 2));
      return data;
    } catch (e) {
      console.error('Error parsing JSON:', e);
      throw new Error('Invalid JSON response');
    }

  } catch (error) {
    console.error('Error fetching collection details:', error);
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
  
    // fetch data
    const collectionData = await getCollectionDetails(slug);
  
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
  
    if (!collectionData) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
      }
    }
  
    const collection = collectionData?.data?.collection;
  
    return {
      title: collection?.title || collection?.displayName,
      description: collection?.metaDescription || collection?.subtext,
      openGraph: {
        title: collection?.title || collection?.displayName,
        description: collection?.metaDescription || collection?.subtext,
        images: [collection?.heroMedia.url, ...previousImages],
      },
      twitter: {
        card: 'summary_large_image',
        title: collection?.titile || collection?.displayName,
        description: collection?.metaDescription || collection?.subtext,
        images: [collection?.heroMedia?.url],
      },
    }
  }

export default async function Page({ params }: {
  params: { slug: string };
}) {
  const slug = params.slug;
  console.log("Requested slug:", slug);
  
  const collectionData = await getCollectionDetails(slug);

  if (!collectionData) {
    console.log("No collection data found for slug:", slug);
    return notFound();
  }

  console.log("collectiondatatestcollection ", collectionData?.data?.collection);

  return <PageHome3 collectionData={collectionData?.data?.collection} tourGroups={collectionData?.data?.tourGroups} />;

}