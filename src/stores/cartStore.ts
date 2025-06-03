import { create } from 'zustand';
import { Product } from '@/services/productService';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  addToCart: (product: Product) => {
    const cart = get().cart;
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      set({
        cart: cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId: string) => {
    set({
      cart: get().cart.filter(item => item.id !== productId),
    });
  },

  clearCart: () => set({ cart: [] }),
}));
