// app/layout.tsx
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import '@fontsource/inter';
import './globals.css';
import MobileBottomNav from '@/components/MobileBottomNav';
import Head from 'next/head';
import Footer from '@/components/Footer';


export const metadata = {
  title: 'PebasPro',
  description: 'Conectando profissionais e clientes',
  manifest: '/manifest.json'
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <body>
        <ThemeRegistry>
          <Header />
          {children}
          <MobileBottomNav />
          <Footer/>
        </ThemeRegistry>
      </body>
    </html>
  );
}
