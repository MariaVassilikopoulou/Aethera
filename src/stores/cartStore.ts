import { create } from "zustand";
import { Product } from "@/services/productService";
import { getCart, saveCart, deleteCart } from "@/services/cartService";

interface CartItem {
  productId: string;   
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category?: string;
}

interface CartStore {
  cart: CartItem[];
  fetchCart: (token: string) => Promise<void>;
  addToCart: (product: Product, token?: string) => Promise<void>;
  removeFromCart: (productId: string, token?: string) => Promise<void>;
  clearCart: (token?: string) => Promise<void>;
  increaseQuantity: (productId: string, token?: string) => Promise<void>;
  decreaseQuantity: (productId: string, token?: string) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

 
  fetchCart: async (token) => {
    const result = await getCart(token);
    set({ cart: result.items }); 
  },

  
  addToCart: async (product, token) => {
    const cart = get().cart;
    const existing = cart.find(item => item.productId === product.id);

    const updatedCart: CartItem[] = existing
      ? cart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [
          ...cart,
          {
            productId: product.id, 
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
            category: product.category,
          },
        ];

    set({ cart: updatedCart });

    if (token) {
      try {
        await saveCart({ items: updatedCart }, token);
        console.log("Cart saved successfully to backend");
      } catch (error) {
        console.error("Failed to save cart to backend:", error);
        set({ cart }); 
      }
    } else {
      console.log("No token provided, cart only saved locally");
    }
  },

  
  removeFromCart: async (productId, token) => {
    const updatedCart = get().cart.filter(item => item.productId !== productId);
    set({ cart: updatedCart });

    if (token) {
      await saveCart({ items: updatedCart }, token);
    }
  },

  
  clearCart: async (token) => {
    set({ cart: [] });
    if (token) {
      await deleteCart(token);
    }
  },

  
  increaseQuantity: async (productId, token) => {
    const updatedCart = get().cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    set({ cart: updatedCart });

    if (token) {
      await saveCart({ items: updatedCart }, token);
    }
  },

  
  decreaseQuantity: async (productId, token) => {
    const cart = get().cart;
    const item = cart.find(i => i.productId === productId);
    if (!item) return;

    const updatedCart = item.quantity > 1
      ? cart.map(i =>
          i.productId === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      : cart.filter(i => i.productId !== productId);

    set({ cart: updatedCart });

    if (token) {
      await saveCart({ items: updatedCart }, token);
    }
  },
}));
