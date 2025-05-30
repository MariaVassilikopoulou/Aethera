
"use client"
import AuthButton from "../components/AuthButton";
import styles from '@/app/components/styles/RegisterForm.module.scss'
import RegisterForm from "../components/RegisterForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {  useIsAuthenticated } from "@azure/msal-react";

export default function RegisterPage() {

  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home"); // Redirect if logged in
    }
  }, [isAuthenticated, router]);

  return (
   
    <div className={styles.authWrapper}>
      <main className={styles.content}>
        <h1>Create account</h1>
        <RegisterForm />
       <AuthButton/> 
      </main>
    </div>
   
  );
}
