# FileMayor Social Kit

Ready-to-paste profiles, pinned posts, and launch content. Keep the voice:
plain, confident, a little dry. Never "revolutionary," never "10x." The
product's pitch is *trust* — reversibility, local-first, free.

One-liner (use everywhere): **Your folders, on command.**

Link in every bio: https://filemayor.com

---

## Profile bios

### X / Twitter (160 chars)
> Your folders, on command. AI proposes, you approve, one undo rolls it back. Free on Mac, Windows, Linux — CLI, desktop & MCP server. ⌘K → filemayor.com

### LinkedIn (company tagline + about)
Tagline:
> The reversible filesystem layer — for humans and AI agents.

About:
> FileMayor organizes messy folders the way a good operator would: diagnose first, propose a plan, apply only on approval, journal every move so one command undoes anything. It runs entirely on your machine — CLI, desktop app, and an MCP server that lets Claude, Cursor, or any AI agent operate on files safely. Free on Mac, Windows, and Linux. Every feature included.

### GitHub org/profile bio
> Your folders, on command. Journaled, reversible, local-first file operations — CLI · Desktop · MCP. 100% free.

### Reddit / Discord intro
> FileMayor — free AI file organizer for Mac/Windows/Linux. Scan a folder, get a plan, apply with one command, undo instantly. Local-first; nothing leaves your machine. Also speaks MCP, so AI agents can use it as their safe filesystem layer.

### Product Hunt tagline (60 chars)
> AI organizes your folders. One undo reverses everything.

---

## Pinned post (X)

> Every AI can now touch your filesystem. None of them can undo what they did.
>
> FileMayor is the missing layer: it diagnoses a messy folder, proposes a plan, applies it only when you approve — and journals every move so one command rolls it all back.
>
> Free. Local. Mac/Win/Linux.
> filemayor.com

## Pinned post (LinkedIn)

> We let AI agents write our code, draft our email, and book our travel. But giving one write-access to your filesystem is still a leap of faith — file moves don't have an undo button.
>
> FileMayor gives them one. Every operation is journaled and reversible. The AI proposes, you approve, it applies — and `filemayor undo` reverses the whole session if you change your mind.
>
> It's free, it runs entirely on your machine, and it speaks MCP so Claude/Cursor/Zed can use it directly.
>
> https://filemayor.com

---

## Launch posts

### Show HN (title + first comment)
Title:
> Show HN: FileMayor – reversible, journaled file organization (CLI, free)

First comment:
> I built FileMayor because every file-organizer I tried asked me to trust it, and none of them could undo their own mistakes. FileMayor journals every move to a write-ahead log; `undo --all` reverses an entire session, even after a crash.
>
> The flow is scan → explain → plan → apply → undo. Planning can use AI (built-in free tier, or bring your own Gemini/OpenAI/Claude/Ollama key) but the engine is deterministic and local — no file contents ever leave the machine, only names/sizes/paths.
>
> It also runs as an MCP server, so Claude Desktop/Cursor can operate on your filesystem through the same journaled, path-jailed layer instead of raw shell access. `npx -y filemayor-mcp --audit` prints a trust report (transport, egress, tool list) before you wire it in.
>
> Free on Mac/Windows/Linux. Happy to answer anything about the rollback journal design.

### Product Hunt description
> FileMayor organizes messy folders with a plan you approve first — and a journal that makes every operation reversible. Scan any directory, get an AI-generated plan, apply with one command, undo instantly. It runs entirely on your machine (CLI + desktop app), and doubles as an MCP server so AI agents get safe, journaled filesystem access instead of raw shell. Free on Mac, Windows, and Linux. Every feature included — no trial, no account.

### r/selfhosted · r/DataHoarder · r/macapps post
Title:
> FileMayor — free, local-first file organizer where every operation is reversible (Mac/Win/Linux)

Body:
> Sharing a tool I built. The core idea: file organization you can trust because nothing is one-way. Every move is journaled; `undo --all` rolls back a whole session, even after a crash.
>
> - Scan → explain (health score) → plan → apply → undo
> - AI planning optional: built-in free tier, your own API key, or local Ollama — or skip AI entirely, the rule engine is deterministic
> - Nothing leaves your machine; AI calls send metadata only (names/sizes/paths, never contents)
> - CLI (`npm i -g filemayor`), desktop app, and an MCP server for AI agents
> - Free, all features, no account
>
> filemayor.com — would love feedback on the rollback design.

---

## Content pillars (recurring post formats)

1. **Undo stories** — short clips/gifs: wreck a folder on purpose, `undo --all`, everything back. The product IS the demo.
2. **Agent safety** — "what your AI agent did vs. what the journal says" — position MCP server vs. raw shell access.
3. **Before/after** — a real Downloads folder, the plan, the result. One image, two states.
4. **Changelog threads** — each release, 3 bullets max, link to changelog.
5. **Build in public** — metrics posts (installs, stars) once numbers are worth showing.

## Rules
- Always link filemayor.com, not the GitHub release page (the site tracks installs).
- Screenshots in dark theme, ⌘K bar visible where possible.
- Never claim "AI organizes perfectly." The claim is *reversibility*, not perfection.
