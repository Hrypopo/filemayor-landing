import type { Metadata } from 'next';
import { Article, P, H2, H3, Pull, Code, Pre, Ul, Li } from '@/components/Article';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://filemayor.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to organize your Downloads folder', item: 'https://filemayor.com/blog/how-to-organize-downloads-folder' },
  ],
};

export const metadata: Metadata = {
  title: 'How to organize your Downloads folder (and keep it that way)',
  description:
    'A practical, repeatable system for cleaning up a messy Downloads folder — by hand or automatically with FileMayor — and keeping it organised for good.',
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to organize your Downloads folder (and keep it that way)',
  description: 'A practical, repeatable system for cleaning up a messy Downloads folder — by hand or automatically with FileMayor — and keeping it organised for good.',
  datePublished: '2026-05-22',
  author: { '@type': 'Organization', name: 'FileMayor', url: 'https://filemayor.com' },
  publisher: { '@type': 'Organization', name: 'FileMayor', url: 'https://filemayor.com' },
  url: 'https://filemayor.com/blog/how-to-organize-downloads-folder',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to organize your Downloads folder',
  description: 'A practical, repeatable system for cleaning up a messy Downloads folder — by hand or automatically with FileMayor — and keeping it organised for good.',
  tool: [{ '@type': 'HowToTool', name: 'FileMayor CLI' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Audit what is in your Downloads folder',
      text: 'Run `filemayor explain ~/Downloads` to see a health score, file counts by category, and the biggest space hogs. This is read-only — nothing is moved.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Delete obvious junk',
      text: 'Run `filemayor clean ~/Downloads --dry-run` to preview junk files (.DS_Store, Thumbs.db, temp files, empty folders). Run without --dry-run to remove them.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Remove duplicates',
      text: 'Run `filemayor duplicates ~/Downloads` to find hash-identical files. Then `filemayor dedupe ~/Downloads` to remove the extras — each deletion is journaled.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Organise remaining files by category',
      text: 'Run `filemayor organize ~/Downloads` to sort files into subfolders by extension (Documents, Images, Software, etc.). Use --dry-run first to preview.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Undo anything you regret',
      text: 'Run `filemayor undo` at any point to reverse the last operation. The move journal persists across sessions.',
    },
  ],
};

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Article
        header={{
          kicker: 'Guide · workflow',
          title: 'How to organize your Downloads folder (and keep it that way).',
        dek: 'A repeatable system for cleaning up the folder everyone ignores — and the one command that keeps it clean.',
        date: '2026.05.22',
        readTime: '7 min read',
      }}
    >
      <P>
        The Downloads folder is where files go to be forgotten. Installers you ran once,
        PDFs you opened and never reopened, three versions of the same invoice, a screenshot
        from 2022. It is the single messiest directory on most computers, and the reason is
        simple: it is a destination, never a home. Everything lands there, nothing leaves.
      </P>
      <P>
        This guide gives you a system. First the manual version — useful to understand the
        principles — then the automated version that does the whole thing in one command and
        keeps it clean going forward.
      </P>

      <H2>The principle: sort, dedupe, archive</H2>
      <P>
        Every good cleanup, manual or automated, comes down to three moves applied in order:
      </P>
      <Ul>
        <Li><strong>Sort</strong> — group files by type so the folder has structure instead of being a flat dump.</Li>
        <Li><strong>Dedupe</strong> — remove exact duplicates, which are almost always pure waste.</Li>
        <Li><strong>Archive</strong> — move anything you have not touched in months out of the way, without deleting it.</Li>
      </Ul>
      <Pull>
        The goal is not an empty folder. It is a folder where finding something takes seconds.
      </Pull>

      <H2>Doing it by hand</H2>
      <H3>1. Create a small set of buckets</H3>
      <P>
        Resist the urge to invent thirty categories. Five or six cover almost everything:
        Documents, Images, Installers, Archives, Media, and Other. Make those folders inside
        Downloads.
      </P>
      <H3>2. Sort by kind, then move in batches</H3>
      <P>
        In Finder, switch to list view and sort by Kind. Now files of the same type cluster
        together, and you can select a whole run and drag it into the right bucket. On
        Windows, the Details view with a sort on Type does the same thing.
      </P>
      <H3>3. Hunt the duplicates</H3>
      <P>
        This is the tedious part. Files like <Code>invoice.pdf</Code>, <Code>invoice (1).pdf</Code>,
        and <Code>invoice (2).pdf</Code> are the obvious case, but exact duplicates with totally
        different names are common too and impossible to spot by eye. Manually, the best you can
        do is sort by size and compare files that match.
      </P>
      <H3>4. Archive the old stuff</H3>
      <P>
        Sort by Date Modified. Anything older than six months that is not clearly important goes
        into an <Code>_archive</Code> folder, organised by year. You are not deleting — you are
        getting it out of sight while keeping it recoverable.
      </P>
      <P>
        Done carefully, this takes most people one to three hours for a badly neglected folder.
        And it lasts until the next download lands, because nothing prevents the mess from
        re-forming.
      </P>

      <H2>Doing it in one command</H2>
      <P>
        The manual method works, but it is slow and it has no undo. This is exactly the kind of
        bulk, repetitive, slightly-risky work that should be automated. FileMayor scans the
        folder, applies the same sort / dedupe / archive logic, and shows you the plan before
        touching anything.
      </P>
      <Pre>{`$ filemayor scan ~/Downloads

  Scanned 3,847 files in 1.4s

  ◆ Diagnosis
    • 412 duplicate files (2.1 GB recoverable)
    • 890 files unmodified for 18+ months
    • 1,204 files with no folder structure
    • 23 broken symlinks

  ◆ Proposed cure
    [1] Sort 2,545 files into typed subfolders
    [2] Deduplicate 412 files, keep newest → saves 2.1 GB
    [3] Archive 890 stale files to _archive/2024/
    [4] Remove 23 broken symlinks

  Apply? [y/N] y

  ✓ 3,847 operations journaled. Run \`filemayor undo --all\` to reverse.`}</Pre>
      <P>
        The duplicate detection here is content-based, not name-based — it hashes file contents,
        so it catches exact copies even when the filenames are completely different. That alone
        is something the manual method cannot do reliably.
      </P>
      <Pull>
        Everything is journaled. If the plan did something you did not want, one command reverses
        the entire session.
      </Pull>

      <H2>Keeping it clean</H2>
      <P>
        A one-time cleanup is satisfying for about a week. The real win is preventing the mess
        from coming back. FileMayor can watch the folder and apply a consistent policy to
        every new file as it arrives.
      </P>
      <Pre>{`$ filemayor watch ~/Downloads --policy "sort by type, archive after 90 days"

  ◆ Watch mode active on ~/Downloads
    [10:14] NEW   report-q4.pdf      → Documents/
    [10:14] NEW   photo-2026.heic    → Images/
    [10:15] NEW   setup.dmg          → Installers/`}</Pre>
      <P>
        Now the folder organises itself. New downloads route to the right place automatically,
        old files age out into the archive, and you never schedule another cleanup.
      </P>

      <H2>A note on safety</H2>
      <P>
        Any tool that moves files in bulk is a tool that can ruin your day if it gets it wrong.
        That is why the model here is propose-then-apply, never act-immediately, and why every
        operation is recorded in a journal that makes <Code>undo --all</Code> always available.
        FileMayor also refuses to touch protected system locations entirely. You can read more
        about that design in the <Code>Chevza Doctrine</Code>.
      </P>
      <P>
        Whether you do it by hand or hand it to a tool, the principle is the same: sort, dedupe,
        archive — and put something in place so you only have to do it once.
      </P>
    </Article>
    </>
  );
}
