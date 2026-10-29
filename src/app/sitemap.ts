import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date("2026-10-24"), changeFrequency: "daily", priority: 1 },
  ];
}
