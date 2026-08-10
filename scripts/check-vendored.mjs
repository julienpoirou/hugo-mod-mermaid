// Checks that the third-party files shipped under assets/libs/ are exactly the
// ones .vendored/package.json declares, and that VENDORED.md tells the same
// story.
//
// Dependabot watches .vendored/package.json and bumps the pinned versions
// there, but it cannot re-download a minified bundle and rewrite the committed
// asset. Without this check a merged bump would leave the declared version and
// the bytes actually served to readers silently out of sync. Here it turns into
// a red build instead, until someone re-vendors the file and updates
// VENDORED.md.
//
// Run: node scripts/check-vendored.mjs

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, ".vendored", "package.json"), "utf8"));
const doc = readFileSync(join(root, "VENDORED.md"), "utf8");

const pinned = manifest.dependencies ?? {};
const entries = Object.entries(manifest.vendored ?? {});
const failures = [];
const claimed = new Set();

if (entries.length === 0) {
  failures.push('.vendored/package.json declares no "vendored" entries');
}

for (const [name, entry] of entries) {
  let bytes;
  try {
    bytes = readFileSync(join(root, entry.path));
  } catch {
    failures.push(`${name}: no such file, ${entry.path}`);
    continue;
  }

  const digest = createHash("sha256").update(bytes).digest("hex");
  if (digest !== entry.sha256) {
    failures.push(
      `${name}: ${entry.path} hashes to ${digest}, .vendored/package.json declares ${entry.sha256}`,
    );
  } else if (!doc.includes(digest)) {
    failures.push(`${name}: sha256 ${digest} is missing from VENDORED.md`);
  }

  if (entry.package) claimed.add(entry.package);

  // A file that comes from npm takes its version from the dependency Dependabot
  // bumps. A file that does not exist on npm declares its version inline: no
  // robot bumps it, but the pin is still explicit and still enforced here.
  const label = entry.package ?? name;
  const version = entry.package ? pinned[entry.package] : entry.version;
  if (!version) {
    failures.push(
      entry.package
        ? `${name}: ${entry.package} is not pinned in .vendored/package.json dependencies`
        : `${name}: has neither a package nor a "version", nothing pins it`,
    );
    continue;
  }
  if (!/^\d/.test(version)) {
    failures.push(`${name}: ${label} must be pinned to an exact version, found "${version}"`);
    continue;
  }

  const source = entry.source.replaceAll("{version}", version);
  if (!doc.includes(source)) {
    failures.push(
      `${name}: ${label} is pinned to ${version}, but VENDORED.md does not point at ${source}`,
    );
  }
  if (!doc.includes(version)) {
    failures.push(`${name}: version ${version} is missing from VENDORED.md`);
  }
}

for (const name of Object.keys(pinned)) {
  if (!claimed.has(name)) {
    failures.push(`${name} is pinned in .vendored/package.json but no vendored file uses it`);
  }
}

if (failures.length > 0) {
  console.error("Vendored assets are out of sync:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error(
    "\nRe-download the file listed in VENDORED.md at the pinned version, replace it under" +
      "\nassets/libs/, then update the sha256 in both .vendored/package.json and VENDORED.md.",
  );
  process.exit(1);
}

console.log(`OK: ${entries.length} vendored file(s) match their pinned versions and checksums`);
