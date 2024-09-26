import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    const token = req.headers.get('authorization');

    const response = await fetch(`${process.env.BASE_URL}/v1/customerlogout/logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
            'customer-authorization': `Bearer ${token}`,
        }
    });
    if (response.status !== 200) {
        const errorData = response;
        return NextResponse.json({ error: 'Logout failed', errorData }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'Logout successful' });
    }
}

 