// src/app/components/Header.tsx
import styles from '@/app/components/styles/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Aethera</div>
      <div className={styles.icons}>
        <span>🔍</span>
        <span>👤</span>
        <span>🛒</span>
      </div>
    </header>
  );
}
