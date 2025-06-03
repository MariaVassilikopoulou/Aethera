// services/productService.ts


export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl:string

}

export async function fetchProducts(token: string): Promise<Product[]> {
    try {
    
        const response = await fetch("/api/Products", {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });
        
        console.log("fetch token:", token);
      if (!response.ok) {
        throw new Error(`❌ Failed to fetch: ${response.status}`);
      }
  
      const result = await response.json();
      return result.products; 
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      throw error;
    }
  }


