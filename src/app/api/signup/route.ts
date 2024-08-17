import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.json();
    const signUpData = {
        domainId: process.env.WEBSITE_ID,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber
    };

    const response = await fetch(`${process.env.LOCAL_URL}/v1/customerAuthentication/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj'
        },
        body: JSON.stringify(signUpData),
    });
    if (response.status !== 200) {
        const errorData = await response.json();
        return NextResponse.json({ error: 'Signup failed', errorData }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'Signup successful' });
    }
}
