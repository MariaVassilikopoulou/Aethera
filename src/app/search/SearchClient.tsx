// src/app/search/SearchClient.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../services/productService';

export default function SearchClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(query); // Update fetchProducts to accept a query
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, [query]);

  return (
    <div>
      <h2>Results for: {query}</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - €{product.price}</li>
        ))}
      </ul>
    </div>
  );
}
