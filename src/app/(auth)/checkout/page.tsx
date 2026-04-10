'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Header from '@/app/components/Header';
import Button from '@/app/components/Button';
import PaymentForm from '@/app/components/PaymentForm';
import Image from 'next/image';
import styles from './checkout.module.scss';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Step = 'shipping' | 'payment' | 'success';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const stripeAppearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#aa8c64',
    colorText: '#332f2f',
    colorDanger: '#c0392b',
    borderRadius: '12px',
    fontFamily: "'Playfair Display', serif",
  },
};

export default function CheckoutPage() {
  const cart = useCartStore(state => state.cart);
  const fetchCart = useCartStore(state => state.fetchCart);
  const clearCart = useCartStore(state => state.clearCart);
  const { token, isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>('shipping');
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');

  // Auth guard
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/');
    }
  }, [isInitialized, isAuthenticated, router]);

  // Fetch cart and track when it's loaded
  useEffect(() => {
    if (token) {
      fetchCart(token).then(() => setCartLoaded(true));
    }
  }, [token, fetchCart]);

  // Empty-cart guard — only redirect after cart is confirmed loaded and not mid-submission
  useEffect(() => {
    if (cartLoaded && cart.length === 0 && step === 'shipping' && !isSubmitting) {
      toast.error('Your cart is empty. Add items before checking out.');
      router.push('/cart');
    }
  }, [cartLoaded, cart.length, step, router, isSubmitting]);

  const getTotal = (items: OrderItem[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please log in to continue.');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Create real order — uses local backend URL until Azure deployment is updated
      const API = process.env.NEXT_PUBLIC_LOCAL_API_URL;
      const orderRes = await fetch(`${API}/api/Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: { fullName, street, city, postcode, country },
        }),
      });

      if (!orderRes.ok) {
        const errBody = await orderRes.json().catch(() => ({}));
        console.error('[checkout] order creation failed:', orderRes.status, errBody);
        toast.error(`Order failed (${orderRes.status}): ${errBody?.message ?? 'Please try again.'}`);
        return;
      }

      const order = await orderRes.json();
      setOrderId(order.id);

      // Snapshot cart items for display, then clear local state
      // (backend already cleared the cart server-side on order creation)
      setOrderItems([...cart]);
      clearCart();

      // 2. Create Stripe payment intent — call backend directly
      const paymentRes = await fetch(`${API}/api/Payment/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: order.id }),
      });

      if (!paymentRes.ok) {
        const payErr = await paymentRes.json().catch(() => ({}));
        console.error('[checkout] payment intent failed:', paymentRes.status, payErr);
        toast.error('Order placed but payment setup failed. Please contact support.');
        return;
      }

      const { clientSecret: secret } = await paymentRes.json();
      setClientSecret(secret);
      setStep('payment');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (step === 'success') {
    return (
      <>
        <Header />
        <main className={styles.checkoutPage}>
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>✓</div>
            <h1>Order Confirmed</h1>
            <p>Thank you for your purchase. Your order is being processed.</p>
            <p className={styles.orderId}>Order ID: <span>{orderId}</span></p>
            <p className={styles.emailNote}>A confirmation email will be sent to you shortly.</p>
            <div className={styles.successActions}>
              <Button variant="primary" size="md" onClick={() => router.push('/orders')}>
                View My Orders
              </Button>
              <Button variant="secondary" size="md" onClick={() => router.push('/home')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  const displayItems = step === 'payment' ? orderItems : cart;
  const total = getTotal(displayItems);

  return (
    <>
      <Header />
      <main className={styles.checkoutPage}>
        <h1>Checkout</h1>

        {/* Step indicator */}
        <div className={styles.stepIndicator}>
          <div className={`${styles.stepItem} ${step === 'shipping' ? styles.active : styles.done}`}>
            <div className={styles.stepNumber}>{step === 'payment' ? '✓' : '1'}</div>
            <span>Shipping</span>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.stepItem} ${step === 'payment' ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <span>Payment</span>
          </div>
        </div>

        <div className={styles.content}>
          {/* Left panel */}
          <div className={styles.form}>
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit}>
                <h2>Shipping Details</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postcode}
                  onChange={e => setPostcode(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : `Continue to Payment — €${total.toFixed(2)}`}
                </Button>
              </form>
            )}

            {step === 'payment' && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: stripeAppearance }}
              >
                <PaymentForm total={total} onSuccess={() => setStep('success')} />
              </Elements>
            )}
          </div>

          {/* Right panel: order summary */}
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <ul>
              {displayItems.map(item => (
                <li key={item.productId}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      style={{ borderRadius: '12px', objectFit: 'cover' }}
                    />
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h3>Total: €{total.toFixed(2)}</h3>
          </div>
        </div>
      </main>
    </>
  );
}
