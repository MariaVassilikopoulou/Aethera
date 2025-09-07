/*'use client';

import { useCartStore } from '@/stores/cartStore';
import Button from '../../components/Button';
import Image from 'next/image';
import styles from './cart.module.scss';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import Header from '../../components/Header';
import { useAuth } from '@/hooks/useAuth';
export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const router = useRouter();
  const handleContinueShopping = () => {
    router.push('/');
};



const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  const handleCheckout = () => router.push('/checkout');
  const { token } = useAuth();
  return (<>
     <Header/>
    <main className={styles.cartPage}>
      <h1>Your Cart</h1>
     

      {cart.length === 0 ? (
          <div  className={styles.emptyCart}>
        <p>Your cart is empty.</p>
       
         <Button
                  size="md"
                  variant="primary" 
                  onClick={handleContinueShopping}
                  >
                  Continue Shopping
                </Button>
                </div>  
      ) : (
        <div className={styles.cartContainer}>
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}
           >
                <Image src={item.imageUrl} alt={item.name} width={300} height={200} className={styles.image}  onClick={() => router.push(`/products/${item.id}`)}/>
              <div className={styles.info}><h3>{item.name}</h3></div>
              <div className={styles.price}>Price: €{item.price.toFixed(2)}</div>
              <div className={styles.quantityControls}>
              <Button size="sm" variant="outline" onClick={() => decreaseQuantity(item.id, token?? undefined)}
                disabled={item.quantity === 1} 
                className={styles.quantityBtn}>
                  
                –
              </Button>
              <span className={styles.quantity}>{item.quantity}</span>
              <Button size="sm" variant="outline" onClick={() => increaseQuantity(item.id, token?? undefined)}
                className={styles.quantityBtn}>
              +
             </Button>
             <button 
                  onClick={() => removeFromCart(item.id, token?? undefined)}
                  aria-label={`Remove ${item.name}`}
                  className={styles.trashButton}
                >
                  <Trash2 size={18} />
                </button>
              </div>
             
              <div className={styles.subtotal}>Subtotal: €{(item.price * item.quantity).toFixed(2)}</div>

             
            </li>
          ))}
        </ul>
     

      {cart.length > 0 && (
        <div className={styles.cartSummary}>
          <h2>Total: €{getTotal().toFixed(2)}</h2>
          <Button size="md" variant="primary" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
        </div>
        
      )}
       {cart.length > 0 && (
    <div className={styles.backToShop}>
      <Button size="sm" variant="secondary" onClick={handleContinueShopping}>
        ← Back to Shop
      </Button>
    </div>
  )}
         </div>
      )}
    </main>
    </>
  );
}
*/

/*'use client';

import { useCartStore } from '@/stores/cartStore';
import Button from '../../components/Button';
import Image from 'next/image';
import styles from './cart.module.scss';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import Header from '../../components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  const fetchCart = useCartStore(state => state.fetchCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  //const clearCart = useCartStore(state => state.clearCart);

  const { token, account } = useAuth();
  const userId = account?.homeAccountId;

  const router = useRouter();

  // Fetch cart when token and userId are ready
  useEffect(() => {
    if (token && userId) {
      fetchCart(token, userId);
    }
  }, [token, userId, fetchCart]);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleContinueShopping = () => router.push('/');
  const handleCheckout = () => router.push('/checkout');

  return (
    <>
      <Header />
      <main className={styles.cartPage}>
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty.</p>
            <Button size="md" variant="primary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <ul className={styles.cartList}>
              {cart.map(item => (
                <li key={item.id} className={styles.cartItem}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={300}
                    height={200}
                    className={styles.image}
                    onClick={() => router.push(`/products/${item.id}`)}
                  />
                  <div className={styles.info}>
                    <h3>{item.name}</h3>
                  </div>
                  <div className={styles.price}>Price: €{item.price.toFixed(2)}</div>
                  <div className={styles.quantityControls}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => decreaseQuantity(item.id, token ?? undefined, userId)}
                      disabled={item.quantity === 1}
                      className={styles.quantityBtn}
                    >
                      –
                    </Button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => increaseQuantity(item.id, token ?? undefined, userId)}
                      className={styles.quantityBtn}
                    >
                      +
                    </Button>
                    <button
                      onClick={() => removeFromCart(item.id, token ?? undefined, userId)}
                      aria-label={`Remove ${item.name}`}
                      className={styles.trashButton}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal: €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.cartSummary}>
              <h2>Total: €{getTotal().toFixed(2)}</h2>
              <Button size="md" variant="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>

            <div className={styles.backToShop}>
              <Button size="sm" variant="secondary" onClick={handleContinueShopping}>
                ← Back to Shop
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
*/

'use client';

import { useCartStore } from '@/stores/cartStore';
import Button from '../../components/Button';
import Image from 'next/image';
import styles from './cart.module.scss';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import Header from '../../components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  const fetchCart = useCartStore(state => state.fetchCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);

  const { token } = useAuth();
  const router = useRouter();

  // 🔹 Fetch cart when token is ready
  useEffect(() => {
    if (token) {
      fetchCart(token);
    }
  }, [token, fetchCart]);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleContinueShopping = () => router.push('/');
  const handleCheckout = () => router.push('/checkout');

  return (
    <>
      <Header />
      <main className={styles.cartPage}>
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty.</p>
            <Button size="md" variant="primary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <ul className={styles.cartList}>
              {cart.map(item => (
                <li key={item.productId} className={styles.cartItem}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={300}
                    height={200}
                    className={styles.image}
                    onClick={() => router.push(`/products/${item.productId}`)}
                  />
                  <div className={styles.info}>
                    <h3>{item.name}</h3>
                  </div>
                  <div className={styles.price}>Price: €{item.price.toFixed(2)}</div>
                  <div className={styles.quantityControls}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => decreaseQuantity(item.productId, token ?? undefined)}
                      disabled={item.quantity === 1}
                      className={styles.quantityBtn}
                    >
                      –
                    </Button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => increaseQuantity(item.productId, token ?? undefined)}
                      className={styles.quantityBtn}
                    >
                      +
                    </Button>
                    <button
                      onClick={() => removeFromCart(item.productId, token ?? undefined)}
                      aria-label={`Remove ${item.name}`}
                      className={styles.trashButton}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal: €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.cartSummary}>
              <h2>Total: €{getTotal().toFixed(2)}</h2>
              <Button size="md" variant="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>

            <div className={styles.backToShop}>
              <Button size="sm" variant="secondary" onClick={handleContinueShopping}>
                ← Back to Shop
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
