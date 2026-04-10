import { NextRequest, NextResponse } from "next/server";
import { verifyAzureToken } from "../../../utils/auth/verifyAzureToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    if (!API_BASE) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    const body = await req.json();
    const response = await fetch(`${API_BASE}/api/Order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log(`[order POST] backend status: ${response.status}, body: ${text}`);

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text || "No response body" };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Internal server error", detail: String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Access token missing or invalid" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    await verifyAzureToken(token);

    if (!API_BASE) {
      return NextResponse.json({ message: "API base URL not configured" }, { status: 500 });
    }

    const response = await fetch(`${API_BASE}/api/Order`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
