import React from 'react';
import styles from './styles/Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
    { /*<div className={styles.wave}>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
     <path fill="#8c7b75" fill-opacity="1" d="M0,160L80,181.3C160,203,320,245,480,234.7C640,224,800,160,960,144C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      </div>*/}
      
      <div className={styles.container}>
       {/*<div className={styles.logo}>Aethera</div> */}
       <div className={styles.extradiv}>
        <nav className={styles.nav}>
            <div>
        <p>Contact</p>
          <Link className={styles.nav} href="/">Instagram</Link>
          <Link className={styles.nav} href="/">Facebook</Link>
          <Link className={styles.nav} href="/">Email</Link>
          </div>
          <div>
          <p>Information</p>
          <Link className={styles.nav} href="/terms">Terms and conditions</Link>
          <Link className={styles.nav} href="/privacy">Privacy Policy</Link>
          </div>
          <div>
          <p>Help</p>
          <p>Shipping</p>
          <p>Returns</p>
         </div>
        </nav>
        </div>
        <div className={styles.copy}>&copy; {new Date().getFullYear()} Aethera. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
 


