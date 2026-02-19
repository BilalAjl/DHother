import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Detroit Holding",
    template: "%s | Detroit Holding",
  },
  description: "Detroit Holding",
  icons: {
    icon: "/images/logos/D_of_Detroit.png",
    apple: "/images/logos/D_of_Detroit.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* CSS Webflow */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link
          rel="stylesheet"
          href="/css/detroit-holding-website-d68318.webflow.css"
        />
        {/* Webflow fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
