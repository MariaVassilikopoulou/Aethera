/*'use client';

import { useEffect, useState } from 'react';
interface UserProfile {
    name: string;
    email: string;
    role?: string;
  }
export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile  | null>(null);

  useEffect(() => {
    // Simulate fetching user data (replace with real API call)
    const stored = localStorage.getItem('accessToken');
    if (!stored) return;

    // Replace this with a fetch call to your .NET Core backend
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
    });
  }, []);

  if (!user) {
    return <p>Loading your profile...</p>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.role && <p><strong>Role:</strong> {user.role}</p>}
    </main>
  );
}


// src/app/profile/page.tsx
"use client";

import { useMsal, useAccount } from "@azure/msal-react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    console.log("Account info:", account);
  }, [account]);

  if (!account) {
    return (
      <main>
        <h1>Unauthorized</h1>
        <p>Please login to view your profile.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {account?.name}</p>
      <p><strong>Email:</strong> {account?.username}</p>

      {/* Optional: Display custom attributes from B2C, if configured 
      <p><strong>Custom Role:</strong> {account?.idTokenClaims?.extension_userRole}</p>*/
    /* </main>*/

// example: src/app/profile/page.tsx
"use client";

import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./profile.module.scss";

export default function ProfilePage() {
  const { isAuthenticated, account, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Header />
      <main className={styles.profilePage}>
        <h1>My Profile</h1>

        <div className={styles.info}>
          <p>
            <strong></strong> {account?.name}
          </p>
          
        </div>

        <div className={styles.actions}>
  <Button variant="primary" size="md" onClick={() => router.push("/checkout")}>
    View Orders
  </Button>
  <Button variant="primary" size="md" onClick={() => router.push("/cart")}>
    View Cart
  </Button>
</div>


        <div className={styles.logoutBtn}>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </main>
    </>
  );
}
