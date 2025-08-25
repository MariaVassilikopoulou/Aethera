// authConfig.ts
/*import { PublicClientApplication } from "@azure/msal-browser";

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const msalConfig = {
  auth: {
    clientId: "e83f31c8-cc33-49ab-b023-6091f20f85ed", // frontend app id
    authority:   "https://aetheraparfum.ciamlogin.com/fdc03cff-281e-4d9e-abf7-f454c53775e4",
    //"https://aetheraparfum.ciamlogin.com/fdc03cff-281e-4d9e-abf7-f454c53775e4/userflownew/",
                 // user flow
    redirectUri: isLocalhost
      ? "http://localhost:3000"
      : "https://aethera-eight.vercel.app",
    knownAuthorities: ["aetheraparfum.ciamlogin.com"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "offline_access",
    "api://297ac375-6408-43f6-bac5-e72e2c44b313/Aethera_access_api"
  ],
  authority: "https://aetheraparfum.ciamlogin.com/fdc03cff-281e-4d9e-abf7-f454c53775e4/userflownew" // specify policy here
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Example login function
export async function login() {
  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("Login successful:", loginResponse);
    const account = loginResponse.account;
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account
    });
    console.log("Access token:", tokenResponse.accessToken);
    return tokenResponse.accessToken;
  } catch (err) {
    console.error("Login failed:", err);
  }
}*/

// authConfig.ts - Alternative: Use tenant subdomain throughout
import { PublicClientApplication } from "@azure/msal-browser";

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// ---- MSAL Configuration for External ID (CIAM) ----
export const msalConfig = {
  auth: {
    clientId: "e83f31c8-cc33-49ab-b023-6091f20f85ed", // frontend app id
    // Use tenant subdomain authority throughout
    authority: "https://aetheraparfum.ciamlogin.com/aetheraparfum.onmicrosoft.com",
    redirectUri: isLocalhost
      ? "http://localhost:3000"
      : "https://aethera-eight.vercel.app/api/auth/callback",
    knownAuthorities: ["aetheraparfum.ciamlogin.com"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// ---- Login request - no specific authority ----
export const loginRequest = {
  scopes: [
    "openid",
    "profile", 
    "email",
    "offline_access",
    "api://297ac375-6408-43f6-bac5-e72e2c44b313/Aethera_access_api"
  ],
  // Don't specify authority - let CIAM handle the default user flow
};

// ---- MSAL instance ----
export const msalInstance = new PublicClientApplication(msalConfig);

// ---- Login function ----
export async function login() {
  try {
    // Initialize MSAL first
    await msalInstance.initialize();
    
    // Popup login using the loginRequest
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("Login successful:", loginResponse);

    const account = loginResponse.account;

    // Acquire token silently
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account
    });

    console.log("Access token:", tokenResponse.accessToken);
    return tokenResponse.accessToken;

  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
}
