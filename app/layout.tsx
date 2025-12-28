import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { basePath } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Mohamed Refaat Design | Interior Design & Architecture',
  description: 'Transforming spaces into stunning, functional works of art. Interior Design & Architecture by Eng. Mohamed Refaat.',
  icons: {
    icon: [
      { url: `${basePath}/images/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/images/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${basePath}/images/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
    ],
    shortcut: `${basePath}/images/favicon.ico`,
    apple: `${basePath}/images/favicon-32x32.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

