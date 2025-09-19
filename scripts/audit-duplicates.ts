
/**
 * scripts/audit-duplicates.ts
 * Find suspicious duplicate files like "copy", "file 2", "(1).tsx", etc.
 * Usage: npx ts-node scripts/audit-duplicates.ts
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SRC_DIRS = ['components','pages','lib','styles'];

const PATTERNS = [/copy/i, /file\s*\d+/i, /\(\d+\)/, /\s-\sCopy/i, /\sCopy/i];

function walk(dir: string, acc: string[] = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function main() {
  const all: string[] = [];
  for (const d of SRC_DIRS) {
    const p = path.join(ROOT, d);
    if (fs.existsSync(p)) walk(p, all);
  }
  const candidates = all.filter(f => PATTERNS.some(rx => rx.test(path.basename(f))));
  console.log("Suspicious duplicates:", candidates.length);
  for (const f of candidates) console.log("-", path.relative(ROOT, f));
}
main();
