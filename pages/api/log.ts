import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Accept any POST and no-op (you can pipe to PostHog later)
  if (req.method !== "POST") return res.status(204).end();
  try { /* swallow */ } catch {}
  return res.status(204).end();
}
