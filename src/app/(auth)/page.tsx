
/*"use client"
import AuthButton from "../components/AuthButton";
import styles from '@/app/components/styles/RegisterForm.module.scss'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {  useIsAuthenticated } from "@azure/msal-react";
import Button from "../components/Button";

export default function RegisterPage() {

  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home"); // Redirect if logged in
    }
  }, [isAuthenticated, router]);


  const handleGoOn = () => {
    router.push("/home")
  };

  
  

  return (
   
    <div className={styles.authWrapper}>
      <main className={styles.content}>
        <h1>Create account</h1>
        <Button onClick={handleGoOn}>GoOnAsGeust</Button>
       <AuthButton/> 
      </main>
    </div>
   
  );
}*/
// \src\app\(auth)\page.tsx
"use client"; 


import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import styles from './home/home.module.scss';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { fetchProducts ,  Product} from '../../services/productService';
import { useEffect, useState } from 'react';





export default function HomePage() {

  const { isAuthenticated, account , token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const getProducts = async () => {
      if (!token) return;

      try {
        const data = await fetchProducts(token);
        setProducts(data);
      } catch (error) {
        console.error("❌ Could not load products:", error);
      }
    };

    getProducts();
  }, [token]);


 
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
          { /*[...Array(8)].map((_, i) */} {products.map((product)  => (
            <ProductCard
              key={product.id}
              id={product.id} 
              name={product.name}
              price={product.price}
              imageUrl="/images/Right-Container.png"
            />
          ))}
        </div>
      </section>

      <Footer/>
    </main>
  );
}
