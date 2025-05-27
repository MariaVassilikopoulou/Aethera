import { useState, useEffect, useCallback } from 'react';

export interface Product {
  id: string | number;
  name: string;
  // Add other fields as needed (price, description, etc.)
}

export function useFetchProducts(searchQuery: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!searchQuery) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Assume validateAccessToken is a utility that fetches/refreshes the token
      const accessToken = await validateAccessToken();

      const response = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // Assuming the backend returns products in data.products
      setProducts(data.products || []);
    } catch (err: unknown) {
        let message = 'Error fetching products';
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// You should have validateAccessToken implemented elsewhere or adapt to your auth flow.
async function validateAccessToken(): Promise<string> {
  // dummy implementation, replace with real token fetching/refreshing
  return 'your-valid-token';
}
