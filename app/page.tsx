

import fs from "fs";
import path from "path";

function extractHeadStyles(html: string): string {
  // Extract all <style> blocks from <head>
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return "";
  const headContent = headMatch[1];
  const styles: string[] = [];
  const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(headContent)) !== null) {
    styles.push(match[0]);
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
