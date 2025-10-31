/* ╔════════════════════════════════════════════╗
   ║ FILE: Root Layout
   ║ DESC: Root Layout for all Pages
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const CPMono = localFont({
  src: './fonts/CPMono_v07_Light.otf',
  variable: '--font-cp-mono',
});

export const metadata: Metadata = {
  title: 'Monke Deals',
  description: 'Monke deals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${CPMono.variable} ${CPMono.className} text-black `}>
        {children}
      </body>
    </html>
  );
}
