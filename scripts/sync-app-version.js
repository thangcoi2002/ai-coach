#!/usr/bin/env node
/**
 * Bumps the app version and syncs it into android/app/build.gradle.
 *
 * Version format: MAJOR.MINOR.PATCH-BUILD, e.g. "1.2.0-137".
 * BUILD comes from an ever-increasing counter (CI run number) so Android's
 * versionCode never resets to a lower value after a major/minor/patch bump —
 * Play Store rejects an upload whose versionCode isn't strictly greater than
 * every previous one.
 *
 * Usage: BUMP=major|minor|patch|build BUILD_NUMBER=<int> node scripts/sync-app-version.js
 * Prints the new version (without a leading "v") to stdout.
 */
const fs = require('fs');
const path = require('path');

const bump = process.env.BUMP;
const buildNumber = process.env.BUILD_NUMBER;

if (!['major', 'minor', 'patch', 'build'].includes(bump)) {
  console.error(`BUMP must be one of major|minor|patch|build, got: ${bump}`);
  process.exit(1);
}
if (!buildNumber || !/^\d+$/.test(buildNumber)) {
  console.error(`BUILD_NUMBER must be a positive integer, got: ${buildNumber}`);
  process.exit(1);
}

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const currentCore = String(pkg.version).split('-')[0];
let [major, minor, patch] = currentCore.split('.').map(Number);

if (bump === 'major') {
  major += 1;
  minor = 0;
  patch = 0;
} else if (bump === 'minor') {
  minor += 1;
  patch = 0;
} else if (bump === 'patch') {
  patch += 1;
}
// 'build' leaves major.minor.patch untouched — only the build number moves.

const versionName = `${major}.${minor}.${patch}`;
const versionCode = Number(buildNumber);
const fullVersion = `${versionName}-${versionCode}`;

pkg.version = fullVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const gradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
let gradle = fs.readFileSync(gradlePath, 'utf8');
gradle = gradle.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`);
gradle = gradle.replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);
fs.writeFileSync(gradlePath, gradle);

console.log(fullVersion);
