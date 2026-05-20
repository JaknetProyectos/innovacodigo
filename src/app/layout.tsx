import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Innova Código - Transforma tus datos en decisiones inteligentes",
  description:
    "Con Innova Código obtienes dashboards claros, análisis precisos y herramientas que impulsan el crecimiento real de tu negocio. Soluciones de Business Intelligence a la medida.",
  keywords: ["Business Intelligence", "BI", "Dashboards", "Análisis de datos", "México"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No definimos lang aquí porque lo hará el layout dinámico
    <html suppressHydrationWarning>
      <head>
        <Script crossOrigin="anonymous" src="//unpkg.com/same-runtime/dist/index.global.js" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}