import { NextRequest, NextResponse } from "next/server";
import { verifyAzureToken } from "../../../utils/auth/verifyAzureToken";

const AZURE_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    if (!AZURE_API_BASE_URL) {
      return NextResponse.json({ message: "Azure API base URL (NEXT_PUBLIC_API_URL) not configured" }, { status: 500 });
    }

    /*const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }*/

   
    const backendUrl = `${AZURE_API_BASE_URL}/api/Cart`;

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


export async function DELETE(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    if (!AZURE_API_BASE_URL) {
      return NextResponse.json({ message: "Azure API base URL not configured" }, { status: 500 });
    }

    const response = await fetch(`${AZURE_API_BASE_URL}/api/Cart`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok && response.status !== 404) {
      return NextResponse.json({ message: `Backend error: ${response.status}` }, { status: response.status });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    const cartData = await req.json();

    if (!AZURE_API_BASE_URL) {
      return NextResponse.json({ message: "Azure API base URL (NEXT_PUBLIC_API_URL) not configured" }, { status: 500 });
    }

    /*const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }*/

    const backendUrl = `${AZURE_API_BASE_URL}/api/Cart`;
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
