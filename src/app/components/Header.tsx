"use client";
import styles from '@/app/components/styles/Header.module.scss';
import { Search, User, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useCartStore } from '@/stores/cartStore';
import { fetchProducts, Product } from '../../services/productService';

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
            <li key={p.id} onClick={() => handleSelect(p)}>
              {p.name} - €{p.price.toFixed(2)}
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
                  <p>Hello, {account?.name || account?.username}</p>
                  <button onClick={() => router.push('/profile')}>My Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      login();
                      setShowMenu(false);
                    }}
                  >
                    Login
                  </button>
                 {/* <button onClick={() => setShowMenu(false)}>Continue as Guest</button>*/}
                  <button onClick={handleLogout}>Logout</button>
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
