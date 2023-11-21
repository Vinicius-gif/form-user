import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Form',
  description: 'Tratando formulario com hook form + zod',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" data-lt-installed={true}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
