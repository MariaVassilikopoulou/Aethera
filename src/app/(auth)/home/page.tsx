// src/app/home/page.tsx
"use client"; // Important: this must be at the top if using hooks


import Banner from '../../components/Banner';
import Newsletter from '../../components/Newsletter';
import ProductCard from '../../components/ProductCard';
import styles from './home.module.scss';

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/hooks/useAuth";
export default function HomePage() {

  const { isAuthenticated, account } = useAuth();
 
  

 
 /* // Not authenticated? Show login button only
  if (!isAuthenticated) {
    return (
      <main className={styles.home}>
        <button onClick={handleLogin}>Login</button>
      </main>
    );
  }*/

    return (
      <main className={styles.home}>
        <Header/>
        {/* ✅ Show this only if logged in */}
        {isAuthenticated && (
          <p>Welcome, {account?.name || account?.username}</p>
        )} 
         
  
        {/* 🟡 Optional login button for guests 
        {!isAuthenticated && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p>👋 Welcome, guest!</p>
            <Button onClick={handleLogin} variant="primary" size="sm">
              Login for more features
            </Button>
          </div>
        )}*/}

      <Banner
        title="Orchidée Blanche"
        subtitle="A fragrance that carries you away."
        shippingNote="Meet first the new summer fragrance!"
      />

      <section className={styles.intro}>
        <p>
          Find your signature fragrance with Aethera – where elegance meets the finest ingredients.
        </p>
      </section>

      <section className={styles.products}>
        <div className={styles.grid}>
          {[...Array(8)].map((_, i) => (
            <ProductCard
              key={i}
              title="Perfume1"
              price={79.99}
              imageUrl="/images/Right-Container.png"
            />
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer/>
    </main>
  );
}
