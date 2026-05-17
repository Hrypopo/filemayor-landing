import Link from 'next/link';

const snippet = `{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "@filemayor/mcp"]
    }
  }
}`;

export function MCPSection() {
  return (
    <section
      id="mcp"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="mcp-heading"
    >
      <div className="container-prose">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          <div>
            <div className="section-label">Model Context Protocol</div>
            <h2 id="mcp-heading" className="h-display mt-3 text-[clamp(36px,5vw,56px)]">
              Bring FileMayor to <em className="not-italic text-accent italic">Claude</em>.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
              Install one MCP server. Claude Desktop, Claude Code, and any MCP-aware client
              can then diagnose folders, propose moves, and apply them — with the same
              journaled rollback the CLI uses. No glue code. No data leaves the machine.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/skill" className="btn btn-primary">
                Read the Skill guide
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="https://www.npmjs.com/package/@filemayor/mcp"
                className="btn btn-secondary"
              >
                @filemayor/mcp on npm
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Local-only execution',
                'Same Chevza Doctrine guards',
                'Journaled · undo from chat',
                'Works with Claude Code Skill',
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[14px] leading-snug text-text-2"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-[0_40px_120px_-40px_rgba(212,175,55,0.18)]">
            <div className="flex items-center gap-2 border-b border-border/70 bg-bg/40 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <div className="ml-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </div>
            </div>
            <pre className="overflow-x-auto bg-bg/40 p-5 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{snippet}</code>
            </pre>
            <div className="border-t border-border/70 bg-bg/40 px-5 py-3 font-mono text-[12px] text-text-2">
              Restart Claude. Ask: <span className="text-accent">“diagnose my Downloads”</span>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
