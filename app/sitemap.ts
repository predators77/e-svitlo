import type { MetadataRoute } from "next";
import index from "@/data/index.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: "https://example.com/", lastModified: new Date() },
    { url: "https://example.com/select", lastModified: new Date() }
  ];

  const region = index.regions.find(r => r.id === "zakarpattia");
  if (!region) return urls;

  for (const c of region.cities) {
    urls.push({ url: `https://example.com/${region.id}/${c.id}`, lastModified: new Date() });
    for (let q = 1; q <= 6; q++) {
      urls.push({ url: `https://example.com/${region.id}/${c.id}/cherha-${q}`, lastModified: new Date() });
    }
  }

  return urls;
}
