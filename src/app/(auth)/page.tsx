"use client"; 


import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import styles from './home/home.module.scss';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { fetchProducts ,  Product} from '../../services/productService';
import { useEffect, useState } from 'react';





export default function HomePage() {

 
  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, account , token } = useAuth();
  useEffect(() => {
    setIsClient(true);
  }, []);
 
  useEffect(() => {
    const getProducts = async () => {
      if (!token) return;
      //#####console.log(" Token before fetch:", token);

      try {
        const data = await fetchProducts(token);
        const perfumes = data.filter(p => p.category?.toLowerCase() !== 'pre-order');
        setProducts(perfumes);
      } catch (error) {
        console.error(" Could not load products:", error);
      }
    };

    if (isClient) {
      getProducts();
    }
  }, [token, isClient]);

  if (!isClient) return null;


 
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
       
        {isAuthenticated && (
          <div className={styles.welcomeBanner}>
            <span className={styles.welcomeRule} />
            <p className={styles.welcomeText}>
              Welcome back, <em>{account?.name || account?.username}</em>
            </p>
            <span className={styles.welcomeRule} />
          </div>
        )}  
         
  
        {/*  Optional login button for guests 
        {!isAuthenticated && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p> Welcome, guest!</p>
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
        <span className={styles.introAccent}>✦</span>
        <p className={styles.introText}>
          Find your signature fragrance with Aethera
        </p>
        <p className={styles.introSub}>
          where elegance meets the finest ingredients
        </p>
        <span className={styles.introAccent}>✦</span>
      </section>

      <section className={styles.products}>
        <div className={styles.grid}>
          { /*[...Array(8)].map((_, i) */} {products.map((product)  => (
            <ProductCard
              key={product.id}
              id={product.id} 
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer/>
    </main>
  );
}
