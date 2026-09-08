import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PostMakerGBP - AI-Powered Google Business Profile Post Manager',
  description:
    'Generate high-ranking Google Business Profile (GBP) posts with AI, manage multi-location businesses, preview live Google Search & Maps updates, and boost local 3-pack SEO rankings.',
  keywords: [
    'Google Business Profile',
    'GBP Post Manager',
    'AI Local SEO',
    'Google Maps Posts',
    'OpenRouter AI Post Maker',
    'Multi Location SEO',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
