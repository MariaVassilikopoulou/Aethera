// src/app/home/page.tsx
"use client"; // Important: this must be at the top if using hooks

import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";
import Banner from '../../components/Banner';
import Newsletter from '../../components/Newsletter';
import ProductCard from '../../components/ProductCard';
import styles from './home.module.scss';

export default function HomePage() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error("❌ Login error:", e);
    });
  };

  // Not authenticated? Show login button only
  if (!isAuthenticated) {
    return (
      <main className={styles.home}>
        <button onClick={handleLogin}>Login</button>
      </main>
    );
  }

  // Authenticated? Show content
  return (
    <main className={styles.home}>
      <p>✅ Welcome, {account?.name || account?.username}</p>

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
    </main>
  );
}
