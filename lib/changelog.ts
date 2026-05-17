/* Build-time CHANGELOG.md parser. The file is mirrored into
   content/CHANGELOG.md by the FileMayor release-landing-sync workflow.
   Returns structured release entries with the body lightly classified
   so the page can render editorial typography without pulling in a
   full markdown parser. */

import { promises as fs } from 'fs';
import path from 'path';

export interface ChangelogBodyBlock {
  type: 'heading' | 'bullet' | 'paragraph';
  text: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  blocks: ChangelogBodyBlock[];
}

const CHANGELOG_PATH = path.resolve(process.cwd(), 'content/CHANGELOG.md');

export async function loadChangelog(): Promise<ChangelogEntry[] | null> {
  let raw: string;
  try {
    raw = await fs.readFile(CHANGELOG_PATH, 'utf8');
  } catch {
    return null;
  }
  if (!raw.trim()) return null;

  // Split on `## ` headings. Drop the first chunk (intro / `# Changelog`).
  const chunks = raw.split(/^## /m).slice(1);
  return chunks.map(parseChunk).filter(Boolean) as ChangelogEntry[];
}

function parseChunk(chunk: string): ChangelogEntry | null {
  const [headerLine, ...rest] = chunk.split('\n');
  if (!headerLine) return null;

  // Accept "[3.6.1] - 2026-04-20", "3.6.1 - 2026-04-20", "v3.6.1 (2026-04-20)".
  const headerMatch = headerLine.match(/^v?\[?([\w.-]+)\]?\s*[-–·(]?\s*(\d{4}[-./]\d{2}[-./]\d{2}|\d{4}\.\d{2}\.\d{2}|\d{4}-\d{2}-\d{2}|.*?)\)?\s*$/);
  const version = headerMatch?.[1] ?? headerLine.trim();
  const date = (headerMatch?.[2] ?? '').replace(/[\\/]/g, '.').replace(/-/g, '.').trim();

  const blocks: ChangelogBodyBlock[] = [];
  let paragraphBuf: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuf.length === 0) return;
    blocks.push({
      type: 'paragraph',
      text: paragraphBuf.join(' ').replace(/\s+/g, ' ').trim(),
    });
    paragraphBuf = [];
  };

  for (const rawLine of rest) {
    const line = rawLine.trimEnd();
    if (line === '') {
      flushParagraph();
      continue;
    }
    // ### subheading (Added, Fixed, Changed, Removed, Security, etc.)
    if (line.startsWith('### ')) {
      flushParagraph();
      blocks.push({ type: 'heading', text: line.slice(4).trim() });
      continue;
    }
    // - bullet  or  * bullet
    if (line.match(/^\s*[-*]\s+/)) {
      flushParagraph();
      blocks.push({ type: 'bullet', text: line.replace(/^\s*[-*]\s+/, '') });
      continue;
    }
    // Plain prose — accumulate into a paragraph until the next blank line.
    paragraphBuf.push(line.trim());
  }
  flushParagraph();

  if (blocks.length === 0) return null;
  return { version, date, blocks };
}
