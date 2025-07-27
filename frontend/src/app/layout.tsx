import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const roboto = Roboto({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Listagem e Cadastro dos Agricultores",
  description: "Listagem e Cadastro dos Agricultores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
