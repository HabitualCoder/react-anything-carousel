#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function run(command) {
  execSync(command, {
    cwd: repoRoot,
    stdio: 'inherit'
  });
}

function runWithOutput(command) {
  return execSync(command, {
    cwd: repoRoot,
    stdio: ['ignore', 'pipe', 'inherit']
  })
    .toString()
    .trim();
}

function ensureCleanWorkingTree() {
  const status = runWithOutput('git status --porcelain');
  if (status.length > 0) {
    console.error('\n⚠️  Please commit or stash changes before releasing.');
    process.exit(1);
  }
}

async function promptVersion(currentVersion) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(
    `Current version is ${currentVersion}. Enter the new version (e.g. 0.1.0): `
  );
  rl.close();

  const nextVersion = answer.trim();
  if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/.test(nextVersion)) {
    console.error('\n⚠️  Please enter a valid semver version.');
    process.exit(1);
  }

  return nextVersion;
}

async function updatePackageVersion(packagePath, version) {
  const packageFile = resolve(repoRoot, packagePath);
  const contents = await readFile(packageFile, 'utf8');
  const pkg = JSON.parse(contents);
  pkg.version = version;
  await writeFile(packageFile, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
}

async function main() {
  ensureCleanWorkingTree();

  console.log('🔍 Running lint, typecheck, tests, and build in sequence...');
  run('npm run lint');
  run('npm run typecheck');
  run('npm run test');
  run('npm run build');

  const rootPackageRaw = await readFile(resolve(repoRoot, 'package.json'), 'utf8');
  const rootPackage = JSON.parse(rootPackageRaw);
  const nextVersion = await promptVersion(rootPackage.version);

  await updatePackageVersion('package.json', nextVersion);
  await updatePackageVersion('demo/package.json', nextVersion);

  console.log('\n✅ Version bumped to', nextVersion);
  console.log('➡️  Update CHANGELOG.md and commit the release.');
  console.log('➡️  Publish with `npm publish --access public`.');
}

main().catch((error) => {
  console.error('\nRelease script failed:', error);
  process.exit(1);
});
