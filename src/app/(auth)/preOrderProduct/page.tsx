'use client';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Button from '@/app/components/Button';
import Image from 'next/image';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import styles from "./preOreder.module.scss";

export default function PreOrderProductPage() {
  const router = useRouter();
  const { token } = useAuth();
  const addToCart = useCartStore(state => state.addToCart);

 
  const product = {
    id: 'preorder-product',
    name: "Orchidée Blanche",
    price: 120,
    imageUrl: '/images/Right-Container.png',
    description: "EAU DE PARFUM - Orchidée Blanche – Natural notes of white orchid and creamy vanilla, a natural touch of sophistication.",
    category: 'Pre-order',
    shippingNote: "Meet first the new summer fragrance! __ Log in to preorder our latest fragrance today."
  };

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
              <p className={styles.shipping}>{product.shippingNote}</p>
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
