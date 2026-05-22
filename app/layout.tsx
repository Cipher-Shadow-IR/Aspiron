import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ComparisonProvider } from '../components/ComparisonContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Aspiron — Discover & Compare Engineering Colleges',
  description: 'Find and compare top Indian engineering colleges accepting JEE Main and GUJCET. Predict your college fit based on historical exam cutoffs.',
  icons: {
    icon: '/Aspiron_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200`}
      >
        <ComparisonProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ComparisonProvider>
      </body>
    </html>
  );
}
