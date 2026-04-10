import React from 'react';
import styles from './styles/Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <span className={styles.brandName}>Aethera</span>
          <p className={styles.tagline}>Where elegance meets the finest ingredients.</p>
        </div>

        <div className={styles.divider} />

        <nav className={styles.nav}>
          <div className={styles.col}>
            <p className={styles.colHeading}>Contact</p>
            <Link href="/">Instagram</Link>
            <Link href="/">Facebook</Link>
            <Link href="/">Email</Link>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Information</p>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Help</p>
            <p>Shipping</p>
            <p>Returns</p>
          </div>
        </nav>

        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} Aethera. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
 


