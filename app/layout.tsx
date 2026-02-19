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
      className="w-mod-js w-mod-ix"
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
        {/* Webflow fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          type="text/javascript"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({google:{families:["Inter:regular,500,600,700","Raleway:regular,500,600,700"]}});`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
