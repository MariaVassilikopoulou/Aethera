"use client";
import styles from '@/app/components/styles/Header.module.scss';
import { Search, User, ShoppingCart, Package, LogOut, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useCartStore } from '@/stores/cartStore';
import { fetchProducts, Product } from '../../services/productService';
import Image from 'next/image';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, account, logout, login, token } = useAuth();
  const cart = useCartStore(state => state.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const preOrderProducts: Product[] = [
    {
      id: "preorder-product",
      name: "Orchidée Blanche",
      price: 120,
      category: "Pre-order",
      imageUrl: "/images/Right-Container.png",
      description:
        "EAU DE PARFUM - Orchidée Blanche – Natural notes of white orchid and creamy vanilla.",
    },
  ];

  const handleSearchToggle = () => setShowSearch((prev) => !prev);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (!q.trim()) {
      setResults([]);
      return;
    }

  
    const filteredPreOrder = preOrderProducts.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );

   
    let backendProducts: Product[] = [];
    if (token) {
      try {
        const data = await fetchProducts(token);
        backendProducts = data.filter((p) =>
          p.name.toLowerCase().includes(q.toLowerCase())
        );
      } catch (err) {
        console.error("Search error:", err);
      }
    }

    setResults([...filteredPreOrder, ...backendProducts]);
  };

  const handleSelect = (product: Product) => {
    if (product.category === "Pre-order") {
      router.push(
        `/preOrderProduct?title=${encodeURIComponent(product.name)}`
      );
    } else {
      router.push(`/products/${product.id}`);
    }
    setQuery('');
    setResults([]);
    setShowSearch(false);
  };

  const handleCartClick = () => router.push('/cart');

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>Aethera</div>

      <div className={styles.searchWrapper} style={{ position: "relative" }}>
  {showSearch && (
    <>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search products..."
        value={query}
        onChange={handleSearchChange}
      />
      {results.length > 0 && (
        <ul className={styles.searchDropdown}>
          {results.map((p) => (
            <li key={p.id} onClick={() => handleSelect(p)} className={styles.dropdownItem}>
              <div className={styles.dropdownImg}>
                <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
              </div>
              <div className={styles.dropdownInfo}>
                <span className={styles.dropdownName}>{p.name}</span>
                {p.category === 'Pre-order' && (
                  <span className={styles.dropdownBadge}>Pre-order</span>
                )}
                <span className={styles.dropdownPrice}>€{p.price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )}
</div>
     
      <div className={styles.icons}>
        <Search size={24} onClick={handleSearchToggle} className={styles.icon} />

        <div style={{ position: "relative" }} ref={menuRef}>
          <User className={styles.icon} onClick={toggleMenu} size={24} />
          {showMenu && (
            <div className={styles.dropdown}>
              {isAuthenticated ? (
                <>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.avatar}>
                      {(account?.name || account?.username || 'A')[0].toUpperCase()}
                    </div>
                    <div className={styles.dropdownUser}>
                      <span className={styles.dropdownGreeting}>Welcome back</span>
                      <span className={styles.dropdownName2}>{account?.name || account?.username}</span>
                    </div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownBtn} onClick={() => { router.push('/profile'); setShowMenu(false); }}>
                    <User size={15} className={styles.dropdownBtnIcon} /> My Profile
                  </button>
                  <button className={styles.dropdownBtn} onClick={() => { router.push('/orders'); setShowMenu(false); }}>
                    <Package size={15} className={styles.dropdownBtnIcon} /> My Orders
                  </button>
                  <div className={styles.dropdownDivider} />
                  <button className={`${styles.dropdownBtn} ${styles.dropdownBtnLogout}`} onClick={handleLogout}>
                    <LogOut size={15} className={styles.dropdownBtnIcon} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownWelcome}>Welcome to Aethera</p>
                    <p className={styles.dropdownSub}>Sign in to your account</p>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={`${styles.dropdownBtn} ${styles.dropdownBtnPrimary}`}
                    onClick={() => { login(); setShowMenu(false); }}>
                    <LogIn size={15} className={styles.dropdownBtnIcon} /> Sign In
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ position: "relative" }} onClick={handleCartClick}>
          <ShoppingCart className={styles.icon} size={24} />
          {totalQuantity > 0 && <span className={styles.badge}>{totalQuantity}</span>}
        </div>
      </div>
      
    </header>
  );
}
