import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inconsolata } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "Aedin Yu",
  description: "Aedin Yu Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inconsolata.variable}`}>
        {children}
      </body>
    </html>
  );
}
