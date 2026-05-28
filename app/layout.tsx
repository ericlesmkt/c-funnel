import type { Metadata } from "next";
import { Space_Grotesk, Urbanist } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nave.chamainside.com"),
  title: "Método N.A.V.E. — Aplicação Oficial",
  description: "O sistema definitivo para quem tem um serviço de excelência e cansou de depender de agências.",
  openGraph: {
    title: "Método N.A.V.E. — Aplicação Oficial",
    description: "O sistema definitivo para quem tem um serviço de excelência e cansou de depender de agências.",
    url: "https://nave.chamainside.com",
    siteName: "Método N.A.V.E.",
    images: [
      {
        url: "/og-nave.png",
        width: 1200,
        height: 630,
        alt: "Método N.A.V.E. — Aplicação Oficial",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Método N.A.V.E. — Aplicação Oficial",
    description: "O sistema definitivo para quem tem um serviço de excelência e cansou de depender de agências.",
    images: ["/og-nave.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${urbanist.variable} antialiased`}
      >
        {children}
        <FacebookPixel />
      </body>
    </html>
  );
}