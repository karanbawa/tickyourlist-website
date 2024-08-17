import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Parse the request body to get the email
        const { email } = await req.json();

        // Prepare the data to send to your backend API
        const forgotPasswordData = {
            domainId: process.env.WEBSITE_ID,  // Assuming you need this for your API
            email,
        };

        // Make a POST request to your backend API
        const response = await fetch(`${process.env.BASE_URL}/v1/customerAuthentication/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY as string, 
            },
            body: JSON.stringify(forgotPasswordData),
        });

        if (response.status !== 200) {
            // If the response is not OK, return an error
            const errorData = await response.json();
            return NextResponse.json({ error: 'Failed to send reset link', errorData }, { status: 500 });
        } else {
            // On success, return a success message
            return NextResponse.json({ message: 'Reset link sent successfully' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error in forgot password API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
