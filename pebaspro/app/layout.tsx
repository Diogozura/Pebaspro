// app/layout.tsx
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import '@fontsource/inter';
import './globals.css';

export const metadata = {
  title: 'PebasPro',
  description: 'Conectando profissionais e clientes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
