// src/app/components/Header.tsx
"use client"
import styles from '@/app/components/styles/Header.module.scss';
import { Search, User, ShoppingCart } from 'lucide-react';
import {useState} from 'react';
import { useRouter ,usePathname,} from 'next/navigation';




export default function Header() {

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
 
  const handleUserClick = () => {
    
      router.push('/profile');
   
  };

  const handleCartClick = () => {
      router.push('/cart');
  };

  const hideIcons = pathname === '/login' || pathname === '/';
  return (
    <header className={styles.header}>
      <div className={styles.logo}   onClick={() => router.push('/')}>Aethera</div>
    
   


      {!hideIcons && ( <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
        {showSearch && (
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products..."
            value={query}
            onChange={handleSearchChange}
          />
        )}
        
      </form>)}
      {!hideIcons && (
      <div className={styles.icons}
      >
      <Search size={24} onClick={handleSearchToggle} className={styles.icon}  />
      <User className={styles.icon} onClick={handleUserClick}  size={24} />
      <ShoppingCart className={styles.icon} onClick={handleCartClick} 
     
      size={24} />
       
      </div>)}
    </header>
  );
}
