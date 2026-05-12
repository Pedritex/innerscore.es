import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['700', '800'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'InnerScore — Emotional Intelligence Assessment',
  description:
    'Discover how you really manage your emotions. 14 questions, 5 dimensions, a 15-page personalized report.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
