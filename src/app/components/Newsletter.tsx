'use client';

import Button from './Button';
import styles from './styles/Newsletter.module.scss'
import { useAuth } from '@/hooks/useAuth';
export default function Newsletter() {
  const { isAuthenticated, login } = useAuth();

  return (
    <section className={styles.newsletter}>
      <svg className={styles.waveTop} viewBox="0 0 1000 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C150,5 400,5 500,40 C600,75 850,75 1000,40" fill="none" stroke="#bdaaaa" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M0,40 C150,75 400,75 500,40 C600,5 850,5 1000,40" fill="none" stroke="#bdaaaa" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="500" cy="40" r="3" fill="#bdaaaa"/>
      </svg>
      <div className={styles.content}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to receive the latest news and exclusive offers.</p>
        {isAuthenticated ? (
          <p className={styles.signedIn}>You&apos;re signed in — you&apos;ll be the first to know.</p>
        ) : (
          <Button size='lg' variant='secondary' onClick={login}>Sign Up ➜</Button>
        )}
      </div>
      <svg className={styles.waveBottom} viewBox="0 0 1000 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C150,5 400,5 500,40 C600,75 850,75 1000,40" fill="none" stroke="#aa8c64" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M0,40 C150,75 400,75 500,40 C600,5 850,5 1000,40" fill="none" stroke="#aa8c64" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="500" cy="40" r="3" fill="#aa8c64"/>
      </svg>
    </section>
  );
}
