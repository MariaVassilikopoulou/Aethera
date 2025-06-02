"use client";

import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";
import { getAccessToken } from "@/app/utils/auth/getAccessToken";
import { useState,useEffect } from "react";

export function useAuth() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated && account) {
        const accessToken = await getAccessToken(instance, account);
        setToken(accessToken);
        
      }
    };

    fetchToken();
  }, [isAuthenticated, account, instance]);
  console.log("🔐 Access token:", token);


  const login = () =>
    instance.loginPopup(loginRequest).catch((e) => {
      console.error("Login failed:", e);
    });

  const logout = () => {
    instance.logoutPopup().catch((e) => {
      console.error("Logout failed:", e);
    });
  };

  return {
    isAuthenticated,
    account,
    token,
    login,
    logout,
  };
}
