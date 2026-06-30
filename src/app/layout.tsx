import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Semibold (600) is the maximum weight permitted
});

export const metadata: Metadata = {
  title: "Cruze Commerce",
  description: "Minimal, premium, quiet commerce console and storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${commissioner.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
