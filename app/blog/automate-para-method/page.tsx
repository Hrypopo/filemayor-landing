import type { Metadata } from 'next';
import Link from 'next/link';
import { Article, P, H2, H3, Pull, Ul, Li, Pre, Code } from '@/components/Article';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to automate the PARA method (Projects, Areas, Resources, Archives)',
  description:
    'The PARA method organizes everything by actionability, not file type — but maintaining it by hand is the hard part. Here is how to automate PARA on your filesystem with one command, reversibly.',
  datePublished: '2026-06-28',
  dateModified: '2026-06-28',
  author: { '@type': 'Person', name: 'Lehlohonolo Goodwill Nchefu' },
  publisher: { '@type': 'Organization', name: 'FileMayor', url: 'https://filemayor.com' },
  url: 'https://filemayor.com/blog/automate-para-method',
  image: { '@type': 'ImageObject', url: 'https://filemayor.com/opengraph-image', width: 1200, height: 630 },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://filemayor.com/blog' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How to automate the PARA method',
      item: 'https://filemayor.com/blog/automate-para-method',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to automate the PARA method on your filesystem',
  description:
    'Set up and automate the PARA method (Projects, Areas, Resources, Archives) for the files on your computer using FileMayor.',
  totalTime: 'PT5M',
  tool: [{ '@type': 'HowToTool', name: 'FileMayor CLI' }],
  image: { '@type': 'ImageObject', url: 'https://filemayor.com/opengraph-image', width: 1200, height: 630 },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Scaffold the four PARA folders',
      text: 'Run "filemayor init --para" to create Projects, Areas, Resources, and Archives folders, each with a plain-English README explaining what belongs in it, plus a tuned config file.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Generate a PARA plan by actionability',
      text: 'Run "filemayor para ." to sort the folder. FileMayor classifies each file by actionability — recency, category, folder names, and project markers — and shows a plan with the reason for every move. Nothing is changed yet.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Review and apply',
      text: 'Run "filemayor apply" to execute the plan. Every move is journaled before it happens, and active code or project folders move intact.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Undo if needed',
      text: 'Run "filemayor undo" at any time to reverse the entire session. The journal survives crashes.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the PARA method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PARA is an organizing framework created by Tiago Forte. It sorts everything into four buckets by actionability rather than by topic: Projects (active efforts with a deadline), Areas (ongoing responsibilities you maintain), Resources (reference material and interests), and Archives (inactive items from the other three).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you automate the PARA method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Partly, and the part you can automate is the part people hate doing. FileMayor automates PARA for your filesystem: it scaffolds the four folders, sorts files into them by actionability signals (recency, file type, folder names, project markers), and auto-archives anything you have not touched in months. Every move is reversible. The semantic judgement calls are still yours to confirm.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FileMayor affiliated with Tiago Forte or Building a Second Brain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. PARA is a method created by Tiago Forte. FileMayor is an independent tool that automates the method for files on disk. It is not affiliated with, sponsored by, or endorsed by Tiago Forte or Forte Labs.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'How to automate the PARA method (Projects, Areas, Resources, Archives)',
  description:
    'PARA organizes by actionability, not file type — but the upkeep is the hard part. Automate the PARA method on your files with one reversible command using FileMayor.',
};

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Article
        header={{
          kicker: 'Guide · method',
          title: 'How to automate the PARA method.',
          dek: 'PARA organizes everything by actionability instead of topic. The idea is simple — the upkeep is what defeats people. Here is how to hand the upkeep to a tool.',
          date: '2026.06.28',
          readTime: '7 min read',
        }}
      >
        <P>
          PARA is one of the most durable ideas in personal organization. Created by{' '}
          Tiago Forte as the backbone of <em>Building a Second Brain</em>, it throws out the
          instinct to file things by topic and replaces it with a single question:{' '}
          <strong>how actionable is this?</strong> That one shift collapses the endless folder
          trees most people build into exactly four buckets.
        </P>
        <P>
          It works across every tool you use — notes, cloud drives, and the plain old folders on
          your computer. The catch is the same everywhere: PARA is easy to understand and{' '}
          <em>tedious to maintain</em>. This guide is about removing the tedium for the files on
          your disk.
        </P>

        <H2>The four buckets, briefly</H2>
        <Ul>
          <Li>
            <strong>Projects</strong> — active efforts with a goal and an end. &ldquo;Launch the
            site,&rdquo; &ldquo;plan the trip,&rdquo; &ldquo;Q3 report.&rdquo; When a project
            finishes, it leaves.
          </Li>
          <Li>
            <strong>Areas</strong> — ongoing responsibilities you maintain with no end date.
            Finances, Health, Home, a job role. You never &ldquo;finish&rdquo; an area; you keep
            it in good standing.
          </Li>
          <Li>
            <strong>Resources</strong> — topics and reference material you may want later.
            Templates, manuals, books, design assets, things you&rsquo;re simply interested in.
          </Li>
          <Li>
            <strong>Archives</strong> — inactive items from the other three. Nothing is deleted;
            it&rsquo;s cold storage you can always recover from.
          </Li>
        </Ul>
        <Pull>
          The genius of PARA is the demotion path: when something stops being actionable, it
          moves toward Archives. That single habit keeps the system from rotting.
        </Pull>

        <H2>Why the upkeep defeats people</H2>
        <P>
          The buckets are easy. What&rsquo;s hard is the constant, low-grade maintenance: noticing
          that a project finished three months ago, that a folder hasn&rsquo;t been opened since
          last year, that a download belongs in Resources, not on your Desktop. None of those
          decisions is difficult — there are just hundreds of them, forever, and they never feel
          urgent. So they don&rsquo;t happen, and the landfill returns.
        </P>
        <P>
          This is exactly the kind of work a computer should do. Most of it comes down to signals
          a tool can read: when was this last modified? What kind of file is it? What folder did
          you already put it in? Is it part of a code or media project that should move as a unit?
        </P>

        <H2>Automating PARA with FileMayor</H2>
        <P>
          FileMayor is a free, local-first file organizer that builds PARA into the engine. It
          never sends your file contents anywhere, and every move it makes is journaled so a
          single command reverses the whole session.
        </P>

        <H3>1. Scaffold the structure</H3>
        <P>
          One command creates the four folders — each with a short README explaining what belongs
          in it, so the system teaches itself to anyone who opens it — plus a tuned config file.
        </P>
        <Pre>{`$ filemayor init --para

  ✓ Created .filemayor.yml
  ✓ Scaffolded PARA folders: Projects, Areas, Resources, Archives
    8 item(s) created (folders + READMEs)

  Next:  filemayor para .   then  filemayor apply`}</Pre>

        <H3>2. Sort by actionability — and see why</H3>
        <P>
          <Code>filemayor para</Code> classifies every file from the signals it can actually read
          and shows you the plan before touching anything. Crucially, it{' '}
          <strong>labels each move with its reason</strong> — no black box.
        </P>
        <Pre>{`$ filemayor para .

  Into PARA buckets:
    Projects 14   Areas 6   Resources 23   Archives 41

  tax-return-2024.pdf   →  Areas/finances/      (matched "finances")
  client-acme/          →  Projects/client-acme  (active project — moved intact)
  old-receipts.zip      →  Archives/             (not modified in 19 months)
  swipe-file.pdf        →  Resources/reference/  (matched "reference")

  Review the plan, then run 'filemayor apply' to execute (reversible).`}</Pre>
        <P>
          The logic is intent-first: if you already filed something under{' '}
          <Code>finances/</Code> or <Code>templates/</Code>, FileMayor honors that meaning instead
          of fragmenting your folder by date. The headline automation — &ldquo;not touched in N
          months &rarr; Archives&rdquo; — is reserved for the loose, unfiled clutter where it
          actually helps. Where a file has no clear signal, it says so and sets it aside for you to
          review, rather than guessing confidently.
        </P>

        <H3>3. Apply, with an undo</H3>
        <Pre>{`$ filemayor apply
  ✓ Applied! 84 files moved, journaled.

$ filemayor undo        # changed your mind? reverse the whole session`}</Pre>
        <P>
          Active code and project folders (anything with a <Code>.git</Code>,{' '}
          <Code>package.json</Code>, or similar marker) move <em>intact</em> into Projects — never
          shredded file by file. And because every move is written to a journal first,{' '}
          <Code>filemayor undo</Code> always has your back.
        </P>

        <H2>Deterministic vs. semantic PARA</H2>
        <P>
          There&rsquo;s an honest limit to what any tool can infer. Whether a document is an active{' '}
          <em>Project</em> or an ongoing <em>Area</em> responsibility is sometimes a genuine
          judgement call. FileMayor handles this with two modes:
        </P>
        <Ul>
          <Li>
            <strong>Deterministic</strong> (the <Code>para</Code> command) — fast, free, private,
            and transparent. Great for the bulk pass and the auto-archiving.
          </Li>
          <Li>
            <strong>Semantic</strong> — when you use FileMayor through{' '}
            <Link href="/mcp" className="text-accent underline underline-offset-4">Claude via the MCP server</Link>,
            the AI reasons about true actionability per file and proposes the buckets, then hands
            the moves to the same reversible engine. You confirm; it applies.
          </Li>
        </Ul>

        <H2>The point isn&rsquo;t a tidy folder. It&rsquo;s a system that stays tidy.</H2>
        <P>
          A one-time cleanup feels great for a week. PARA&rsquo;s real value is the demotion habit
          that keeps things from piling up again — and that habit is precisely what&rsquo;s easiest
          to automate. Let the tool move stale things to Archives and route the obvious files, and
          you&rsquo;re left making only the handful of decisions that genuinely need a human.
        </P>
        <P>
          FileMayor is free on Mac, Windows, and Linux. To try it:{' '}
          <Code>npm install -g filemayor</Code>, then <Code>filemayor init --para</Code> in any
          folder you want to bring under control. For the full PARA walkthrough, see the{' '}
          <Link href="/para" className="text-accent underline underline-offset-4">PARA method page</Link>.
        </P>
        <P>
          <em className="text-text-3">
            PARA is a method created by Tiago Forte (Building a Second Brain). FileMayor is an
            independent tool that automates it and is not affiliated with or endorsed by him.
          </em>
        </P>
      </Article>
    </>
  );
}
