# FileMayor — Email Drip Sequence
## Full onboarding sequence for Resend

All emails: plain text preferred, minimal HTML. No Pro upsell. No gating.
Tone: direct, calm, useful. Like a smart colleague, not a marketer.

---

## DAY 1 — Welcome

**Subject:** FileMayor is ready. Here's where to start.

---

Welcome. FileMayor is installed and waiting.

The fastest way to see what it does:

```
filemayor explain ~/Downloads
```

This scans your Downloads folder and returns a health score from 0 to 100,
a list of duplicates, stale files, and anything that looks out of place.
Nothing is moved. You're just looking.

If the score is below 60, run:

```
filemayor cure ~/Downloads
```

This generates a reorganisation plan — every proposed move, with a reason.
Review it. If it looks right, apply it. If it doesn't, close it and nothing changes.

That's the whole loop. Diagnose → plan → apply.

One more thing: everything FileMayor does is reversible.

```
filemayor undo --all
```

Run that at any time to roll back your last session completely. Every move
is journaled before it happens. Your files always have a way back.

— FileMayor

[filemayor.com](https://filemayor.com)

---

## DAY 3 — The plan step

**Subject:** Why FileMayor shows you the plan before doing anything

---

Most file tools act immediately. You click, things move.

FileMayor doesn't work that way. Every operation produces a plan first —
a list of exactly what will happen, with a reason for each move. Nothing
is applied until you approve it.

This might feel slower. It isn't.

The plan step is what makes FileMayor safe to run on folders that matter —
your Documents, your project directories, your whole home folder. You can
see exactly what the AI is thinking before it touches anything.

If you haven't tried it on a folder you actually care about yet, now is a
good time:

```
filemayor cure ~/Documents
```

Scroll through the plan. Ask yourself: does this make sense? If yes, apply.
If not — close it, nothing happened.

That review step is the whole point.

— FileMayor

---

## DAY 7 — Undo

**Subject:** The command most people forget they have

---

```
filemayor undo --all
```

Most FileMayor users never need this. But knowing it exists changes how
you use the tool.

When you know you can undo an entire session — not just the last move,
but every single operation, restored to the exact original path — you stop
hesitating. You run `filemayor cure` on the messy folder you've been
avoiding for two years. You approve the plan. You see what happens.

If it's wrong, you undo it. Thirty seconds and everything is back.

The journal that makes this possible is a write-ahead log — it records
each operation before the move happens, so even a system crash mid-session
doesn't lose your undo history.

It works on Mac, Windows, and Linux. It survives restarts. It doesn't
expire.

Run it whenever you want. Your filesystem always has a way back.

— FileMayor

---

## DAY 14 — MCP + Claude

**Subject:** Ask Claude to clean your folders

---

If you use Claude Desktop or Claude Code, FileMayor can connect to it
directly via MCP — Model Context Protocol.

Once connected, you describe what you want in plain language and Claude
handles the rest:

> "Archive everything in Downloads older than 6 months."
> "Find duplicates in my Documents folder."
> "Move all the screenshots on my Desktop into a Screenshots folder."

Claude generates the plan. You approve it. FileMayor executes it with
the same journal and undo layer as always.

Setup takes two minutes. Add this to your Claude MCP config:

```json
{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"]
    }
  }
}
```

Restart Claude Desktop and FileMayor will appear in the tools panel.

Full guide at filemayor.com/mcp if you want the step-by-step.

— FileMayor

---

## DAY 21 — What FileMayor can do

**Subject:** Day 21 — what FileMayor can do that most tools can't

---

You've had FileMayor for three weeks. Here's a reminder of what's sitting
in your toolkit — all of it free, no upgrade required.

**Diagnose any folder in seconds**
```
filemayor explain ~/Downloads
```
Returns a health score, duplicate count, stale file list, and a plain-English
summary of what's wrong.

**Get a plan before anything moves**
```
filemayor cure ~/Downloads
```
Generates a full reorganisation plan with a justification for every proposed
move. Nothing happens until you say so.

**Undo an entire session with one command**
```
filemayor undo --all
```
Every operation is journaled. Run this and your filesystem goes back to
exactly where it was — even after a restart.

**Use it with Claude**
Add FileMayor to Claude Desktop or Claude Code via MCP and describe what
you want in plain language. Claude plans it, FileMayor executes it safely.

That's it. No tiers, no limits, no subscription.

If FileMayor has been useful — tell someone. Word of mouth from a real
user is worth more than any ad.

— FileMayor

---

## DAY 30 — Feedback ask

**Subject:** One question

---

You've been using FileMayor for a month.

One question: what's the one thing that would make it noticeably better
for you?

Reply to this email. I read every response.

— Lehlohonolo, FileMayor

---

## DAY 45 — Advanced: SOP files

**Subject:** The most powerful FileMayor feature most people haven't tried

---

Standard Operating Procedures.

A FileMayor SOP is a plain-text file that describes how a specific folder
should be organised — what goes where, what naming patterns to follow,
what to archive automatically.

Once you have one, FileMayor reads it every time it touches that folder
and applies the rules consistently.

Here's a minimal example — save it as `.filemayor-sop.md` in any folder:

```markdown
# Downloads SOP

- Move PDF files to ~/Documents/PDFs
- Move installer files (*.dmg, *.exe, *.pkg) to ~/Installers
- Archive anything older than 90 days to ~/Archive/Downloads
- Delete duplicate files, keeping the newest copy
```

Then run:

```
filemayor cure ~/Downloads
```

FileMayor reads the SOP, generates a plan that follows your rules, and
applies it when you approve.

The folder stays consistent across every session, every time.

— FileMayor

---

## DAY 60 — Re-engagement

**Subject:** How's your Downloads folder doing?

---

Two months in.

If FileMayor is part of your workflow now, great. If you haven't used it
in a while, this is a good excuse to run a quick health check:

```
filemayor explain ~/Downloads
```

See what score it gives you. If it's above 80, you're in good shape.
If it's below 60, run `filemayor cure` and spend five minutes approving
a plan.

That's all. Five minutes, once a month, keeps most folders clean.

If you've run into anything that didn't work the way you expected —
reply and let me know. FileMayor is free and we want it to be genuinely
useful, not just installed.

— FileMayor

[filemayor.com](https://filemayor.com)

---

## DAY 90 — Referral / community

**Subject:** Know anyone who'd use this?

---

Three months. If FileMayor has saved you time, there's one thing that
helps the project more than anything else:

Tell one person.

A developer friend with a messy project folder. Someone setting up
Claude Desktop who'd love safe filesystem tools. A sysadmin managing
shared drives.

The install is one line:

```
npm install -g filemayor
```

And it's free. Always.

If you want to help more actively — we're on GitHub at
github.com/hrypopo/filemayor. Stars, issues, and pull requests all
welcome.

Thank you for using it.

— Lehlohonolo, FileMayor

---

## SEQUENCE SUMMARY

| Day | Subject line | Goal |
|-----|-------------|------|
| 1   | FileMayor is ready. Here's where to start. | First activation |
| 3   | Why FileMayor shows you the plan before doing anything | Build trust in the review step |
| 7   | The command most people forget they have | Drive undo awareness |
| 14  | Ask Claude to clean your folders | MCP adoption |
| 21  | Day 21 — what FileMayor can do | Feature recap, no upsell |
| 30  | One question | Feedback + personal connection |
| 45  | The most powerful FileMayor feature most people haven't tried | SOP feature discovery |
| 60  | How's your Downloads folder doing? | Re-engagement |
| 90  | Know anyone who'd use this? | Referral |
