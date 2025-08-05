'use client';

import { useCartStore } from '@/stores/cartStore';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../components/styles/ProductCard.module.scss';

export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item) => (
            <li key={item.id} style={{ marginBottom: '1.5rem' }}>
                <Image src={item.imageUrl} alt={item.name} width={300} height={200} className={styles.image}/>
              <div><strong>{item.name}</strong></div>
              <div>Quantity: {item.quantity}</div>
              <div>Price: €{item.price.toFixed(2)}</div>
              <div>Subtotal: €{(item.price * item.quantity).toFixed(2)}</div>

              <div style={{ marginTop: '0.5rem' }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Total: €{getTotal().toFixed(2)}</h2>
        </div>
      )}
    </main>
  );
}
