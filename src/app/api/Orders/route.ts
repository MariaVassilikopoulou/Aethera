import { NextResponse } from 'next/server';

type Order = {
  id: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  createdAt: string;
};

// 🔹 Temporary in-memory "database"
const orders: Order[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, total, customer } = body;

    const newOrder: Order = {
      id: Date.now().toString(), // simple unique ID
      items,
      total,
      customer,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    return NextResponse.json(
      { message: 'Order created successfully!', order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating order', error },
      { status: 500 }
    );
  }
}

// 🔹 Optional: GET all orders (for testing)
export async function GET() {
  return NextResponse.json(orders);
}
