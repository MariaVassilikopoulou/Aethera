/*import { NextRequest, NextResponse } from "next/server";
import { verifyAzureToken } from "../../../utils/auth/verifyAzureToken";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    const user = await verifyAzureToken(token);
    console.log (user);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    // Forward to backend
    const backendUrl = `${baseUrl}/api/Cart/me/Cart`;
    const response = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend cart GET error:", response.status, text);
      return NextResponse.json({ message: `Backend error: ${response.status}` }, { status: response.status });
    }

    const cart = await response.json();
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// POST/Save cart
export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token); // Verify token validity
    
    const cartData = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    // Forward to backend
    const backendUrl = `${baseUrl}/api/Cart`;
    console.log("Forwarding cart save to backend:", backendUrl);
    console.log("Cart data:", cartData);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend cart POST error:", response.status, text);
      return NextResponse.json({ 
        message: `Backend error: ${response.status}`,
        details: text 
      }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}*/

import { NextRequest, NextResponse } from "next/server";
import { verifyAzureToken } from "../../../utils/auth/verifyAzureToken";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// 🔹 GET /api/Cart
export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    // ✅ Corrected backend endpoint
    const backendUrl = `${baseUrl}/api/Cart`;

    const response = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend cart GET error:", response.status, text);
      return NextResponse.json({ message: `Backend error: ${response.status}` }, { status: response.status });
    }

    const cart = await response.json();
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// 🔹 POST /api/Cart
export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    const cartData = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    const backendUrl = `${baseUrl}/api/Cart`;
    console.log("Forwarding cart save to backend:", backendUrl);
    console.log("Cart data:", cartData);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData), // ✅ no userId
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend cart POST error:", response.status, text);
      return NextResponse.json(
        { message: `Backend error: ${response.status}`, details: text },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
