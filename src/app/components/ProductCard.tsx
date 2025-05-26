'use client';

import Image from 'next/image';
import styles from './styles/ProductCard.module.scss';
import Button from './Button';

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ title, price, imageUrl }: ProductCardProps) {
  return (
    <div className={styles.card}>
         <div className={styles.imageContainer}>
        <Image src={imageUrl} alt={title} width={300} height={200} className={styles.image}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" />
        </div>
        <h3>{title}</h3>
        <p>€{price.toFixed(2)} </p>
        <div className={styles.button}>
        <Button size='md' variant ='primary'>Add to Cart</Button> 
        </div>
    </div>
  );
}
