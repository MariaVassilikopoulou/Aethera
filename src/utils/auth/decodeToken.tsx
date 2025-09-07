import { jwtDecode } from "jwt-decode";

interface AzureTokenPayload {
  oid?: string;
  sub?: string;
  [key: string]: unknown;
}

export function getUserIdFromToken(token: string | null): string | undefined {
  if (!token) return undefined;
  try {
    const decoded = jwtDecode<AzureTokenPayload>(token);
    // Prefer oid (Azure AD object id), fallback to sub
    return decoded.oid ?? decoded.sub;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return undefined;
  }
}
