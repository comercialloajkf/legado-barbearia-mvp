import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legado Barber Shop | Agendamento",
  description: "Agende seu horário na Legado Barber Shop de forma rápida e prática.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${montserrat.variable} antialiased selection:bg-legado-gold selection:text-legado-black`}>
        {children}
      </body>
    </html>
  );
}
