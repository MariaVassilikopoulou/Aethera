'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Button from '@/app/components/Button';
import Image from 'next/image';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/hooks/useAuth';
import { fetchProducts, Product } from '@/services/productService';
import toast from 'react-hot-toast';
import styles from "./preOreder.module.scss";

const SHIPPING_NOTE = "Meet first the new summer fragrance! Log in to preorder our latest fragrance today.";

const FALLBACK: Product = {
  id: 'preorder-product',
  name: "Orchidée Blanche",
  price: 120,
  imageUrl: '/images/Right-Container.png',
  description: "EAU DE PARFUM - Orchidée Blanche – Natural notes of white orchid and creamy vanilla, a natural touch of sophistication.",
  category: 'Pre-order',
};

export default function PreOrderProductPage() {
  const router = useRouter();
  const { token } = useAuth();
  const addToCart = useCartStore(state => state.addToCart);
  const [product, setProduct] = useState<Product>(FALLBACK);

  // Fetch the real pre-order product from the backend.
  // Falls back to hardcoded data if not found or fetch fails.
  useEffect(() => {
    if (!token) return;

    fetchProducts(token)
      .then(products => {
        const preorder = products.find(
          p => p.category?.toLowerCase() === 'pre-order'
        );
        if (preorder) setProduct(preorder);
      })
      .catch(() => {
        // Keep fallback silently — no error shown to user
      });
  }, [token]);

  const handlePreOrder = async () => {
    if (!token) {
      toast.error("Please log in to place a pre-order.");
      return;
    }
    await addToCart(product, token);
    toast.success(`${product.name} added to cart!`);
    router.push('/cart');
  };

  return (
    <>
      <Header />
      <main className={styles.productPage}>
        <h1>{product.name}</h1>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              priority
              className={styles.img}
            />
          </div>
          <div className={styles.details}>
            <p>{product.description}</p>
            <p className={styles.price}>€{product.price.toFixed(2)}</p>
            <div className={styles.addToCartBtn}>
              <Button onClick={handlePreOrder} size="md" variant="primary">
                Pre-order
              </Button>
              <p className={styles.shipping}>{SHIPPING_NOTE}</p>
            </div>
          </div>
        </div>
        <div className={styles.backButton}>
          <Button size="sm" variant="secondary" onClick={() => router.push('/')}>
            ← Back
          </Button>
        </div>
      </main>
    </>
  );
}
