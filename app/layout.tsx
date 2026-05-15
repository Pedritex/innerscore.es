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
  title: 'InnerScore — Evaluación de Inteligencia Emocional',
  description:
    'Descubre cómo gestionas realmente tus emociones. 30 preguntas, 5 dimensiones, un informe personalizado de 15 páginas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
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
