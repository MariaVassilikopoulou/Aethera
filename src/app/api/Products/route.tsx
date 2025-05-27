import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Access token is missing or invalid' }, { status: 401 });
    }
    const token = authorizationHeader.split(' ')[1];

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: 'API base URL not configured' }, { status: 500 });
    }

    // Extract search query param
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('search') || '';

    // Build your real backend API endpoint URL
    const backendUrl = `${baseUrl}/api/products?search=${encodeURIComponent(query)}`;

    // Proxy the request to your ASP.NET Core backend
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ message: 'Unauthorized access. Invalid or expired token.' }, { status: 401 });
    }
    if (!response.ok) {
      throw new Error('Failed to fetch products from backend: ' + response.statusText);
    }

    const products = await response.json();

    return NextResponse.json({
      message: 'Successfully fetched products',
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
