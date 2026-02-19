

import fs from "fs";
import path from "path";

function stripWebflowIxStyles(styleContent: string): string {
  // Remove all rules that use html.w-mod-js:not(.w-mod-ix) selectors
  // These rules hide/transform elements waiting for Webflow's interaction engine
  // which doesn't run properly in the Next.js context
  return styleContent.replace(
    /html\.w-mod-js:not\(\.w-mod-ix\)\s*\[[^\]]*\]\s*\{[^}]*\}/g,
    ""
  );
}

function extractHeadStyles(html: string): string {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return "";
  const headContent = headMatch[1];
  const styles: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(headContent)) !== null) {
    // Strip the w-mod-ix hiding rules from each style block
    const cleaned = stripWebflowIxStyles(match[0]);
    styles.push(cleaned);
  }
  return styles.join("\n");
}

function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "public", "home-one.html");
  const html = fs.readFileSync(filePath, "utf8");
  const headStyles = extractHeadStyles(html);
  const bodyContent = extractBodyContent(html);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: headStyles }}
        suppressHydrationWarning
      />
      <div
        dangerouslySetInnerHTML={{ __html: bodyContent }}
        suppressHydrationWarning
      />
    </>
  );
}
