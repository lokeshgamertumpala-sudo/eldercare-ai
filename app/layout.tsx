import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ElderCare AI — One button. One voice. One calm answer.',
  description: 'An Apple-inspired, multimodal, accessible AI health and medicine companion for elderly adults.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ElderCare AI',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#090d16',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased selection:bg-sky-500 selection:text-white bg-[#090d16] text-slate-100 min-h-screen flex flex-col touch-manipulation overscroll-none">
        {children}
      </body>
    </html>
  );
}
