

import fs from "fs";
import path from "path";

function extractBodyContent(html: string): string {
  // Extract content between <body> and </body> tags
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "public", "home-one.html");
  const html = fs.readFileSync(filePath, "utf8");
  const bodyContent = extractBodyContent(html);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: bodyContent }}
      suppressHydrationWarning
    />
  );
}
