// authConfig.js
import { PublicClientApplication } from "@azure/msal-browser";
export const msalConfig = {
    auth: {
      clientId: "e83f31c8-cc33-49ab-b023-6091f20f85ed",
      authority: "https://aetheraparfum.ciamlogin.com/fdc03cff-281e-4d9e-abf7-f454c53775e4",
      redirectUri: isLocalhost ? "http://localhost:3000" : "https://aethera-eight.vercel.app",
    
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false,
    }
  };
  
  
  export const loginRequest = {
    scopes: [
      "openid", 
      "profile", 
      "email", 
      "offline_access", 
      "297ac375-6408-43f6-bac5-e72e2c44b313/Aethera_access_api"
      
    ]
  };
  export const instance = new PublicClientApplication(msalConfig);