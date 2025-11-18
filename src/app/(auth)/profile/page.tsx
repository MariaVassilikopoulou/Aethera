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
