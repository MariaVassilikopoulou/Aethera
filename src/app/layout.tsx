import '@/app/globalstyles/global.scss';
import Footer from './components/Footer';

export const metadata = {
  title: 'Aethera Webshop',
  description: 'webshop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
      <Footer />
      </body>
    </html>
  );
}
