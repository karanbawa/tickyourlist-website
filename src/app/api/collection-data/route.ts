// app/api/collection-data/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityCode = searchParams.get('cityCode');

  if (!cityCode) {
    return NextResponse.json({ error: 'Invalid city code' }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const apiRes = await fetch(`${process.env.BASE_URL}/v1/customertravel/get/travel-collection/top/list?cityCode=${cityCode}&currency=EUR&domainId=66cacba1eeca9633c29172b9&_t=${timestamp}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });

    if (!apiRes.ok) {
      throw new Error('Failed to fetch collection data');
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch collection data' }, { status: 500 });
  }
}