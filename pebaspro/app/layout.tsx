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
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="keywords" content="pebaspro, profissionais, clientes, serviços, marketplace, conexão, agendamento, avaliações" />
        <meta name="author" content="PebasPro Team" />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:title" content="PebasPro - Encontre profissionais e serviços" />
        <meta property="og:description" content="Conecte-se com profissionais qualificados ou encontre o serviço ideal. Tudo em um só lugar." />
        <meta property="og:image" content="https://www.pebaspro.com.br/og-image.png" />
        <meta property="og:url" content="https://www.pebaspro.com.br" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <ThemeRegistry>
          <Header />
          {children}
          <CookiesAndPWA />
          <MobileBottomNav />
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
