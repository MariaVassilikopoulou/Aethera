import '@/app/globalstyles/global.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import "@/app/globalstyles/global.scss";

export const metadata = {
  title: 'Aethera Webshop',
  description: 'webshop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}