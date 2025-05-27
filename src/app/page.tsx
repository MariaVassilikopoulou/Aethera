// src/app/page.tsx


import RegisterForm from "./components/RegisterForm";
import styles from '@/app/components/styles/RegisterForm.module.scss'

export default function RegisterPage() {
  return (
   
    <div className={styles.authWrapper}>
      <main className={styles.content}>
        <h1>Create account</h1>
        <RegisterForm />
      </main>
    </div>
   
  );
}
