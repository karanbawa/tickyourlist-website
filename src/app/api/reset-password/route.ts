import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json(); // Extract token and password from the body

        if (!token) {
            return NextResponse.json({ error: 'Invalid URL, token is missing' }, { status: 400 });
        }

        // Prepare the data to send to your backend API
        const resetPasswordData = {
            password,
        };

        // Make a POST request to your backend API with the token in the query string
        const response = await fetch(`${process.env.LOCAL_URL}/v1/customerAuthentication/reset-password/verify?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY as string, // Use your environment variable for the API key
            },
            body: JSON.stringify(resetPasswordData),
        });

        if (response.status !== 200) {
            // If the response is not OK, return an error
            const errorData = await response.json();
            return NextResponse.json({ error: 'Failed to reset password', errorData }, { status: response.status });
        }

        // On success, return the success message or redirect URL if needed
        const successData = await response.json();
        return NextResponse.json({ message: successData.message || 'Password reset successful' });
    } catch (error) {
        console.error('Error in reset password POST function:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
