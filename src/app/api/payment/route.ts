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
    const response = await fetch(`${API_BASE}/api/Payment/intent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
