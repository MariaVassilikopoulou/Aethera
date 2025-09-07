// src/app/components/Banner.tsx
'use client';
import styles from '@/app/components/styles/Banner.module.scss';
import Image from 'next/image';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface BannerProps {
  title: string;
  subtitle: string;
  shippingNote?: string;
}

export default function Banner({ title, subtitle, shippingNote }: BannerProps) {
  const router = useRouter();
  const handlePreOrderClick = () => {
    router.push('/preOrderProduct'); // <-- navigate to product page
  };
  return (
    <section className={styles.banner}>
      

      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.label}>Pre-order now</p>
          {shippingNote && <p className={styles.shipping}>{shippingNote}</p>}
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <Button size='lg' variant='primary' onClick={handlePreOrderClick}>Pre-order </Button>
        </div>
        <div className={styles.image}>
   <Image
    src='/images/Right-Container.png'
    alt="banner image"
    width={800}       // increase default size
    height={400}      // make it more banner-like
    style={{ objectFit: 'cover', borderRadius: '32px' }} // cover for full banner look
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 60vw"
    priority
  />
</div>
        
      </div>
    </section>
  );
}
