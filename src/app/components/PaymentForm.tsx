'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from './Button';
import styles from './styles/PaymentForm.module.scss';

interface PaymentFormProps {
  total: number;
  onSuccess: () => void;
}

export default function PaymentForm({ total, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed. Please try again.');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <h2>Payment Details</h2>
      <div className={styles.stripeElement}>
        <PaymentElement />
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <Button type="submit" variant="primary" size="lg" disabled={isProcessing || !stripe}>
        {isProcessing ? 'Processing...' : `Pay €${total.toFixed(2)}`}
      </Button>
    </form>
  );
}
