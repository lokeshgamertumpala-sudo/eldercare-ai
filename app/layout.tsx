import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ElderCare AI — One button. One voice. One calm answer.',
  description: 'An Apple-inspired, multimodal, accessible AI health and medicine companion for elderly adults.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#090d16',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-sky-500 selection:text-white bg-[#090d16] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
