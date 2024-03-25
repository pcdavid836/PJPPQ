"use client";
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';

import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}