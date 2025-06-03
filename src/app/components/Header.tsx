// src/app/components/Header.tsx
"use client"
import styles from '@/app/components/styles/Header.module.scss';
import { Search, User, ShoppingCart } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";

import { useCartStore } from '@/stores/cartStore';
export default function Header() {

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  //const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

 
 

  const { isAuthenticated, account, logout ,login} = useAuth();

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  const cart = useCartStore(state => state.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

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

 
  /*const handleUserClick = () => {
    
      router.push('/profile');
   
  };*/

  const handleCartClick = () => {
      router.push('/cart');
  };

 // const hideIcons = pathname === '/login' || pathname === '/';
  return (
    <header className={styles.header}>
      <div className={styles.logo}   onClick={() => router.push('/')}>Aethera</div>
    
   


        <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
        {showSearch && (
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products..."
            value={query}
            onChange={handleSearchChange}
          />
        )}
        
      </form>
      
      <div className={styles.icons}
      >
      <Search size={24} onClick={handleSearchToggle} className={styles.icon}  />
      <div style={{ position: "relative" }} ref={menuRef}>
      <User className={styles.icon} onClick={toggleMenu}  size={24} />
      {showMenu && (
            <div className={styles.dropdown}>
              {isAuthenticated ? (
                <>
                  <p>Hello, {account?.name || account?.username}</p>
                  <button onClick={() => router.push('/profile')}>My Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => {
  login().then(() => {
    setShowMenu(false);
    router.push("/"); // Redirect to homepage
  });
}}>Login</button>
                  <button onClick={() => setShowMenu(false)}>Continue as Guest</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
        <div style={{ position: "relative" }} onClick={handleCartClick}>
      <ShoppingCart className={styles.icon} 
     
      size={24} />
       {totalQuantity > 0 && (
    <span className={styles.badge}>{totalQuantity}</span>
  )}
</div>
      </div>
    </header>
  );
}
