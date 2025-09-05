'use client';

import Image from 'next/image';
import styles from './styles/ProductCard.module.scss';
import Button from './Button';
import { useCartStore } from '@/stores/cartStore';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  id:string;
  name: string;
  price: number;
  imageUrl: string;
  description?:string;
  category?:string;
}

export default function ProductCard({ id, name, price, imageUrl, description, category}: ProductCardProps) {
  const router = useRouter();
  
const goToProduct = () => router.push(`/products/${id}`);

  const addToCart = useCartStore(state => state.addToCart);
  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      imageUrl,
      description,
      category
    });
    toast.success(`${name} added to cart!`);
  };
  return (
    <div className={styles.card}>
         <div className={styles.imageContainer}
         onClick={goToProduct}>
        <Image src={imageUrl} alt={name} width={300} height={200} className={styles.image}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" />
        </div>
        <h3>{name}</h3>
        <p>€{price.toFixed(2)} </p>
        <div className={styles.button}>
        <Button size='md' variant ='primary'  onClick={handleAddToCart}>Add to Cart</Button> 
        </div>
    </div>
  );
}
