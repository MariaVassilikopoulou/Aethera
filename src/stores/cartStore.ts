/*import { create } from "zustand";
import { Product } from "@/services/productService";
import { getCart, saveCart } from "@/services/cartService";

interface CartItem extends Product {
  quantity: number;
}
interface CartStore {
  cart: CartItem[];
  fetchCart: (token: string, userId: string) => Promise<void>;
  addToCart: (product: Product, token?: string, userId?: string) => Promise<void>;
  removeFromCart: (productId: string, token?: string, userId?: string) => Promise<void>;
  clearCart: (token?: string, userId?: string) => Promise<void>;
  increaseQuantity: (productId: string, token?: string, userId?: string) => Promise<void>;
  decreaseQuantity: (productId: string, token?: string, userId?: string) => Promise<void>;
}


export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

 // 🔹 Fetch cart from backend
 fetchCart: async (token) => {
  const result = await getCart(token);
  const mappedCart: CartItem[] = result.items.map(item => ({
    id: item.productId, // backend → local
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    description: "",
    category: "",
  }));
  set({ cart: mappedCart });
},


 // 🔹 Add item - Fixed version with fallback
addToCart: async (product, token, userId) => {
  const cart = get().cart;
  const existing = cart.find(item => item.id === product.id);

  const updatedCart: CartItem[] = existing
    ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...cart, { ...product, quantity: 1 }];

  set({ cart: updatedCart });

  // Only save to backend if we have both token AND userId
  if (token && userId) {
    try {
      await saveCart({
        userId,
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        }))
      }, token);
      console.log('Cart saved successfully to backend');
    } catch (error) {
      console.error('Failed to save cart to backend:', error);
      
      // 🔹 Check if it's a CORS/network error vs server error
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.log('Network/CORS error - cart saved locally only');
        // Don't revert local state, just show a warning
        // You could show a toast notification here
      } else {
        console.error('Server error, reverting cart state');
        // Revert to previous state on actual server errors
        set({ cart });
      }
    }
  } else {
    console.log('No token/userId provided, cart only saved locally');
  }
},
  

 // 🔹 Remove item
 removeFromCart: async (productId, token, userId) => {
  const updatedCart = get().cart.filter(item => item.id !== productId);
  set({ cart: updatedCart });

  if (token && userId) {
    await saveCart(
      {
        userId,
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
      },
      token
    );
  }
},

// 🔹 Clear cart
clearCart: async (token, userId) => {
  set({ cart: [] });
  if (token && userId) {
    await saveCart({ userId, items: [] }, token);
  }
},

// 🔹 Increase quantity
increaseQuantity: async (productId, token, userId) => {
  const updatedCart = get().cart.map(item =>
    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
  );
  set({ cart: updatedCart });

  if (token && userId) {
    await saveCart(
      {
        userId,
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
      },
      token
    );
  }
},

// 🔹 Decrease quantity
decreaseQuantity: async (productId, token, userId) => {
  const cart = get().cart;
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const updatedCart = item.quantity > 1
    ? cart.map(i => i.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
    : cart.filter(i => i.id !== productId);

  set({ cart: updatedCart });

  if (token && userId) {
    await saveCart(
      {
        userId,
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
      },
      token
    );
  }
},
}));*/

/*import { create } from "zustand";
import { Product } from "@/services/productService";
import { getCart, saveCart } from "@/services/cartService";

/*interface CartItem extends Product {
  quantity: number;
}*/

/*export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
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

  // 🔹 Fetch cart from backend
  fetchCart: async (token) => {
    const result = await getCart(token);
    const mappedCart: CartItem[] = result.items.map(item => ({
      id: item.productId, // backend → local
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
      description: "",
      category: "",
    }));
    set({ cart: mappedCart });
  },


  fetchCart: async (token) => {
    const result = await getCart(token); // should return { items: CartItem[] }
    set({ cart: result.items });
  },
  // 🔹 Add item
  addToCart: async (product, token) => {
    const cart = get().cart;
    const existing = cart.find(item => item.productId === product.productId);

    const updatedCart: CartItem[] = existing
      ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];

    set({ cart: updatedCart });

    if (token) {
      try {
        await saveCart({
          items: updatedCart.map(i => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            imageUrl: i.imageUrl,
          }))
        }, token);
        console.log("Cart saved successfully to backend");
      } catch (error) {
        console.error("Failed to save cart to backend:", error);
        set({ cart }); // revert to old state
      }
    } else {
      console.log("No token provided, cart only saved locally");
    }
  },

  // 🔹 Remove item
  removeFromCart: async (productId, token) => {
    const updatedCart = get().cart.filter(item => item.id !== productId);
    set({ cart: updatedCart });

    if (token) {
      await saveCart({
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        }))
      }, token);
    }
  },

  // 🔹 Clear cart
  clearCart: async (token) => {
    set({ cart: [] });
    if (token) {
      await saveCart({ items: [] }, token);
    }
  },

  // 🔹 Increase quantity
  increaseQuantity: async (productId, token) => {
    const updatedCart = get().cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    set({ cart: updatedCart });

    if (token) {
      await saveCart({
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        }))
      }, token);
    }
  },

  // 🔹 Decrease quantity
  decreaseQuantity: async (productId, token) => {
    const cart = get().cart;
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const updatedCart = item.quantity > 1
      ? cart.map(i => i.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
      : cart.filter(i => i.id !== productId);

    set({ cart: updatedCart });

    if (token) {
      await saveCart({
        items: updatedCart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        }))
      }, token);
    }
  },
}));
*/

import { create } from "zustand";
import { Product } from "@/services/productService";
import { getCart, saveCart } from "@/services/cartService";

interface CartItem {
  productId: string;   // ✅ same as backend DTO
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
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

  // 🔹 Fetch cart from backend
  fetchCart: async (token) => {
    const result = await getCart(token);
    set({ cart: result.items }); // ✅ no remapping, already correct shape
  },

  // 🔹 Add item
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
            productId: product.id, // ✅ consistent with backend
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
          },
        ];

    set({ cart: updatedCart });

    if (token) {
      try {
        await saveCart({ items: updatedCart }, token);
        console.log("Cart saved successfully to backend");
      } catch (error) {
        console.error("Failed to save cart to backend:", error);
        set({ cart }); // revert to old state
      }
    } else {
      console.log("No token provided, cart only saved locally");
    }
  },

  // 🔹 Remove item
  removeFromCart: async (productId, token) => {
    const updatedCart = get().cart.filter(item => item.productId !== productId);
    set({ cart: updatedCart });

    if (token) {
      await saveCart({ items: updatedCart }, token);
    }
  },

  // 🔹 Clear cart
  clearCart: async (token) => {
    set({ cart: [] });
    if (token) {
      await saveCart({ items: [] }, token);
    }
  },

  // 🔹 Increase quantity
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

  // 🔹 Decrease quantity
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
