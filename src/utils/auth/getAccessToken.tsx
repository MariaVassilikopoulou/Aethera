import { loginRequest } from "@/authConfig";
import { IPublicClientApplication, AccountInfo} from "@azure/msal-browser";


export async function getAccessToken(
  instance: IPublicClientApplication,
  account: AccountInfo
): Promise<string | null> {
  try {
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });
    return response.accessToken;
  } catch (error) {
    console.error(" Failed to acquire token silently:", error);
    return null;
  }
}
