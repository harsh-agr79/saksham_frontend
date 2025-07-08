import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/components/ReduxProvider.jsx';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Saksham',
  description: 'Making you Capable For Tomorrow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      {/* Page Title */}
      <title>Saksham</title>
      {/* Favicon/Logo */}
      <link
        rel="icon"
        href="https://sih.startuplair.com/logo/circlelogo.png"
        type="image/png"
      />
      {/* Meta Description */}
      <meta name="description" content="Making you Capable For Tomorrow" />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <ReduxProvider>{children}</ReduxProvider>
    </body>
  </html>
  );
}
