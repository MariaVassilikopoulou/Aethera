'use client';

import { useCartStore } from '@/stores/cartStore';
import toast from "react-hot-toast";
import styles from './checkout.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/app/components/Header';
import Button from '@/app/components/Button';
import Image from 'next/image';
export default function CheckoutPage() {
  const cart = useCartStore(state => state.cart);
  const fetchCart = useCartStore(state => state.fetchCart);
  const clearCart = useCartStore(state => state.clearCart);
  const { token } = useAuth();
  const router = useRouter();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (token) fetchCart(token);
  }, [token, fetchCart]);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /*const handleConfirmOrder = () => {
    // TODO: integrate payment API
    alert('Order confirmed! Thank you for your purchase.');
    router.push('/');
  };*/

  const handleConfirmOrder = async () => {
    const order = {
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getTotal(),
      customer: { name, email, address, city, postalCode, country, phone },
    };
  
    try {
      const res = await fetch('/api/Orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
        body: JSON.stringify(order),
      });
  
      const data = await res.json();
      /*if (!res.ok) {
        toast.error(" Something went wrong, please try again.");
        return;
      }*/

        if (token) {
          await clearCart(token);
        } else {
          clearCart(); 
      }

      
  
      toast.success(`Order confirmed! Order ID: ${data.order.id} -- Thank you 🎉`);
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error(' Something went wrong, please try again.');
    }
  };
  
  
  return (
    <>
      <Header />
      <main className={styles.checkoutPage}>
        <h1>Checkout</h1>
        <div className={styles.content}>
          {/* Form */}
          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleConfirmOrder(); }}>
            <h2>Shipping & Billing</h2>
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
            <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
            <input type="text" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
            <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} required />
            <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />

            <h2>Payment</h2>
            <select required>
              <option value="">Select Payment Method</option>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>

            <Button type="submit" variant="primary" size="lg">
            Confirm Order — €{getTotal().toFixed(2)}
            </Button>
          </form>

     
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <ul>
              {cart.map(item => (
                <li key={item.productId}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      style={{ borderRadius: '12px', objectFit: 'cover' }}
                    />
                   <span>{item.name} x {item.quantity}</span>
                  </div>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h3>Total: €{getTotal().toFixed(2)}</h3>
          </div>
        </div>
      </main>
    </>
  );
}
