"use client";

import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./profile.module.scss";

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

export default function ProfilePage() {
  const { isAuthenticated, account, logout, token } = useAuth();
  const router = useRouter();
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersFetched, setOrdersFetched] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleViewOrders = () => {
    setShowOrders(prev => !prev);
    if (!ordersFetched && token) {
      setIsLoadingOrders(true);
      fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/Order`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setOrders(Array.isArray(data) ? data : []))
        .catch(() => setOrders([]))
        .finally(() => {
          setIsLoadingOrders(false);
          setOrdersFetched(true);
        });
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

  if (!isAuthenticated) return null;

  return (
    <>
      <Header />
      <main className={styles.profilePage}>
        <h1>My Profile</h1>

        <div className={styles.info}>
          <p><strong></strong> {account?.name}</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="md" onClick={handleViewOrders}>
            {showOrders ? 'Hide Orders' : 'View Orders'}
          </Button>
          <Button variant="primary" size="md" onClick={() => router.push("/cart")}>
            View Cart
          </Button>
        </div>

        {showOrders && (
          <div className={styles.ordersSection}>
            <h2>My Orders</h2>
            {isLoadingOrders ? (
              <p className={styles.ordersEmpty}>Loading your orders...</p>
            ) : orders.length === 0 ? (
              <p className={styles.ordersEmpty}>You haven&apos;t placed any orders yet.</p>
            ) : (
              <ul className={styles.orderList}>
                {orders.map(order => (
                  <li
                    key={order.id}
                    className={styles.orderCard}
                    onClick={() => router.push(`/orders/${order.id}`)}
                  >
                    <div className={styles.orderMeta}>
                      <span className={styles.orderId}>#{order.id.slice(-8).toUpperCase()}</span>
                      <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className={styles.orderInfo}>
                      <span className={`${styles.statusBadge} ${styles[`status${order.status}`]}`}>
                        {STATUS_LABEL[order.status] ?? order.status}
                      </span>
                      <span className={styles.orderTotal}>€{order.totalPrice.toFixed(2)}</span>
                    </div>
                    <span className={styles.arrow}>→</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className={styles.logoutBtn}>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </main>
    </>
  );
}
