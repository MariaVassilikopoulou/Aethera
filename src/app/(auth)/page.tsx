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
        setProducts(data);
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
       
        {/* Show this only if logged in */}
        {isAuthenticated && ( 
          <div className={styles.welcomeBanner}>
          <p >Welcome, {account?.name || account?.username}</p>
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
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </section>

      <Footer/>
    </main>
  );
}
