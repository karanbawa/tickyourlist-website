import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        const response = await fetch(`https://api.univolenitsolutions.com/v1/customerAuthentication/verify?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: 'Verification failed', errorData }, { status: response.status });
        }

        return NextResponse.json({ message: 'Verification successful' });
    } catch (error) {
        console.error('Error processing verification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
