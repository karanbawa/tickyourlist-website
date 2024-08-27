import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { tourGroup } = req.query;
        if (!tourGroup) {
            return res.status(400).json({ error: 'TourGroup ID is required' });
        }

        const response = await fetch(`${process.env.BASE_URL}/v1/customertravel/tour-groups/${tourGroup}?currency=INR&domainId=${process.env.WEBSITE_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tour group data');
        }

        const data = await response.json();
        return res.status(200).json({ data: data.data });
    } catch (error) {
        console.error('Failed to fetch tour group data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
