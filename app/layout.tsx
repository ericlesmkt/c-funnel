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
  title: "Método N.A.V.E.",
  description: "Transforme seu conteúdo em vendas diárias. Aplique para o nosso diagnóstico e descubra o plano definitivo para o seu negócio.",
  icons: {
    icon: "/candeeiro-azul-brilho.png",
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