'use client';
import { useState } from 'react';
import styles from '@/app/components/styles/LoginForm.module.scss';
import Button from './Button';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    router.push('/home');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <div className={styles.links}>
        <a href="#">Forgot your password?</a>
      </div>
      <Button size="md" variant="primary" type="submit">Sign in</Button>
      <div className={styles.create}>
        <a href="#">Create account</a>
      </div>
    </form>
  );
};

export default LoginForm;
