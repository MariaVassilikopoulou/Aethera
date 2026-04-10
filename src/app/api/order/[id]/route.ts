import { NextRequest, NextResponse } from "next/server";
import { verifyAzureToken } from "../../../../utils/auth/verifyAzureToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    if (!API_BASE) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    const response = await fetch(`${API_BASE}/api/Order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    if (!API_BASE) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    // Forwards to PUT /api/Order/{id}/cancel
    const response = await fetch(`${API_BASE}/api/Order/${id}/cancel`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
