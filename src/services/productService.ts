// services/productService.ts

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
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!backendUrl) {
      // Environment variable is missing → clear error
      throw new Error(
        "NEXT_PUBLIC_API_URL is not defined. Make sure you set it in your Vercel (or hosting) environment."
      );
    }

    const fullUrl = `${backendUrl}/api/Products`;
    console.log("Fetching from backend URL:", fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const result = await response.json();
    return result; // If backend returns an array directly
    // return result.products; // Uncomment if backend wraps in { products: [...] }
    
  } catch (error) {
    console.error("Error fetching products:", error);
    console.log("Token used for fetch:", token);
    throw error;
  }
}
