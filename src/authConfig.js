"use client";

const NEXT_PUBLIC_AZURE_CLIENT_ID_ENV = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
const NEXT_PUBLIC_AZURE_AUTHORITY_ENV = process.env.NEXT_PUBLIC_AZURE_AUTHORITY;
const NEXT_PUBLIC_AZURE_KNOWNAUTHORITY_ENV =
  process.env.NEXT_PUBLIC_AZURE_KNOWNAUTHORITY;
const NEXT_PUBLIC_API_SCOPE_URI_ENV = process.env.NEXT_PUBLIC_API_SCOPE_URI;

if (
  !NEXT_PUBLIC_AZURE_CLIENT_ID_ENV ||
  !NEXT_PUBLIC_AZURE_AUTHORITY_ENV ||
  !NEXT_PUBLIC_AZURE_KNOWNAUTHORITY_ENV ||
  !NEXT_PUBLIC_API_SCOPE_URI_ENV
) {
  // Provide a clear list of missing variables for easy debugging
  const missingVars = [];
  if (!NEXT_PUBLIC_AZURE_CLIENT_ID_ENV)
    missingVars.push("NEXT_PUBLIC_AZURE_CLIENT_ID");
  if (!NEXT_PUBLIC_AZURE_AUTHORITY_ENV)
    missingVars.push("NEXT_PUBLIC_AZURE_AUTHORITY");
  if (!NEXT_PUBLIC_AZURE_KNOWNAUTHORITY_ENV)
    missingVars.push("NEXT_PUBLIC_AZURE_KNOWNAUTHORITY");
  if (!NEXT_PUBLIC_API_SCOPE_URI_ENV)
    missingVars.push("NEXT_PUBLIC_API_SCOPE_URI");

  throw new Error(
    `MSAL Configuration Error: Missing required environment variables: ${missingVars.join(", ")}. Please check your .env file and server restart.`,
  );
}

// 3. Assign to new constants (or re-assign) and assert them as non-null strings
// This is done to satisfy the TypeScript compiler now that we've checked them all.
const NEXT_PUBLIC_AZURE_CLIENT_ID = NEXT_PUBLIC_AZURE_CLIENT_ID_ENV;
const NEXT_PUBLIC_AZURE_AUTHORITY = NEXT_PUBLIC_AZURE_AUTHORITY_ENV;
const NEXT_PUBLIC_AZURE_KNOWNAUTHORITY = NEXT_PUBLIC_AZURE_KNOWNAUTHORITY_ENV;
const NEXT_PUBLIC_API_SCOPE_URI = NEXT_PUBLIC_API_SCOPE_URI_ENV;

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const msalConfig = {
  auth: {
    clientId: NEXT_PUBLIC_AZURE_CLIENT_ID, //"e83f31c8-cc33-49ab-b023-6091f20f85ed",

    authority: NEXT_PUBLIC_AZURE_AUTHORITY, //"https://aetheraparfum.ciamlogin.com/aetheraparfum.onmicrosoft.com",
    redirectUri: isLocalhost
      ? "http://localhost:3000"
      : "https://aethera-eight.vercel.app/api/auth/callback",
    knownAuthorities: [NEXT_PUBLIC_AZURE_KNOWNAUTHORITY], //["aetheraparfum.ciamlogin.com"],
  },
  cache: {
    cacheLocation: "memoryStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "offline_access",
    NEXT_PUBLIC_API_SCOPE_URI, //"api://297ac375-6408-43f6-bac5-e72e2c44b313/Aethera_access_api"
  ],
};
