'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/app/components/Button';
import { useCartStore } from '@/stores/cartStore';
import toast from 'react-hot-toast';
import { fetchProducts, Product } from '@/services/productService';
import { useAuth } from '@/hooks/useAuth';
import styles from "../product.module.scss"
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore(state => state.addToCart);
  const { token } = useAuth(); // <-- get your Azure auth token
  const router = useRouter();
  const handleContinueShopping = () => {
    router.push('/');
};
useEffect(() => {
  const getProduct = async () => {
    if (!token) return; // wait for token

    // ✅ Special case for pre-order
    if (id === "preorder-product") {
      setProduct({
        id: "preorder-product",
        name: "Orchidée Blanche",
        price: 120,
        imageUrl: "/images/Right-Container.png",
        description: "EAU DE PARFUM - Orchidée Blanche – Natural notes of white orchid and creamy vanilla, a natural touch of sophistication.",
        category: "Pre-order",
      });
      return;
    }

    try {
      const products = await fetchProducts(token); // fetch all real products
      const foundProduct = products.find(p => p.id === id);
      if (!foundProduct) throw new Error("Product not found");
      setProduct(foundProduct);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      console.error(err);
    }
  };

  getProduct();
}, [id, token]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <><Header/>
    <main className={styles.productPage}>
  
  <h1>{product.name}</h1>
  <div className={styles.content}>
  <div className={styles.imageContainer}>
  <Image
    src={product.imageUrl}
    alt={product.name}
    width={400}
    height={400}
    className={styles.img}  // <-- apply the CSS
  />
</div>
    <div className={styles.details}>
      <p>{product.description}</p>
      <p className={styles.price}>€{product.price.toFixed(2)}</p>
      <div className={styles.addToCartBtn}>
        <Button onClick={handleAddToCart} size="md" variant="primary">
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
  <div className={styles.backButton}>
    <Button size="sm" variant="secondary"  onClick={handleContinueShopping}>
      ← Back                                
    </Button>                               
  </div>
</main>
</>
  );
}
