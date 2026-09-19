import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Nur',
  description: 'A modern Islamic learning platform foundation.',
  metadataBase: new URL('https://example.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} antialiased`}>
        <div className="min-h-screen bg-brand-secondary text-slate-800">{children}</div>
      </body>
    </html>
  );
}
