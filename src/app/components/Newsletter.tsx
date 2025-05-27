'use client';

import Button from './Button';
import styles from './styles/Newsletter.module.scss'
import { useRouter } from 'next/navigation';
export default function Newsletter() {
  const router = useRouter();


  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to receive the latest news and exclusive offers.</p>
       {/* <form className={styles.form}>
          <input type="email" placeholder="Enter your email" required />
         
        </form> */}
         <Button size='lg' variant ='secondary'  onClick={() => router.push('/')} >Sign Up ➜ </Button> 
        
      </div>
    </section>
  );
}
