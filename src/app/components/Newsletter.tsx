'use client';

import Button from './Button';
import styles from './styles/Newsletter.module.scss'

export default function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to receive the latest news and exclusive offers.</p>
       {/* <form className={styles.form}>
          <input type="email" placeholder="Enter your email" required />
         
        </form> */}
         <Button size='lg' variant ='secondary'>Sign Up ➜ </Button> 
      </div>
    </section>
  );
}
