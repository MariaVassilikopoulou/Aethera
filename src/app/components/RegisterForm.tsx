'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles  from '@/app/components/styles/RegisterForm.module.scss'
import Button from './Button';



const RegisterForm = () => {
    const router = useRouter();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(form);
      router.push('/login');
    };
  
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <Button size="md" variant="primary" type="submit">Create</Button>
      </form>
    );
  };
  
  export default RegisterForm;
