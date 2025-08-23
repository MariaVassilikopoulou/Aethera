/*"use client";

import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";
import { getAccessToken } from "@/utils/auth/getAccessToken";
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
 // console.log("🔐 Access token:", token);


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
}*/

"use client";

import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";
import { useState, useEffect } from "react";
import { AuthenticationResult, AuthError } from "@azure/msal-browser";

export function useAuth() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize MSAL instance
  useEffect(() => {
    const initializeMsal = async () => {
      if (!isInitialized) {
        await instance.initialize();
        setIsInitialized(true);
      }
    };
    
    initializeMsal();
  }, [instance, isInitialized]);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated && account && isInitialized) {
        try {
          // Acquire token silently
          const accessToken = await instance.acquireTokenSilent({
            ...loginRequest,
            account,
          });
          setToken(accessToken.accessToken);
        } catch (error) {
          console.warn("Silent token acquisition failed, fallback to popup", error);
          try {
            // Fallback to popup if silent fails
            const tokenResponse = await instance.acquireTokenPopup({
              ...loginRequest,
              account,
            });
            setToken(tokenResponse.accessToken);
          } catch (popupError) {
            console.error("Token acquisition failed", popupError);
            setToken(null);
          }
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, account, instance, isInitialized]);

  const login = async () => {
    try {
      if (!isInitialized) {
        console.log("MSAL not initialized yet, waiting...");
        return;
      }

      // Use popup login with user flow
      const response: AuthenticationResult = await instance.loginPopup(loginRequest);
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed:", error);
      
      // Enhanced error logging with proper type checking
      if (error instanceof AuthError) {
        console.error("Auth Error Code:", error.errorCode);
        console.error("Auth Error Message:", error.errorMessage);
        
        if (error.errorCode === 'endpoints_resolution_error') {
          console.error("Check your authority URL configuration in authConfig.ts");
          console.error("Current base authority from msalConfig");
        }
      } else if (error instanceof Error) {
        console.error("Generic Error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await instance.logoutPopup();
    } catch (error) {
      console.error("Logout failed:", error);
      
      if (error instanceof AuthError) {
        console.error("Logout Error Code:", error.errorCode);
        console.error("Logout Error Message:", error.errorMessage);
      }
    }
  };

  return {
    isAuthenticated,
    account,
    token,
    login,
    logout,
    isInitialized
  };
}

