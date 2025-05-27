// src/app/home/page.tsx
import Banner from '../components/Banner';

import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';
import styles from './home.module.scss';


export default function HomePage() {
  return (
    <main className={styles.home}>
  
     <Banner 
      title="Orchidée Blanche"
      subtitle="A fragrance that carries you away."
      shippingNote="Meet first the new summer fragrance!"/>
   
      <section className={styles.intro}>
        <p>Find your signature fragrance with Aethera – where elegance meets the finest ingredients.</p>
      </section>

      <section className={styles.products}>
      <div className={styles.grid}>
      {[...Array(8)].map((_, i) => (
      <ProductCard key={i}
                   title='Perfume1'
                   price={79.99}
                   imageUrl="/images/Right-Container.png" />))}       
        </div>  
        </section>
  
     <Newsletter/>



    
    </main>
  );
}
