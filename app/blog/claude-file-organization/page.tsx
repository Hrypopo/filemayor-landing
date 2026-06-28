import type { Metadata } from 'next';
import Link from 'next/link';
import { Article, P, H2, H3, Pull, Ul, Li } from '@/components/Article';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to organize files with Claude: a practical guide',
  url: 'https://filemayor.com/blog/claude-file-organization',
  datePublished: '2026-06-11',
  author: { '@type': 'Person', name: 'Lehlohonolo Goodwill Nchefu' },
  publisher: { '@type': 'Organization', name: 'FileMayor' },
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
      name: 'How to organize files with Claude: a practical guide',
      item: 'https://filemayor.com/blog/claude-file-organization',
    },
  ],
};

export const metadata: Metadata = {
  title: 'How to organize files with Claude',
  description:
    'Claude is great at reasoning about files — but it needs a safe execution layer to move them. Here is how to connect Claude to your filesystem safely.',
  alternates: { canonical: '/blog/claude-file-organization' },
};

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Article
        header={{
          kicker: 'Tutorial · Claude · MCP',
          title: 'How to organize files with Claude: a practical guide',
          dek: 'Claude is great at reasoning about files — but it needs a safe execution layer to actually move them. Here is how to connect Claude to your filesystem without the risk.',
          date: '2026.06.11',
          readTime: '6 min read',
        }}
      >
        <H2>Claude can think about your files. Moving them safely is a different problem.</H2>
        <P>
          Claude is remarkably good at reasoning about messy directories. Describe your
          Downloads folder and it will immediately suggest a sensible structure — separate
          installers from documents, archive files older than a year, deduplicate the
          screenshots. The plan is usually solid. The gap is between the plan and your
          actual filesystem.
        </P>
        <P>
          Out of the box, Claude cannot move files. If you give it filesystem access
          through a generic shell tool or a raw MCP server, it can — but with no journal,
          no preview step, and no undo. You are one confident but mistaken AI response
          away from a folder you cannot reconstruct.
        </P>
        <P>
          The right architecture gives Claude the ability to reason and plan while keeping
          a safety layer between its decisions and your files. That is exactly what
          FileMayor&apos;s MCP server does.
        </P>

        <H2>What the MCP integration looks like</H2>
        <P>
          Model Context Protocol (MCP) lets Claude Desktop and Claude Code connect to
          external tools as first-class capabilities. FileMayor ships an MCP server that
          exposes its core operations — diagnose, plan, apply, undo — to Claude as typed
          tools rather than raw shell commands.
        </P>
        <P>
          When you connect FileMayor via MCP, Claude gains four specific abilities:
        </P>
        <Ul>
          <Li>
            <strong>Explain</strong> — scan a folder and return a structured health report:
            duplicates, stale files, oversized directories, naming inconsistencies.
          </Li>
          <Li>
            <strong>Cure</strong> — generate a detailed reorganisation plan with a
            justification for every proposed move. Nothing is applied yet.
          </Li>
          <Li>
            <strong>Apply</strong> — execute an approved plan, with every operation
            written to a write-ahead journal before the move happens.
          </Li>
          <Li>
            <strong>Undo</strong> — roll back an entire session to the exact pre-operation
            state, even after a system crash.
          </Li>
        </Ul>
        <P>
          The key design choice: Claude proposes, you approve, FileMayor executes safely.
          Claude never bypasses the review step.
        </P>

        <H2>Setup in two minutes</H2>
        <H3>1. Install FileMayor</H3>
        <P>
          FileMayor is a Node.js CLI, free on Mac, Windows, and Linux:
        </P>
        <pre className="my-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-2">
          <code>npm install -g filemayor</code>
        </pre>
        <H3>2. Add it to your MCP config</H3>
        <P>
          Open your Claude Desktop or Claude Code MCP configuration and add:
        </P>
        <pre className="my-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-2">
          <code>{`{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"]
    }
  }
}`}</code>
        </pre>
        <P>
          Restart Claude Desktop. You will see FileMayor appear in the tools panel.
          No API key, no account, no configuration beyond this.
        </P>
        <H3>3. Start with a diagnosis</H3>
        <P>
          The safest first message to Claude once FileMayor is connected:
        </P>
        <pre className="my-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-2">
          <code>Diagnose my Downloads folder and tell me what you find.</code>
        </pre>
        <P>
          Claude will call <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">filemayor explain</code> and
          return a health score plus a breakdown of problems. No files are moved. You are
          just looking.
        </P>

        <H2>Real examples of what you can ask</H2>
        <P>
          Once connected, Claude understands natural-language instructions about your
          filesystem and translates them into safe FileMayor operations:
        </P>
        <Ul>
          <Li>&ldquo;Archive everything in Downloads older than 6 months.&rdquo;</Li>
          <Li>&ldquo;Find duplicates in my Documents folder and show me the plan before doing anything.&rdquo;</Li>
          <Li>&ldquo;Move all the screenshots on my Desktop into a Screenshots folder.&rdquo;</Li>
          <Li>&ldquo;Organise my project folder by file type.&rdquo;</Li>
          <Li>&ldquo;What did I last change? Undo the last session.&rdquo;</Li>
        </Ul>
        <P>
          For every operation that would move files, Claude generates a plan first. You
          can ask it to explain any step, modify the plan, or cancel it. Only when you
          say &ldquo;apply this&rdquo; does anything change on disk.
        </P>

        <Pull>
          Claude reasons about your files. FileMayor makes sure nothing moves until you
          say so — and that it can all come back if you change your mind.
        </Pull>

        <H2>Why not just use a shell tool with Claude?</H2>
        <P>
          Claude Code and many Claude Desktop setups offer a generic shell or Bash tool.
          You could, in principle, ask Claude to run <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">mv</code> and{' '}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">cp</code> directly.
          Three reasons not to:
        </P>
        <H3>No preview step</H3>
        <P>
          A shell tool applies immediately. If Claude misunderstood your instruction —
          or if it was simply wrong about which files matched a pattern — the move
          has already happened.
        </P>
        <H3>No rollback</H3>
        <P>
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">mv</code> has no
          memory. There is no &ldquo;undo last session&rdquo;. Recovery means digging through
          backups or reconstructing the original state by hand.
        </P>
        <H3>No safety layers</H3>
        <P>
          FileMayor runs six independent checks between a plan and execution — the Chevza
          Doctrine. These catch destructive operation shapes, scope violations, and
          semantic errors that look reasonable in the plan but would cause real damage
          on disk. A raw shell tool has none of this.
        </P>
        <P>
          The combination of Claude&apos;s natural-language understanding and FileMayor&apos;s
          safety architecture gives you something neither provides alone: an AI that can
          actually reorganise your filesystem without the risk that usually comes with it.
        </P>

        <H2>Getting started</H2>
        <P>
          FileMayor is free, installs in under a minute, and works on Mac, Windows, and
          Linux. The MCP server requires no additional configuration beyond the JSON snippet
          above.
        </P>
        <P>
          If you are already using Claude Desktop or Claude Code daily, adding FileMayor
          takes two minutes and gives Claude one of the most useful capabilities it can
          have for everyday work.
        </P>
        <Ul>
          <Li>
            <Link href="/download" className="text-text-2 underline-offset-2 hover:text-accent hover:underline">
              Download FileMayor →
            </Link>
          </Li>
          <Li>
            <Link href="/mcp" className="text-text-2 underline-offset-2 hover:text-accent hover:underline">
              Full MCP setup guide →
            </Link>
          </Li>
        </Ul>
      </Article>
    </>
  );
}
