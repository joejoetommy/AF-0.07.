import '../styles/globals.css';
import "react-toastify/dist/ReactToastify.css";


import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import BottomNav from '@/components/bottom-nav';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import SideNav from '@/components/side-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AgriForce',
  description: 'Generated to build the Agriculture Community',
    icons:  '/favicon.ico',
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MaxWidthWrapper>
          <div className="flex">
            <SideNav />
            <main className="flex-1">{children}</main>
          </div>
        </MaxWidthWrapper>
        <BottomNav />
      </body>
    </html>
  );
}
