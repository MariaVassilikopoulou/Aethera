'use client';

import { useState, useEffect } from 'react';
import { MsalProvider } from '@azure/msal-react';
import type { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/authConfig';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);

  useEffect(() => {
    import('@azure/msal-browser').then(({ PublicClientApplication }) => {
      setMsalInstance(new PublicClientApplication(msalConfig));
    });
  }, []);

  if (!msalInstance) return <>{children}</>;

  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
}
