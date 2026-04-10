"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../services/productService';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import styles from './search.module.scss';

export default function SearchClient() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    fetchProducts(token)
      .then(data => {
        const filtered = data.filter(p =>
          p.category?.toLowerCase() !== 'pre-order' &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
           p.description?.toLowerCase().includes(query.toLowerCase()))
        );
        setProducts(filtered);
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [token, query]);

  return (
    <>
      <Header />
      <main className={styles.searchPage}>
        <div className={styles.heading}>
          <h1>
            {query ? (
              <>Results for <span className={styles.query}>&ldquo;{query}&rdquo;</span></>
            ) : (
              'All Products'
            )}
          </h1>
          {!isLoading && (
            <p className={styles.count}>
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          )}
        </div>

        {isLoading ? (
          <p className={styles.state}>Searching...</p>
        ) : products.length === 0 ? (
          <p className={styles.state}>No products found for &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                category={product.category}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
