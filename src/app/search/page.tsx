'use client';

import { useSearchParams } from 'next/navigation';
//import { useFetchProducts } from './useFetchProducts';
import { useEffect,useState } from 'react';

interface Product {
    id: number;
    name: string;
    // Add more fields later, e.g. price, imageUrl...
  }

  async function fetchProducts(query: string): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 700)); // Simulate delay
  
    const allProducts: Product[] = [
      { id: 1, name: 'Red Shirt' },
      { id: 2, name: 'Blue Jeans' },
      { id: 3, name: 'Green Jacket' },
      { id: 4, name: 'Yellow Hat' },
      { id: 5, name: 'Black Shoes' },
      { id: 6, name: 'White Socks' },
      { id: 7, name: 'Purple Scarf' },
      { id: 8, name: 'Orange Backpack' },
    ];
  
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }
export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  //const { products, loading, error } = useFetchProducts(query);

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetchProducts(query)
      .then((products) => {
        setResults(products);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, [query]);


  return (
    <main style={{ padding: '2rem', fontFamily: "'Playfair Display', serif" }}>
      <h1>
        Search Results for: <em>{query}</em>
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && results.length === 0 && <p>No products found.</p>}

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {results.map((product) => (
          <li key={product.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
            {product.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
