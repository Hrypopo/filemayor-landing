# FileMayor — Launch Playbook

Concrete steps in order of impact. Do them in sequence; the first three are the
highest-leverage actions available right now.

---

## URGENT: Unblock the publish pipeline (do before anything else)

### 1. Set npm_token GitHub secret (5 min)

Without this, the CLI on npm is frozen at v3.6.0. Every "install via npm" on the landing
installs old software.

1. Go to github.com/Hrypopo/FileMayor
2. Settings → Secrets and variables → Actions
3. New repository secret
   - Name: `npm_token`
   - Value: *(the npm token from your npmjs.com account → Access Tokens → Classic Token → Automation)*
4. Once set, create a branch named `v4.0.5` in the repo UI (or push a tag)
   to trigger the build → publish pipeline.

### 2. Rotate Paddle API key (5 min)

The live Paddle API key was exposed in a chat transcript (check your Paddle dashboard
for the key starting with `pdl_live_apikey_01kthqk54a40...`). Rotate it immediately at:
paddle.com → Developer Tools → Authentication → Revoke + regenerate.

---

## Week 1: Launch channels (in order of impact)

### A. Show HN (highest ROI, zero cost)

Post on a Monday–Wednesday morning (9–11am ET). Use the copy from SOCIAL_KIT.md.
The title must start with "Show HN:" and be under 80 chars.

**Title:** `Show HN: FileMayor – reversible, journaled file organization (CLI, free)`

**First comment (paste verbatim):**
> I built FileMayor because every file-organizer I tried asked me to trust it,
> and none of them could undo their own mistakes. FileMayor journals every move
> to a write-ahead log; `undo --all` reverses an entire session, even after a crash.
>
> The flow is: scan → explain → plan → apply → undo. Planning can use AI (built-in
> free tier, or bring your own Gemini/OpenAI/Claude/Ollama key) but the engine is
> deterministic and local — no file contents ever leave the machine, only
> names/sizes/paths.
>
> It also runs as an MCP server, so Claude Desktop/Cursor can operate on your
> filesystem through the same journaled, path-jailed layer instead of raw shell
> access. `npx -y filemayor-mcp --audit` prints a trust report before you wire
> it in.
>
> Free on Mac/Windows/Linux. Happy to answer anything about the rollback journal
> design.

**Best-case outcome:** Front page → 5k–30k visitors in 24 hours.
**Prep:** Make sure npm has v4.0.5 live before posting. Run `npm install -g filemayor`
yourself to confirm it works end-to-end.

---

### B. Product Hunt (same week or week after HN)

**Do not post PH and HN on the same day.** Let HN settle first.

**Tagline (60 chars):** `AI organizes your folders. One undo reverses everything.`

**Description:**
> FileMayor organizes messy folders with a plan you approve first — and a journal
> that makes every operation reversible. Scan any directory, get an AI-generated
> plan, apply with one command, undo instantly. It runs entirely on your machine
> (CLI + desktop app), and doubles as an MCP server so AI agents get safe, journaled
> filesystem access instead of raw shell. Free on Mac, Windows, and Linux. Every
> feature included — no trial, no account.

**First comment:**
> Hi PH 👋
>
> I built FileMayor to solve a specific frustration: every tool that touches your
> files asks you to trust it, and none of them can undo what they did.
>
> FileMayor's core idea is a write-ahead journal. Before any file moves, the
> operation is logged. After a session — even a 200-file reorganisation — you can
> type `filemayor undo --all` and everything goes back exactly where it was. The
> journal survives crashes.
>
> The MCP server is the other part I'm proud of. Instead of giving Claude raw bash
> access to your filesystem (which has no safety layer), you give it FileMayor tools.
> Same journaled, path-jailed execution. The AI proposes; FileMayor validates; you
> approve.
>
> It's 100% free. No subscription, no account, no trial. I'm building in public and
> would love your feedback — especially on the rollback design.

**Assets needed:**
- [ ] Demo GIF: wreck a folder → `filemayor undo --all` → everything back (30s max)
- [ ] Gallery screenshots: dark theme, ⌘K bar visible
- [ ] Thumbnail: filemayor.com OG image works (already generated)

**Tip:** Schedule for Tuesday–Thursday, post at midnight PST so you start the day
with votes. Reach out to your network the night before.

---

### C. MCP directories (~45 min total, 5 separate actions)

These surface FileMayor to developers actively looking for MCP servers.
Do all of them — combined they cover >50k active MCP users.

**1. Smithery** — already done. Auto-indexes from `smithery.yaml` in the repo.
   Confirm at: smithery.ai/server/filemayor-mcp (appears within 24h of npm publish).

**2. Glama** — auto-indexes public GitHub repos. No submission needed.
   Confirm at: glama.ai/mcp/servers/filemayor-mcp (auto-discovers after npm publish).

**3. Official MCP Registry** (registry.modelcontextprotocol.io) — 5 min
   The `.mcp/server.json` is already in the repo. Run:
   ```bash
   # Install the publisher CLI
   npm install -g mcp-publisher   # or download from github.com/modelcontextprotocol/registry
   # Submit (requires GitHub auth — it verifies repo ownership)
   mcp-publisher publish .mcp/server.json
   ```

**4. punkpeye/awesome-mcp-servers** (widely linked, 15k+ GitHub stars) — 5 min
   Fork github.com/punkpeye/awesome-mcp-servers, then open README.md and find the
   `### 📂 File Systems` section (search for "file-systems"). Add this line in
   alphabetical order by repo name (under entries starting with 'F'):

   ```
   - [Hrypopo/FileMayor](https://github.com/Hrypopo/FileMayor) [![filemayor MCP server](https://glama.ai/mcp/servers/filemayor-mcp/badges/score.svg)](https://glama.ai/mcp/servers/filemayor-mcp) 📇 🏠 🍎 🪟 🐧 - AI-powered filesystem organiser with reversible operations. Diagnose a folder, generate a reorganisation plan, apply it, and undo the entire session with one command. Journaled, path-jailed, local-only — no file contents leave the machine. 14 tools.
   ```

   PR title: `Add FileMayor — reversible AI filesystem organiser`

**5. Cline MCP Marketplace** (cline.bot users) — 5 min
   Open a new issue at github.com/cline/mcp-marketplace with:
   - Title: `Add FileMayor MCP — reversible AI filesystem organizer`
   - Body:
     ```
     **GitHub repo:** https://github.com/Hrypopo/FileMayor
     **npm package:** filemayor-mcp
     **Description:** AI-powered filesystem organiser. Diagnose folders, generate
     reversible reorganisation plans, apply on approval, undo the whole session.
     Local-only execution, journaled moves, path-jailed. 14 tools.
     **Logo:** https://filemayor.com/icon (512×512 PNG)
     ```

**6. mcp.so** — submit at mcp.so/submit

---

### D. Reddit (3 posts, spread across communities)

Post after HN so you can link the HN thread as social proof.

**r/selfhosted** — use the r/selfhosted post from SOCIAL_KIT.md
**r/MacApps** — same content, lighter technical framing
**r/commandline** — lead with the CLI demo, mention MCP at the end

Rules for all three:
- Post, then immediately post your own first comment with more detail
- Don't post all three on the same day
- Reply to every comment within 24 hours

---

## Week 2–4: Compounding channels

### E. X / Twitter

Post the pinned post from SOCIAL_KIT.md as the first post. Then:
- Tag @AnthropicAI and @cursor_ai when mentioning MCP compatibility
- Post a "wreck folder → undo --all" screen recording (60s). The visual undo demo
  is the product's best marketing asset.
- Use `#mcp`, `#cursor`, `#claudeai`, `#devtools` tags

### F. YouTube / TikTok demo

1-minute format:
1. "My Downloads folder. 847 files." (show the mess — 5s)
2. `filemayor explain ~/Downloads` — health score 14/100 (10s)
3. `filemayor cure ~/Downloads` — plan appears (10s)
4. `filemayor apply` — files move (10s)
5. "Changed my mind." `filemayor undo --all` — everything back (10s)
6. "Free. filemayor.com" (5s)

This format works on YouTube Shorts, TikTok, Instagram Reels, and X.

### G. Dev.to / Hashnode article

Title: "I built a file organizer where every operation is reversible — here's how the
journal works."

Lead with the technical design, not the product pitch. HN and dev.to audiences are
allergic to marketing but love implementation details. Write 800–1200 words about
the write-ahead log, the crash-recovery logic, and why you chose this approach.
Link to filemayor.com at the end.

---

## Growth metrics to track

| Metric | Where | Target (3 months) |
|--------|-------|-------------------|
| npm weekly downloads | npmjs.com/package/filemayor | 1,000/week |
| GitHub stars | github.com/Hrypopo/FileMayor | 500 |
| Email subscribers | Vercel/Resend dashboard | 1,000 |
| Landing unique visitors | Vercel Analytics | 10k/month |
| MCP installs | Smithery dashboard | 100/week |

These are realistic 3-month targets after a successful HN launch. Reaching 10M
installs requires sustained distribution over 12–24 months — the above channels
compound when maintained consistently.

---

## What NOT to do

- Don't buy ads before organic channels are exhausted. Dev tools don't convert on
  paid ads until there's social proof.
- Don't post "just wanted to share my tool" on Reddit. State the value clearly.
- Don't launch PH on Friday or the weekend.
- Don't announce "we're live" — announce the problem you solve.
