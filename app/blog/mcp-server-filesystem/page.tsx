import type { Metadata } from 'next';
import Link from 'next/link';
import { Article, P, H2, H3, Pull, Ul, Li, Pre, Code } from '@/components/Article';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MCP server for filesystem access: how to give Claude safe file operations',
  url: 'https://filemayor.com/blog/mcp-server-filesystem',
  datePublished: '2026-06-10',
  author: { '@type': 'Person', name: 'Lehlohonolo Goodwill Nchefu' },
  publisher: { '@type': 'Organization', name: 'FileMayor' },
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
      name: 'MCP server for filesystem access',
      item: 'https://filemayor.com/blog/mcp-server-filesystem',
    },
  ],
};

export const metadata: Metadata = {
  title: 'MCP server for filesystem access: safe file operations for Claude',
  description:
    'How to wire a filesystem MCP server into Claude Desktop so your AI agent can organize, clean, and manage files safely — with a rollback journal and no raw shell access.',
};

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Article
        header={{
          kicker: 'Tutorial · MCP',
          title: 'MCP server for filesystem access: how to give Claude safe file operations',
          dek: 'How to wire a filesystem MCP server into Claude Desktop so your AI can organize, clean, and manage files — with a rollback journal instead of raw shell access.',
          date: '2026.06.10',
          readTime: '6 min read',
        }}
      >
        <H2>The problem with giving Claude shell access</H2>
        <P>
          The obvious way to let Claude manage your files is to give it a bash tool. Most
          MCP tutorials take this route. It works — until it doesn&rsquo;t.
        </P>
        <P>
          Raw shell access means Claude can run <Code>rm -rf</Code>, overwrite files silently,
          and scatter things across your filesystem with no record of what happened. There is no
          undo. If the model misunderstands your intent or you approve the wrong plan, the
          damage is permanent.
        </P>
        <P>
          A purpose-built filesystem MCP server solves this by putting a safety layer between
          the model and your disk. The model can still scan, organize, deduplicate, and clean —
          but every operation is journaled, system directories are blocked, and a single command
          reverses anything.
        </P>

        <H2>What a filesystem MCP server does differently</H2>
        <P>
          Instead of exposing <Code>bash</Code>, a filesystem MCP server exposes a set of
          typed tools: <Code>scan</Code>, <Code>organize</Code>, <Code>plan</Code>,{' '}
          <Code>apply</Code>, <Code>rollback</Code>. The model can only do what those tools
          allow. The tools themselves enforce constraints the model can&rsquo;t bypass:
        </P>
        <Ul>
          <Li>
            <strong>Path jailing.</strong> Symlinks are resolved before validation. System
            directories (<Code>/System</Code>, <Code>C:\Windows</Code>, <Code>/etc</Code>,{' '}
            <Code>/proc</Code>) are on a blocklist and cannot be touched regardless of what the
            model is asked to do.
          </Li>
          <Li>
            <strong>Plan-then-apply gate.</strong> Scanning and planning are read-only. Only the
            explicit <Code>apply</Code> call mutates disk — and only after the user has reviewed
            the plan.
          </Li>
          <Li>
            <strong>Write-ahead journal.</strong> Every move is recorded before it happens. A
            single <Code>rollback</Code> call reverses the entire session, even if the process
            crashed mid-apply.
          </Li>
          <Li>
            <strong>No file contents egress.</strong> The server sends only metadata to the
            model — names, sizes, paths, extensions. File contents never leave the machine.
          </Li>
        </Ul>

        <H2>Setting it up in Claude Desktop</H2>
        <P>
          The FileMayor MCP server is available as an npm package. You don&rsquo;t need to
          install it globally — <Code>npx</Code> handles it on demand.
        </P>
        <H3>1. Verify the server before wiring it in</H3>
        <P>
          Run the audit flag first. It prints a structured trust report and exits without
          starting an MCP session:
        </P>
        <Pre>{`npx -y filemayor-mcp --audit`}</Pre>
        <P>
          The output tells you the transport type (stdio — no network listener), what outbound
          calls the server can make (one optional Gemini call for AI planning, gated by an env
          var), and the complete list of tools with their destructive flags. Diff it after
          upgrades to catch changes.
        </P>
        <H3>2. Add one entry to claude_desktop_config.json</H3>
        <P>
          On macOS this file is at{' '}
          <Code>~/Library/Application Support/Claude/claude_desktop_config.json</Code>.
          On Windows: <Code>%APPDATA%\Claude\claude_desktop_config.json</Code>.
        </P>
        <Pre>{`{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"]
    }
  }
}`}</Pre>
        <P>
          That&rsquo;s it — no API key required. When Claude is the MCP client, Claude IS
          the AI. It calls <Code>filemayor_explain</Code> to audit the folder, reasons about
          the moves itself, and passes them directly to <Code>filemayor_apply</Code>.
        </P>
        <P>
          The <Code>filemayor_plan</Code> tool (which calls an external AI) is only for
          non-Claude clients like Cursor or Zed. If you use one of those, add a Gemini API
          key — it&rsquo;s free up to 1,500 requests/day on Google&rsquo;s free tier:
        </P>
        <Pre>{`{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"],
      "env": {
        "GEMINI_API_KEY": "your-gemini-key"
      }
    }
  }
}`}</Pre>
        <H3>3. Restart Claude Desktop</H3>
        <P>
          After restarting, open a new conversation and look for the hammer icon (🔧). You
          should see 14 FileMayor tools available. Ask Claude to diagnose a folder:
        </P>
        <Pre>{`Diagnose my Downloads folder and tell me what's taking up the most space.`}</Pre>

        <H2>The tools Claude gets</H2>
        <P>
          The server exposes 14 tools. The key ones for filesystem management:
        </P>
        <Ul>
          <Li>
            <Code>filemayor_scan</Code> — recursive file inventory with sizes and categories
          </Li>
          <Li>
            <Code>filemayor_explain</Code> — health score (0–100), identified issues, savings
            estimate
          </Li>
          <Li>
            <Code>filemayor_plan</Code> — for non-Claude clients: generates a plan via an external
            AI (requires GEMINI_API_KEY). When Claude is the client, Claude reasons directly —
            no key needed.
          </Li>
          <Li>
            <Code>filemayor_apply</Code> — executes the most recent plan; writes the journal
          </Li>
          <Li>
            <Code>filemayor_rollback</Code> — reverses the most recent applied plan
          </Li>
          <Li>
            <Code>filemayor_organize</Code> — deterministic auto-organize by extension (no API
            key required)
          </Li>
          <Li>
            <Code>filemayor_duplicates</Code> — hash-based duplicate detection
          </Li>
          <Li>
            <Code>filemayor_dedupe</Code> — find and remove duplicates (destructive, flagged)
          </Li>
          <Li>
            <Code>filemayor_clean</Code> — find junk files (.DS_Store, Thumbs.db, temp files)
          </Li>
        </Ul>
        <Pull>
          Every applied plan can be reversed. The journal survives crashes.
        </Pull>

        <H2>The same server works in Cursor and Zed</H2>
        <P>
          Any MCP client that speaks stdio works. In Cursor, add the same configuration to
          your MCP settings. In Zed, add it to <Code>~/.config/zed/settings.json</Code>:
        </P>
        <Pre>{`{
  "context_servers": {
    "filemayor": {
      "command": {
        "path": "npx",
        "args": ["-y", "filemayor-mcp"]
      }
    }
  }
}`}</Pre>

        <H2>What this does not replace</H2>
        <P>
          A filesystem MCP server is not a full-featured file manager. It doesn&rsquo;t
          replace Finder or Explorer for manual browsing, drag-and-drop, or app-specific
          operations like ejecting drives. It&rsquo;s specifically for bulk operations —
          the quarterly cleanup, the project archiving, the deduplication run you keep
          putting off — where AI planning and undo matter more than a visual interface.
        </P>
        <P>
          For the details on the full security model, see the{' '}
          <Link href="/mcp" className="text-accent underline underline-offset-4">
            MCP server documentation
          </Link>
          .
        </P>
      </Article>
    </>
  );
}
