import '@/app/globalstyles/global.scss';

import "@/app/globalstyles/global.scss";

export const metadata = {
  title: 'Aethera Webshop',
  description: 'webshop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
       
        {children}
    
      </body>
    </html>
  );
}