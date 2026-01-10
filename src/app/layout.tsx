import { Sidebar } from '@/components/sidebar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Gerencie seus prompts',
};

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-900 text-white`}>
        <section className="flex h-screen">
          <Sidebar />
          <main className="relative flex-1 overflow-auto min-w-0">
            <div className="p-4 sm:p-6 md:p-8 max-w-full md:max-w-3xl mx-auto h-full">
              {children}
            </div>
          </main>
        </section>
      </body>
    </html>
  );
}
