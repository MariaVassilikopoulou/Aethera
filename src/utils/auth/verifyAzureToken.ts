import { jwtVerify, createRemoteJWKSet } from "jose";
import { jwtDecode } from 'jwt-decode';

const azureAD_TENANT_ID = process.env.AZURE_AD_TENANT_ID;
if (!azureAD_TENANT_ID) {
    throw new Error("AZURE_AD_TENANT_ID is not defined in .env");
}

const clientId = process.env.AZURE_RESOURCE_API_CLIENT_ID;
if (!clientId) {
    throw new Error("AZURE_RESOURCE_API_CLIENT_ID is not defined in .env");
}

const jwksUri = `https://${azureAD_TENANT_ID}.ciamlogin.com/${azureAD_TENANT_ID}/discovery/v2.0/keys`;
const issuer = `https://${azureAD_TENANT_ID}.ciamlogin.com/${azureAD_TENANT_ID}/v2.0`;
const audience = [clientId, `api://${clientId}`];

//const jwksUri =  `https://fdc03cff-281e-4d9e-abf7-f454c53775e4.ciamlogin.com/fdc03cff-281e-4d9e-abf7-f454c53775e4/discovery/v2.0/keys`;
const JWKS = createRemoteJWKSet(new URL(jwksUri));

interface DecodedToken {
    aud?: string;
    iss?: string;
    exp?: number;
    iat?: number;
    [key: string]: unknown;
}

interface AzureTokenPayload {
  aud: string;
  iss: string;
  exp: number;
  iat: number;
  nbf: number;
  oid?: string;
  name?: string;
  preferred_username?: string;
  roles?: string[];
  [key: string]: unknown;
}

export function decodeJwt(token: string) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log("Decoded token:", decoded);
      return decoded;
    } catch (err) {
      console.error("Failed to decode JWT", err);
      return null;
    }
}




  
export async function verifyAzureToken(token: string): Promise<AzureTokenPayload> {
    try {
        const { payload } = await jwtVerify<AzureTokenPayload>(token, JWKS, {
          issuer ,//: "https://fdc03cff-281e-4d9e-abf7-f454c53775e4.ciamlogin.com/fdc03cff-281e-4d9e-abf7-f454c53775e4/v2.0", 
          audience, //: ["297ac375-6408-43f6-bac5-e72e2c44b313", "api://297ac375-6408-43f6-bac5-e72e2c44b313"]
        });
        return payload;
  
    } catch (error) {
        console.error("Token verification failed:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error details:", JSON.stringify(error, null, 2));
        }
        throw new Error("Invalid token");
    }
}

console.log("JWKS URL:", jwksUri);