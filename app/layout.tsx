import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "./_components/ThemeProvider";
import Session from "./api/auth/[...nextauth]/Session";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chat-Nest",
  description: "RealTime Chatting Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <Session>
          <ThemeProvider>
            <Toaster position="top-center" />
            {children}
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
