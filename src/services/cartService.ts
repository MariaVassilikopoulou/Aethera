

/*export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }
  
  export interface CartDto {
   // userId?: string; // optional now
    items: CartItem[];
  }
  
  const API_BASE = ''; // Empty for relative URLs to Next.js API routes

  export async function getCart(token: string): Promise<CartDto> {
    const url = `${API_BASE}/api/Cart`;
    console.log('Fetching cart from Next.js API route:', url);
    
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  
    if (!res.ok) {
      console.error('getCart failed:', res.status, res.statusText);
      throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
    }
  
    const text = await res.text();
    if (!text) return { items: [] };
  
    return JSON.parse(text) as CartDto;
  }
  
  export async function saveCart(cart: CartDto, token: string): Promise<CartDto> {
    const url = `${API_BASE}/api/Cart`;
    console.log('Saving cart via Next.js API route:', url);
    console.log('Cart data:', cart);
    
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cart)
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('saveCart failed:', res.status, res.statusText, errorText);
        throw new Error(`Failed to save cart: ${res.status} ${res.statusText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('Network error in saveCart:', error);
      throw error;
    }
  }*/



    export interface CartItem {
      productId: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl: string;
    }
    
    export interface CartDto {
      items: CartItem[];
    }
    
    const API_BASE = ""; // Empty for relative URLs to Next.js API routes
    
    // 🔹 Get cart from backend
    export async function getCart(token: string): Promise<CartDto> {
      const url = `${API_BASE}/api/Cart`;
      console.log("Fetching cart from Next.js API route:", url);
    
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      if (!res.ok) {
        console.error("getCart failed:", res.status, res.statusText);
        throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
      }
    
      const text = await res.text();
      if (!text) return { items: [] };
    
      return JSON.parse(text) as CartDto;
    }
    
    // 🔹 Save cart to backend
    export async function saveCart(cart: CartDto, token: string): Promise<CartDto> {
      const url = `${API_BASE}/api/Cart`;
      console.log("Saving cart via Next.js API route:", url);
      console.log("Cart data (frontend -> backend):", cart);
    
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cart), // ✅ no userId, backend resolves from token
        });
    
        if (!res.ok) {
          const errorText = await res.text();
          console.error("saveCart failed:", res.status, res.statusText, errorText);
          throw new Error(`Failed to save cart: ${res.status} ${res.statusText}`);
        }
    
        return res.json();
      } catch (error) {
        console.error("Network error in saveCart:", error);
        throw error;
      }
    }
    