// src/app/components/Banner.tsx
'use client';
import styles from '@/app/components/styles/Banner.module.scss';
import Image from 'next/image';
import Button from './Button';

interface BannerProps {
  title: string;
  subtitle: string;
  shippingNote?: string;
}

export default function Banner({ title, subtitle, shippingNote }: BannerProps) {
  return (
    <section className={styles.banner}>
      {shippingNote && <p className={styles.shipping}>{shippingNote}</p>}

      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.label}>Pre-order now</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <Button size='lg' variant='primary'>Pre-order</Button>
        </div>

        <div className={styles.image}>
          <Image src='/images/Right-Container.png' alt="banner image" width={500} height={500}  />
        </div>
      
        
      </div>
    </section>
  );
}
