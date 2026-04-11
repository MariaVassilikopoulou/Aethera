'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/app/components/Header';
import styles from './orders.module.scss';

interface Order {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
}

const STATUS_LABEL: Record<string, string> = {
  Pending: 'Pending',
  AwaitingPayment: 'Awaiting Payment',
  Paid: 'Paid',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
};

export default function OrdersPage() {
  const { token, isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/');
    }
  }, [isInitialized, isAuthenticated, router]);

  useEffect(() => {
    if (!token) return;

    fetch('/api/order', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, [token]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <>
      <Header />
      <main className={styles.ordersPage}>
        <h1>My Orders</h1>

        {isLoading ? (
          <div className={styles.empty}>
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <p>You haven&apos;t placed any orders yet.</p>
            <button className={styles.shopBtn} onClick={() => router.push('/home')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <ul className={styles.orderList}>
            {orders.map(order => (
              <li
                key={order.id}
                className={styles.orderCard}
                onClick={() => router.push(`/orders/${order.id}`)}
              >
                <div className={styles.orderMeta}>
                  <span className={styles.orderId}>
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                </div>

                <div className={styles.orderInfo}>
                  <span className={`${styles.statusBadge} ${styles[`status${order.status}`]}`}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <span className={styles.orderTotal}>
                    €{order.totalPrice.toFixed(2)}
                  </span>
                </div>

                <span className={styles.arrow}>→</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
