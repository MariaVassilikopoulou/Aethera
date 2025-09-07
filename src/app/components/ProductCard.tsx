'use client';

import Image from 'next/image';
import styles from './styles/ProductCard.module.scss';
import Button from './Button';
import { useCartStore } from '@/stores/cartStore';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  //description,
  //category
}: ProductCardProps) {
  const router = useRouter();
  const { token } = useAuth();
  const addToCart = useCartStore(state => state.addToCart);

  const goToProduct = () => router.push(`/products/${id}`);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    await addToCart(
      {
        id,
        name,
        price,
        imageUrl
        //description,
       // category
      },
      token
    );

    toast.success(`${name} added to cart!`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer} onClick={goToProduct}>
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={200}
          className={styles.image}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <h3>{name}</h3>
      <p>€{price.toFixed(2)}</p>
      <div >
        <Button size="md" variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
