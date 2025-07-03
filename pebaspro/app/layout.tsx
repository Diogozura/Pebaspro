// app/layout.tsx
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import '@fontsource/inter';
import './globals.css';
import MobileBottomNav from '@/components/MobileBottomNav';
import Head from 'next/head';
import Footer from '@/components/Footer';
import CookieConsentWithPWA from '@/components/CookieConsentWithPWA';
import CookiesAndPWA from '@/components/CookiesAndPWA';


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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
      </Head>
      <body>
        <ThemeRegistry>
          <Header />
          {children}
           <CookiesAndPWA />
           <MobileBottomNav/>
          <Footer/>
        </ThemeRegistry>
      </body>
    </html>
  );
}
