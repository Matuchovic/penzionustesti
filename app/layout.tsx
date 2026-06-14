import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Penzion U Štěstí | Český ráj",
  description:
    "Penzion U Štěstí – váš domov v srdci Českého ráje. Romantické pokoje, krásná příroda, Prachovské skály a pohoda. Rezervujte svůj pobyt ještě dnes.",
  keywords: "penzion, Český ráj, Prachovské skály, Trosky, ubytování, dovolená, Rovensko pod Troskami",
  openGraph: {
    title: "Penzion U Štěstí | Český ráj",
    description:
      "Váš domov v srdci Českého ráje. Romantické pokoje, krásná příroda a nezapomenutelné zážitky.",
    url: "https://penzionustesti.cz",
    siteName: "Penzion U Štěstí",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Penzion U Štěstí - Český ráj",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Penzion U Štěstí | Český ráj",
    description: "Váš domov v srdci Českého ráje.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
