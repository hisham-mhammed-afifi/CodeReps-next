import type { MetadataRoute } from "next";
import { getAllChallenges } from "@/lib/challenges/track-1-fundamentals";
import { track2Challenges } from "@/lib/challenges/dom-manipulation";

const SITE_URL = "https://code-reps-next.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/dashboard`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/patterns`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/track-complete`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/track-2-complete`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const challengePages: MetadataRoute.Sitemap = [
    ...getAllChallenges(),
    ...track2Challenges,
  ].map((c) => ({
    url: `${SITE_URL}/challenge/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...challengePages];
}
