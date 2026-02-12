

import fs from "fs";
import path from "path";
import Script from "next/script";

function extractBodyContent(html: string): string {
  // Extract content between <body> and </body> tags
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return html;

  let bodyContent = bodyMatch[1];

  // Remove <script> tags from the body content to avoid conflicts
  // We'll load Webflow scripts separately via next/script
  bodyContent = bodyContent.replace(
    /<script\b[^>]*src=["'][^"']*jquery[^"']*["'][^>]*><\/script>/gi,
    ""
  );
  bodyContent = bodyContent.replace(
    /<script\b[^>]*src=["'][^"']*webflow\.js[^"']*["'][^>]*><\/script>/gi,
    ""
  );

  return bodyContent;
}

function extractInlineStyles(html: string): string {
  // Extract <style> blocks from the <head> section
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return "";

  const styleBlocks: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(headMatch[1])) !== null) {
    styleBlocks.push(match[1]);
  }

  return styleBlocks.join("\n");
}

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "public", "home-one.html");
  const html = fs.readFileSync(filePath, "utf8");

  const bodyContent = extractBodyContent(html);
  const headStyles = extractInlineStyles(html);

  return (
    <>
      {/* Inline styles from the Webflow <head> */}
      {headStyles && <style dangerouslySetInnerHTML={{ __html: headStyles }} />}

      {/* Webflow body content only */}
      <div
        dangerouslySetInnerHTML={{ __html: bodyContent }}
        suppressHydrationWarning
      />

      {/* Load Webflow font loader */}
      <Script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        strategy="beforeInteractive"
      />
      <Script id="webfont-load" strategy="beforeInteractive">
        {`WebFont.load({ google: { families: ["Inter:regular,500,600,700","Raleway:regular,500,600,700"] }});`}
      </Script>

      {/* jQuery then Webflow */}
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6932f6b32d7fb427d6a9b013"
        strategy="beforeInteractive"
      />
      {/* Webflow w-mod-js initialization */}
      <Script id="wf-mod-js" strategy="afterInteractive">
        {`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`}
      </Script>
    </>
  );
}
