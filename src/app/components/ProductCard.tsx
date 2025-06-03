'use client';

import Image from 'next/image';
import styles from './styles/ProductCard.module.scss';
import Button from './Button';
import { useCartStore } from '@/stores/cartStore';


interface ProductCardProps {
  id:string;
  name: string;
  price: number;
  imageUrl: string;
  description?:string;
  category?:string;
}

export default function ProductCard({ id, name, price, imageUrl, description, category}: ProductCardProps) {
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
  };
  return (
    <div className={styles.card}>
         <div className={styles.imageContainer}>
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
