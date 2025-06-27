// app/auth/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={{ backgroundColor: '#f3f3f3' }}>
        {children}
      </body>
    </html>
  );
}
