#!/usr/bin/env node
/**
 * Validates cheat sheet Markdown files under `content/`.
 *
 * Run locally with `npm run validate:content`. Runs in CI on every PR
 * (see `.github/workflows/ci.yml`), before the site is built.
 *
 * What this checks (see `.rules/architecture.md` and `CONTRIBUTING.md`
 * for the conventions being enforced):
 *
 * - File structure: every file must live at `[locale]/[category]/[file].md`.
 * - Locale: must be one of the locales registered in `src/config/locales.ts`
 *   (the actual source of truth used by the app).
 * - File name / category folder: lowercase kebab-case.
 * - Frontmatter: `title` is required (matches the content collection
 *   schema in `src/content.config.ts`); `description` is recommended.
 * - `## References` entries, if present, must be `- [text](https://...)`.
 * - Internal Markdown links must resolve to an existing cheat sheet.
 *
 * Deliberately NOT checked: which category names are "allowed". The
 * project is content-driven by design (see `.rules/development.md`) —
 * contributors can create a new category by adding a folder, so a
 * hardcoded allowlist would contradict that convention. Only the
 * *shape* of the category name is validated.
 *
 * Markdown formatting itself is validated separately by
 * `npm run format:check` (Prettier) in the same CI workflow.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { locales } from '../src/config/locales.ts';

const CONTENT_ROOT = resolve(import.meta.dirname, '..', 'content');
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const IN_ACTIONS = Boolean(process.env.GITHUB_ACTIONS);

interface Problem {
  file: string;
  message: string;
  line?: number;
}

const errors: Problem[] = [];
const warnings: Problem[] = [];

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

/** Parses a flat `key: value` frontmatter block (no nested YAML). */
function parseFrontmatter(raw: string): Record<string, string> | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;

    let value = field[2].trim();
    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (isQuoted) value = value.slice(1, -1);

    data[field[1]] = value;
  }
  return data;
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function lineOf(text: string, index: number): number {
  return text.slice(0, index).split('\n').length;
}

function checkReferences(rel: string, body: string) {
  const heading = body.match(/^##\s+References\s*$/im);
  if (!heading || heading.index === undefined) return;

  const start = heading.index + heading[0].length;
  const rest = body.slice(start);
  const nextHeading = rest.search(/^##\s+/m);
  const section = nextHeading === -1 ? rest : rest.slice(0, nextHeading);

  const validEntry = /^-\s*\[[^\]]+]\(https?:\/\/[^\s)]+\)\s*$/;
  for (const line of section.split('\n')) {
    if (!line.trim()) continue;
    if (!validEntry.test(line)) {
      errors.push({
        file: rel,
        message: `Malformed "## References" entry: "${line.trim()}". Expected "- [Link text](https://...)".`,
        line: lineOf(body, start + section.indexOf(line)),
      });
    }
  }
}

function checkInternalLinks(rel: string, file: string, body: string) {
  const linkPattern = /\[([^\]]*)]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(body))) {
    let target = match[2].trim().split(/\s+"/)[0]; // drop optional "title"
    if (
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('#')
    ) {
      continue; // external links and same-page anchors aren't ours to validate
    }

    target = target.split('#')[0]; // drop an in-page anchor suffix
    if (!target) continue;

    // Absolute site route (e.g. "/en/frameworks/flutter") or a relative
    // Markdown path (e.g. "../databases/postgres.md") — both should
    // resolve to a real file under content/.
    const resolved = target.startsWith('/')
      ? join(CONTENT_ROOT, `${target.slice(1)}.md`)
      : resolve(
          dirname(file),
          target.endsWith('.md') ? target : `${target}.md`,
        );

    if (!resolved.startsWith(CONTENT_ROOT) || !existsSync(resolved)) {
      errors.push({
        file: rel,
        message: `Broken internal link "${match[2]}" — no cheat sheet found at that path.`,
        line: lineOf(body, match.index),
      });
    }
  }
}

const files = walk(CONTENT_ROOT).sort();

interface FileInfo {
  file: string;
  rel: string;
  isCategory: boolean;
}

const fileInfos: FileInfo[] = [];

for (const file of files) {
  const rel = relative(CONTENT_ROOT, file);
  const segments = rel.split('/');
  const filename = segments[segments.length - 1];
  const isCategory = filename === '_category.md';

  if (segments.length !== 3) {
    errors.push({
      file: rel,
      message: `Expected "[locale]/[category]/[file].md" (3 path segments), got ${segments.length}.`,
    });
    continue;
  }

  const [locale, category] = segments;

  if (!locales.includes(locale as (typeof locales)[number])) {
    errors.push({
      file: rel,
      message: `Unknown locale "${locale}". Supported locales: ${locales.join(', ')} (see src/config/locales.ts).`,
    });
  }

  if (!KEBAB_CASE.test(category)) {
    errors.push({
      file: rel,
      message: `Category folder "${category}" must be lowercase kebab-case.`,
    });
  }

  if (!isCategory && !KEBAB_CASE.test(filename.replace(/\.md$/, ''))) {
    errors.push({
      file: rel,
      message: `File name "${filename}" must be lowercase kebab-case (e.g. "react.md").`,
    });
  }

  fileInfos.push({ file, rel, isCategory });
}

for (const { file, rel, isCategory } of fileInfos) {
  const raw = readFileSync(file, 'utf8');
  const frontmatter = parseFrontmatter(raw);

  if (!frontmatter) {
    errors.push({
      file: rel,
      message: 'Missing frontmatter block ("---" ... "---").',
      line: 1,
    });
    continue;
  }

  if (!isCategory && !frontmatter.title) {
    errors.push({
      file: rel,
      message: 'Frontmatter is missing the required "title" field.',
      line: 1,
    });
  }

  if (!frontmatter.description) {
    warnings.push({
      file: rel,
      message:
        'Frontmatter is missing "description" — recommended for listing pages and SEO.',
      line: 1,
    });
  }

  const body = stripFrontmatter(raw);
  checkReferences(rel, body);
  checkInternalLinks(rel, file, body);
}

function report(problems: Problem[], level: 'error' | 'warning') {
  for (const problem of problems) {
    if (IN_ACTIONS) {
      const line = problem.line ? `,line=${problem.line}` : '';
      console.log(
        `::${level} file=content/${problem.file}${line}::${problem.message}`,
      );
    } else {
      const location = problem.line
        ? `${problem.file}:${problem.line}`
        : problem.file;
      console.log(
        `${level === 'error' ? '✖' : '⚠'} ${location} — ${problem.message}`,
      );
    }
  }
}

report(errors, 'error');
report(warnings, 'warning');

console.log(
  `\nChecked ${fileInfos.length} file(s): ${errors.length} error(s), ${warnings.length} warning(s).`,
);

if (errors.length > 0) {
  process.exit(1);
}
