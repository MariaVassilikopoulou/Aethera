

import "@/globalstyles/global.scss";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'Aethera Webshop',
  description: 'webshop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
       
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}