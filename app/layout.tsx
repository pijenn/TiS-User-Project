import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext"; // Import the CartProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toko Online",
  description: "Belanja online mudah dan aman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap children with CartProvider */}
        <CartProvider>
          {/* Add your header/navigation */}
          <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Toko Online</h1>
              <nav className="flex items-center space-x-6">
                <a href="/" className="hover:text-gray-600 transition-colors">
                  Beranda
                </a>
                <a 
                  href="/cart" 
                  className="relative hover:text-gray-600 transition-colors"
                >
                  Keranjang
                  {/* Cart badge would go here */}
                </a>
              </nav>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="border-t border-gray-200 py-6 mt-8">
            <div className="container mx-auto px-4 text-center text-gray-500">
              © {new Date().getFullYear()} Toko Online. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}