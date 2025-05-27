'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Simulate fetching cart items (replace with API call later)
    const mockCart: CartItem[] = [
      { id: 1, name: 'Red Shirt', quantity: 2 },
      { id: 2, name: 'Blue Jeans', quantity: 1 },
    ];
    setItems(mockCart);
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem' }}>
              <strong>{item.name}</strong> — Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
