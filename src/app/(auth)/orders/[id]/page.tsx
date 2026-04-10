'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/app/components/Header';
import Button from '@/app/components/Button';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from './orderDetail.module.scss';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
}

interface Order {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

const STATUS_LABEL: Record<string, string> = {
  Pending: 'Pending',
  AwaitingPayment: 'Awaiting Payment',
  Paid: 'Paid',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token, isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/');
    }
  }, [isInitialized, isAuthenticated, router]);

  useEffect(() => {
    if (!token || !id) return;

    fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/Order/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setOrder(data))
      .catch(() => router.push('/orders'))
      .finally(() => setIsLoading(false));
  }, [token, id, router]);

  const handleCancel = async () => {
    if (!token || !id) return;
    setIsCancelling(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/Order/${id}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error('Could not cancel the order. Please try again.');
        return;
      }

      toast.success('Order cancelled successfully.');
      setOrder(prev => prev ? { ...prev, status: 'Cancelled' } : prev);
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  if (isLoading) {
    return (
      <>
        <Header />
        <main className={styles.detailPage}>
          <p className={styles.loading}>Loading order...</p>
        </main>
      </>
    );
  }

  if (!order) return null;

  return (
    <>
      <Header />
      <main className={styles.detailPage}>
        <button className={styles.backBtn} onClick={() => router.push('/orders')}>
          ← Back to Orders
        </button>

        <div className={styles.card}>
          {/* Header row */}
          <div className={styles.orderHeader}>
            <div>
              <h1>Order #{order.id.slice(-8).toUpperCase()}</h1>
              <p className={styles.orderDate}>Placed on {formatDate(order.createdAt)}</p>
            </div>
            <span className={`${styles.statusBadge} ${styles[`status${order.status}`]}`}>
              {STATUS_LABEL[order.status] ?? order.status}
            </span>
          </div>

          <hr className={styles.divider} />

          {/* Items */}
          <h2>Items</h2>
          <ul className={styles.itemList}>
            {order.items.map(item => (
              <li key={item.productId} className={styles.item}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  style={{ borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                />
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQty}>× {item.quantity}</span>
                <span className={styles.itemPrice}>
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            Total: <strong>€{order.totalPrice.toFixed(2)}</strong>
          </div>

          <hr className={styles.divider} />

          {/* Shipping address */}
          <h2>Shipping Address</h2>
          <div className={styles.address}>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postcode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>

          {/* Cancel — only when Pending */}
          {order.status === 'Pending' && (
            <div className={styles.cancelArea}>
              <Button
                variant="secondary"
                size="md"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
              </Button>
              <p className={styles.cancelNote}>
                You can cancel this order while it is still pending.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
