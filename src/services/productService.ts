export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl: string;
}

export async function fetchProducts(token: string): Promise<Product[]> {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Products`;
    console.log("Fetching from backend URL:", backendUrl);

    const response = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Fetch token:", token);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const result: Product[] = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    console.log("Calling /api/Products with token:", token);
    throw error;
  }
}
