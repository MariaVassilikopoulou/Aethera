import { NextRequest, NextResponse } from "next/server";
import { verifyAzureToken } from "../../../utils/auth/verifyAzureToken";


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    console.log("Authorization header:", authorizationHeader);
    console.log("All headers:", Object.fromEntries(req.headers.entries()));
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];

    // ✅ Validate the token
    const user = await verifyAzureToken(token);
    console.log(user);
    // You could restrict to certain users, groups, etc. using `user` info

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search") || "";

    const backendUrl = `${baseUrl}/api/Products?search=${encodeURIComponent(query)}`;

    const response = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Forward the token to ASP.NET
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ message: "Unauthorized from backend" }, { status: 401 });
    }

    if (!response.ok) {
      throw new Error("Failed to fetch products: " + response.statusText);
    }

    const products = await response.json();

    return NextResponse.json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
