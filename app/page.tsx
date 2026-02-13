

import fs from "fs";
import path from "path";
import { sanity } from "@/lib/sanity.client";

function extractHeadStyles(html: string): string {
  // Extract <style> tags from <head> (Webflow IX initial states)
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return "";
  const headContent = headMatch[1];
  const styles: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(headContent)) !== null) {
    styles.push(match[0]);
  }
  return styles.join("\n");
}

function extractBody(html: string): string {
  // Extract <style> tags from <head> first (needed for Webflow IX animations)
  const headStyles = extractHeadStyles(html);

  // Extract only the content between <body> and </body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return headStyles + "\n" + bodyMatch[1];
  }
  // Fallback: strip html/head/body tags manually
  return (
    headStyles +
    "\n" +
    html
      .replace(/<!DOCTYPE[^>]*>/i, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")
  );
}

export default async function HomePage() {
  // 1) Charger ton fichier HTML Webflow
  const filePath = path.join(process.cwd(), "public", "home-one.html");
  let html = fs.readFileSync(filePath, "utf8");

  // 2) Extract only the <body> content to avoid nested <html>/<head> tags
  const bodyContent = extractBody(html);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: bodyContent }}
      suppressHydrationWarning
    />
  );
}
