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
    <html
      lang="fr"
      data-wf-page="6932f6b52d7fb427d6a9b161"
      data-wf-site="6932f6b32d7fb427d6a9b013"
      suppressHydrationWarning
    >
      <head>
        {/* CSS Webflow */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link
          rel="stylesheet"
          href="/css/detroit-holding-website-d68318.webflow.css"
        />
        {/* Preconnect for Google Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
