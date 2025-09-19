import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  try {
    const body = req.body;
    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    const file = path.join(logsDir, "location_logs.ndjson");
    const line = JSON.stringify({ receivedAt: Date.now(), payload: body }) + "\n";
    fs.appendFileSync(file, line, { encoding: "utf8" });
    console.log("Logged location:", body);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Failed to write log", e);
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
