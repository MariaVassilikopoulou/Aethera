"use client";

import { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import Newsletter from '../../components/Newsletter';
import ProductCard from '../../components/ProductCard';
import styles from './home.module.scss';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { fetchProducts, Product } from '@/services/productService';
import Loader from '@/app/components/Loader';

export default function HomePage() {
  const { isAuthenticated, account, token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    fetchProducts(token)
      .then(all => {
        // Pre-order products belong in the banner only, not the grid
        const perfumes = all.filter(
          p => p.category?.toLowerCase() !== 'pre-order'
        );
        setProducts(perfumes);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [token]);

  return (
    <main className={styles.home}>
      <Header />

      {isAuthenticated && (
        <div className={styles.welcomeBanner}>
          <p>Welcome, {account?.name || account?.username}</p>
        </div>
      )}

      <Banner
        title="Orchidée Blanche"
        subtitle="A fragrance that carries you away."
        shippingNote="Meet first the new summer fragrance!"
      />

      <section className={`${styles.intro} ${styles.container}`}>
        <p>
          Find your signature fragrance with Aethera – where elegance meets the finest ingredients.
        </p>
      </section>

      <section className={`${styles.products} ${styles.container}`}>
        <div className={styles.grid}>
          {isLoading ? (
            <Loader />
          ) : products.length === 0 ? (
            <p className={styles.loading}>No products available.</p>
          ) : (
            products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                category={product.category}
              />
            ))
          )}
        </div>
      </section>

      <div className={styles.container}>
        <Newsletter />
      </div>
      <Footer />
    </main>
  );
}
