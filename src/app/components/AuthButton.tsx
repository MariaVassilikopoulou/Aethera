// components/AuthButton.tsx
"use client"
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";
import { getAccessToken } from "../../app/utils/auth/getAccessToken";
import { useState ,useEffect} from "react";
import { useRouter } from 'next/navigation';
import Button from "./Button";

export default function AuthButton() {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to /home on successful login
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error("❌ Login error:", e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup();
    setToken(null);
  };

  const handleGetToken = async () => {
    if (!accounts[0]) return;

    const token = await getAccessToken(instance, accounts[0]);
    setToken(token);
    console.log("🔐 Access token:", token);
  };


  if (!isAuthenticated) {
    return  <Button onClick={handleLogin}>Login</Button>
  }
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>✅ Welcome, {account?.name || account?.username}</p>
          <Button onClick={handleLogout}>Logout</Button>
          <br />
          <Button onClick={handleGetToken}>Get Access Token</Button>
          {token && (
            <div>
              <p className="mt-2 break-all">Token: {token}</p>
            </div>
          )}
        </>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
}
